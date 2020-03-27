import _ from 'lodash'

export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: +this.$route.query.count || 4,
            pageCount: 0,
            allItems: [],
            items: [],
            numbers: [2,3,4,5,10]
        }
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        pageChangeHandler(page, pageSize){
            this.$router.push(`${this.$route.path}?page=${page}&count=${pageSize}`)
            this.pageSize = pageSize
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setPageSize(num){
            this.pageSize = num
            console.log(num);
        }
    }
}