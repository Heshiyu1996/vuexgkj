<template>
  <div style="margin:0 auto;width:380px">
    <el-form :model="FormForUpdateInfo" :rules="rules" ref="FormForUpdateInfo" label-width="100px" class="demo-FormForUpdateInfo">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="FormForUpdateInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="FormForUpdateInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="FormForUpdateInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="个人简历" prop="introduction">
        <el-input type="textarea" v-model="FormForUpdateInfo.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('FormForUpdateInfo')">保存</el-button>
        <el-button @click="resetForm('FormForUpdateInfo')">重置</el-button>
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
      activeName: 'first',
      FormForUpdateInfo: {
          image: '',
          name: '',
          phone: '',
          email: '',
          introduction: '',
        },

      //图片上传
      fileList: [],
      extraData: {
        type: 1, //用户头像
        tokennum: localStorage.getItem('tokennum')
      },
      imgMaxCount: 1,
      imgCount: 0,
      imgArr: [],
      userName:'',
        rules: {
          name: [
            { required: true, message: '请输入您的昵称', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入您的手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '必须是11个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入您的邮箱', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请写下您的个人简介', trigger: 'blur' }
          ],
        }
    };
  },
  methods: {
    //图片上传
    successUpload(response, file, fileList) {
      console.log(fileList[0].url);
      console.log('http://og07ks0jb.bkt.clouddn.com/' + file.response.obj);
      this.imgArr.push(file.response.obj);
      console.log(this.imgArr);
      this.imgCount++;
    },
    beforeUpload(file) {
      if (this.imgCount >= this.imgMaxCount) {
        alert("只能上传一张头像");
        return false;
      }
    },
    handleRemove(file, fileList) {
      this.imgArr.pop();
      console.log(this.imgArr);
      this.imgCount--;
    },

    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    handlePreview(file) {
      console.log(file);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

              var querystring = require('querystring');//Json数据查询器
              // this.FormForUpdateInfo.image = this.imgArr[0];
              let that = this
              that.userName = that.FormForUpdateInfo.name
              // axios.post(config.URL+'/user/editUserHeadPhoto?'+
              // '&tokennum='+ localStorage.getItem('tokennum'),
              //   querystring.stringify({
              //     img: that.FormForUpdateInfo.image,
              //   })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
              // )
              axios.post(config.URL+'/user/editPersonalInfo?'+
              '&tokennum='+ localStorage.getItem('tokennum'),
                querystring.stringify({
                  name: that.FormForUpdateInfo.name,
                  phone: that.FormForUpdateInfo.phone,
                  email: that.FormForUpdateInfo.email,
                  introduction: that.FormForUpdateInfo.introduction,
                })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
              )
              .then(function(res){
                if(res.data.status == 'success'){
                  Message.success('已更新您的个人信息！');

                  localStorage.setItem('userName',that.userName)
                  // localStorage.setItem('headPhoto','http://og07ks0jb.bkt.clouddn.com/'+that.FormForUpdateInfo.image)
                  window.location.reload()

                }else{
                  Message.error(res.data.msg);
                }
              })
              .catch(function(error){
                console.error(error);
                Message.error(error.data.msg);
              });


          } else {
            Message.error('请完成您的修改信息！');
            console.log('未能成功提交!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row{
    width: 800px;
  }
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
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
