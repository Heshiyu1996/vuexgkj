<template>
    <div>
        <el-form :model="FormForUpdateInfo" :rules="rules" ref="FormForUpdateInfo" label-width="100px" class="demo-FormForUpdateInfo">
            <div class="register-box">
                <div style="margin-bottom:16px;width:280px;">
                    <h4 style="margin-left:-10px;float:left;">新用户注册</h4>
                </div>
                <div class="errorM" style="margin:0;color:#FF4949;"></div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="FormForUpdateInfo.account"></el-input>
                    </el-form-item>
                </div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="FormForUpdateInfo.name"></el-input>
                    </el-form-item>
                </div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="FormForUpdateInfo.password"></el-input>
                    </el-form-item>
                </div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="确认密码" prop="passconf">
                        <el-input type="password" v-model="FormForUpdateInfo.passconf"></el-input>
                    </el-form-item>
                </div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="FormForUpdateInfo.phone"></el-input>
                    </el-form-item>
                </div>
                <div style="height:40px;margin-left:-15px">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="FormForUpdateInfo.email"></el-input>
                    </el-form-item>
                </div>
                <div class="clear"></div>
                <div style="width:380px;margin-left:-25px;margin-top:-5px">
                    <div style="margin-left:-40px">
                        <el-form-item label="" prop="agreement">
                            <el-checkbox-group v-model="FormForUpdateInfo.agreement">
                                <el-checkbox label="我已阅读并同意《小功用户注册协议》" name="agreement"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
                <div style="margin-left:-35px;margin-top:-5px">
                    <div style="margin-top:-10px;margin-left:62px">
                        <!-- <el-button type="primary"  id="registerBtn" @click="tryToRegister" style="width:340px;margin-left:-35px"> 注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button> -->
                        <el-button type="primary" @click="submitForm('FormForUpdateInfo')">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../publicAPI/config'

// import { Message } from 'element-ui';//信息提示框
import {
    Notification
} from 'element-ui';
export default {
    components: {},
    data() {


        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.FormForUpdateInfo.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {

            rootURL: config.URL,
            FormForUpdateInfo: {
                account: '',
                name: '',
                password: '',
                passconf: '',
                phone: '',
                email: '',
                agreement: [],
            },
            rules: {
                account: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                }, {
                    min: 4,
                    max: 20,
                    message: '长度在 4 到 20 个字符',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '请输入昵称',
                    trigger: 'blur'
                }, {
                    min: 4,
                    max: 20,
                    message: '长度在 4 到 20 个字符',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    min: 4,
                    max: 20,
                    message: '长度在 4 到 20 个字符',
                    trigger: 'blur'
                }],
                passconf: [{
                    required: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                }, {
                    validator: validatePass2,
                    trigger: 'blur'
                }],
                agreement: [{
                    type: 'array',
                    required: true,
                    message: '注册前请详细阅读！',
                    trigger: 'change'
                }],

            }
        }
    },
    methods: {

        //
        // tryToRegister(){
        //
        //     var querystring = require('querystring');//Json数据查询器
        //      var account = document.getElementById('account').value;
        //      var type =1;
        //      var password = document.getElementById('password').value;
        //      var phone = document.getElementById('phone').value;
        //      var email = document.getElementById('email').value;
        //      console.log("即将注册，账号："+account+" 密码："+password);
        //
        //     let that = this
        //     axios.post(config.URL+'/user/addUser',
        //        querystring.stringify({
        //          account:account,
        //          type:1,
        //          password:password,
        //          email:email,
        //          phone:phone
        //        })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
        //       )
        //       .then(function(res){
        //       if(res.data.status=="fail")
        //         Notification.error({
        //                   title: '注册失败！',
        //                   message: res.data.msg,
        //                   offset: 65,
        //                     duration:2000
        //                 })
        //       else{
        //         Notification.success({
        //                   title: '注册成功！',
        //                   message: '拿好你的新账号：'+res.data.obj.account+'\n现在就赶紧去登陆吧！',
        //                   offset: 65,
        //                   duration:2000
        //                 })
        //   window.location = '#/tradeSystem/login'
        //       }
        //       })
        //       .catch(function(error){
        //         console.error('注册不成功！');
        //
        //         Message.error('注册不成功！');
        //
        //       });
        // },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var querystring = require('querystring'); //Json数据查询器
                    let that = this
                    axios.post(config.URL + '/user/addUser',
                            querystring.stringify({
                                account: this.FormForUpdateInfo.account,
                                name: this.FormForUpdateInfo.name,
                                type: 1,
                                password: this.FormForUpdateInfo.password,
                                phone: this.FormForUpdateInfo.phone,
                                email: this.FormForUpdateInfo.email
                            }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                        )
                        .then(function(res) {
                            if (res.data.status == "fail")
                                Notification.error({
                                    title: '注册失败！',
                                    message: res.data.msg,
                                    offset: 65,
                                    duration: 2000
                                })
                            else {
                                alert('注册成功！');
                                window.location = '#/tradeSystem/login';
                            }
                            // localStorage.setItem('tokennum_test',res.data[1].obj.tokennum)
                        })
                        .catch(function(error) {
                            console.error('注册不成功！');
                            Message.error('注册不成功！');

                        });





                } else {
                    console.log('提交错误!请保存您的信息！');
                    return false;
                }
            });
        },
    }
}
</script>
<style scoped>
.register-box {
    width: 370px;
    height: 555px;
    float: right;
    border-radius: 4px;
    background: #fff;
    margin-top: 80px;
    padding: 20px;
    margin-right: 10px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
}

.register-box>div {
    margin: 12px 0;
    margin-left: 20px;
    float: left;
}

.register-box h4 {
    // color:#606B70;
    color: #555;
    font-weight: bold;
}

.register-box b {
    width: 40px;
    height: 40px;
    display: inline-block;
    float: left;
    border: 1px solid #aaa;
    border-right: none;
    border-radius: 2px 0 0 2px;
    text-align: center;
}

.register-box b span {
    font-size: 20px;
    color: #377ab7;
}

.register-box input[type="text"],
.register-box input[type="password"] {
    width: 240px;
    height: 40px;
    float: left;
    border: 1px solid #aaa;
    outline: none;
    border-radius: 0 2px 2px 0;
    padding: 3px 10px;
    // color:#606B70;
    color: #555;
}

.register-box input[type="text"]:focus,
.register-box input[type="password"]:focus {
    border: 1px solid #20A0FF;
}

.register-box input[type="checkbox"] {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #000;
}

.register-box label {
    font-weight: normal;
    color: #606B70;
}

.register-box button {
    width: 280px;
    height: 40px;
    border: 1px solid #377ab7;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #377ab7;
    padding: 3px 10px;
}

.register-box button:hover {
    background: #377AB7;
    border: 1px solid #377ab7;
}

.register-box a {
    color: #377ab7;
    font-size: 12px;
    margin-top: 2px;
    float: right;
}

div>span {
    font-size: 14px;
    color: rgba(76, 84, 85, 1);
}
</style>
