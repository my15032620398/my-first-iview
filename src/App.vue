<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                conheight:{
                    height:''
                }
            }
        },
        methods:{
            getHeight() {
                this.conheight.height = window.innerHeight - 170 + 'px';
            },
            created() {
                window.addEventListener('resize', this.getHeight);
                this.getHeight()

            }
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
  }
</style>
