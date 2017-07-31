<template>
    <div>
        <!-- 头部 -->
        <myHeader></myHeader>
        <div class="clearfix"></div>
        <div style="padding-top:10px;width:1110px;margin:0 auto;text-align:center;">
            <!-- 面包屑开始 -->
            <div style="float: left;margin:20px 0px 5px 0px">
                <el-breadcrumb separator="/">
                    <span style="float:left;color:rgb(71,86,105)" class="route">您的位置：</span>
                    <el-breadcrumb-item>
                        <router-link to="/">
                            <span>首页</span>
                        </router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <router-link to="/tradeSystem/questionList">
                            <span>技术求解</span>
                        </router-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <span>{{title_Msg}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 面包屑结束 -->
            <div class="clearfix"></div>
            <!-- 问题描述 开始-->
            <div class="row-bg" style="float:left;width:860px;margin-bottom:30px;">
                <div type="flex" justify="space-between">
                    <div :title="title_Msg" class="goodsName grid-content bg-purple  goodsName omit" style="font-weight:bold;width:860px;">
                        <div class="el-icon-information"></div>
                        {{title_Msg}}
                    </div>
                    <el-col :span="19" :title="description_Msg">
                        <div class="grid-content bg-purple-light2 goodsSummary omit" style="margin-top:10px">
                            {{description_Msg}}
                        </div>
                    </el-col>
                    <div style="padding-top:10px;width:800px;float:left;margin-top:10px;margin-bottom:5px">
                        <div class="grid-content bg-purple-light2 goodsSummary omit">
                            <img :src="'http://og07ks0jb.bkt.clouddn.com/' + headPhotos_Msg" class="askerImg">
                            <div style="text-align:left;line-height:25px;margin-left:55px;">{{asker_Msg}}</div>
                            <div style="float:left;width:180px;text-align:left;line-height:34px;margin-left:05px;">{{endTime_Msg}} 截止</div>
                            <div style="float:left;width:180px;" v-if="IAmAuthor">
                                <el-button type="text" @click="delQuestion()">删除此提问</el-button>
                            </div>
                            <div v-if="isSolved" style="float:right;width:180px;text-align:left;line-height:34px;margin-right:45px;">采纳时间：{{acceptTime}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 问题描述 结束-->
            <!-- 最佳答案 开始-->
            <div class="clearfix"></div>
            <div style="width:860px;border:2px dashed pink;padding-top:10px;margin-bottom:10px" v-if="existTheBest">
                <div class="goodsName  goodsName omit" style="font-weight:bold;width:860px;margin-bottom:20px;">
                    最佳答案
                </div>
                <!-- 回答区 开始 -->
                <div v-for="sn in bestQuestionList" style="width:860px;">
                    <div v-html="sn.answererDescription_Msg" style="margin-left:25px;text-align:left;font-size:14px;margin-bottom:15px;margin-top:25px">
                    </div>
                    <div style="text-align:left">
                        <div class="grid-content bg-purple-light2 goodsSummary omit" style="border-bottom:1px solid rgba(64, 25, 17, 0.19);padding-bottom:10px;margin-bottom:25px">
                            <img :src="'http://og07ks0jb.bkt.clouddn.com/' + sn.answererHeadPhotos_Msg" class="askerImg">
                            <div style="text-align:left;line-height:25px;margin-left:55px;">
                                {{sn.answererName_Msg}}
                            </div>
                            <div style="text-align:left;line-height:25px;margin-left:55px;">
                                发布于 {{sn.answererCreateTime_Msg}}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 回答区 结束 -->
                <div class="clearfix"></div>
            </div>
            <div class="goodsName  goodsName omit" style="font-weight:bold;width:860px;margin-bottom:5px;">
                {{answerAreaTips_Msg}}
            </div>
            <div class="clearfix"></div>
            <!-- 回答区 开始 -->
            <div v-for="single in questionList" style="width:860px;">
                <div v-html="single.answererDescription_Msg" style="margin-left:25px;text-align:left;font-size:14px;margin-bottom:15px;margin-top:25px">
                </div>
                <div style="text-align:left">
                    <div class="grid-content bg-purple-light2 goodsSummary omit" style="border-bottom:1px solid rgba(64, 25, 17, 0.19);padding-bottom:10px;margin-bottom:25px">
                        <img :src="'http://og07ks0jb.bkt.clouddn.com/' + single.answererHeadPhotos_Msg" class="askerImg">
                        <div style="text-align:left;line-height:25px;margin-left:55px;">
                            {{single.answererName_Msg}}
                        </div>
                        <div style="text-align:left;line-height:25px;margin-left:55px;">
                            发布于 {{single.answererCreateTime_Msg}}
                        </div>
                        <div style="float:left;margin-left:55px;width:200;" v-if="!existTheBest">
                            <div style="float:left;margin-right:10px" v-if="single.ICanDel_Msg">
                                <el-button type="text" @click="del()">删除</el-button>
                            </div>
                            <div style="float:left" v-if="IAmAuthor">
                                <el-button type="text" @click="takeIt(single.answererId_Msg)">采纳此回答</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 回答区 结束 -->
            <div class="clearfix" style="margin-bottom:30px"></div>
            <!-- 作答区 开始 -->
            <div v-if="!existTheBest">
                <div style="batext-align:left;width:860px;">
                    <v-editor :input-content="inputContent" :upload-url="uploadURL" v-model="outputContent"></v-editor>
                    <div style="float:right;margin-top:5px">
                        <el-button v-if="alreadyLogin" type="primary" size="large" @click="submit()">&nbsp;提&nbsp;交&nbsp;答&nbsp;案&nbsp;</el-button>
                        <router-link to="/tradeSystem/login">
                            <el-button v-if="notLogin" type="danger" size="large">&nbsp;请&nbsp;先&nbsp;登&nbsp;录&nbsp;</el-button>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- 作答区 结束 -->
        </div>
        <div class="clearfix"></div>
        <myFooter></myFooter>
    </div>
</template>
<script>
import myHeader from './../components/myheader'
import myFooter from './../components/myfooter'

import axios from 'axios'
import config from './../publicAPI/config'
import {
    Loading
} from 'element-ui';
import Editor from './../hsy/Editor'
import {
    Notification
} from 'element-ui';

export default {
    components: {
        myHeader,
        myFooter,
        Editor,
        'v-editor': Editor
    },
    data() {
        return {
            item: '',
            rootURL: config.URL,

            C: '',
            title_Msg: 'a',
            description_Msg: 'b',
            answerCount_Msg: '？',
            answerAreaTips_Msg: '',
            asker_Msg: '',
            endTime_Msg: '',
            acceptTime: '1',
            headPhotos_Msg: 'image/user/default.png',
            existTheBest: false,

            loading3: true, //一口价加载中
            questionList: [],
            bestQuestionList: [],
            // input content to editor 初始内容为空
            inputContent: '',
            // output content from editor 输出
            outputContent: '',
            // set image upload api url
            uploadURL: '//api.xiaogongkeji.net/xiaogong/image/uploadImage',

            alreadyLogin: false,
            notLogin: false,

            Operation_CaiNa: false,
            IAmAuthor: false,
            ICanDel: false,
            isSolved: false
        }
    },
    methods: {
        del() {
            alert('无此接口')
        },
        takeIt(answerId) {
            let that = this
            var querystring = require('querystring');
            axios.post(config.URL + '/SolutionController/acceptSolution',
                querystring.stringify({
                    id: answerId,
                    tokennum: localStorage.getItem('tokennum')
                })
            )

            .then(function(res) {
                    if (res.data.msg == '非本人操作')
                        Notification.error({
                            title: '你不是作者本人！~',
                            offset: 65,
                            duration: 2000
                        })
                    if (res.data.msg == '采纳成功') {
                        Notification.success({
                            title: '采纳成功',
                            offset: 15,
                            duration: 2000
                        })
                        that.Operation_CaiNa = true
                            // that.$router.push({path:'/tradeSystem/questionList'})
                    }
                })
                .catch(function(error) {

                    Notification.error({
                        title: '采纳时，出错哦！~',
                        offset: 65,
                        duration: 2000
                    })

                });
        },
        delQuestion() {
            let that = this

            var querystring = require('querystring');

            axios.post(config.URL + '/TechnicalQuestion/deleteTechnical_questionById',
                querystring.stringify({
                    id: that.C,
                    tokennum: localStorage.getItem('tokennum')
                })
            )

            .then(function(res) {
                    if (res.data.msg == '非本人操作！')
                        Notification.error({
                            title: '你不是作者本人！~',
                            offset: 65,
                            duration: 2000
                        })
                    else {
                        Notification.success({
                            title: '删除成功！',
                            offset: 15,
                            duration: 2000
                        })

                        that.$router.push({
                            path: '/tradeSystem/questionList'
                        })
                        window.location.reload()
                    }
                })
                .catch(function(error) {

                    Notification.error({
                        title: '删除问题时，出错哦！~',
                        offset: 65,
                        duration: 2000
                    })

                });
        },
        submit() {
            let that = this

            var querystring = require('querystring');

            axios.post(config.URL + '/SolutionController/insertSolution',
                querystring.stringify({
                    que_id: that.C,
                    description: this.outputContent,
                    tokennum: localStorage.getItem('tokennum')
                })
            )

            .then(function(res) {
                    Notification.success({
                        title: '提交成功了！',
                        offset: 15,
                        duration: 2000
                    })
                    that.questionList = [];
                    that.bestQuestionList = [];
                    // that.getSolution();
                    that.inputContent = ' '
                    that.render()
                })
                .catch(function(error) {

                    Notification.error({
                        title: '回答问题时，出错了',
                        offset: 65,
                        duration: 2000
                    })

                });
        },
        getSolution() {
            let loadingInstance = Loading.service({
                body: true
            });
            let that = this
            this.questionList = [];
            that.bestQuestionList = [];

            that.item = ''
            axios.get(that.rootURL + '/SolutionController/getSolutionsByQueId?queId=' + that.C)
                .then(function(res) {
                    if (res.data.obj == null) {
                        that.currentPage1 = 1
                    } else {
                        that.answerCount_Msg = res.data.dataCount

                        for (that.item of res.data.obj) {
                            if (that.item.isAccepted == 1) {
                                //拉答案时，检查该答案是否被采纳 ，若是，则push进bestQuestionList，否则，进questionList
                                that.isSolved = true
                                that.acceptTime = that.item.accepted_time
                                console.log(that.item.accepted_time)
                                that.bestQuestionList.push({
                                    answererId_Msg: that.item.id,
                                    answererDescription_Msg: that.item.description,
                                    answererHeadPhotos_Msg: that.item.solver.headPhotoslist[0].url,
                                    answererName_Msg: that.item.solver.name,
                                    answererCreateTime_Msg: that.item.create_time
                                })
                            } else {
                                //push进questionList再做一次判断，看看该答案是否为：访问者本人 或是 作者
                                var panDing = false
                                    //条件1、是访问者本人      条件2、是提问作者
                                if ((localStorage.getItem("account") == that.item.solver.account) || (that.IAmAuthor)) {
                                    panDing = true
                                } else {
                                    panDing = false
                                }
                                // 判断结束，将判定结果ICanDel_Msg插入到questionList中
                                that.questionList.push({
                                    answererId_Msg: that.item.id,
                                    answererDescription_Msg: that.item.description,
                                    answererHeadPhotos_Msg: that.item.solver.headPhotoslist[0].url,
                                    answererName_Msg: that.item.solver.name,
                                    answererCreateTime_Msg: that.item.create_time,
                                    ICanDel_Msg: panDing,
                                })
                            }
                        }
                        if (that.bestQuestionList != '') {
                            that.existTheBest = true
                            var otherAnswerCount = parseInt(that.answerCount_Msg) - 1;
                            if (otherAnswerCount != 0)
                                that.answerAreaTips_Msg = '其它 ' + otherAnswerCount + ' 个回答'
                        } else {
                            that.existTheBest = false
                            that.answerAreaTips_Msg = that.answerCount_Msg + '个回答'
                        }
                    }
                    loadingInstance.close();
                })
                .catch(function(error) {
                    console.error(error)
                })

        },
        getQuestionsInfo() {

            let that = this
            axios.get(that.rootURL + '/TechnicalQuestion/getTechnical_questionById?id=' + that.C + '&tokennum=' + localStorage.getItem('tokennum'))
                .then(function(res) {
                    var ite = res.data.obj
                    if (ite.is_visible != 1) {
                        that.title_Msg = (ite.title)
                        that.description_Msg = (ite.description)
                        that.endTime_Msg = (ite.end_time)
                        that.asker_Msg = (ite.user.name)
                        that.headPhotos_Msg = (ite.user.headPhotoslist[0].url)
                    } else {
                        alert('该问题已删除，将为你跳转到列表页！')
                        that.$router.push({
                            path: '/tradeSystem/questionList'
                        })
                    }

                })
                .catch(function(error) {
                    console.error(error)
                })
        },

        hsytt() {
            let that = this
            this.getQuestionsInfo();
            this.getSolution();
        },
        checkIdentity() {
            let that = this
                // 检查登陆状态（输入框）开始
            if (localStorage.getItem('tokennum') != null) {
                that.alreadyLogin = true
            } else {
                that.notLogin = true;
            }
            // 检查登陆状态（输入框）结束

            // 检查访问者是否作者本人 开始
            axios.get(that.rootURL + '/TechnicalQuestion/isQuizzer?id=' + that.C + '&tokennum=' + localStorage.getItem('tokennum'))
                .then(function(res) {
                    if (res.data.status == 'success')
                        that.IAmAuthor = true
                })
                .catch(function(error) {
                    console.error(error)
                })
                // 检查访问者是否作者本人 结束

        },

        render() {
            let that = this
            var id = this.$route.params.queID;
            that.C = id //从URL获得对应的que_id
                // console.log(that.$route.matched[0].name)
            if (that.$route.matched[0].name == 'questionDetail') {
                that.answerAreaTips_Msg = ''
                that.IAmAuthor = false //将'作者状态'初始化
                this.checkIdentity() //检查访问者的状态、身份
                this.hsytt() //拉取列表

            }
            // 否则不作任何操作
        },
    },
    created() {
        this.render()
            // that.checkIdentity()
    },
    watch: {
        'Operation_CaiNa': 'render',
        '$route': 'render'
    }
}
</script>
<style scoped>
/*goods_top的*/

.goodsName,
.goodsSummary,
.goodsNum {
    font-size: 24px;
    float: left;
    text-align: left;
    padding-left: 5px;
    font-family: "微软雅黑";
    color: rgb(70, 80, 93);
}

.goodsSummary {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 15px;
    color: rgb(163, 163, 163);
}

.goodsNum {
    float: right !important;
    margin-left: 20px !important;
    width: 330px !important;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    color: rgb(163, 163, 163);
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    background: rgba(#87a6f7, 0.59);
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
    border-radius: 6px;
}

.omit {
    width: 840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*不换行*/
}

.text {
    font-size: 16px;
}

.item {
    padding: 10px 0;
    color: #63738b
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.askerImg {
    float: left;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -2px;
}

#editor {
    height: 200px !important
}

.route {
    font-family: '微软雅黑';
    font-size: 14px;
}
</style>
