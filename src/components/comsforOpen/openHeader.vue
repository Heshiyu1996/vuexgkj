<template>
    <div id="topBlock"><!--大框架开始-->
      <el-menu theme="dark" :default-active="value" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div id="topLeft" style="float:left" >
              <router-link to="app">
                  <img src="./../../assets/img/logo.png" id="logo">
                  <span id="hd-title">小功科技开放式创新平台</span>
              </router-link>
            </div>
            <el-menu-item index="1">
            <router-link to="/">首页
            </router-link>
            </el-menu-item>
            <el-menu-item index="6">
            <router-link to="/tradeSystem/questionList">技术求解
            </router-link>
            </el-menu-item>


            <el-menu-item index="2" >
              <router-link to="/news">便利资讯
              </router-link>
            </el-menu-item>


            <el-menu-item index="3">
              <router-link to="/tradeSystem">交易平台
              </router-link>
            </el-menu-item>


            <el-menu-item index="4">
              <router-link to="/experts">专家区
              </router-link>
            </el-menu-item>


            <el-menu-item index="5">
              <router-link onclick="alert('建设中')" to="">小功众筹
              </router-link></el-menu-item>

            <!-- <el-submenu index="4">
                <template slot="title">技术需求</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu> -->

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
  background-color:rgb(50,64,87);
}
#topLeft{
  margin-top: 15px;
  margin-right:280px
}
#logo{
  width: 60px;
  vertical-align:middle;

}
#hd-title{
  margin-left: 10px;
  color: #fff;
  font-size:24px;
  vertical-align:middle;
}
#topRight{
  margin-top: 22px;
  margin-bottom : 15px;
	float: right;
}
.el-menu{
  width: 1210px;
  margin: 0 auto;
}
.el-menu--horizontal.el-menu--dark .el-menu-item.is-active, .el-menu-item.is-active {
    color: #5e6d82;
    font-weight: bold;
}
.el-menu-item{

  height: 84px !important;
}
.el-menu--horizontal .el-menu-item a{
    color:white;
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

</style>
