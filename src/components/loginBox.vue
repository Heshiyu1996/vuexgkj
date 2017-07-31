<template>
    <div>
        <el-form :model="FormForUpdateInfo" :rules="rules" ref="FormForUpdateInfo" label-width="100px" class="demo-FormForUpdateInfo">
            <div class="login-box">
                <div style="margin-bottom:15px;width:280px;">
                    <h4 style="margin:0 auto;float:left;">用户登录</h4>
                    <a href="#/tradeSystem/register">立即注册</a>
                </div>
                <div class="errorM" style="margin:0;color:#FF4949;"></div>
                <div style="width:300px;margin-left:-40px;">
                    <div style="margin-left:0px;width:300px">
                        <el-form-item label="账号" prop="account">
                            <el-input v-model="FormForUpdateInfo.account"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="margin-left:0px;margin-left:-40px;margin-top:-10px;margin-bottom:30px">
                    <div style="margin-left:0px;margin-bottom:-25px;width:300px">
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" @keyup.enter.native="submitForm('FormForUpdateInfo')" v-model="FormForUpdateInfo.password"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="clear"></div>
                <div style="font-size:12px;width:280px;margin:-10px 0 6px;">
                    <input type="checkbox" id="rememPass" />
                    <label style="margin-top: 2px;margin-left: 6px;float:left;line-height:15px">记住密码</label>
                    <label style="margin-top: 2px;float:right;color:#377ab7;cursor:pointer;">忘记密码?</label>
                </div>
                <div style="margin-top:16px;">
                    <el-button type="primary" @click="submitForm('FormForUpdateInfo')">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../publicAPI/config'

import {
    Message
} from 'element-ui'; //信息提示框

import {
    Notification
} from 'element-ui';
export default {
    components: {},
    data() {
        return {
            rootURL: config.URL,

            userAccount: '',

            FormForUpdateInfo: {
                account: '',
                password: '',
            },
            rules: {
                account: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }, //blur为失去焦点时
                    {
                        trigger: 'blur'
                    }
                ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    trigger: 'blur'
                }],

            }
        }
    },
    methods: {
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {

                    var querystring = require('querystring'); //Json数据查询器

                    let that = this
                    axios.post(config.URL + '/user/loginbyaccount',
                            querystring.stringify({
                                account: this.FormForUpdateInfo.account,
                                password: this.FormForUpdateInfo.password,
                            })
                        )
                        .then(function(res) {
                            that.userAccount = res.data[0].obj.account
                            localStorage.setItem('tokennum', res.data[1].obj.tokennum);
                            localStorage.setItem('userID', res.data[0].obj.id);
                            localStorage.setItem('account', res.data[0].obj.account)
                            localStorage.setItem('userName', res.data[0].obj.name)
                            localStorage.setItem('create_time', res.data[0].obj.create_time)
                            localStorage.setItem('isRealName', res.data[0].obj.isRealName)
                            localStorage.setItem('headPhoto', 'http://og07ks0jb.bkt.clouddn.com/' + res.data[0].obj.headPhotoslist[0].url)

                            localStorage.setItem('comeBack', that.$route.path)

                            if (localStorage.getItem('comeBack') != '/tradeSystem/login') {

                                that.$router.push({
                                    path: localStorage.getItem('comeBack')
                                })
                                localStorage.removeItem('comeBack')
                                window.location.reload()

                            } else {
                                window.location = '#/tradeSystem';
                                Notification.success({
                                    title: '登录成功！',
                                    message: that.userAccount + ' 为你跳转到主页…',
                                    offset: 65,
                                    duration: 2000
                                })
                            }

                        })
                        .catch(function(error) {
                            Message.error('账号不存在或者密码错误，也有可能是服务器的问题');

                        });





                } else {
                    console.log('提交错误!请保存您的信息！');
                    return false;
                }
            });
        },

        say() {
            alert(1)
        }
    },
    activated() {
        alert(1)
    },

}
</script>
<style scoped>
.login-box {
    width: 340px;
    height: 305px;
    float: right;
    border-radius: 4px;
    background: #fff;
    margin-top: 0px;
    padding: 30px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
}

.login-box>div {
    margin: 12px 0;
    float: left;
}

.login-box h4 {
    // color:#606B70;
    color: #555;
    font-weight: bold;
}

.login-box b {
    width: 40px;
    height: 40px;
    display: inline-block;
    float: left;
    border: 1px solid #aaa;
    border-right: none;
    border-radius: 2px 0 0 2px;
    text-align: center;
}

.login-box b span {
    font-size: 20px;
    color: #377ab7;
}

.login-box input[type="text"],
.login-box input[type="password"] {
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

.login-box input[type="text"]:focus,
.login-box input[type="password"]:focus {
    border: 1px solid #20A0FF;
}

.login-box input[type="checkbox"] {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #000;
}

.login-box label {
    font-weight: normal;
    color: #606B70;
}

.login-box button {
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

.login-box button:hover {
    background: #377AB7;
    border: 1px solid #377ab7;
}

.login-box a {
    color: #377ab7;
    font-size: 12px;
    margin-top: 2px;
    float: right;
}
</style>
