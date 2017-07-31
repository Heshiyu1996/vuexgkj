<template>
  <div>
    <p>您的账户当前余额：<big>￥</big><big>{{ balance }}</big></p><br/>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查看明细</el-button>
      </el-form-item>

    </el-form>
    <div v-if="isShow">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading.body="loading3" element-loading-text="拼命加载中">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="方式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count = "totalPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框

  export default {
    components: {
    },
    data() {
    return {
      isShow: false,
      balance: '--',//数据由数据库返回
      activeName: 'first',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      type:'0',

		  loading3: true, //一口价加载中
    };
  },
  created(){
      let that = this
      axios.get(config.URL+'/userWallet/getMyWallet?' + '&tokennum='+ localStorage.getItem('tokennum'))
        .then(function(res){
          that.balance = res.data.obj.able_balance;
        })
        .catch(function(error){
          console.error(error)
        })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
        this.pageSize = val;

        this.submitForm();
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.submitForm();
        console.log(`当前页: ${val}`);
    },
    submitForm() {
        this.isShow = true
        let that = this
  			this.loading3 = true
        axios.get(config.URL+'/userWallet/getWalletLogByUserId?page='+ that.currentPage +'&pageSize=' + that.pageSize + '&tokennum='+ localStorage.getItem('tokennum'))
          .then(function(res){
            that.tableData = []
            that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
            for( var item of res.data.obj ) {
              that.tableData.push({
                date: item.create_time,
                name: item.user_name,
                type: item.type_name,
                money: item.amount,
              })

  						that.loading3 = false
          }
          })
          .catch(function(error){
            console.error(error)
          })
      },
  }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row{
    width: 800px;
  }
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
  }
  .bodyBG{
    background-image: url(../assets/img/userBG.jpg);
    background-size: 100% 508px;
    min-height: 508px
  }
  .middle{
    margin: 0 auto;
    padding-top:20px;
    min-height: 508px;
    width: 1200px;
    background-color: rgba(218,230,244,0.9);/*#dae6f4*/
  }
  .hint{
    width: 100%;
    height:50px;
  }
  .el-tab-pane{
    margin: 40px 300px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }
  big{
    color: #20a0ff;
  }
  .block{
    margin-top: 25px;
    text-align: right;
  }
</style>
