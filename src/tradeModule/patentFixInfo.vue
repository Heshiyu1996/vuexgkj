<template>
    <div>
        <!-- 头部 -->
        <myHeader></myHeader>
        <div style="width:1210px;margin:0 auto;text-align:center;">
            <!-- 面包屑开始 -->
            <div style=" float: left;margin:0px 0px 5px 0px" class="guide">
                <el-breadcrumb separator="/">
                    <div style="float:left;color:rgb(71,86,105);margin-top:10px" class="route">您的位置：</div>
                    <el-breadcrumb-item v-for="single in paths_Msg">
                            <el-button type="text" style="font-size: 16px;font-family:'微软雅黑';" @click="setLocalStorage(single.id)">
                              {{single.name}}
                            </el-button >
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                            <div type="text" style="margin-top:10px;font-size: 16px;font-family:'微软雅黑';">
                              {{patentName_Msg}}
                            </div >
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 面包屑结束 -->
            <br>
            <br>
            <!-- 专利信息头部开始-->
            <div style="float:left;width:1210px;height:60px;margin-bottom:8px">
                <div type="flex" class="row-bg goodsName" justify="space-between">
                    <div :title="name_Msg" class="grid-content bg-purple  goodsName omit" style="font-weight:bold;width:860px;">
                  {{name_Msg}}
                    </div>
                    <div class="grid-content bg-purple-light goodsNum omit" >
                      <div style="float:left;width:130px" class="omit">浏览：{{readNumber_Msg}} 次</div>

                      <el-tooltip content="可以唯一确定一件商品喔" placement="top" effect="light" >
                        <div style="width:150px;" class="omit">商品编号：{{number_Msg}}</div>
                      </el-tooltip>
                    </div>
                    <el-col :span="19" :title="purpose_Msg">
                        <div class="grid-content bg-purple-light2 goodsSummary omit">
                            {{purpose_Msg}}
                        </div>
                    </el-col>
                </div>
            </div>
            <!-- 专利信息头部结束-->
            <!-- 展示图开始 -->
            <div style="width:860px;border:1px dashed rgba(186, 192, 193, 0.6);padding:8px;float:left;height:400px">
                <el-carousel v-if="sho" :interval="4000" type="card" height="350px" indicator-position="outside">
                    <el-carousel-item v-for="sin in photosList">
                        <div style="height:100%;text-align:center;">
                            <img :src="sin" style="height:100%;width:100%">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 展示图结束 -->
            <!-- 价格信息 -->
            <div style="float:right">
                <el-card class="box-card">
                    <div slot="header" class="clearfix infoTop">
                        <span>
                        <el-tag type="success"> 一口价 商品 </el-tag>
                      </span>
                    </div>
                    <div class="text item block">
                        <span style="float:left;line-height:75px">  价格：</span>
                        <div class="text item shanshuo omit" style="width:230px;font-size:46px;text-align:right">
                            ¥ {{price_Msg}}
                    </div>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right;color:#677ab7;font-weight:bold">
                    {{status_Msg}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  开始时间&nbsp;&nbsp;&nbsp;：</span>
                        <span class="text item shanshuo value" style="line-height:27px;font-size:16px;text-align:right">
                    {{startTime_Msg}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  卖家用户名：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right">
                        {{seller_Msg}}
                    </span>
                    </div>
                </el-card>
            </div>
            <!-- 购买按钮 'status','patentName','patentSummary','seller','price','buyer','imgPath'-->
            <div style="padding-left:20px;width:350px;float:left;margin-bottom:10px">
                <!-- 立即购买 -->
                  <el-button v-if="buyNow" type="success" width="350px" @click="applyOrderBox = true ;">立即购买</el-button>
                  <div >
                      <el-dialog title="申请订单" v-model="applyOrderBox"  size="300px">
                        <div style="width:650px;height:220px;padding-bottom:50px">
                            <el-row>
                              <el-col :span="8" >
                                <el-card :body-style="{ padding: '0px' }">
                                  <!-- <img src="./../assets/img/newyear1.jpg"  class="image_ApplyBox" style="width:260px"> -->
                                  <img :src="photosList[0]" class="image_ApplyBox" style="width:220px;height:155px">
                                  <div style="padding: 2px;">
                                  </div>
                                </el-card>
                              </el-col>
                             <div style="float:left;margin-left:10px">技术名字：</div>
                             <div class="nameText omit" style="float:left;width:400px;border-bottom:1px dashed gray" >
                                      {{patentName_Msg}}
                             </div>

                              <div style="float:left;margin-left:10px;width:400px;text-align:left">简介：</div>
                            <div class="purposeText omit" style="width:300px;height:20px;margin-left:30px;float:left;border-bottom:1px dashed gray;" >
                                      {{patentPurpose_Msg}}
                             </div>
                             <div class="account" style="margin-left:50px;float:right;width:430px;height:73px">
                               <div style="float:left;font-weight:bold;line-height:20px;width:200px;height:30px;;text-align:right;">实付款：</div>
                                       <div class="omit" style="float:right;width:150px;height:40px;text-align:right;line-height:20px;font-size:26px;color:#377ab7">¥ {{patentPrice_Msg}}</div>

                               <div  style="float:left;text-align:right;font-weight:bold;margin-top:10px;margin-left:0px;width:200px;height:20px;">收货人：</div>
                                       <div class="omit" style="float:right;width:150px;font-weight:normal;text-align:right;line-height:20px;float:right;color:rgb(70, 66, 66);font-weight:bold;">{{myName_Msg}}</div>
                               </div>

                              </el-row>

                              <div style="float:left;margin-top:0px">
                                <el-tag type="success"> 一口价 商品 </el-tag>
                                <span  style="font-size:14px">
                                  卖家：{{sellerName_Msg}}
                                </span>
                              </div>
                              <div slot="footer" class="dialog-footer" style="width:180px;float:right;margin-top:15px">
                                  <div style="float:left">
                                    <el-button @click="applyOrderBox = false">返 回</el-button>
                                  </div>

                                  <div style="float:left;margin-left:20px">
                                     <!-- <router-link :to="'/tradeSystem/patentOrderDetail/'+product_id"> -->
                                       <el-button   @click="buildUp">提交订单</el-button>
                                     <!-- </router-link> -->
                                  </div>
                            </div>
                              </div>
                      </el-dialog>
                  </div>
                <!-- 已售出 -->
                <div style="float:left;">
                  <el-button v-if="notExist" type="danger" :disabled="true" >已售出</el-button>
                </div>
                  <!-- 未登录 -->

                  <div style="float:left;">
                    <el-button v-if="notLogin" type="danger"  @click="loginBox = true ;">请先登录</el-button>
                    <div >
                        <el-dialog v-model="loginBox"  size="200px">
                        <div style="width:350px;height:300px;padding-right:5px">
                          <!-- <loginBox></loginBox> -->
                          <router-view>
                          </router-view>

                        </div>
                        </el-dialog>
                    </div>
                </div>
            </div>

                <!-- 专利描述开始 -->
                <div style="width:1210px;margin:0 auto;">
                <div style="float:left;margin-top:10px">
                    <div style="text-align:left">
                        <el-collapse v-model="activeNames" style="width:861px">
                          <el-collapse-item title="商品描述" name="1">
                              <div style="height:auto!important;min-height:128px;">&nbsp;&nbsp;&nbsp;&nbsp;{{descrip_Msg}}</div>
                          </el-collapse-item>
                          <el-collapse-item title="设计说明" name="2">
                              <div style="height:auto!important;min-height:128px;">&nbsp;&nbsp;&nbsp;&nbsp;{{design_Msg}}</div>
                          </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
                <!-- 专利描述结束 -->
                <!-- 热门开始 -->
                <hot></hot>
                <!-- 热门结束 -->
              </div>

      </div>
    </div>
</template>
<script>
import myHeader from './../components/myheader'
import pic from './../components/smallPic'
import goods_info from './../components/goods_info'
import buy from './../components/goods_buy'
import myFooter from './../components/myfooter'


import axios from 'axios'
import config from './../publicAPI/config'
import { Message } from 'element-ui';//信息提示框
    import { Notification } from 'element-ui';

    import loginBox from './../components/loginBox'
    import hot from './../components/goods_hot'

export default {
    components: {
        myHeader,
        // myRoute,
        top,
        pic,
        goods_info,
        // priceInfo,
        buy,
        myFooter,
              loginBox,
              hot,
    },
    data() {
        return {
            item: '',
            rootURL: config.URL,
            xx: [
                require('./../assets/img/withoutPic.png'),
            ],
            photosList: [],
            C: '',
            name_Msg: '',
            purpose_Msg: '',
            number_Msg: '',
            readNumber_Msg:0,

            paths_Msg: [],

            price_Msg: '正在拉取...',
            status_Msg: '正在拉取...',
            startTime_Msg: '正在拉取...',
            seller_Msg: '正在拉取...',

            activeNames: ['1', '2'],

            descrip_Msg: '正在拉取...',
            design_Msg: '正在拉取...',

            sho: false,
            hotList:[],

                    buyNow:false,
                    notExist:false,

                    notLogin:false,
                            applyOrderBox: false,
                            loginBox: false,
                            patentName_Msg:'',
                            patentPurpose_Msg: '',
                            patentPrice_Msg: '',
                            myName_Msg: '',

                            sellerName_Msg: '',
        }
    },
    methods: {
      // pleaseLogin(){
      //   localStorage.setItem('comeBack',this.$route.path)
      //     window.location = '#/tradeSystem/login'
      // },
      setLocalStorage(id){
          let that = this
          localStorage.setItem('catID',id)
          that.$router.push({path:'/tradeSystem/search/byCategory'})
      },
      buildUp() {
          let that = this
          this.loading3 = true
          var querystring = require('querystring');//Json数据查询器
          var tokennum = localStorage.getItem("tokennum");
          axios.post(config.URL+'/order/addOrder',
             querystring.stringify({
              product_id:that.product_id,
              type:1,
              tokennum:tokennum
             })
            )
            .then(function(res){
              if(res.data.status == "fail")
              Message.error(res.data.msg);
              if(res.data.obj!=null){
              that.list_ID_Msg = res.data.obj.order_id;
              Notification.success({
                        title: '订单生成好了！',
                        message:'订单号：'+that.list_ID_Msg,
                          offset: 65,
                          duration:10000
                      })
               that.$router.push({path:'/tradeSystem/patentOrderDetail/'+that.list_ID_Msg})
             }

            })
            .catch(function(error){
              Message.error('尚未登录！');
            });
        },
        chan() {
            let that = this
            that.sho = true
        },

        clickHandle(i){
          window.location = '#/Patent/fixPriceInfo/' + i
        },

        getFixPriceInfo() {
            let that = this
            that.paths_Msg = []
            axios.get(that.rootURL + '/orderfixedprice/getOrderFixPriceById?id=' + that.C)
                .then(function(res) {
                  if(res.data.obj!=null){
                  var ite = res.data.obj
                  //购买按按钮
                  if(localStorage.getItem('tokennum')!=null){
                    if(ite.status=='1'){
                       that.buyNow=true;
                     }
                     if(ite.status=='2'){
                       that.notExist=true;
                     }
                  }else{
                    if(ite.status=='2'){
                      that.notExist=true;
                    }else{
                      that.notLogin=true;
                    }
                  }
                    // 阅读量自增 开始
                    axios.get(that.rootURL + '/orderfixedprice/add_readnum?fpId=' + that.C)
                        .then(function(res) {
                          console.log(res.data.msg)

                        })
                        .catch(function(error) {
                            console.error(error)
                        })
                    // 阅读量自增 结束
                   that.product_id = ite.id

                   that.patentName_Msg = ite.patent.name
                   that.patentPurpose_Msg = ite.patent.purpose
                   that.patentPrice_Msg = ite.price
                   that.sellerName_Msg = ite.seller.name
                   that.myName_Msg = localStorage.getItem('userName')


                    that.goodsDescription_Msg = ''
                    that.goodsDescription_Msg = (ite.description)
                    that.name_Msg = (ite.patent.name)
                    that.purpose_Msg = (ite.patent.purpose)
                    that.number_Msg = (ite.patent.patent_num)
                    that.readNumber_Msg = (ite.read_number)
                    if (ite.patent.catalog1en != null) {
                        that.paths_Msg.push({id:ite.patent.catalog1en.id,name:ite.patent.catalog1en.name})
                        if (ite.patent.catalog2en != null) {
                            that.paths_Msg.push({id:ite.patent.catalog2en.id,name:ite.patent.catalog2en.name})
                            if (ite.patent.catalog3en != null) {
                                that.paths_Msg.push({id:ite.patent.catalog3en.id,name:ite.patent.catalog3en.name})
                                if (ite.patent.catalog4en != null) {
                                    that.paths_Msg.push({id:ite.patent.catalog4en.id,name:ite.patent.catalog4en.name})
                                }
                            }
                        }
                    }
                    // that.paths_Msg.push({id:ite.id,name:ite.patent.name})
                    that.photosList = []
                    for (var i of ite.patent.patentImages) {
                        if (i.url != null) {
                            that.photosList.push(('http://og07ks0jb.bkt.clouddn.com/' + i.url))
                        }
                    }
                    if (that.photosList.length == 0) {
                        that.photosList = that.xx;
                    }
                    that.chan()
                    that.price_Msg = ite.price
                    if (ite.status == 1)
                        that.status_Msg = '进行中'
                    else
                        that.status_Msg = '已结束'
                    that.startTime_Msg = ite.patent.create_time
                    that.seller_Msg = ite.seller.name
                    that.descrip_Msg = ite.patent.description
                    that.design_Msg = ite.patent.design
                  }else{
                    alert(res.data.msg)
                    let that = this
                    window.location = '#/tradeSystem'
                  }

                })
                .catch(function(error) {
                    console.error(error)
                })
        },



        hsytt() {
            let that = this
            var id = this.$route.params.id;
            that.C = id
              this.getFixPriceInfo();
              // this.getHotFixPriceList()
        },
        render(){
            let that = this
            // console.log(that.$route.matched[0].name)
            if(that.$route.matched[0].name == 'fixPriceInfoDetail'){
            that.buyNow = false
            that.notExist = false
            that.notLogin = false
            that.sho = false
            this.hsytt()
          }
        },


    },
    created() {
        this.hsytt()
    },
    watch:{
      '$route':'render'
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigFrame {
    border-style: dashed;
    margin: 0 auto;
    width: 1140px;
    margin-top: 10px;
    border-color: rgb(160, 160, 160);
}

.biankuang tr td {
    text-align: right;
    padding-right: 18px
}

.buttons tr td button {
    width: 318px;
    height: 46px;
    border: 1px solid #377ab7;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #377ab7;
    padding: 3px 10px;
}

.buttons tr td button:hover {
    background: #276387;
    border: 1px solid #377ab7;
}

.buttons button {
    width: 318px;
    height: 46px;
    border: 1px solid #2E426C;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #2E426C;
    padding: 3px 10px;
}

.buttons button:hover {
    background: #215a78;
    border: 1px solid #377ab7;
}


/*goods_top的*/

.goodsName,
.goodsSummary,
.goodsNum {
    font-size: 24px;
    float: left;
    text-align: left;
    padding-left: 5px;
    font-family: "微软雅黑";
    color: rgb(70, 80, 93);
}

.goodsSummary {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 15px;
    color: rgb(163, 163, 163);
}

.goodsNum {
    float: right !important;
    margin-left: 20px !important;
    width: 330px !important;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    color: rgb(163, 163, 163);
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    background: rgba(#87a6f7, 0.59);
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 5px 0;
    height: 65px;
    background-color: #f9fafc;
    border-radius: 6px;
}

.omit {
    width: 840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*不换行*/
}


/*面包屑的*/

.guide {
    font-family: '宋体';
    width: 1110px;
    margin: 0 auto;
    margin-top: 5px;
}

.route {
    font-family: '微软雅黑';
    font-size: 16px
}


/*priceInfo的*/

.attr {
    float: left;
    line-height: 30px;
}

.block {
    text-align: right;
    border-bottom: 1px dashed gray
}

.infoTop {
    float: right;
    margin-top: -12px;
    margin-right: -10px
}

.text {
    font-size: 16px;
}

.item {
    padding: 10px 0;
    color: #63738b
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 330px;
    height: 325px
}

.shanshuo:hover {
    text-shadow: 0 0 10px #42a0dd;
    opacity: 1;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.askerImg {
    float: left;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -2px;
}

/*购买按钮*/

.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  width: 230px;
}
.el-button--warning{
  margin-top:50px
}
.el-button--warning ,.el-button--success,.el-button--danger,.el-button--primary,.el-button--warning{
  font-size: 24px;
  letter-spacing: 30px;
  padding-left:50px;
  padding-right:20px;
  width: 330px !important;
  height: 55px;
  margin-top:15px !important;
}
  .button {
    padding: 0;
    float: right;
  }

.nameText{
    margin-left: 30px !important;
    height:40px;
    /*background-color: rgba(145, 148, 156, 0.33);*/
    color:rgb(94, 109, 130);
    font-family: '微软雅黑';
    font-size: 24px;
    text-align: left;

  }
.purposeText{
    margin-top:5px;
    width:400px;
    height:40px;
    margin-left: 10px;
    /*background-color: rgba(145, 148, 156, 0.2);*/
    color:rgba(94, 109, 130, 0.72);
    font-family: '微软雅黑';
    font-size: 14px;
    text-align: left;

    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
  }

 .buyerName{
    text-align: left;
    padding:5px;
    float:right;
    margin-top:5px;
    margin-left: 9px !important;
    width:200px;
    height:60px;
    margin-right: 42px;

    border:1px solid #377ab7;
    color:rgb(46, 46, 52);
    font-family: '微软雅黑';
    font-size: 14px;
  }

   .account{
      text-align: left;
      padding:5px;
      float:right;
      margin-top:5px;
      width: 375px !important;
      height:80px;
      margin-right: 8px;
      border:1px solid #377ab7;
      color:rgb(46, 46, 52);
      font-family: '微软雅黑';
      font-size: 14px;
    }
    .image_ApplyBox {
      width: 100%;
      display: block;
    }
</style>
