import Vue from 'vue'
import Vuelidate from "vuelidate/src"
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from "./filter/date.filter"
import currencyFilter from "./filter/currency.filter";
import messagePlugin from './utils/message.plugin'
import Loader from "./components/app/Loader"
import tooltipDirective from './directives/tooltip.directive'
import Paginate from 'vuejs-paginate'

import 'materialize-css/dist/css/materialize.min.css'
import '@/assets/main.css'
import 'materialize-css/dist/js/materialize.min'


import firebase from "firebase";
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter('currencyFilter', currencyFilter)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)
Vue.directive('tooltip',tooltipDirective)

firebase.initializeApp({
  apiKey: "AIzaSyCb8mI4CQq9fW4FjI5YcBKsAQT-ZrjNX_Y",
  authDomain: "vuecrmgithub.firebaseapp.com",
  databaseURL: "https://vuecrmgithub.firebaseio.com",
  projectId: "vuecrmgithub",
  storageBucket: "vuecrmgithub.appspot.com",
  messagingSenderId: "150822577386",
  appId: "1:150822577386:web:7607aa2c2c632dfb2b2393",
  measurementId: "G-4YRTD7XZTM"
})

let app

firebase.auth().onAuthStateChanged(()=> {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


