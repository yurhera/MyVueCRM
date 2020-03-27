export default {
    install(Vue){
        Vue.prototype.$message = function (html) {
            window.M.toast({html: `<i class="material-icons">help_outline</i> ${html}`})
        }

        Vue.prototype.$error = function (html) {
            window.M.toast({html: `<i class="material-icons">info_outline</i> ${html}`})
        }
    }
}

