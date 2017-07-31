<template>
  <div id="whole" :style="{backgroundImage: 'url(' +bg + ')'}" style="margin:0 auto;background-repeat: no-repeat" >
    <!-- 背景图 + 导航 开始 -->
    <div class="bodyBG">
      <myHeader></myHeader>
    </div>
    <!-- 背景图 + 导航 结束 -->

    <!-- 渲染出口 开始 -->

    <!-- 渲染出口 结束 -->
        <!-- <div class="clearfix"></div>
        <myFooter></myFooter> -->
  </div>
</template>

<script>
import myHeader from './components/comsforOpen/openHeader2'
import myFooter from './components/comsforOpen/openFooter'
import config from './publicAPI/config'
import axios from 'axios'
export default {
  components:{
    myHeader,
    myFooter,
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url
      bg:require('./assets/img/openIndexBG2.jpg'),


    }
  },
  created(){
    this.$router.push({path:'/openSystem/index'})
  }
}
</script>

<style scoped>
.test1{
  display: flex
}
#child1{
  flex:1 100px
}
#child2{
  flex:2 500px
}
#child3{
  flex:1 300px
}

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

.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  width: 430px;
}

.el-button--warning{
  margin-top:50px
}
.el-button--warning ,.el-button--success,.el-button--danger,.el-button--primary,.el-button--warning{
  font-size: 24px;
  letter-spacing: 30px;
  padding-left:50px;
  padding-right:20px;
  width: 530px !important;
  height: 55px;
  margin-top:15px !important;
}
</style>
