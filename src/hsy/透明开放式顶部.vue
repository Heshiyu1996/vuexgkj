<template>
    <div id="topBlock"><!--大框架开始-->
      <el-menu class="content" @select="handleSelect">
        <div id="topLeft" style="float:left;width:350px;" >
          <router-link to="app">
              <img src="./../assets/img/logo0.png" id="logo">
              <span id="hd-title">小功科技开放式创新平台</span> 
          </router-link>
        </div>




        <div style="margin-top:10px;width:550px;float:right;font-size:20px;" class="touming">
                <router-link to="/">
                  <div  class="shanshuo" style="margin:15px 0px 0px 15px;float:left;color:rgb(227, 228, 231);width:50px;">首页</div>
                </router-link>

                  <router-link to="/tradeSystem/questionList">
                  <div class="shanshuo" style="margin:15px 0px 0px 15px;float:left;color:rgb(227, 228, 231);width:80px;">技术求解</div>
                  </router-link>

                  <router-link to="/tradeSystem">
                    <div class="shanshuo" style="margin:15px 0px 0px 15px;float:left;color:rgb(227, 228, 231);width:80px;">交易平台</div>
                  </router-link>

                  <router-link to="/experts">
                    <div class="shanshuo" style="margin:15px 0px 0px 10px;float:left;color:rgb(227, 228, 231);width:80px;">专家区</div>
                  </router-link>

                  <router-link to="/news">
                    <div class="shanshuo" style="margin:15px 0px 0px 0px;float:left;color:rgb(227, 228, 231);width:80px;">便利资讯</div>
                  </router-link>

                  <router-link onclick="alert('建设中')" to="">
                    <div class="shanshuo" style="margin:15px 0px 0px 20px;float:left;color:rgb(227, 228, 231);width:80px;">小功众筹</div>
                  </router-link>
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
}
#topLeft{
  margin-top: 15px;
  margin-right:10px
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
  width: 980px;
  margin: 0 auto;
}

.el-menu-item{

  height: 84px !important;
}


.touming{
  text-shadow: 0px 0px 6px rgb(249,206,200);
	opacity:1;
}
.shanshuo:hover {
  color:rgb(247, 228, 251);
  text-shadow: 0 0 10px rgb(0, 10, 249);
	opacity: 1;
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	-ms-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
}

#hd-title{
  margin-left: 5px;
  color: #f9cba9;
  font-size:24px;
  vertical-align:middle;
}
.content{
  background:rgba(0,0,0,0.2) none repeat scroll !important; /*实现FF背景透明，文字不透明*/
  filter:Alpha(opacity=20);/*实现IE背景透明*/
  height:0px;
}
</style>
