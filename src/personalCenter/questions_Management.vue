<template>
  <div style="margin-top:-30px;">
    <div class="hint"></div>
    <div class="bodyBG">
    <div class="middle">
      <div class="lead" style="margin-top:-20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="发布提问" name="first">
          <Need></Need>
        </el-tab-pane>

        <el-tab-pane label="我的提问" name="second">
        <myNeed  v-if="show_myAsk"></myNeed>
        </el-tab-pane>

        <el-tab-pane label="我的回答" name="3" >
          <Seller_myAnswer v-if="show_SellerAnswer"></Seller_myAnswer>
        </el-tab-pane>
        <!-- <el-tab-pane label="我的出价" name="third">
         <Bid  v-if="show_myBid"></Bid>
        </el-tab-pane> -->
<!--
        <el-tab-pane label="订单记录（买家）" name="4">
          <BuyerRecord v-if="show_BuyerRecord"></BuyerRecord>
        </el-tab-pane> -->

      </el-tabs>
    </div>
    </div>
</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框

   import Need from './../components/comsforUserCenter/Que_Need'
  //  import Bid from './Buyer_Bid'
   import myNeed from './../components/comsforUserCenter/Que_myNeed'
  //  import BuyerRecord from './Buyer_Record'
   import Seller_myAnswer from './../components/comsforUserCenter/Que_myAnswer'


  export default {
    components: {
      // Bid,
      Need,
      myNeed,
      // BuyerRecord,
      Seller_myAnswer
    },
    data() {
      return {
        activeName: 'first',
        ruleForm: {
          money: '',
        },
        rules: {
          money: [
            { required: true, message: '请输入充值金额', trigger: 'blur' },
          ],
        },
        show_myAsk:false,
        // show_myBid:false,
        // show_BuyerRecord:false,
        show_SellerAnswer:false

    };
  },
  methods: {
    handleClick(tab, event) {
        let that = this
       if(tab.label=='我的提问'){
         that.show_myAsk = true;
     }else{
         that.show_myAsk = false;
     }

     if(tab.label=='我的出价'){
      that.show_myBid = true;
     }else{
      that.show_myBid = false;
     }
     if(tab.label=='订单记录（买家）'){
      that.show_BuyerRecord = true;
     }else{
      that.show_BuyerRecord = false;
     }

      if(tab.label=='我的回答'){
        that.show_SellerAnswer = true;
    }else{
        that.show_SellerAnswer = false;
    }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
  }
  .bodyBG{
    background-size: 100% 508px;
    min-height: 508px
  }
  .middle{
    margin: 0 auto;
    padding-top:20px;
    min-height: 508px;
    width: 1000px;
    background-color: rgba(218,230,244,0.9);/*#dae6f4*/
  }
  .hint{
    width: 100%;
    height:50px;
  }
  .el-tab-pane{
    margin: 0px 200px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }

</style>
