<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title center">Домашня бухгалтерія</span>
            <div class="input-field">
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
            <div class="input-field">
                <input
                        id="name"
                        type="text"
                        v-model.trim="$v.name.$model"
                        :class="{ 'invalid': $v.name.$error }"
                >
                <label for="password">Ім'я</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.name.$dirty && !$v.name.required">
                    Введіть ваше ім'я або нікнейм
                </small>
                <small
                        class="helper-text invalid"
                        v-else-if="$v.name.$dirty && $v.name.$invalid">
                    Ім'я повинно бути більше 3 символів, зараз {{name.length}}
                </small>
            </div>
            <div class="input-field">
                <input
                        id="bill"
                        type="number"
                        v-model.number="$v.bill.$model"
                        :class="{ 'invalid': $v.bill.$error }"
                >
                <label for="password">Стартовий рахунок</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.bill.$dirty && !$v.bill.required">
                    Введіть ваш капітал)
                </small>
                <small
                        class="helper-text invalid"
                        v-else-if="$v.bill.$dirty && !$v.bill.minValue">
                    Ваш рахунок повинен бути більше 100)
                </small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree" />
                    <span>Правила прочитав</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Зареєструватися
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Вже є акаунт?
                <router-link to="/login">Ввійти!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength, minValue} from 'vuelidate/lib/validators'
    export default {
        name: "register",
        data: () => ({
            email: '',
            password: '',
            name: '',
            bill: 0,
            agree: false
        }),
        validations: {
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength(6)
            },
            name: {
                required,
                minLength: minLength(3)
            },
            agree: {checked: v => v},
            bill: {
                required,
                minValue: minValue(100)
            }
        },
        mounted(){
            window.M.updateTextFields()
        },
        methods: {
            async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    console.log('error submit')
                    return
                }else{
                    const formData = {
                        email: this.email,
                        password: this.password,
                        name: this.name,
                        bill: this.bill
                    }
                    try {
                        await this.$store.dispatch('register', formData)
                        this.$router.push('/')
                    }catch (e) {
                      console.log(e)
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>