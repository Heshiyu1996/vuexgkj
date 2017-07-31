<template>
  <div style="margin-top:-70px;margin-left:-280px;width:100px;">

        <br/>
        <el-form class="demo-ruleForm">
        </el-form>
        <div v-if="isShow" style="width:960px;margin-left:0px;margin-top:40px;">
            <el-table :data="tableData" style="width: 100%" >
              <el-table-column width="100px" label="技术ID">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.auc_id }}</el-button>
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="100px" label="技术名字">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.auc_name }}</el-button>
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="140px" label="描述">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.auc_Description }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="100px" label="起始价">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <div type="text">{{ scope.row.auc_startPrice }}</div>
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="100px" label="最低涨幅">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <div type="text">{{ scope.row.auc_minIncrement }}</div>
                    </div>
                </template>

              </el-table-column>
              <el-table-column width="100px" label="当前价">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.auc_currentPrice }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="180px" label="发布时间">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.start_date }}
                    </div>
                </template>
              </el-table-column>
              <el-table-column width="138px" label="状态">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <div style="color:orange">{{ scope.row.auc_status }}</div>
                    </div>
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

        getRecord() {
            this.isShow = true;
            let that = this;
            axios.get(config.URL + '/orderAuction/getMyOrderAuction?page=' + that.currentPage + '&pageSize=' + that.pageSize + '&tokennum=' + localStorage.getItem('tokennum'))
                .then(function(res) {
                    that.tableData = []
                    that.totalPage = Math.ceil(res.data.dataCount / that.pageSize)
                    that.total = res.data.dataCount
                    var item = res.data.obj
                    var status
                    for (item of res.data.obj) {
                      if(item.status=="1"){
                        status = '进行中'
                      }else{
                        status = '已结束'
                      }
                        that.tableData.push({
                            auc_id:item.id,
                            auc_name: item.patent.name,
                            auc_startPrice:item.start_price,
                            auc_Description: item.description,
                            auc_minIncrement:item.min_increment,
                            auc_currentPrice:item.current_price,
                            start_date: item.start_time,
                            auc_status: status
                        });
                    }
                })
                .catch(function(error) {
                    console.error(error)
                })
        },
        goToDetail(index, row) {
          let that = this
          console.log(index, row);

          that.$router.push({path:'/Patent/auctionInfo/'+row.auc_id})
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
