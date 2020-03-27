<template>
                <div>
                    <div class="page-title">
                        <h3>Новий запис</h3>
                    </div>
                    <loader v-if="loading"></loader>

                    <form v-if="!loading && categories.length" class="form" @submit.prevent="submitForm">

                        <div class="input-field" >
                            <select ref="select" v-model="current">
                                <option
                                        v-for="category in categories"
                                        :key="category.id"
                                        :value="category.id"
                                >{{category.name}}
                                </option>
                            </select>
                            <label>Виберіть категорію</label>
                        </div>

                        <p>
                            <label>
                                <input
                                        class="with-gap"
                                        name="type"
                                        type="radio"
                                        value="income"
                                        v-model="type"
                                />
                                <span>Дохід</span>
                            </label>
                        </p>

                        <p>
                            <label>
                                <input
                                        class="with-gap"
                                        name="type"
                                        type="radio"
                                        value="outcome"
                                        v-model="type"
                                />
                                <span>Витрата</span>
                            </label>
                        </p>

                        <div class="input-field">
                            <input
                                    id="amount"
                                    type="number"
                                    v-model.number="$v.amount.$model"
                                    :class="{ 'invalid': $v.amount.$error }"
                            >
                            <label for="amount">Сума</label>
                            <small class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.required">Введіть кількість грошей</small>
                            <small class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Ну не серйозно, хоть більше 1 грн)</small>
                        </div>

                        <div class="input-field">
                            <input
                                    id="description"
                                    type="text"
                                    v-model.trim="$v.description.$model"
                                    :class="{ 'invalid': $v.description.$error }"
                            >
                            <label for="description">Опис</label>
                            <small class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">Введіть опис</small>
                        </div>

                        <button class="btn waves-effect waves-light" type="submit">
                            Створити
                            <i class="material-icons right">send</i>
                        </button>
                    </form>

                    <div v-if="!categories.length && !loading" class="col s12 m6 center">
                        <p>Немає записів!</p>
                        <p><router-link to="/categories">Додайте зараз, це ж так просто!</router-link></p>
                    </div>

                </div>

</template>

<script>
    import {required, minValue } from 'vuelidate/lib/validators'
  //  import messages from "../utils/messages";
    import {mapGetters} from 'vuex'

    export default {
        name: "record",
        data: () => ({
            categories: [],
            select: null,
            amount: 1,
            description: '',
            current: null,
            loading: true,
            type: 'outcome'
        }),
        validations:{
            amount: {required, minValue: minValue (1)},
            description: {required}
        },
        async mounted(){
            this.categories = await this.$store.dispatch('fetchCategories')
            this.$nextTick(function () {
                this.select = window.M.FormSelect.init(this.$refs.select, this.categories)
                window.M.updateTextFields()
            })
            if(this.categories.length) {
                this.current = this.categories[0].id
            }

        },
        created(){
            this.loading = false
        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord (){
               if (this.type === 'income'){
                   return true
               }
               return this.info.bill >= this.amount
            }
        },
        methods: {
            async submitForm(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                    if (this.canCreateRecord){
                        try {
                           await this.$store.dispatch('createRecord',
                                {
                                    categoryId: this.current,
                                    amount: this.amount,
                                    description: this.description,
                                    type: this.type,
                                    date: new Date().toJSON()
                                })
                        }catch (e) {
                            console.log(e);
                        }
                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount
                        await this.$store.dispatch('updateInfo', {bill})
                        this.$message('Запис успішно зроблено')
                        this.$v.$reset()
                        this.amount = 1
                        this.description =''
                    }else {
                        this.$message(`Недостатньо грошей на рахунку - ${this.amount - this.info.bill}`)
                    }
            }
        },
        watch: {

        },
        destroyed() {
            if(this.select && this.select.destroy){
                this.select.destroy
            }
        }

    }
</script>

<style scoped>

</style>