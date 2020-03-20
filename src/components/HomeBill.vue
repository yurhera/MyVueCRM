<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Рахунок у валюті</span>

                <p class="currency-line">
                    <span>{{bill | currency('UA')}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "homeBill",
        computed: {
            bill(){
                return this.$store.getters.info.bill
            }
        }
    }
</script>

<style scoped>

</style>