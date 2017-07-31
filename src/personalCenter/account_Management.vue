<template>
  <div style="margin-top:-30px;">
    <div class="hint"></div>
    <div class="bodyBG">
    <div class="middle" >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改资料" name="first">
          <updateInfo></updateInfo>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <userPassword></userPassword>
        </el-tab-pane>
        <el-tab-pane label="实名认证" name="third">
          <userIdentification></userIdentification>
        </el-tab-pane>


      </el-tabs>
    </div>
</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框

  import userPassword from './../components/comsforUserCenter/User_modifyPassword'
  import updateInfo  from './../components/comsforUserCenter/User_updateInfo'
    import userIdentification  from  './../components/comsforUserCenter/User_Identification'

  export default {
    components: {
      userPassword,
      updateInfo,
      userIdentification
    },
    data() {
    return {
      activeName: 'first',
      ruleForm: {
          account: '',
          oldPassword: '',
          newPassword: '',
          newAgain: '',
        },
        rules: {
          account: [
            { required: true, message: '请输入您的账号', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          oldPassword: [
            { required: true, message: '请输入原来的密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入更新的密码', trigger: 'blur' }
          ],
          newAgain: [
            { required: true, message: '请重复输入新密码', trigger: 'blur' }
          ],
        },
        fileList: [
          {
            // name: 'food.jpeg',
            // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            // name: 'food2.jpeg',
            // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if ( this.ruleForm.newPassword != this.ruleForm.newAgain ) {
              Message.error('新密码输入不一致！请重新输入！');
            }else{
              var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(config.URL+'/user/updatePassword?'+
              '&tokennum='+ localStorage.getItem('tokennum'),
                querystring.stringify({
                account:that.ruleForm.account,
                oldPas:that.ruleForm.oldPassword,
                newPas:that.ruleForm.newPassword,
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
            Message.error('请完成您的修改信息！');
            console.log('未能成功提交!');
            return false;
          }
        });
      this.$refs[formName].resetFields();
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
    padding-top: 0px;
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

  .el-upload{
    margin: 0 auto;
    margin-bottom: 25px;
    margin-left: 160px;
  }
</style>
