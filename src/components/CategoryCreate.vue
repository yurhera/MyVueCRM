<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Створити</h4>
            </div>

            <form @submit.prevent="submitForm">
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
                    Створити
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
        name: "CategoryCreate",
        data: () => ({
            name: '',
            limit: 100
        }),
        validations:{
            name: {required},
            limit: {required, minValue :  minValue (100)}
        },
        mounted() {
            window.M.updateTextFields();
        },
        methods: {
            async submitForm(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                try {
                    const category = await this.$store.dispatch('createCategory', {
                        name: this.name,
                        limit: this.limit
                    })
                    this.name = ''
                    this.limit = 100
                    this.$v.$reset()
                    this.$message(messages['create-category-success'])
                    this.$emit('created', category)
                }catch (e) {
                    console.log(e);
                }

            }
        }
    }
</script>

<style scoped>

</style>