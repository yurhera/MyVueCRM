import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import error from "./error"
import info from "./info"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  actions: {
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH`)
      return await res.json()
    }
  },
  mutations: {

  },
  modules: {
    auth, error, info
  }
})
