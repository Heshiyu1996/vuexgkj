<template>
  <div style="margin-bottom:50px;">
    <div style="margin-bottom:30px">
      <el-steps :space="270" :active="1" finish-status="success">
        <el-step title="申请订单"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="卖家发货"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="订单信息">
        <div class="myBlock">
          <div class="myTitle">订单信息</div>
          <div style="text-align:left;margin-left:55px;float:left;height:70px;width:180px;line-height:80px;font-size:14px">
            <div>订单id：
              <div style="margin-top: -80px;margin-left:60px;width:100px">
                {{orderID_Msg}}
              </div>
            </div>
          </div>

          <div style="text-align:left;float:left;height:70px;width:350px;margin-left:60px;line-height:80px;font-size:14px">
            创建时间：{{orderCreateDate_Msg}}
          </div>

        </div>

        <div class="myBlock">
          <div class="myTitle">卖家信息</div>
          <div style="float:left;height:70px;width:150px;margin-left:15px;line-height:80px;font-size:14px">
            <span>昵称：{{sellerName_Msg}}</span>
          </div>

          <div style="float:left;height:70px;width:150px;margin-left:10px;line-height:80px;font-size:14px">
            真实姓名：{{sellerRealName_Msg}}
          </div>

          <div style="float:left;height:70px;width:230px;margin-left:30px;text-align:left;line-height:80px;font-size:14px;">
            E-mail：{{sellerEmail_Msg}}
          </div>

          <div style="float:left;height:70px;width:173px;text-align:left;line-height:80px;font-size:14px">
            联系电话：{{sellerPhone_Msg}}
          </div>

        </div>

        <div class="myBlock">
          <div class="myTitle">商品信息</div>
          <div style="float:left;height:80px;width:150px;margin-left:60px;font-size:14px">
            <span>  <img :src="photo_Msg"  class="image"></span>
          </div>

          <div style="text-align:left;padding-top:15px;float:left;height:82px;width:500px;margin-left:20px;line-height:35px;font-size:14px">
            <span style="font-size:18px">{{patentName_Msg}}
            </span>
            <div class="omit">{{patentPurpose_Msg}}
            </div>
          </div>
        </div>

          <div style="float:right;font-size:18px;width:330px">
            订单总金额：
            <span style="font-size:26px;font-weight:bold;color:#677ab7">{{price_Msg}} 元</span>
            <div style="float:right;margin-right:20px;margin-top:10px">
              <el-button type="text" @click="cancelTheOrder">取消订单</el-button>
              <el-button type="primary" @click="pay"> &nbsp; 付&nbsp; 款 &nbsp;</el-button>
            </div>
          </div>


      </el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
  import axios from 'axios'
  import config from './../publicAPI/config'

  import { Message } from 'element-ui';
  export default {
      props:['bridge'],
    data() {
      return {
          rootURL:config.URL,

          bridge_Msg:this.bridge,
          orderID_Msg:'加载中',
          orderCreateDate_Msg:'',
        // 读取专利信息
          patentName_Msg:'',
          patentPurpose_Msg:'',
          price_Msg:'',

       // 读取卖家信息
          sellerName_Msg:'',
          sellerEmail_Msg:'',
          sellerRealName_Msg:'',
          sellerPhone_Msg:'',
      };
    },
    methods:{
      noMoney(){

        this.$confirm('你当前余额不足以支付本次订单，是否充值？', '余额不足！', {
          confirmButtonText: '立即充值',
          cancelButtonText: '稍后再去',
          type: 'warning'
        }).then(() => {
           window.location = '#/userIndex'
        }

      ).catch(() => {
          this.$message({
            type: 'info',
            message: '此订单将会为你保留**分钟'
          });
        });
      }
      ,
      pay(){

        var querystring = require('querystring');//Json数据查询器
        var tokennum = localStorage.getItem("tokennum");
        let that = this

        var mylID = that.bridge_Msg
        axios.post(config.URL+'/order/payForTheOrder',
          querystring.stringify({
            id:mylID,
            tokennum:tokennum
          })
        )
          .then(function(res){
            if(res.data.status=='success'){
            alert('支付成功！')
            that.$router.push({path:'/userIndex'})}
            else{
              if(res.data.msg == '用户可用余额不足')
                that.noMoney()
            }
          })
          .catch(function(error){
            console.error('支付失败！请检查所填信息的正确性');

          });
      },
      getProductInfo(){
        let that = this

                var querystring = require('querystring');//Json数据查询器
        axios.get(config.URL+'/order/getOrderById?id='+that.bridge_Msg)
          .then(function(res){
            var item = res.data.obj
            if(res.data.status=='success'){
               // 读取订单信息
                 that.orderID_Msg = item.id
                 that.orderCreateDate_Msg = item.create_time

               // 读取专利信息
                 that.patentName_Msg = item.product.patent.name
                 that.patentPurpose_Msg = item.product.patent.purpose
                 that.price_Msg = item.price

              // 读取卖家信息
                 that.sellerName_Msg = item.seller.name
                 that.sellerEmail_Msg = item.seller.email
                 if(item.seller.real_Name!='')
                  that.sellerRealName_Msg = item.seller.real_Name
                 else
                  that.sellerRealName_Msg = '（未实名）'
                 that.sellerPhone_Msg = item.seller.phone
                 if(item.product.patent.patentImages!=null){
                   that.photo_Msg = 'http://og07ks0jb.bkt.clouddn.com/' + item.product.patent.patentImages[0].url
                 }else{
                   that.photo_Msg = 'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png'
                 }
          }
            else{
                alert(res.data.msg)
            }
          })
          .catch(function(error){
            console.error('支付失败！请检查所填信息的正确性');

          });
        // // 读取订单信息
        //   that.orderID_Msg = localStorage.getItem('patent_OrderID')
        //
        // // 读取专利信息
        //   that.patentName_Msg = localStorage.getItem('patent_Name')
        //   that.patentPurpose_Msg = localStorage.getItem('patent_Purpose')
        //   that.price_Msg = localStorage.getItem('patent_Price')
        //
        // // 读取卖家信息
        //   that.sellerName_Msg = localStorage.getItem('patent_SellerName')
        //   that.sellerEmail_Msg = localStorage.getItem('patent_SellerEmail')
        //   that.sellerRealName_Msg = localStorage.getItem('patent_SellerRealName')
        //   that.sellerPhone_Msg = localStorage.getItem('patent_SellerPhone')
        },
        cancelTheOrder() {
          this.$confirm('取消订单则会丢弃该订单！ 恶意刷单可能会被系统限制您账号的正常使用！ 是否继续?', '提示', {
            confirmButtonText: '取消吧',
            cancelButtonText: '我再考虑一下',
            type: 'warning',
            lockScroll:false
          })
          .then(() => {

            this.cancel()
          })
          .catch(() => {
            this.$message({
              message: '“订单取消”操作被撤回！'
            });
          });
        },
        cancel(){
          // 取消订单开始
          let that = this
                  var querystring = require('querystring');//Json数据查询器
          axios.post(config.URL+'/order/cancelationOfOrder',
            querystring.stringify({
              id:that.bridge_Msg,
              tokennum:localStorage.getItem('tokennum')
              // localStorage.getItem('patent_OrderID')
            })
          )
            .then(function(res){
              if(res.data.status=='success'){
                if(res.data.msg=='订单取消成功'){
                Message.success('订单取消成功！')
              }
                else{
                     Message.error('取消失败！~这张订单是已经“取消过”或者是“已结束”了的！')
                }
                that.$router.push({path:'/tradeSystem'})
              }
              else{
                 Message.error(res.data.msg)

              }
            })
            .catch(function(error){
                 Message.error('取消失败！请检查订单状态是否为“未付款”状态，或者联系客服！')

            });
          // 取消订单结束
        }
    },
    created(){
      this.getProductInfo()
    }
  }
</script>

<style scoped>
*{
  font-family: '微软雅黑'
}
.myBlock{
  border-bottom:1px dashed gray;
  height:100px;
  margin-bottom: 25px;
}
.myTitle{
  float:left;
  height:70px;
  width:80px;
  font-weight:bold;
  font-size:18px;
}
.image {

  width: 120px;
  height:80px;
  border:1px solid black;
  display: block;
}
.el-tabs--border-card{
  width:870px
}

.omit{
	width:500px;
	overflow: hidden;
	vertical-align: top;
	text-overflow:ellipsis;
	white-space: nowrap;/*不换行*/
}
</style>
