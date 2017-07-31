<template>
  <div style="width:100%">
   	<myHeader></myHeader>
    <div class="clearfix"></div>
    <div style="background-color:#377ab7">
    <div style="background-color:#377ab7;width:1210px;margin:0 auto;height:550px;padding-right:40px;padding-bottom:50px">

      <!-- 轮播图 开始-->
      <div style="width:800px;height:500px;float:left;padding:30px;margin-left:-10px;">
        <div class="clearfix" style="padding-top:110px;"></div>
        <el-carousel style="border:2px solid white;
        "i ndicator-position="outside" width="400px" height="260px">
  		    <el-carousel-item v-for="item in imgSource">
  		      <img :src="item" width="100%"  />
  		    </el-carousel-item>
  		</el-carousel>
      </div>
      <!-- 轮播图 结束 -->

      <!-- 登录框 开始 -->
      <div style="width:340px;height:500px;float:right;margin-right:0px;margin-top:115px">
      <loginBox></loginBox>
      </div>
      <!-- 登录框 结束 -->

    </div>
  </div>

      <div class="clearfix"></div>
<div style="margin-top:-55px">
      <myFooter></myFooter>
</div>
  </div>
</template>

<script>
import myHeader from './../components/myheader'
import loginBox from './../components/loginBox'
import myFooter from './../components/myfooter'

export default {
  components:{
    myHeader,
    loginBox,
    myFooter
  },
  data () {
    return {
      imgSource:[	//轮播图
		  	 require('./../assets/img/car7.jpg'),
		  	 require('./../assets/img/car9.jpg'),
		  	 require('./../assets/img/car8.jpg'),
		  ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel{
}
.el-carousel-item{
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}
.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
