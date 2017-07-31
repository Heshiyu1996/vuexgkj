<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号" prop="creditCard">
        <el-input v-model="ruleForm.creditCard"></el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="money">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label="提现密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
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
    components: {
    },
    data() {
    return {
      activeName: 'third',
      ruleForm: {
          realName: '',  //真实姓名有从数据库中调出
          creditCard: '',
          money: '',
          password: '',
        },
        rules: {
          realName: [
            // { required: true, message: '请输入您的真实姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '格式错误', trigger: 'blur' }
          ],
          creditCard: [
            { required: true, message: '请输入您的银行卡号', trigger: 'blur' },
            { min: 19, max: 19, message: '必须是19个字符', trigger: 'blur' }
          ],
          money: [
            { required: true, message: '请输入提现金额', trigger: 'blur' }//用不用限制金额
          ],
          password: [
            { required: false, message: '请输入提现密码', trigger: 'blur' }//提现密码这一块。。。还是要的吧
          ],
        }
    };
  },
  created(){
      let that = this
      axios.get(config.URL+'/userWallet/getMyWallet?' + '&tokennum='+ localStorage.getItem('tokennum'))
        .then(function(res){

                    var item =res.data.obj
                              if(item!=null)
          that.ruleForm.realName = item.real_name;
        })
        .catch(function(error){
          console.error(error)
        })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if( this.ruleForm.money <= 0 ){
              Message.error('请输入大于0元的金额！');
            }else{
              var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(config.URL+'/userWallet/appdeposit?'+
              '&tokennum='+ localStorage.getItem('tokennum'),
                querystring.stringify({
                amount: that.ruleForm.money,
                bank_card: that.ruleForm.creditCard,
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
            Message.error('提交错误！请重新提交您的提现申请！');
            console.log('提交错误！');
            return false;
          }
        });
        this.$refs[formName].resetFields();
        let that = this
        axios.get(config.URL+'/userWallet/getMyWallet?' + '&tokennum='+ localStorage.getItem('tokennum'))
          .then(function(res){
                    var item =res.data.obj
                              if(item!=null)
            that.ruleForm.realName = item.real_name;

          })
          .catch(function(error){
            console.error(error)
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        let that = this
        axios.get(config.URL+'/userWallet/getMyWallet?' + '&tokennum='+ localStorage.getItem('tokennum'))
          .then(function(res){
                    var item =res.data.obj
                              if(item!=null)
            that.ruleForm.realName = item.real_name;
          })
          .catch(function(error){
            console.error(error)
          })
      }
  }
  }
</script>

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
