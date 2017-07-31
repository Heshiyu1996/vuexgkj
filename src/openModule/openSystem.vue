<template>
  <div id="whole" :style="{backgroundImage: 'url(' +bg + ')'}" style="margin:0 auto;background-repeat: no-repeat" >
    <!-- 背景图 + 导航 开始 -->
    <div class="bodyBG">
      <myHeader></myHeader>
    </div>
    <!-- 背景图 + 导航 结束 -->

    <!-- 渲染出口 开始 -->
    <div style="height:960px">
        <transition :name="transitionName" mode="out-in">
          <router-view class="child-view"></router-view>
        </transition>
    </div>

    <!-- 渲染出口 结束 -->
        <!-- <div class="clearfix"></div>
        <myFooter></myFooter> -->
  </div>
</template>

<script>
import myHeader from './../components/comsforOpen/openHeader2'
import myFooter from './../components/comsforOpen/openFooter'
import config from './../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import hotCom_Fix from './../components/comsforOpen/openHot_Fix'
import hotCom_Auc from './../components/comsforOpen/openHot_Auc'
export default {
  components:{
    myHeader,
    myFooter,
    hotCom_Fix,
    hotCom_Auc
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url
      bg:require('./../assets/img/openIndexBG2.jpg'),

		  loading3: true,
      transitionName: 'slide-open',

    }
  },
  methods:{
},
  	created(){

  	},
    watch:{
      // '$route' (to, from) {
      //   const toDepth = to.path.split('/').length
      //   const fromDepth = from.path.split('/').length
      //   // console.log('此时，to.path为：' + to.path)
      //   // console.log('此时，from.path为：' + from.path)
      //   let that = this
      //     if((to.path == '/openSystem/index')){
      //       // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      //        this.transitionName = 'slide-right'
      //     }else
      //     this.transitionName = 'slide-left'
      // }
    }
}
</script>

<style scoped>
#whole{
  width:100%;
}
.bodyBG{
  /*background-image: url('./openIndexBG2.jpg');*/
  height:110px;
  width:500px;
}
.block{
  float: right;
  margin-bottom: 15px;
}
.omit{
  width:840px;
  overflow: hidden;
  vertical-align: top;
  text-overflow:ellipsis;
  white-space: nowrap;/*不换行*/
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
}

.el-carousel__item:nth-child(2n+1) {
}
</style>
