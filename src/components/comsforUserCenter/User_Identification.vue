<template>
    <div style="margin-top:-20px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="ruleForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="IDNumber">
                <el-input v-model="ruleForm.IDNumber"></el-input>
            </el-form-item>
            <!-- 上传照片？？？ -->
            <el-form-item label="肖像照片" prop="portrait">
                <el-upload class="upload-demo" :multiple="true" action="//api.xiaogongkeji.net/xiaogong/image/uploadImage" :on-preview="handlePreview" :on-remove="handleRemove" :data="extraData" name="img" :thumbnail-mode="true" :file-list="fileList" :on-success="successUpload" :before-upload="beforeUpload" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <!-- ？？？暂时这样 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <el-form-item>
                <p>* 注意：认证之后不可再更改！提交认证之前务必确认您的信息准确无误！</p>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../../publicAPI/config'
import {
    Message
} from 'element-ui'; //信息提示框
export default {
    components: {},
    data() {
        return {
            activeName: 'third',
            ruleForm: {
                userID: window.localStorage.getItem("userID"),
                realName: '',
                IDNumber: '',
                portrait: '',
            },
            rules: {
                realName: [{
                    required: true,
                    message: '请输入您的真实姓名',
                    trigger: 'blur'
                }, {
                    min: 2,
                    max: 20,
                    message: '格式错误',
                    trigger: 'blur'
                }],
                IDNumber: [{
                    required: true,
                    message: '请输入您的身份证号',
                    trigger: 'blur'
                }, {
                    min: 18,
                    max: 18,
                    message: '必须是18个字符',
                    trigger: 'blur'
                }],
            },
            //图片上传
            fileList: [],
            extraData: {
                type: 3, //用户实名材料
                tokennum: localStorage.getItem('tokennum')
            },
            imgMaxCount: 1,
            imgCount: 0,
            imgArr: [],
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
                alert("只能上传一张相片");
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
                    var querystring = require('querystring'); //Json数据查询器
                    this.ruleForm.portrait = this.imgArr[0];
                    let that = this;
                    var userID = that.ruleForm.userID;
                    var realName = that.ruleForm.realName;
                    var IDNumber = that.ruleForm.IDNumber;
                    var portrait = that.ruleForm.portrait;
                    axios.post(config.URL + '/realname/judgeR_N?' + '&tokennum=' + localStorage.getItem('tokennum'))
                        .then(function(res) {
                            if (res.data.status == 'success') {
                                axios.post(config.URL + '/realname/addR_N?' + '&tokennum=' + localStorage.getItem('tokennum'), querystring.stringify({
                                        user_id: userID,
                                        real_name: realName,
                                        ID_card_NO: IDNumber,
                                        imgs: portrait
                                    }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                                ).then(function(res) {
                                    if (res.data.status == 'success') {
                                        Message.success(res.data.msg);
                                    } else {
                                        Message.error(res.data.msg);
                                    }
                                }).catch(function(error) {
                                    console.error(error);
                                    Message.error(error.data.msg);
                                });
                            } else {
                                Message.error(res.data.msg);
                                // Message.error('请完成您的修改信息！');
                                // console.log('未能成功提交!');
                            }
                        });
                    this.$refs[formName].resetFields();
                } else {
                    // Message.error(error.data.msg);
                    // this.$refs[formName].resetFields();
                    Message.error('请完成您的修改信息！');
                    console.log('未能成功提交!');
                };
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>
<style scoped>
.el-row {
    width: 800px;
}

.el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;
}

.bodyBG {
    background-size: 100% 508px;
    min-height: 508px
}

.middle {
    margin: 0 auto;
    padding-top: 20px;
    min-height: 508px;
    width: 1200px;
    background-color: rgba(218, 230, 244, 0.9);
    /*#dae6f4*/
}

.hint {
    width: 100%;
    height: 50px;
}

.el-tab-pane {
    margin: 40px 300px;
}

.el-form-item {
    margin-bottom: 30px;
}

.el-form-item p {
    color: red;
    font-size: 1em;
}
</style>
