<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="充值金额" prop="money">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框

  export default {
    data() {
      return {
        activeName: 'second',
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
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.ruleForm.money <= 0 ){
              Message.error('请输入大于0分的金额！');
            }else{
              var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(config.URL+'/userWallet/pcdeposit?'+
              '&tokennum='+ localStorage.getItem('tokennum'),
                querystring.stringify({
                amount: that.ruleForm.money,
                })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
              )
              .then(function(res){
                if(res.data.status == 'success'){
                  Message.success(res.data.msg);
                }else{
                  Message.error(res.data.msg);
                }
              })
              .catch(function(error){
                console.error(error);
                Message.error(error.data.msg);
              });
            }
          } else {
            Message.error('提交出错！请重新提交您的充值申请！');
            console.log('提交错误!');
            return false;
          }
        });
        this.$refs[formName].resetFields();
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
  .el-tab-pane{
    margin: 40px 300px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }

</style>
