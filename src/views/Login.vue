<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title center">Домашня бухгалтерія</span>
            <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input
                        id="email"
                        type="text"
                        v-model.trim="$v.email.$model"
                        :class="{ 'invalid': $v.email.$error }"
                >
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">Чекаю правельний Email</small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.required">Поле Email не повинно бути пустим</small>
            </div>
            <div class="input-field">
                <i class="material-icons prefix">create</i>
                <input
                        id="password"
                        type="password"
                        v-model.trim="$v.password.$model"
                        :class="{ 'invalid': $v.password.$error }"
                >
                <label for="password">Пароль</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.password.$dirty && !$v.password.required">
                        Введіть пароль
                </small>
                <small
                        class="helper-text invalid"
                        v-else-if="$v.password.$dirty && $v.password.$invalid">
                    Більше 6 знаків, зараз {{password.length}}
                </small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Ввійти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Немає акаунта?
                <router-link to="/register">Зареєструватися</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import messages from "../utils/messages";
    export default {
        name: "login",
        data: () => ({
            email: '',
            password: ''
        }),
        validations: {
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        mounted(){
            if(messages[this.$route.query.message]){
                this.$message(messages[this.$route.query.message])
            }
        },
        methods: {
            async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    console.log('error submit')
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }
                    try {
                        await this.$store.dispatch('login', formData).then(()=>{
                            this.$router.push('/')
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
            }
    }
</script>

<style scoped>

</style>