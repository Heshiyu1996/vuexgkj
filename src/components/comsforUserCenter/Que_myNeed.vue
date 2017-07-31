<template>
    <div style="margin-top:-50px;margin-left:-180px">
        <br/>
        <el-form class="demo-ruleForm">
        </el-form>
        <div v-if="isShow" style="width:1002px;margin-left:0px;margin-top:40px;">
            <!-- <el-table :data="tableData">
                <el-table-column prop="needTitle" label="标题" min-width="170px">
                </el-table-column>
                <el-table-column prop="needDescription" label="问题描述" min-width="600px">
                </el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="230px">
                </el-table-column>
            </el-table> -->
            <el-table :data="tableData" style="width:960px" >

              <el-table-column prop="TB_title"  width="250px" label="标题">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper " >
                      <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.needTitle }}</el-button>
                    </div>
                </template>

              </el-table-column>

              <el-table-column width="350px" label="问题描述">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.needDescription }}
                    </div>
                </template>

              </el-table-column>
              <el-table-column label="发布时间">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.date }}
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
import {Message} from 'element-ui'; //信息提示框

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
    // mounted: function() {
    //     this.$nextTick(function() {
    //         this.getRecord();
    //     })
    // },
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
            axios.get(config.URL + '/TechnicalQuestion/getTechnicalQuestionsByUser_id?page=' + that.currentPage + '&pageSize=' + that.pageSize + '&tokennum=' + localStorage.getItem('tokennum'))
                .then(function(res) {
                    that.tableData = []
                    that.totalPage = Math.ceil(res.data.dataCount / that.pageSize)
                    that.total = res.data.dataCount
                    var item = res.data.obj
                    for (item of res.data.obj) {
                        that.tableData.push({
                            queId:item.id,
                            needTitle: item.title,
                            needDescription: item.description,
                            date: item.create_time
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

          that.$router.push({path:'/tradeSystem/questionDetail/'+row.queId})
        },
    },
    created(){
      this.getRecord()
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
    /*background-image: url(../assets/img/userBG.jpg);*/
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
