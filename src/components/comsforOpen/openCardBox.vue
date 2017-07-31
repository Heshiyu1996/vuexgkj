<template>
    <div id="topBlock"><!--大框架开始-->
      <el-menu theme="dark" :default-active="value" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <div style="width:100%;margin:0 auto;text-align:center;margin-top:5px">

               <div style="width:1210px;">
                 <el-carousel :interval="4000" type="card" height="260px">
                   <el-carousel-item v-for="item in imgSource">
      <img :src="item" style="height:100%;width:100%">
                   </el-carousel-item>
                 </el-carousel>
               </div>

           </div>


      </el-menu>
      <div class="clearfix"></div>
    </div><!--大框架结束-->


</template>

<script>
export default {
  props: ['active'],
  data () {
    return {
      value: this.active,
            imgSource:[	//轮播图
               require('./../../assets/img/xiaogongBG.png'),
               require('./../../assets/img/car8.jpg'),
               require('./../../assets/img/newyear3.jpg'),
            ],
    }
  },

  methods: {
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  }
}

}


</script>

<style scoped>

#topBlock{
	width: 100%;
  background-color:rgb(255, 255, 255);
}


.el-menu{
  width: 1210px;
  margin: 0 auto;
  background-color: white
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
