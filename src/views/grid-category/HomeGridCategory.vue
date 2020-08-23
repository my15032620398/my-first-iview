<template>
    <div>
        <router-view/>

    </div>
</template>

<script>
    export default {
        name: "HomGridCategory",
        data(){
            return{

            }
        },
        methods:{

        },
        components:{

        },
        created() {
            this.$router.push('/gridCategoryList',null)
        }
    }
</script>

<style scoped>

</style>