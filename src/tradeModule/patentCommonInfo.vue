<template>
    <div>
        <!-- 头部 -->
        <myHeader></myHeader>
        <div style="width:900px;margin:0 auto;text-align:center;">
            <div style=" float: left;margin:0px 0px 5px 0px" class="guide">
              <el-breadcrumb separator="/">
                  <div style="float:left;color:rgb(71,86,105);margin-top:10px" class="route">您的位置：</div>
                  <el-breadcrumb-item v-for="single in paths_Msg">
                          <el-button type="text" style="font-size: 16px;font-family:'微软雅黑';" @click="setLocalStorage(single.id)">
                            {{single.name}}
                          </el-button >
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                          <div type="text" style="margin-top:10px;font-size: 16px;font-family:'微软雅黑';">
                            {{name_Msg}}
                          </div >
                  </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <!-- 面包屑结束 -->
            <br>
            <br>
            <!-- 专利信息头部开始-->
            <div style="float:left;width:810px;height:60px;margin-bottom:8px">
                <div type="flex" class="row-bg goodsName" justify="space-between">
                    <div :title="name_Msg" class="grid-content bg-purple  goodsName omit" style="font-weight:bold;width:860px;">
                        {{name_Msg}}
                        <div class="grid-content bg-purple-light goodsNum omit" style="text-align:left;width:150px">
                            <el-tooltip content="想要？快联系我吧~！！" placement="top" effect="light">
                                &nbsp;&nbsp;所有者：{{seller_Msg}}
                            </el-tooltip>
                        </div>
                    </div>
                    <el-col :span="19" :title="purpose_Msg">
                        <div class="grid-content bg-purple-light2 goodsSummary omit">
                            {{purpose_Msg}}
                        </div>
                    </el-col>
                </div>
            </div>
            <!-- 专利信息头部结束-->
            <!-- 展示图开始 -->
            <div style="width:860px;border:1px dashed rgba(186, 192, 193, 0.6);padding:8px;float:left">
                <el-carousel v-if="sho" :interval="4000" type="card" height="350px" indicator-position="outside">
                    <el-carousel-item v-for="sin in photosList">
                        <div style="height:100%;text-align:center;">
                            <img :src="sin" style="height:100%;width:100%">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 展示图结束 -->
            <div style="margin-top:20px">
                <!-- 专利描述开始 -->
                <div style="float:left">
                    <!-- <goods_info type="1" :bridge="C"></goods_info> -->
                    <div>
                        <el-collapse v-model="activeNames" style="width:861px">
                            <el-collapse-item title="商品描述" name="1">
                                <div>{{descrip_Msg}}</div>
                            </el-collapse-item>
                            <el-collapse-item title="设计说明" name="2">
                                <div>{{design_Msg}}</div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
</template>
<script>
import myHeader from './../components/myheader'
import pic from './../components/smallPic'
import goods_info from './../components/goods_info'
import buy from './../components/goods_buy'
import myFooter from './../components/myfooter'


import axios from 'axios'
import config from './../publicAPI/config'

export default {
    components: {
        myHeader,
        // myRoute,
        top,
        pic,
        goods_info,
        // priceInfo,
        buy,
        myFooter
    },
    data() {
        return {
            item: '',
            rootURL: config.URL,
            xx: [
                require('./../assets/img/withoutPic.png'),
            ],
            C: '',
            name_Msg: '正在拉取...',
            purpose_Msg: '正在拉取...',
            paths_Msg: [],
            seller_Msg: '正在拉取...',
            activeNames: ['1', '2'],
            descrip_Msg: '正在拉取...',
            design_Msg: '正在拉取...',
            sho: false,
            photosList: []
        }
    },
    // mounted: function() {
    //     this.$nextTick(function() {
    //         this.hsytt();
    //     })
    // },
    methods: {
        setLocalStorage(id){
            let that = this
            localStorage.setItem('catID',id)
            that.$router.push({path:'/tradeSystem/search/byCategory'})
        },
        getCommonInfo() {
            let that = this
            axios.get(that.rootURL + '/patent/getPatentById?id=' + that.C)
                .then(function(res) {
                    that.goodsDescription_Msg = ''
                    var ite = res.data.obj
                    that.goodsDescription_Msg = (ite.description)
                    that.name_Msg = (ite.name)
                    that.purpose_Msg = (ite.purpose)
                    that.seller_Msg = (ite.user.name)
                    if (ite.catalog1en != null) {
                        that.paths_Msg.push({id:ite.catalog1en.id,name:ite.catalog1en.name})
                        if (ite.catalog2en != null) {
                            that.paths_Msg.push({id:ite.catalog2en.id,name:ite.catalog2en.name})
                            if (ite.catalog3en != null) {
                                that.paths_Msg.push({id:ite.catalog3en.id,name:ite.catalog3en.name})
                                if (ite.catalog4en != null) {
                                    that.paths_Msg.push({id:ite.catalog4en.id,name:ite.catalog4en.name})
                                }
                            }
                        }
                    }
                    // that.paths_Msg.push(ite.name);
                    that.photosList = [];
                    for (var i of ite.patentImages) {
                        if (i.url != null) {
                            that.photosList.push(('http://og07ks0jb.bkt.clouddn.com/' + i.url));
                        }
                    }
                    if (that.photosList.length == 0) {
                        that.photosList = that.xx;
                    }
                    console.log(that.photosList);
                    that.sho = true;
                    that.descrip_Msg = ite.description;
                    that.design_Msg = ite.design;
                })
                .catch(function(error) {
                    console.error(error)
                })
        },

        hsytt() {
            let that = this
            var id = this.$route.params.patentID;
            // alert(id)
            that.C = id
            this.getCommonInfo();
        },
        render(){
            let that = this
            // console.log(that.$route.matched[0].name)
            if(that.$route.matched[0].name == 'patentCommonInfo'){
            // that.buyNow = false
            // that.notExist = false
            // that.notLogin = false
              that.paths_Msg=[]
            that.sho = false
            this.hsytt()
          }
          // 否则不作任何操作
        },
    },
    created() {
        this.hsytt()
    },
    watch:{
      '$route':'render'
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigFrame {
    border-style: dashed;
    margin: 0 auto;
    width: 1140px;
    margin-top: 10px;
    border-color: rgb(160, 160, 160);
}

.biankuang tr td {
    text-align: right;
    padding-right: 18px
}

.buttons tr td button {
    width: 318px;
    height: 46px;
    border: 1px solid #377ab7;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #377ab7;
    padding: 3px 10px;
}

.buttons tr td button:hover {
    background: #276387;
    border: 1px solid #377ab7;
}

.buttons button {
    width: 318px;
    height: 46px;
    border: 1px solid #2E426C;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #2E426C;
    padding: 3px 10px;
}

.buttons button:hover {
    background: #215a78;
    border: 1px solid #377ab7;
}


/*goods_top的*/

.goodsName,
.goodsSummary {
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
    width: 180px !important;
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
    height: 65px;
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


/*面包屑的*/

.guide {
    font-family: '宋体';
    width: 1110px;
    margin: 0 auto;
    margin-top: 5px;
}

.route {
    font-family: '微软雅黑';
    font-size: 16px
}


/*priceInfo的*/

.attr {
    float: left;
    line-height: 30px;
}

.block {
    text-align: right;
    border-bottom: 1px dashed gray
}

.infoTop {
    float: right;
    margin-top: -12px;
    margin-right: -10px
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

.box-card {
    width: 330px;
    height: 325px
}

.shanshuo:hover {
    text-shadow: 0 0 10px #42a0dd;
    opacity: 1;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
</style>
