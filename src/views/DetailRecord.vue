<template>
    <div>
        <Loader v-if="loading" />

        <div v-if="!record" class="center">
            <p>Запису з таким <strong>id={{$route.params.id}}</strong> не існує!</p>
        </div>

        <div v-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a class="breadcrumb">
                    {{record.type === 'outcome' ? 'Витрата' : 'Дохід'}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card"
                        :class="{'red': record.type === 'outcome',
'green': record.type === 'income'}"
                    >
                                <div class="card-content white-text">
                            <p>Опис: {{record.description}}</p>
                            <p>Сума: {{record.amount | currencyFilter('UAH')}}</p>
                            <p>Категорiя: {{record.name}} </p>

                            <small>{{record.date | date('datetime')}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Detail-record",
        data: () => ({
            record: null,
            loading: true
        }),
        async mounted(){
            const id = this.$route.params.id
            const record = await this.$store.dispatch('fetchRecordById', id)
            const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

            this.record = {
                ...record,
                ...category
            }

            this.loading = false
        }

    }
</script>

<style scoped>

</style>