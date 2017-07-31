<template>
  <el-carousel :interval="4000" type="card" height="350px" >
    <el-carousel-item v-for="item in pics_Msg">
      <div style="height:100%;text-align:center;">
      <img :src="item" style="height:100%;width:100%">
    </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default{
    props:['pics'],
    data() {
      return {
         pics_Msg:this.pics,
        // pics_Msg:[
        //     require('./../assets/img/newyear1.jpg'),
        //     require('./../assets/img/newyear2.jpg'),
        //     require('./../assets/img/newyear3.jpg'),
        //     require('./../assets/img/newyear4.jpg')
        // ]
      }
    },
    methods:{
      chan(){
          alert(1)
      },
    },
    created(){
      this.chan()
    }
  }
</script>
