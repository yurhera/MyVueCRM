<template>
<div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <div class="row">
            <CategoryCreate @created="addNewCategory"/>
            <div class="col s12 m6">
                    <Loader v-if="loading" />
            </div>
            <CategoryEdit
                    v-if="!loading && categories.length"
                    :categories="categories"
                    :key="categories.length + updateCount"
                    @updated="updateCategory"
            />
            <div class="col s12 m6 center"
                       v-if="!categories.length && !loading"
        >
            <div class="card-panel teal">
                            <span class="white-text">
                            <h2>Немає категорій :(</h2>
                            <p>У вас ще нема ніяких категорій! Додайте зараз, це ж так просто!</p>
                            </span>
            </div>
        </div>
        </div>
    </section>
</div>

</template>

<script>
    import CategoryCreate from "../components/CategoryCreate";
    import CategoryEdit from "../components/CategoryEdit";
    export default {
        name: "categories",
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        methods: {
          addNewCategory(category){
              this.categories.push(category)
              console.log(this.categories)
          },
            updateCategory(category){
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].name = category.name
                this.categories[idx].limit = category.limit
                this.updateCount++
            }
        },
        async mounted(){
           this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        components: {
            CategoryCreate, CategoryEdit
        }
    }
</script>

<style scoped>

</style>