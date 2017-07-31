<template>
    <div id="topBlock"><!--大框架开始-->
      <el-menu theme="light" default-active="1" mode="horizontal" @select="handleSelect">
            <div id="topLeft" style="float:left;margin-right:150px" >
              <router-link to="/tradeSystem">
                  <img src="./../assets/img/logo.png" id="logo">
                  <span id="hd-title">小功科技创新交易平台</span>
              </router-link>
            </div>
            <el-menu-item index="1" >
            <router-link to="/tradeSystem">首页
            </router-link></el-menu-item>
            <el-menu-item index="2">
              <span >
                <router-link onclick="alert('建设中')" to="">
                  虚拟创新平台
                </router-link>
              </span>
            </el-menu-item>

            <el-menu-item index="3"><router-link to="/"><span >
                        开放式平台
            </span></router-link></el-menu-item>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-search"></i>搜索技术</template>
                <router-link to="/tradeSystem/search/byCategory">
                <el-menu-item index="2-1" >按目录</el-menu-item>
                </router-link>
                <router-link to="/tradeSystem/search/byType">
                <el-menu-item index="2-2">按类别</el-menu-item>
                </router-link>
            </el-submenu>
            <div id="topRight" v-if="nologin">
                <router-link to="/tradeSystem/register">
                  <el-button>注册</el-button>
                </router-link>
                <router-link to="/tradeSystem/login">
                <el-button type="primary">登录</el-button>
                </router-link>
            </div>
            <div id="topRight2" v-if="allogin" style="padding-left:15px;width:230px">
              <router-link onclick="" to="/userIndex">
                    <div style="float:left;margin-right:15px;color:#377ab7;font-weight:bolder;font-size:18px;">
                      <img :src="headPhoto" style="width:30px; height:30px;">
                        <div style="float:right;padding-top:8px;margin-left:5px;width:85px" class="omit">{{userName}}</div>
                    </div>
              </router-link>
              <div style="float:right">
                <el-button type="danger" @click="LoginOut">退出</el-button>
              </div>
            </div>

      </el-menu>
      <div class="clearfix"></div>
    </div><!--大框架结束-->


</template>

<script>
import { Notification } from 'element-ui';
export default {
  data () {
    return {
      nologin:false,
      allogin:false,
      userName:'',
      headPhoto:''
    }
  },

  methods: {
  handleSelect(key, keyPath) {
    // console.log(key, keyPath);
  },
  checkLogin(){
    let that = this
    if(localStorage.getItem('account')!=null){
    this.userName=localStorage.getItem('userName')
    this.nologin=false,
    this.allogin=true,
    that.headPhoto=localStorage.getItem('headPhoto')
  }else{
    this.nologin=true,
    this.allogin=false
  }
},
  LoginOut(){
    let that = this
    that.userName = localStorage.getItem('userName')
    Notification.warning({
              title: '账号退出登陆！',
              message: '再见啦！'+that.userName+'！',
                offset:65,
                duration:3000
            })
    // Notification('再见啦！'+that.userName+'！');
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
    this.checkLogin();
  }

}


</script>

<style scoped>

#topBlock{
	width: 100%;
  background-color:rgb(239,242,247);
}
#topLeft{
  margin-top: 15px;
}
#logo{
  width: 60px;
  vertical-align:middle;

}
#hd-title{
  margin-left: 10px;
  color: #5e6d82;
  font-size:24px;
  vertical-align:middle;
}
#topRight{
  margin-top: 22px;
  margin-bottom : 15px;
	float: right;
}
#topRight2{
  margin-top: 22px;
  margin-bottom : 15px;
	float: right;
}
.el-menu{
  width: 1210px;
  margin: 0 auto;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #5e6d82;
    font-weight: bold;
}
.el-menu--horizontal .el-menu-item{
    padding-top: 10px;
    float: left;
    height: 84px;
    line-height: 58px;
    margin: 0;
    cursor: pointer;
    font-size: 16px ;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
}

.omit{
	width:500px;
	overflow: hidden;
	vertical-align: top;
	text-overflow:ellipsis;
	white-space: nowrap;/*不换行*/
}
</style>
