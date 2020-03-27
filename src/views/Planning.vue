<template>
                <div>
                    <div class="page-title">
                        <h3>Планування</h3>
                        <h4>{{info.bill | currencyFilter('UAH')}}</h4>
                    </div>

                    <Loader v-if="loading" />

                    <div v-else-if="!categories.length" class="col s12 m6 center"
                    >
                        <div class="card-panel teal">
                            <span class="white-text">
                            <h2>Немає категорій :(</h2>
                            <p>У вас ще нема ніяких категорій!</p>
                            </span>
                        </div>
                        <p><router-link to="/categories">Додайте зараз, це ж так просто!</router-link></p>
                    </div>

                    <section v-else>
                        <div v-tooltip="cat.tooltip"
                                v-for="cat in categories"
                                :key="cat.id"
                        >
                            <p>
                                <strong>{{cat.name}}:</strong>
                                {{cat.spend | currencyFilter('UAH')}} из {{cat.limit | currencyFilter('UAH')}}
                            </p>
                            <div class="progress" >
                                <div
                                        class="determinate"
                                        :class="[cat.progressColor]"
                                        :style="{width: cat.progressPercent + '%'}"
                                ></div>
                            </div>
                        </div>
                    </section>
                </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import currencyFilter from "../filter/currency.filter";
    export default {
        name: "planning",
        data: () => ({
            loading: true,
            categories: []
        }),
        computed: {
          ...mapGetters(['info'])
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(cat => {
                const spend = records.filter(
                    r => r.categoryId === cat.id)
                    .filter(
                        r => r.type === 'outcome'
                    ).reduce((total, record) => {
                        return total += +record.amount
                    }, 0)
                const percent = 100 * spend / cat.limit
                const progressPercent = percent > 100 ? 100: percent
                const progressColor = percent < 60
                    ? 'green'
                    : percent < 100
                        ? 'yellow'
                        : 'red'
                const tooltipValue = cat.limit - spend
                const tooltip = `${tooltipValue < 0 ? 'Перевищили на' : 'Залишилося' } ${currencyFilter(Math.abs(tooltipValue))}`
                return {
                    ...cat,
                    progressColor,
                    progressPercent,
                    spend,
                    tooltip
                }
            })
            this.loading = false
        }
    }
</script>

<style scoped>

</style>