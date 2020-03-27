<template>
    <div>
        <div class="page-title">

                <div class="col s8">
                    <h3>История записей</h3>
                </div>
                <div class="col s4 offset-s6">
                    <select ref="select" v-model="pageSize" @change="rewritePagination" class="center">
                        <option
                                v-for="n in numbers"
                                :key="n"
                        >{{n}}
                        </option>
                    </select>
                </div>

        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">Немає записів</p>

        <section v-else>
            <HistoryTable  :records="items"/>

            <paginate class="center"
                    v-model="page"
                    :page-count="pageCount"
                    :click-handler="pageChangeHandler(page, pageSize)"
                    :prev-text="'Вперед'"
                    :next-text="'Назад'"
                    :container-class="'pagination'"
                    :page-class="'waves-effect'">
            </paginate>
        </section>
    </div>
</template>

<script>
    import paginationMixin from "../mixins/pagination.mixin"
    import HistoryTable from "../components/historyTable"
    import {Pie} from 'vue-chartjs'

    export default {
        name: "history",
        extends: Pie,
        mixins: [paginationMixin],
        data: () => ({
            loading: true,
            records: [],
            categories: [],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),
        async mounted(){
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')
            this.categories = categories
            this.setup(categories)

            this.loading = false
            this.select = window.M.FormSelect.init(this.$refs.select, this.numbers)
        },
        methods: {
            setup(categories){
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories.find(c => c.id === record.categoryId).name,
                        typeClass: record.type === 'income' ? 'green' : 'red',
                        typeText: record.type === 'income' ? 'Дохід' : 'Витрата'
                    }
                }))

                this.renderChart({
                    labels: this.categories.map(t => t.name),
                    datasets: [
                        {
                            label: 'Витрати по категоріям',
                            backgroundColor: ['#f87979', '#F0F8FF', '#7FFFD4','#7FFF00', '#D2691E', '#00008B', '#8B008B'],
                            data: categories.map(c =>
                                this.records.reduce((total, r) =>
                                    r.type === 'outcome' && c.id === r.categoryId ? total += +r.amount : total, 0)),
                        }
                    ]
                }, this.options)


            },
            rewritePagination(){
                this.setPageSize(this.pageSize)
                this.setup(this.categories)
            }
        },
        components: {
            HistoryTable
        }
    }
</script>

<style scoped>
    .select-wrapper input.select-dropdown{
        text-align: center;
    }
    .dropdown-content li{
        text-align: center;
    }
</style>