<template>
  <div>
    <!--<Navigation :btnset="btnArray"></Navigation>-->
    <smallBox :btnset="btnArray"></smallBox>
  </div>
</template>

<script>
  //import Navigation from "../personalCenter/myConcern.vue"
  import smallBox from "../personalCenter/newLead.vue"
  export default {
    components:{
//		Navigation,
      smallBox
    },
    data () {
      return {
        btnArray: [ '查看','添加', '删除', '修改',]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.item{*/
  /*width: 1500px;*/
  /*display: inline-block;*/
  /*}*/
  /*.smallBox{*/
  /*display: inline-block;*/
  /*}*/
</style>
