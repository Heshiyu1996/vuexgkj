<template>
    <div style="margin-top:-70px;margin-left:-110px">
        <br/>
        <el-form class="demo-ruleForm">
        </el-form>
        <div v-if="isShow" style="width:850px;margin-left:-110px;margin-top:40px">
            <el-table :data="tableData">
                <el-table-column prop="aucID" label="拍卖ID" min-width="100px">
                </el-table-column>
                <el-table-column prop="patentName" label="专利名字" min-width="150px">
                </el-table-column>
                <el-table-column prop="sellerName" label="卖家" min-width="100px">
                </el-table-column>
                <el-table-column prop="price" label="竞拍价" min-width="120px">
                </el-table-column>
                <el-table-column prop="date" label="时间" min-width="220px">
                </el-table-column>
                <el-table-column prop="status" label="竞拍状态" min-width="140px">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-count="totalPage" :page-sizes="[10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
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
            isShow: false,
            balance: '--', //数据由数据库返回
            activeName: 'first',
            tableData: [], //数据列表数组
            total: 0, //总记录数
            totalPage: 0, //总页数
            currentPage: 1, //当前页
            pageSize: 10, //一页显示记录数
        };
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getRecord();
        })
    },
    methods: {
        handleClick(tab, event) {},
        handleSizeChange(val) {
            this.pageSize = val;
            this.getRecord();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.tableData = [];
            this.getRecord();
        },
        getRecord() {
            this.isShow = true
            let that = this
            axios.get(config.URL + '/orderAuction/getUserAuctionLog?page=' + that.currentPage + '&pageSize=' + that.pageSize + '&tokennum=' + localStorage.getItem('tokennum'))
                .then(function(res) {
                    that.tableData = []
                    that.totalPage = Math.ceil(res.data.dataCount / that.pageSize)
                    that.total = res.data.dataCount
                    var item = res.data.obj
                    if (item != null)
                        for (item of res.data.obj) {
                            that.tableData.push({
                                aucID: item.auction_id,
                                patentName: item.patent_name,
                                sellerName: item.seller_name,
                                price: item.price,
                                date: item.create_time,
                                status: item.status == 1 ? '进行中' : '已结束'
                            })
                        }
                })
                .catch(function(error) {
                    console.error(error)
                })
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

big {
    color: #20a0ff;
}

.block {
    margin-top: 25px;
    text-align: right;
}
</style>
