<template>
  <div>



  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'


  export default {
  components: {
  },
  data(){
    return{
        rootURL:config.URL,
    }
  },
  methods:{
      checkTheType(){
      }
  },
  created(){
    this.checkTheType();
  }

  }


</script>

<style scoped>
</style>
