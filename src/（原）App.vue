<template>
  <div id="app">

    <openHeader></openHeader>
    <div class="clearfix"></div>

    <!-- 测试的按钮 开始 -->
      <div class="homeDIV">
      <h4><br><br><br>
        <div>
          <br>
          <router-link to="/tradeSystem"><el-button @click="clearTime" type="primary">专利交易平台首页</el-button></router-link>
        </div>
      </h4>
      <h4>
        <span class="aa">
        -----------------------------------------------------------------------------------------------------------------------------------------
      </h4>
       <h4>
        <router-link to="/hsy"><el-button @click="clearTime" type="success">T1</el-button></router-link>
        <router-link to="/openSystem/Index"><el-button @click="clearTime" type="success">新开放式主页</el-button></router-link>
        <router-link to="/hsy3"><el-button @click="clearTime" type="danger">图片上传示例</el-button></router-link>
        <router-link to="/hsy4"><el-button @click="clearTime" type="warning">作答区的编辑器</el-button></router-link>
       </h4>
    </div>
    <!-- 测试的按钮 结束 -->

    <div class="clearfix"></div>
  </div>
</template>

<script>
import openHeader from './components/comsforOpen/openHeader'
import openCardBox from './components/comsforOpen/openCardBox'
// 开放式平台首部

  import { Notification } from 'element-ui';
export default {
  components: {
    openHeader,
    openCardBox
  },
  data(){
  	return {
  		value1: false,
      value2: true,
      currentURL: this.$router.history.current.fullPath,
      time:100,
      memory: {},
      stat:'展开',

  	}
  },
  methods:{

    gotoHome(){
      let that = this
      that.memory = setInterval(function(){
          if(that.time==0){
               clearInterval(that.memory);
               that.$router.push({path:'/tradeSystem'})
               that.time = "先不了"
               return false
          }
          that.time -= 1
      },1000)
    },
    clearTime(){
      clearInterval(this.memory)
    },
    LoginOut(){
      let that = this
      that.userAccount = localStorage.getItem('account')
      Notification.success({
                title: '你好哇！',
                message: '进行了在每次测试前需完成的清空之前账号登陆状态操作！',
                  offset:65,
                  duration:7000
              })
      // Notification('再见啦！'+that.userAccount+'！');
      localStorage.removeItem('account');
      localStorage.removeItem('tokennum');
      localStorage.removeItem('create_time');
      localStorage.removeItem('headPhoto');
      localStorage.removeItem('isRealName');
      localStorage.removeItem('userID');
      localStorage.removeItem('userName');

      window.location = '#'
    },
  },
  created(){
       this.LoginOut()
  },
  watch:{
  },

}
</script>

<style scoped>
.homeDIV{
	 padding-top: 10px;
}
h4{
  width: 800px;
  margin: 30px auto;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
}
.aa{
  color: #20A0FF;
}
.bb{
  color:#FF4949;
  font-size: 18px;
  font-weight: bold;
}
.el-button{
  margin: 0 5px;
}
</style>
