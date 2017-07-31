<template>
  <div id="whole">
    <div style="margin:0 auto;width:960px;margin-top:5px;margin-bottom:-20px">
      <p style="font-size:14px" >您的当前位置：
        <router-link to="/">
          首页
        </router-link>
        >
        <router-link to="/openSystem/news">
          便利资讯
        </router-link>
        > {{title_Msg}}
      </p>
    </div>

    <div class="news">
      <div class="title" style="margin-top:-10px;background-color:rgb(248, 248, 248);height:100px;text-align:center;padding:20px">
        <h3>{{title_Msg}}</h3>
        <p style="font-size:14px" >发布日期：{{createTime_Msg}}
          <span style="margin-left:20px">阅读量：{{readNumber_Msg}}</span>
          <span style="margin-left:20px">点赞数：{{praiseNumber_Msg}}</span>
        </p>
      </div>

      <div>
        <!-- 新闻内容 开始 -->
        <div style="margin:0 auto;width:900px" v-html="Content_Msg">

        </div>
        <!-- 新闻内容 结束 -->
        <div style="margin-top:10px">
          <div class="block" style="margin-right:40px">
            <el-button type="success" @click="dianzan()">点赞</el-button>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './../components/comsforOpen/openHeader'
import myFooter from './../components/comsforOpen/openFooter'

import config from './../publicAPI/config'
import axios from 'axios'

import { Notification } from 'element-ui';

export default {
  components:{
    myHeader,
    myFooter,
  },
  data () {
    return {
      imgSource:[ //轮播图
        require('./../assets/img/car7.jpg'),
        require('./../assets/img/car9.jpg'),
        require('./../assets/img/car8.jpg'),
      ],

      rootURL: config.URL,	//请求的url
      loading3: true, //一口价加载中
      title_Msg:'',
      createTime_Msg:'',
      readNumber_Msg:'',
      praiseNumber_Msg:'',
      Content_Msg:''
    }
  },
  methods:{
    getNewsContent(){
      let that = this
      axios.get(that.rootURL+'/con_infor/getCon_inforById?Con_inforId='+that.C)
      .then(function(res){
        var ite = res.data.obj
        that.title_Msg=(ite.title)
        that.createTime_Msg=(ite.create_time)
        that.readNumber_Msg=(ite.read_number)
        that.praiseNumber_Msg=(ite.praise_num)
        that.Content_Msg=(ite.content)
      })
      .catch(function(error){
        console.error(error)
      })
    },
    dianzan(){
      let that = this
      var querystring = require('querystring');//Json数据查询器
      var tokennum = localStorage.getItem("tokennum");
      axios.post(config.URL+'/con_infor/praise',
      querystring.stringify({
        Con_inforId:that.C,
        tokennum:tokennum
      })
    )
    .then(function(res){
      if(res.data.msg=="success"){





        // that.praiseNumber_Msg=parseInt(that.praiseNumber_Msg) + 1;
        // Notification.success({
        //           title: '点赞成功',
        //             offset: 25,
        //             duration:2000
        //         })
      }else{
        if(res.data.msg=='尚未登录!!!'){
          Notification.error({
            title: '请检查您的登陆状态！',
            offset: 25,
            duration:2000
          })
        }
        if(res.data.msg=="该用户已经点赞！"){
          Notification.error({
            title: '你已点过赞了！',
            offset: 25,
            duration:2000
          })
        }
      }

    })
    .catch(function(error){
      console.error('不成功！');

      Message.error('不正确！');

    });

  },
  hsytt(){
    let that = this

    var id = that.$route.params.newID;

    //  alert(id)
    that.C=id
    this.getNewsContent();
  },
  render(){
    let that = this
    console.log(that.$route.matched[0].name)
    if(that.$route.matched[0].name == 'newsDetail'){
      that.hsytt()
    }else{
      console.log('是每页不执行')
    }
    // 否则不作任何操作
  },
},
watch:{
  '$route':'render'
},
created(){
  this.hsytt();
}
}
</script>

<style scoped>
#whole{
  background: #F7F7F7;
}
.news{
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background: #FFFFFF;
  -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
  -moz-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for firefox */
  -webkit-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for safari or chrome */
  box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for opera or ie9 */
}
.title{
  border-bottom: 1px solid #D0D0D0;
  padding-right:10px;
  line-height: 30px;
  text-align: right;
}
.title h3{
  color: #324057;
}
.title p{
  color: gray;
}
.block{
  float: right;
  margin-bottom: 15px;
}
</style>
