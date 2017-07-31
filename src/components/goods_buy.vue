<template>
    <div style:"margin:100px" >
      <span >
        <!-- 立即购买 开始 -->
          <el-button v-if="buyNow" type="success"  @click="applyOrderBox = true ;">立即购买</el-button>
          <div>
              <el-dialog title="申请订单" v-model="applyOrderBox" size="300px" :close-on-click-modal="EF" :lock-scroll="ET" >
              <div style="width:830px;height:220px;padding-right:0px;padding-bottom:50px">
                    <el-row>
                      <el-col :span="8" >
                        <el-card :body-style="{ padding: '0px' }">
                          <img src="./../assets/img/newyear1.jpg" class="image">
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
                     <div class="account" style="margin-left:50px;float:right;width:430px;height:73px">
                       <div style="float:left;font-weight:bold;line-height:20px;width:200px;height:30px;;text-align:right;">实付款：</div>
                               <div class="omit" style="float:right;width:150px;height:40px;text-align:right;line-height:20px;font-size:26px;color:#377ab7">¥ {{patentPrice_Msg}}</div>

                       <div  style="float:left;text-align:right;font-weight:bold;margin-top:10px;margin-left:0px;width:200px;height:20px;">收货人：</div>
                               <div class="omit" style="float:right;width:150px;font-weight:normal;text-align:right;line-height:20px;float:right;color:rgb(70, 66, 66);font-weight:bold;">{{myName_Msg}}</div>
                       </div>

                      </el-row>
                      <div style="float:left;margin-top:5px">
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
                             <!-- <router-link :to="'/tradeSystem/patentOrderDetail/'+bridge_Msg"> -->
                               <el-button   @click="buildUp">提交订单</el-button>
                             <!-- </router-link> -->
                          </div>
                    </div>
              </el-dialog>
            </div>
          </div>
        <!-- 立即购买 结束 -->

        <!-- 立即出价 开始 -->
        <!-- 加价器开始 -->
        <div v-if="auctionNow" style="text-align:center">
                  <div>
                    <el-input-number v-model="startPrice" @change="handleChange" :step="stepPrice" :min="minPrice" width="340px"></el-input-number>
                  </div>
        </div>
        <!-- 加价器结束 -->

          <el-button v-if="auctionNow" type="primary"  @click="chujia">立即出价</el-button>
          <div>
              <el-dialog title="竞拍报名" v-model="applyAuctionBox" size="300px" :close-on-click-modal="EF" :lock-scroll="EF" >
              <div style="width:830px;height:220px;padding-right:0px;padding-bottom:50px">
                    <el-row>
                      <el-col :span="8" >
                        <el-card :body-style="{ padding: '0px' }">
                          <img src="./../assets/img/newyear1.jpg" class="image">
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
                          卖家：{{sellerName_Msg}}
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
              <el-dialog title="参与竞拍详情" v-model="allowAuctionBox" size="300px" :close-on-click-modal="EF" :lock-scroll="EF" >
              <div style="width:830px;height:220px;padding-right:0px;padding-bottom:50px">
                    <el-row>
                      <el-col :span="8" >
                        <el-card :body-style="{ padding: '0px' }">
                          <img src="./../assets/img/newyear1.jpg" class="image">
                          <div style="padding: 2px;">
                          </div>
                        </el-card>
                      </el-col>


                     <div class="account2" style="margin-left:20px;float:left;">
                              <!-- <div style="line-height:20px">起拍价：
                                      <span style="float:right;line-height:20px;font-size:26px;color:#377ab7">¥ {{startPrice_Msg}}</span>
                              </div> -->
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
                          卖家：{{sellerName_Msg}}
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
              </el-dialog>
            </div>
          </div>
        <!-- 立即购买 结束 -->


        <!-- 未上架 -->
          <el-button v-if="notOn" type="warning" :disabled="true">未上架</el-button>
        <!-- 未登录 -->

        <router-link to="/tradeSystem/login">
          <el-button v-if="notLogin" type="danger" >请先登录</el-button>
        </router-link>
        <!-- 已售出 -->
          <el-button v-if="notExist" type="danger" :disabled="true" >已售出</el-button>
      </span>
    </div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'

    import { Message } from 'element-ui';//信息提示框

    import { Notification } from 'element-ui';
export default{
  props:['type','bridge','step'],
  data(){
    return{
        buyNow:false,
        auctionNow:false,
        notOn:false,
        notLogin:false,
        notExist:false,

        applyOrderBox: false,
        applyAuctionBox: false,
        allowAuctionBox: false,

        form: {},

        rootURL:config.URL,
        bridge_Msg:this.bridge,
            type_Msg:this.type,


         patentName_Msg:'',
         patentPurpose_Msg: '',
         patentPrice_Msg: '',
         myName_Msg: '',
         sellerName_Msg: '',
         list_ID_Msg:'',
         patentDeposit_Msg:'',

          startPrice_Msg:'',
          currentPrice_Msg:'',
          endTime_Msg:'',
          myAddPrice_Msg:'',
          totalPrice_Msg:0,
         EF:false,
         ET:true,

           startPrice:'',        // 起始价
           handleControlNum:0
    }
  },
  methods:{
    readyForList() {
      },
      buildUp() {
          let that = this
          this.loading3 = true

          var querystring = require('querystring');//Json数据查询器
          var tokennum = localStorage.getItem("tokennum");

          axios.post(config.URL+'/order/addOrder',
             querystring.stringify({
              product_id:that.bridge_Msg,
              type:1,
              tokennum:tokennum
             })
            )
            .then(function(res){
              that.list_ID_Msg = res.data.obj.order_id;
              Notification.success({
                        title: '订单生成好了！',
                        message:'订单号：'+that.list_ID_Msg,
                          offset: 65,
                          duration:10000
                      })
               that.$router.push({path:'/tradeSystem/patentOrderDetail/'+that.list_ID_Msg})

            })
            .catch(function(error){
              console.error('不成功！');

              Message.error('不正确！');

            });
        },



        goToPayDeposit() {
            let that = this
            this.loading3 = true
            var querystring = require('querystring');//Json数据查询器
            var tokennum = localStorage.getItem("tokennum");
            axios.post(config.URL+'/orderAuction/joinAuction',
               querystring.stringify({
                auction_id:that.bridge_Msg,
                tokennum:tokennum
               })
              )
              .then(function(res){
              if(res.data.msg=='报名成功'){
                    //  Message.success(res.data.msg);
                    alert('报名成功！正在为你返回刚才的出价窗口')
                      that.allowAuctionBox=true
                       that.applyAuctionBox=false
                   }
              else{
                Message.error('报名失败了！请教世宇吧');
              }
              })
              .catch(function(error){
                Message.error('不正确！请教世宇');
              });
          },

        goToAuction() {
            let that = this
            this.loading3 = true

            var querystring = require('querystring');//Json数据查询器
            var tokennum = localStorage.getItem("tokennum");

            axios.post(config.URL+'/orderAuction/bidding',
               querystring.stringify({
                auction_id:that.bridge_Msg,
                type:1,
                tokennum:tokennum,
                price:that.totalPrice_Msg
               })
              )
              .then(function(res){
                if(res.data.msg=='用户尚未参与'){
                //  Message.error(res.data.msg);
                alert('你还没有参与本次竞拍，请缴纳保证金后进行！')
                 that.allowAuctionBox=false
                 that.applyAuctionBox=true
               }
               else if(res.data.msg=='拍卖过期'){
                  Message.error(res.data.msg);
                  that.allowAuctionBox=false
                }
                else if(res.data.msg=='竞价成功'){
                  //  Message.success(res.data.msg);
                  alert(res.data.msg)
                    that.allowAuctionBox=false
                    location.reload()
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

    getInfoForFixPrice(){

      let that = this
      axios.get(that.rootURL+'/orderfixedprice/getOrderFixPriceById?id='+ that.bridge_Msg)
      .then(function(res){
      var item = res.data.obj
        that.type_Msg = item.status
            if(that.type_Msg=='1'){
               that.buyNow=true;
             }
             if(that.type_Msg=='2'){
               that.notExist=true;
             }

        that.patentName_Msg = item.patent.name
        that.patentPurpose_Msg = item.patent.purpose
        that.patentPrice_Msg = item.price
        that.sellerName_Msg = item.seller.name
        that.myName_Msg = localStorage.getItem('userName')

      })
      .catch(function(error){
        console.error(error)
      })
    },

    getInfoForAuction(){
      let that = this


      axios.get(that.rootURL+'/orderAuction/getOrderAuctionById?id='+ that.bridge_Msg)
      .then(function(res){
        if(res.data.status=='success'){

            console.log('按钮发出来的：进来了！')
      var item = res.data.obj
        that.type_Msg = item.status
            if(that.type_Msg=='1'){
               that.auctionNow=true;
             }if(that.type_Msg=='2'){
               that.notExist=true;
             }
             that.patentName_Msg = item.patent.name
             that.patentPurpose_Msg = item.patent.purpose
             that.patentDeposit_Msg = item.cash_deposit
                       that.currentPrice_Msg = item.current_price
                       that.endTime_Msg = item.end_time
                        that.myAddPrice_Msg = item.min_increment
                       that.minPrice = item.min_increment
                       that.stepPrice = item.min_increment
      that.totalPrice_Msg =  parseInt(that.currentPrice_Msg) + parseInt(that.myAddPrice_Msg);
           }
           else{
             console.log('按钮发出来的：找不到该拍卖哦！')
           }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    handleChange(value) {
      let that = this
      that.handleControlNum=1
      console.log(value);
      that.myAddPrice_Msg = value
      that.totalPrice_Msg =  parseInt(that.currentPrice_Msg) + parseInt(that.myAddPrice_Msg);
    },
    checkType(){
      let that = this
      if(localStorage.getItem('tokennum')!=null){
      if(that.type=='1'){
      that.getInfoForFixPrice()
      }
      if(that.type=='2'){
        that.getInfoForAuction()
      }
      }
      else{
          that.notLogin=true;
      }
  },
  chujia(){
    let that = this
    that.allowAuctionBox=true;
  }
  },
  created(){
     let that = this
      this.checkType()

    }
}
</script>

<style scoped>
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
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
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
  .omit{
    width:840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
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
</style>
