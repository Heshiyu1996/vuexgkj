<template>
    <div style="height:auto;margin-top:-30px;width:600px;margin-left:-100px">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="专利名称" class="patent">
                <el-input v-model="form.name" id="name"></el-input>
            </el-form-item>
            <el-form-item label="专利编号" class="patent">
                <el-input v-model="form.patent_num" id="patent_num"></el-input>
            </el-form-item>
            <el-form-item label="专利目录">
                <div style="float:left">
                    <el-select v-model="form.catalog1" @change="getTwo" placeholder="一级目录">
                        <el-option v-for="ite in options" :label="ite.label" :value="ite.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="float:left">
                    <el-select v-if="show2" v-model="form.catalog2" placeholder="二级目录" @change="getThree">
                        <el-option v-for="item in options2" :label="item.label2" :value="item.value2">
                        </el-option>
                    </el-select>
                </div>
                <div style="float:left">
                    <el-select v-if="show3" v-model="form.catalog3" placeholder="三级目录">
                        <el-option v-for="item in options3" :label="item.label3" :value="item.value3">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="专利描述">
                <el-input type="textarea" v-model="form.description" id="description"></el-input>
            </el-form-item>
            <el-form-item label="物品用途">
                <el-input type="textarea" v-model="form.purpose" id="purpose"></el-input>
            </el-form-item>
            <el-form-item label="设计说明">
                <el-input type="textarea" v-model="form.design"></el-input>
            </el-form-item>
            <el-form-item label="专利图片">
                <el-upload class="upload-demo" :multiple="true" action="//api.xiaogongkeji.net/xiaogong/image/uploadImage" :on-preview="handlePreview" :on-remove="handleRemove" :data="extraData" name="img" :thumbnail-mode="true" :file-list="fileList" :on-success="successUpload" :before-upload="beforeUpload" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publish">发布</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../../publicAPI/config'
// import Seller_publishing from './../personalCenter/Seller_publishing'
import {
    Message,
    Notification
} from 'element-ui'; //信息提示框

export default {
    data() {
            return {
                rootURL: config.URL,
                activeName: 'first',
                form: {
                    patent_num: '',
                    name: '',
                    catalog1: '',
                    catalog2: '',
                    catalog3: '',
                    description: '',
                    purpose: '',
                    design: '',
                    imgs: ''
                },
                catalogs: [],
                //图片上传
                fileList: [],
                extraData: {
                    type: 2, //专利图片
                    tokennum: localStorage.getItem('tokennum')
                },
                imgMaxCount: 5,
                imgCount: 0,
                imgArr: [],

                //目录选择器 开始
                options: [{
                    value: '1',
                    label: '车身'
                }, {
                    value: '2',
                    label: '车灯'
                }, {
                    value: '3',
                    label: '发动机'
                }, {
                    value: '4',
                    label: '车架'
                }, {
                    value: '5',
                    label: '喷漆'
                }, {
                    value: '6',
                    label: '底盘'
                }, {
                    value: '7',
                    label: '电气设备'
                }, {
                    value: '8',
                    label: '模型'
                }, {
                    value: '9',
                    label: '汽车库'
                }, {
                    value: '10',
                    label: '软件'
                }],

                options2: [],
                options3: [],
                show2: true,
                show3: true
                    //目录选择器 结束

            }
        },
        // mounted: function() {
        //     this.$nextTick(function() {
        //         this.getAllCatalog();
        //     })
        // },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            onSubmit() {
                console.log('submit!');
            },
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
                    alert("超过图片最大上传张数");
                    return false;
                }
            },
            handleRemove(file, fileList) {
                this.imgArr.pop();
                console.log(this.imgArr);
                this.imgCount--;
            },
            handlePreview(file) {
                console.log(file);
            },
            // getAllCatalog() {
            //     let that = this;
            //     this.catalogs = [];
            //     axios.get(that.rootURL + '/patent_catalog/getAllPatentCatalog')
            //         .then(function(res) {
            //             if (res.data.obj == null)
            //                 alert("网络错误，获取专利目录失败")
            //             else {
            //                 console.log(res.data.obj);
            //
            //                 function Liandong(array) {
            //                     this.array = array;
            //                     this.indexName = '';
            //                     this.obj = '';
            //                     this.subSelectChange = function(selectName1, selectName2) {
            //                         var obj1 = document.all[selectName1];
            //                         var obj2 = document.all[selectName2];
            //                         var objName = this.toString();
            //                         var me = this;
            //                         obj1.onchange = function() {
            //                             me.optionChange(this.options[this.selectedIndex].value, obj2.id)
            //                         }
            //                     }
            //                     this.firstSelectChange = function(indexName, selectName) {
            //                         this.obj = document.all[selectName];
            //                         this.indexName = indexName;
            //                         this.optionChange(this.indexName, this.obj.id);
            //                     }
            //                     this.optionChange = function(indexName, selectName) {
            //                         var obj1 = document.all[selectName];
            //                         var me = this;
            //                         obj1.length = 0;
            //                         obj1.options[0] = new Option("请选择", '');
            //                         for (var i = 0; i < this.array.length; i++) {
            //                             if (this.array[i][1] == indexName) {
            //                                 obj1.options[obj1.length] = new Option(this.array[i][2], this.array[i][0]);
            //                             }
            //                         }
            //                     }
            //                 }
            //                 var arr = new Array(); //数据格式 ID，父级ID，名称 arr[0] = new Array("1", "0", "目录1");
            //                 for (var i = 0; i < res.data.obj.length; i++) {
            //                     res.data.obj[i].id
            //                     arr[i] = new Array(res.data.obj[i].id, res.data.obj[i].parent_id, res.data.obj[i].name);
            //                 }
            //                 var liandong2 = new Liandong(arr);
            //                 liandong2.firstSelectChange("0", "cate1");
            //                 liandong2.subSelectChange("cate1", "cate2")
            //                 liandong2.subSelectChange("cate2", "cate3")
            //             }
            //         })
            //         .catch(function(error) {
            //             console.error(error);
            //         })
            // // },
            getTwo(data) {
                console.log(data);
                let that = this
                that.options2 = []
                that.form.catalog2 = ''
                axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
                    .then(function(res) {
                        if (res.data.obj != null) {
                            for (var it of res.data.obj)
                                that.options2.push({
                                    label2: it.name,
                                    value2: it.id,
                                })
                            that.form.catalog2 = that.options2[0].value2
                            that.show2 = true
                        } else {
                            that.show2 = false
                            console.log('2' + res.data.msg)
                        }
                    })
                    .catch(function(error) {
                        console.error(error)
                    })
            },
            getThree(data) {
                console.log(data);
                let that = this
                that.options3 = []
                that.form.catalog3 = ''
                axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
                    .then(function(res) {
                        if (res.data.obj != null) {
                            for (var it of res.data.obj)
                                that.options3.push({
                                    label3: it.name,
                                    value3: it.id,
                                })
                            that.form.catalog3 = that.options3[0].value3
                            that.show3 = true
                        } else {
                            console.log('3' + res.data.msg)
                            that.show3 = false
                        }
                    })
                    .catch(function(error) {
                        console.error(error)
                    })
            },

            publish() {
                var querystring = require('querystring'); //Json数据查询器
                let that = this;
                this.form.imgs = '';
                if (this.imgArr.length > 0) {
                    for (var i = 0; i < this.imgArr.length; i++) {
                        if (i == 0) {
                            this.form.imgs = this.imgArr[i];
                        } else {
                            this.form.imgs += "," + this.imgArr[i];
                        }
                    }
                }
                console.log(this.form.imgs);
                axios.post(config.URL + '/patent/addPatent',
                        querystring.stringify({
                            patent_num: that.form.patent_num,
                            name: that.form.name,
                            description: that.form.description,
                            catalog1: that.form.catalog1,
                            catalog2: that.form.catalog2,
                            catalog3: that.form.catalog3,
                            purpose: that.form.purpose,
                            design: that.form.design,
                            imgs: that.form.imgs,
                            tokennum: localStorage.getItem('tokennum')
                        }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                    )
                    .then(function(res) {
                        if (res.data.status == 'success') {
                            alert('发布成功！');
                            // window.location = '#/personalCenter/Seller_publishing';
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function(error) {
                        console.error('发布失败！请检查所填信息的正确性');
                    });
            },
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.middle-bottom {
    position: relative;
    top: -10px;
    width: 1200px;
    height: 430px;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 50px;
    background-color: rgba(550, 330, 344, 0);
}

.hint {
    width: 100%;
    height: 50px;
}

.patent {
    display: inline-block;
}

.choose1 {
    display: inline-block;
    width: 150px;
    margin-left: 0px;
}

.choose2 {
    padding-left: 0px;
    margin-left: 0px;
    display: inline-block;
    width: 100px;
}

.choose3 {
    display: inline-block;
    width: 200px;
    margin-left: 49px
}
</style>
