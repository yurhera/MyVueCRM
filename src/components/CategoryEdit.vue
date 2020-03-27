<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редагувати</h4>
            </div>

            <form @submit.prevent="submitForm">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option
                            v-for="category in categories"
                            :key="category.id"
                        >{{category.name}}
                        </option>
                    </select>
                    <label>Виберіть категорію</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model.trim="$v.name.$model"
                            :class="{ 'invalid': $v.name.$error }"
                    >
                    <label for="name">Назва</label>
                    <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Введіть назву категорії</small>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="$v.limit.$model"
                            :class="{ 'invalid': $v.limit.$error }"
                    >
                    <label for="limit">Ліміт</label>
                    <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">Введіть ліміт по грошам</small>
                    <small class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Ну не серйозно, більше 100 грн)</small>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Оновити
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue } from 'vuelidate/lib/validators'
    import messages from "../utils/messages";
    export default {
        name: "CategoryEdit",
        props: ['categories'],
        data: () => ({
            select: null,
            name: '',
            limit: 0,
            current: null,
            currentId: null
        }),
        validations:{
            name: {required},
            limit: {required, minValue :  minValue (100)}
        },
        watch: {
            current(catN){
                const {name, limit, id} = this.categories.find(c => c.name === catN)
                this.name = name
                this.limit = limit
                this.currentId = id
            }
        },
        created(){
            const { name, limit} = this.categories[0]
            this.name = name
            this.limit = limit
            this.current = name
        },
        methods: {
            async submitForm(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                try {
                    const categoryData = {
                        name: this.name,
                        limit: this.limit,
                        id: this.currentId
                    }
                    await this.$store.dispatch('updateCategory', categoryData )
                    this.$message(messages['update-category-success'])
                    this.$emit('updated', categoryData)
                }catch (e) {
                    console.log(e);
                }

            }
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.select, this.categories)
            window.M.updateTextFields()
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