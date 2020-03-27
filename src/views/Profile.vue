<template>
                <div>
                    <div class="page-title">
                        <h3>Профиль</h3>
                    </div>

                    <form class="form" @submit.prevent="submitForm">
                        <div class="input-field">
                            <input
                                    id="userName"
                                    type="text"
                                    v-model.trim="$v.userName.$model"
                                    :class="{ 'invalid': $v.userName.$error }"
                            >
                            <label for="userName">Ім'я</label>
                            <small
                                    class="helper-text invalid"
                                    v-if="$v.userName.$dirty && !$v.userName.required">
                                Введіть ваше ім'я або нікнейм
                            </small>
                            <small
                                    class="helper-text invalid"
                                    v-else-if="$v.userName.$dirty && !$v.userName.minLength">
                                Ім'я повинно бути більше 3 символів, зараз {{userName.length}}
                            </small>
                        </div>

                        <button class="btn waves-effect waves-light" type="submit">
                            Обновить
                            <i class="material-icons right">send</i>
                        </button>
                    </form>
                </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'
    export default {
        name: "Profile",
        data: () => ({
            userName: ''
        }),
        validations:{
            userName: {required, minLength: minLength(3)},
        },
        mounted(){
            this.userName = this.$store.getters.info.name
            setTimeout(() => window.M.updateTextFields(), 0)

        },
        methods: {
            async submitForm(){
                const name = this.userName
                await this.$store.dispatch('updateInfo', {name})
            }
        }
    }
</script>

<style scoped>

</style>