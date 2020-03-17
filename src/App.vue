<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <component :is="layout">
      <router-view/>
    </component>

  </div>
</template>
<script>
  import EmptyLayout from "./layouts/EmptyLayout";
  import MainLayout from "./layouts/MainLayout";
  export default{
    components: {
      EmptyLayout, MainLayout
    },
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    }
  }

</script>
<style>

</style>
