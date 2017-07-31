<template>
    <div style="margin-top:-70px;margin-left:-300px;width:100px;">
        <br/>
        <el-form class="demo-ruleForm">
        </el-form>
        <div v-if="isShow" style="width:960px;margin-left:20px;margin-top:40px">
            <el-table :data="tableData">
                <el-table-column prop="patentID" label="技术ID" min-width="80px">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.patentID }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="patentName" label="技术名字" min-width="140px">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.patentName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" min-width="235px">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" min-width="200px">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="100px">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200px">
                    <template scope="scope">
                        <a @click="viewDetail(scope.$index, scope.row)">查看</a>
                        <a v-if="scope.row.operation" @click="sell(1,scope.$index, scope.row)">拍卖</a>
                        <a v-if="scope.row.operation" @click="sell(2,scope.$index, scope.row)">出售</a>
                    </template>
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
        sell(type, id, item) {
            console.log("2121212" + item);
        },
        viewDetail(id, item) {
            console.log(item);
        },
        getRecord() {
            this.isShow = true
            let that = this
            axios.get(config.URL + '/patent/getMyReleasedPatent?page=' + that.currentPage + '&pageSize=' + that.pageSize + '&tokennum=' + localStorage.getItem('tokennum') )
                .then(function(res) {
                    that.tableData = []
                    that.totalPage = Math.ceil(res.data.dataCount / that.pageSize)
                    that.total = res.data.dataCount
                    var item = res.data.obj
                    if (item != null)
                        for (item of res.data.obj) {
                          if(item.status == 0)
                            that.tableData.push({
                                patentID: item.id,
                                patentName: item.name,
                                description: item.description,
                                date: item.create_time,
                                status: item.status == 0 ? '未上架' : (item.status == 1 ? '拍卖中' : (item.status == 2 ? '出售中' : '已出售')),
                                operation: item.status == 0 ? true : false
                            });
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
