<template>
  <div style="margin-top:-30px;">
    <div class="hint"></div>
    <div class="bodyBG">
    <div class="middle">
      <div class="lead" style="margin-top:-20px">
      <el-tabs  v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="充值" name="first">
          <Recharge ></Recharge>
        </el-tab-pane>

        <el-tab-pane label="提现" name="second">
          <withdraw></withdraw>
        </el-tab-pane>

        <el-tab-pane label="财务明细" name="third">
          <Account></Account>
        </el-tab-pane>

        <el-tab-pane label="出价记录" name="forth">
          <Bid></Bid>
        </el-tab-pane>


      </el-tabs>
    </div>
    </div>
</div>
  </div>
</template>

<script>
  import myHeader from './../components/myheader.vue'
  import myFooter  from './../components/myfooter.vue'
  import axios from 'axios'
  import config from './../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框

  import Bid from './../components/comsforUserCenter/Finan_Bid'

  import Recharge from  './../components/comsforUserCenter/Finan_Recharge'
  import Account from   './../components/comsforUserCenter/Finan_Account'
  import withdraw from  './../components/comsforUserCenter/Finan_Withdraw'

  export default {
    components: {
      myHeader,
      myFooter,
      Bid,
      Account,
      Recharge,
      withdraw
    },
    data() {
      return {
        activeName:'first',

        ruleForm: {
          money: '',
        },
        rules: {
          money: [
            { required: true, message: '请输入充值金额', trigger: 'blur' },
            // { min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }用不用限制金额？
          ],
        }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
    margin: 40px 300px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }

</style>
