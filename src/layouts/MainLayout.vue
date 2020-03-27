<template>
    <div class="app-main-layer">
        <Navbar @click="isOpen=!isOpen"/>

        <Sidebar v-model="isOpen"/>
        <Loader v-if="loading" style="padding-top: 20%;"></Loader>
        <main v-else class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                 <router-view />
            </div>
        </main>

        <AddRecord />
    </div>
</template>

<script>
    import Navbar from "../components/app/Navbar";
    import Sidebar from "../components/app/Sidebar";
    import AddRecord from "../components/app/AddRecord";
    import messages from "../utils/messages"
    export default {
        name: "main-layout",
        data: () => ({
           isOpen: true,
           loading: true
        }),
        async mounted(){
            if(!Object.keys(this.$store.getters.info).length){
                await this.$store.dispatch('fetchInfo')
            }
            this.loading = false
        },
        components: {
            Navbar, Sidebar, AddRecord
        },
        computed: {
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            error(fbError) {
                this.$error(messages[fbError.code] || 'Якась дічь! Пробуйте щось інше')
            }
        }
    }
</script>

<style scoped>

</style>