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
            <!-- 专利信息头部 开始-->
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
            <!-- 专利信息头部 结束-->
            <!-- 展示图开始 -->
            <div style="width:860px;border:1px dashed rgba(186, 192, 193, 0.6);padding:8px;float:left;height:400px" >
                <el-carousel v-if="sho" :interval="4000" type="card" height="350px" indicator-position="outside">
                    <el-carousel-item v-for="sin in photosList">
                        <div style="height:100%;text-align:center;">
                            <img :src="sin" style="height:100%;width:100%">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 展示图结束 -->
            <!-- 价格信息开始 -->
            <div style="float:right">
                <!-- <priceAucInfo type="2" :bridge="C"></priceAucInfo>   -->
                <div>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix infoTop">
                            <span>
                          <el-tag type="danger"> 拍卖品</el-tag>
                            </span>
                        </div>
                        <div class="text item block" style="margin-top:-25px;">
                            <span style="float:left;line-height:65px">  当前价：</span>
                            <span class="text item shanshuo" style="line-height:55px;font-size:36px;text-align:right">
                              ¥ {{price_Msg}}
                      </span>
                        </div>
                        <div class="clearfix">
                        </div>
                        <div class="text item block">
                            <span class="attr" style="text-align:left">  状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
                            <span class="text item shanshuo" style="font-size:20px;text-align:right">
                      {{status_Msg}}
                        </span>
                        </div>
                        <div class="text item block">
                            <span class="attr">  卖家用户名：</span>
                            <span class="text item shanshuo" style="font-size:20px;text-align:right">
                          {{seller_Msg}}
                      </span>
                        </div>
                        <div class="text item block" style="text-align:right">
                            <span class="attr">  最低涨幅：</span>
                            <span class="text item shanshuo" style="font-size:20px;text-align:right">
                          {{minIncrement_Msg}}
                      </span>
                        </div>
                    </el-card>
                </div>
            </div>
            <!-- 价格信息结束 -->
            <!-- 购买按钮 -->
            <div style="width:350px;float:left;margin-bottom:10px;">
                <div style="width:350px;float:left;margin-bottom:3px">
                  <!-- 加价器开始 -->
                  <div  style="text-align:center">
                            <div>
                              <el-input-number v-model="startPrice" @change="handleChange" :step="stepPrice" :min="minPrice" width="340px"></el-input-number>
                            </div>
                  </div>
                  <!-- 加价器结束 -->
                    <!-- 立即出价 -->

                    <div style="margin-left:20px;float:left;">
                    <el-button v-if="auctionNow" type="primary"  @click="chujia">立即出价</el-button>
                    </div>
                    <div >
                        <el-dialog title="竞拍报名" v-model="applyAuctionBox" size="300px" >
                        <div style="width:830px;height:220px;padding-right:0px;padding-bottom:50px">
                              <el-row>
                                <el-col :span="7" >
                                  <el-card :body-style="{ padding: '0px' }">
                                    <img :src="photosList[0]" class="image_ApplyBox">

                                    <div style="padding: 2px;">
                                    </div>
                                  </el-card>
                                </el-col>
                                <div style="float:left;margin-left:10px">技术名字：</div>
                                <div class="nameText omit" style="float:left;width:513px;border-bottom:1px dashed gray" >
                                         {{patentName_Msg}}
                                </div>

                                 <div style="float:left;margin-left:10px">简介：</div>
                               <div class="purposeText omit" style="width:505px;height:20px;margin-left:40px;float:left;border-bottom:1px dashed gray;" >
                                         {{patentPurpose_Msg}}
                                </div>
                               <div class="account" style="margin-left:50px;float:right;height:73px">
                                        <div style="float:left;font-weight:bold;line-height:20px;width:200px;">参加本次竞拍，需交纳保证金：</div>
                                                <div class="omit" style="float:right;width:150px;height:40px;text-align:right;line-height:20px;font-size:26px;color:#377ab7">
                                                  ¥ {{patentDeposit_Msg}}
                                                </div>

                                                <div class="omit" style="float:right;width:250px;font-weight:normal;text-align:right;line-height:20px;float:right;color:rgb(70, 66, 66);font-weight:bold;">查询账户余额</div>
                                        </div>


                                </el-row>
                                <div style="float:left;margin-top:5px">
                                  <el-tag type="danger"> 拍卖 商品 </el-tag>
                                  <span  style="font-size:14px">
                                    卖家：{{seller_Msg}}
                                  </span>
                                </div>
                                <div slot="footer" class="dialog-footer" style="width:235px;float:right;margin-top:15px">
                                    <div style="float:left">
                                      <el-button @click="applyAuctionBox = false">返 回</el-button>
                                    </div>

                                    <div style="float:left;margin-left:20px">
                                         <el-button    @click="goToPayDeposit">报名并交纳保证金</el-button>

                                    </div>
                              </div>
                        </el-dialog>
                      </div>
                    </div>


                    <div>
                        <el-dialog title="参与竞拍详情" v-model="allowAuctionBox" size="300px">
                        <div style="width:830px;height:220px;padding-right:0px;padding-bottom:50px">
                              <el-row>
                                <el-col :span="7" >
                                  <el-card :body-style="{ padding: '0px' }">
                                    <img :src="photosList[0]" class="image_ApplyBox">
                                    <div style="padding: 2px;">
                                    </div>
                                  </el-card>
                                </el-col>

                               <div class="account2" style="margin-left:20px;float:left;">
                                    <div style="line-height:20px;margin-top:10px">当前价：
                                                <span style="float:right;line-height:20px;font-size:26px;color:#377ab7">¥ {{currentPrice_Msg}}</span>
                                        </div>

                                        <div style="line-height:25px;padding-bottom:35px;border-bottom:1px dashed gray;margin-top:10px">您的出价幅度：
                                                <span style="float:right;line-height:25px;font-size:26px;color:#377ab7;">¥ {{myAddPrice_Msg}}</span>
                                        </div>
                                        <div style="line-height:40px;">总出价：
                                                <span style="float:right;line-height:35px;font-size:26px;color:#377ab7">¥ {{totalPrice_Msg}}</span>
                                        </div>

                                        <div style="line-height:10px;float:left;width:480px;margin-top:5px">
                                          <div style="float:left;line-height:20px;width:360px">结束时间：
                                                  <span style="line-height:20px;font-size:12px;color:#377ab7">¥ {{endTime_Msg}}</span>
                                          </div>
                                          <router-link to="/home">
                                                <div style="float:right;text-align:right;height:20px;width:120px;line-height:20px;color:blue;font-weight:normal;font-size:12px;color:#377ab7">
                                                  查阅《拍卖违约规则》
                                                </div>
                                          </router-link>
                                        </div>
                                            </div>

                                </el-row>
                                <div style="float:left;margin-top:5px">
                                  <el-tag type="danger"> 拍卖 商品 </el-tag>
                                  <span  style="font-size:14px">
                                    卖家：{{seller_Msg}}
                                  </span>
                                </div>
                                <div slot="footer" class="dialog-footer" style="width:235px;float:right;margin-top:15px">
                                    <div style="float:left;margin-left:20px">
                                      <el-button @click="allowAuctionBox = false;">返 回</el-button>
                                    </div>
                                    <div style="float:left;margin-left:20px">
                                         <el-button    @click="goToAuction" >确认拍下</el-button>
                                    </div>
                              </div>
                      </div>
                    </el-dialog>
                    </div>


                    <!-- 已售出 -->
                    <div style="margin-left:20px;float:left;">
                      <el-button v-if="notExist" type="danger" :disabled="true" >已售出</el-button>
                    </div>
                      <!-- 未登录 -->

                      <div style="margin-left:20px;float:left;">
                        <el-button v-if="notLogin" type="danger"  @click="loginBox = true ;">请先登录</el-button>
                        <div >
                            <el-dialog v-model="loginBox"  size="200px">
                            <div style="width:350px;height:300px;padding-right:5px">
                              <loginBox></loginBox>
                            </div>
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <!-- 注：0未上架、1一口价出售中、2拍卖中、3已出售 ，4未登录-->
            </div>
            <div class="clearfix" style="padding-top:20px;width:1210px;margin:0 auto;margin-bottom:10px">
                <!-- 竞拍记录开始 -->
                <div style="float:left">
                    <el-table :data="tableAucRecord" height="230" border style="width: 860px">
                        <el-table-column prop="date" label="时间" width="200px">
                        </el-table-column>
                        <el-table-column prop="name" label="用户名" width="180px">
                        </el-table-column>
                        <el-table-column prop="price" label="出价">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 竞拍记录结束 -->
                <!-- 拍卖价格详细信息开始 -->
                <div style="float:right;">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix infoTop" style="float:left;font-size:16px">
                            <span class="text item" style="font-weight:bold">
                      拍卖品信息
                    </span>
                            </span>
                        </div>
                        <div class="text item block" style="margin-top:-20px;text-align:right">
                            <span class="attr">  起拍价&nbsp;&nbsp;&nbsp;：</span>
                            <span class="text  shanshuo" style="text-align:right">
                  ¥ {{start_price}}
                    </span>
                        </div>
                        <div class="text item block" style="text-align:right">
                            <span class="attr">  保证金&nbsp;&nbsp;&nbsp;：</span>
                            <span class="text  shanshuo value" style="line-height:27px;text-align:right">
                  ¥ {{deposit_Msg}}
                    </span>
                        </div>
                        <div class="text item block" style="text-align:right">
                            <span class="attr">  开始时间：</span>
                            <span class="text  shanshuo value" style="line-height:27px;text-align:right">
                  {{startTime_Msg}}
                    </span>
                        </div>
                        <div class="text item block" style="text-align:right">
                            <span class="attr">  结束时间：</span>
                            <span class="text  shanshuo" style="text-align:right">
                  {{endTime_Msg}}
                  </span>
                        </div>
                </div>
                <!-- 拍卖价格详细信息结束 -->
            </div>
            <div class="clearfix">
                <div style="margin-top:0px;width:1210px;margin:0 auto;">
                    <!-- 专利描述开始 -->
                    <div style="float:left;margin-top:10px">
                        <div>
                            <el-collapse v-model="activeNames" style="width:861px;">
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
                    <hot></hot>
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
    import { Notification } from 'element-ui';
        import loginBox from './../components/loginBox'
        import { Message } from 'element-ui';//信息提示框
            import hot from './../components/goods_hot'

export default {
    components: {
        myHeader,
        top,
        pic,
        goods_info,
        // priceAucInfo,
        // priceAucDetailInfo,
        buy,
        myFooter,
        loginBox,
        hot
        // auctionRecord,
    },
    data() {
        return {
            item: '',
            rootURL: config.URL,
            xx: [
                require('./../assets/img/withoutPic.png'),
            ],
            C: '',
            name_Msg: '正在拉取...',
            purpose_Msg: '正在拉取...',
            number_Msg: '正在拉取...',
            paths_Msg: [],
            price_Msg: '正在拉取...',
            status_Msg: '正在拉取...',
            seller_Msg: '正在拉取...',
            minIncrement_Msg: '正在拉取...',
            activeNames: ['1', '2'],
            descrip_Msg: '正在拉取...',
            design_Msg: '正在拉取...',
            start_price: "正在拉取...",
            deposit_Msg: "正在拉取...",
            startTime_Msg: "正在拉取...",
            endTime_Msg: '正在拉取...',
            readNumber_Msg:0,
            tableAucRecord: [],
            sho: false,
            photosList: [],

            hotList:[],


            auctionNow:false,
            applyAuctionBox: false,
            loginBox: false,
            allowAuctionBox: false,
            notLogin:false,
            notExist:false,
                     patentName_Msg:'',
                     patentPurpose_Msg: '',
                     patentDeposit_Msg:'',


                     currentPrice_Msg:'',
                     myAddPrice_Msg:'',
                     totalPrice_Msg:0,
           startPrice:'',        // 起始价
           minPrice:0,
           stepPrice:0,

        }
    },

    methods: {
      setLocalStorage(id){
          let that = this
          localStorage.setItem('catID',id)
          that.$router.push({path:'/tradeSystem/search/byCategory'})
      },
      clickHandle(i){
        window.location = '#/Patent/fixPriceInfo/' + i
        // window.location.reload();
      },
      goToPayDeposit() {
          let that = this

          var querystring = require('querystring');//Json数据查询器
          var tokennum = localStorage.getItem("tokennum");
          axios.post(config.URL+'/orderAuction/joinAuction',
             querystring.stringify({
              auction_id:that.auction_id,
              tokennum:tokennum
             })
            )
            .then(function(res){
            if(res.data.msg=='报名成功'){
                  alert('报名成功！正在为你返回刚才的出价窗口')
                    that.allowAuctionBox=true
                     that.applyAuctionBox=false
                 }else{
                   if(res.data.msg=='用户尚未实名制'){
                     Message.error('出价失败！您尚未实名制');
                    }else{
                      Message.error('报名失败了！请教世宇吧');
                    }
            }
            })
            .catch(function(error){
              Message.error('不正确！请教世宇');
            });
        },

        getAuctionInfo() {
            let that = this
            that.paths_Msg = []

            axios.get(that.rootURL + '/orderAuction/getOrderAuctionById?id=' + that.C)
                .then(function(res) {
                    if (res.data.status == 'success') {
                        that.goodsDescription_Msg = ''
                        var ite = res.data.obj
                        // 出价按钮
                        if(localStorage.getItem('tokennum')!=null){
                          if(ite.status=='1'){
                             that.auctionNow=true;
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
                        axios.get(that.rootURL + '/orderAuction/add_readnum?acuId=' + that.C)
                            .then(function(res) {
                              console.log(res.data.msg)

                            })
                            .catch(function(error) {
                                console.error(error)
                            })
                        // 阅读量自增 结束
                        that.auction_id = ite.id

                        that.patentName_Msg = ite.patent.name
                        that.patentPurpose_Msg = ite.patent.purpose
                        that.patentDeposit_Msg = ite.cash_deposit
                        that.readNumber_Msg = (ite.read_number)

                                  that.currentPrice_Msg = ite.current_price
                                  that.endTime_Msg = ite.end_time
                                   that.myAddPrice_Msg = ite.min_increment
                                  that.minPrice = ite.min_increment
                                  that.stepPrice = ite.min_increment
                 that.totalPrice_Msg =  parseInt(that.currentPrice_Msg) + parseInt(that.myAddPrice_Msg);



                        that.goodsDescription_Msg = (ite.description);
                        that.name_Msg = (ite.patent.name)
                        that.purpose_Msg = (ite.patent.purpose)
                        that.number_Msg = (ite.patent.patent_num)
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
                        that.photosList = [];
                        for (var i of ite.patent.patentImages) {
                            if (i.url != null) {
                                that.photosList.push(('http://og07ks0jb.bkt.clouddn.com/' + i.url));
                            }
                        }
                        if (that.photosList.length == 0) {
                            that.photosList = that.xx;
                        }

                        that.sho = true;
                        that.price_Msg = ite.current_price;
                        if (ite.status == 1)
                            that.status_Msg = '进行中'
                        else
                            that.status_Msg = '已结束'
                        that.startTime_Msg = ite.start_time
                        that.seller_Msg = ite.seller.name
                        that.minIncrement_Msg = ite.min_increment
                        that.descrip_Msg = ite.patent.description
                        that.design_Msg = ite.patent.design
                        that.start_price = ite.start_price
                        that.deposit_Msg = ite.cash_deposit
                        that.startTime_Msg = ite.start_time
                        that.endTime_Msg = ite.end_time
                        for (var item of res.data.obj.auctionList) {
                            that.tableAucRecord.push({
                                date: item.create_time,
                                name: item.buyer_name,
                                price: '¥ ' + item.price,
                            })
                        }

                    } else {
                        alert(res.data.msg);
                        that.$router.push({
                            path: '/tradeSystem'
                        })
                    }
                })
                .catch(function(error) {
                    console.error(error);
                    alert('what??')
                })
        },

        chujia(){
          let that = this
          that.allowAuctionBox=true;
        },
        goToAuction() {
            let that = this

            var querystring = require('querystring');//Json数据查询器
            var tokennum = localStorage.getItem("tokennum");

            axios.post(config.URL+'/orderAuction/bidding',
               querystring.stringify({
                auction_id:that.auction_id,
                type:1,
                tokennum:tokennum,
                price:that.totalPrice_Msg
               })
              )
              .then(function(res){
                if(res.data.msg=='用户尚未参与'){
                //  Message.error(res.data.msg);
                Message.error('你还没有参与本次竞拍，请缴纳保证金后进行！');

                 that.allowAuctionBox=false
                 that.applyAuctionBox=true
               }
               else if(res.data.msg=='拍卖过期'){
                  Message.error(res.data.msg);
                  that.allowAuctionBox=false
                }
                else if(res.data.msg=='竞价成功'){
                  //  Message.success(res.data.msg);
                  // alert(res.data.msg)
                  Notification.success({
                            title:res.data.msg,
                              offset: 65,
                              duration:10000
                          })
                    that.allowAuctionBox=false
                    // location.reload()
                    that.render()
                 }
                else if(res.data.msg=='出价少于最低增幅'){
                    Message.error(res.data.msg);
                     that.allowAuctionBox=false
                  }

                else
                {
                Message.error('不打报告');
               }
              })
              .catch(function(error){

                Message.error('不正确！请教世宇');

              });
          },
          handleChange(value) {
            let that = this
            that.handleControlNum=1
            console.log(value);
            that.myAddPrice_Msg = value
            that.totalPrice_Msg =  parseInt(that.currentPrice_Msg) + parseInt(that.myAddPrice_Msg);
          },
        hsytt() {
            let that = this
            var id = this.$route.params.id;
            that.C = id
            this.getAuctionInfo();
        },
        render(){
            let that = this
            if(that.$route.matched[0].name == 'auctionInfoDetail'){
            that.auctionNow = false
            that.notExist = false
            that.notLogin = false
            that.sho = false
            that.tableAucRecord=[]
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
};
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


/*priceAucInfo的*/

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

.el-table tr {
    font-size: 18px
}

.image_Hot {
  width:130px;
  height:70px;
  display: block;
}

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

.nameText{
  margin-left: 30px !important;
  width:400px;
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
  .account2{
     text-align: left;
     padding:5px;
     float:left;
     margin-top:5px;
     width: 490px !important;
     margin-right: 8px;
     border:1px solid #377ab7;
     color:rgb(46, 46, 52);
     font-family: '微软雅黑';
     font-size: 14px;
   }

   /*加价器*/
     .el-input-number{
       float:right;
       width:330px;

       margin-top:20px
     }
     .el-input-number .el-input__inner{
       font-size: 38px;
     }
     .image_ApplyBox {
width:240px;
height:155px;
       display: block;
     }
</style>
