<template>
    <div style="height:400px;margin-top:-30px">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="专利ID" class="patent">
                <el-select v-model="form.patent_id" placeholder="请选择" @change="itemSelected()">
                    <el-option v-for="item in tableData" :label="item.patentName" :value="item.patentID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专利描述">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <!-- <div style="margin-left: 80px;display: inline-block;position: relative;top: -15px;">
      <el-upload action="//jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :default-file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div class="el-upload__tip" style="display: inline-block;margin-left: 10px" slot="tip">未选择文件</div>
      </el-upload></div> -->
            <el-form-item label="发布类型">
                <el-radio-group v-model="form.type" @change="typeSelected">
                    <el-radio :label="1">一口价</el-radio>
                    <el-radio :label="2" class="auction">升价拍卖</el-radio>
                    <el-radio :label="3" class="auction">降价拍卖</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.type==1" label="一口价" class="patent">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <div style="float:left">
            <el-form-item v-if="form.type>1" label="最低价格" class="patent">
                <el-input v-model="form.min_price"></el-input>
            </el-form-item>
          <div style="float:left">
            <el-form-item v-if="form.type>1" label="起始价格" class="patent">
                <el-input v-model="form.start_price"></el-input>
            </el-form-item>
          </div>
            <el-form-item v-if="form.type==2" label="最低涨幅" class="patent">
                <el-input v-model="form.min_increment"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type==3" label="最低降幅" class="patent">
                <el-input v-model="form.min_decrease"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type>1" label="保证金" class="patent">
                <el-input v-model="form.cash_deposit"></el-input>
            </el-form-item>
            <el-form-item v-if="form.type>1" label="结束时间" class="time">
                <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" @change="datetimeChange">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sell">出售</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import config from './../../publicAPI/config'

export default {
    data() {
      return {
        rootURL: config.URL,
        activeName: 'second',
        form: {
            patent_id: '',
            description: '',
            price: '',
            type: 2,
            start_price: '',
            min_price: '',
            min_increment: '',
            min_decrease: '',
            cash_deposit: '',
            end_time: ''
        },
        tableData: []
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getRecord();
            })
        },
        methods: {
            datetimeChange(value) {
                console.log(value);
                this.form.end_time = value;
                console.log(this.form.end_time);
            },
            sell() {
                var querystring = require('querystring'); //Json数据查询器
                var tokennum = localStorage.getItem("tokennum");
                console.log(this.form.end_time);
                let that = this;
                if (this.form.type == 2) { //升价拍卖
                    axios.post(config.URL + '/orderAuction/addAscOrderAuction',
                            querystring.stringify({
                                patent_id: that.form.patent_id,
                                description: that.form.description,
                                min_price: that.form.min_price,
                                start_price: that.form.start_price,
                                min_increment: that.form.min_increment,
                                cash_deposit: that.form.cash_deposit,
                                end_time: that.form.end_time.toString(),
                                tokennum: tokennum
                            }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                        )
                        .then(function(res) {
                            if (res.data.status == 'success')
                                alert('出售成功！')
                            else {
                                alert(res.data.msg)
                            }
                        })
                        .catch(function(error) {
                            console.error('出售失败！请检查所填信息的正确性');
                        });
                } else if (this.form.type == 3) { //降价拍卖
                    axios.post(config.URL + '/orderAuction/addDescOrderAuction',
                            querystring.stringify({
                                patent_id: that.form.patent_id,
                                description: that.form.description,
                                min_price: that.form.min_price,
                                start_price: that.form.start_price,
                                min_decrease: that.form.min_decrease,
                                cash_deposit: that.form.cash_deposit,
                                end_time: that.form.end_time.toString(),
                                tokennum: tokennum
                            }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                        )
                        .then(function(res) {
                            if (res.data.status == 'success')
                                alert('出售成功！')
                            else {
                                alert(res.data.msg)
                            }
                        })
                        .catch(function(error) {
                            console.error('出售失败！请检查所填信息的正确性');
                        });
                } else if (this.form.type == 1) { //一口价
                    axios.post(config.URL + '/orderfixedprice/addOrderFixedPrice',
                            querystring.stringify({
                                patent_id: that.form.patent_id,
                                price: that.form.price,
                                description: that.form.description,
                                tokennum: tokennum
                            }) //将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                        )
                        .then(function(res) {
                            if (res.data.status == 'success')
                                alert('出售成功！')
                            else {
                                alert(res.data.msg)
                            }
                        })
                        .catch(function(error) {
                            console.error('出售失败！请检查所填信息的正确性');
                        });
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            onSubmit() {
                console.log('submit!');
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            itemSelected() {
                console.log(this.form.patent_id);
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].patentID == this.form.patent_id) {
                        this.form.description = this.tableData[i].description;
                        console.log(this.form.description);
                        break;
                    }
                }
            },
            typeSelected() {
                if (this.form.type == 1) {
                    // alert('paimai');
                } else {
                    // alert('yikoujia');
                }
            },
            getRecord() {
                let that = this;
                axios.get(config.URL + '/patent/getMyReleasedPatent?page=1&pageSize=500&tokennum=' + localStorage.getItem('tokennum'))
                    .then(function(res) {
                        that.tableData = [];
                        var item = res.data.obj;
                        if (item != null)
                            for (item of res.data.obj) {
                                if (item.status != 0) {
                                    continue;
                                }
                                that.tableData.push({
                                    patentID: item.id,
                                    patentName: item.name,
                                    description: item.description
                                });
                            }
                    })
                    .catch(function(error) {
                        console.error(error)
                    })
            }
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
    width: 100px;
}

.auction {
    /*display: block;*/
}

.time {
    margin-top: 10px;
}
</style>
