<template>
    <div v-tooltip="'Додати новий запис'" data-position="left" class="fixed-action-btn">
        <router-link
            to="/record"
            class="btn-floating btn-large blue">
                <i class="large material-icons">add</i>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "add-record"
    }
</script>

<style scoped>

</style>