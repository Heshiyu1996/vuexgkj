<template>
  <div style="margin-top:-90px;margin-left:-300px">
    <br/>
    <el-form  class="demo-ruleForm">
    </el-form>
    <div v-if="isShow" style="width:1000px;margin-left:10px;margin-top:40px">
      <el-table
        :data="tableData">

        <el-table-column
          prop="orderNum"
          label="流水号"
          min-width=200px>
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="买家"
          min-width=100px>
        </el-table-column>
        <el-table-column
          prop="productID"
          label="商品ID"
          min-width=100px>
        </el-table-column>
        <el-table-column
          prop="type"
          label="订单类型"
          min-width=100px>
        </el-table-column>
        <el-table-column
          prop="price"
          label="金额"
          min-width=150px>
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="创建时间"
          min-width=220px>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width=120px>
        </el-table-column>
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-count = "totalPage"
          :page-sizes="[5]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../publicAPI/config'
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

            totalPage: 0,  //一口价总页数
      		  currentPage: 1,  //一口价当前页
      		  pageSize: 5,  //一口价每页记录
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
        this.pageSize = val;

        this.getRecord();
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.tableData = [];
        this.getRecord();
        console.log(`当前页: ${val}`);
    },
    getRecord() {
        this.isShow = true
        let that = this
        axios.get(config.URL+'/order/getMySelledContracts?page='+ that.currentPage +'&pageSize=' + that.pageSize + '&tokennum='+ localStorage.getItem('tokennum'))
          .then(function(res){
            that.tableData = []
            that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
            that.total = res.data.dataCount
            var item = res.data.obj
                        if(item!=null)
            for(  item of res.data.obj ) {
              that.tableData.push({
                orderNum: item.order_num,
                buyer: item.buyer.name,
                productID: item.product_id,

                type:item.type == 1 ? '一口价' : '拍卖',
                price: item.price,
                // purpose: item.seller_name,
                startDate: item.create_time,

                status:item.state == 2 ? '介入中' : '待买家付款'
              })


          }
          })
          .catch(function(error){
            console.error(error)
          })
      },
  },
  created(){
    this.getRecord()
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
    background-size: 100% 508px;
    min-height: 508px
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
