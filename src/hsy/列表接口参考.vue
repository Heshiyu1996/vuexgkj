<template>
  <div>
  	<myHeader></myHeader>
  	<div class="clearfix"></div>

  	<div id="home-tb-div">


  		<div>
  		    <h1 style="font-family:'Hiragino Sans GB';margin-top:80px;margin-bottom:15px;">一口价</h1>
  	   		<el-table :data="tableData" style="width: 100%" v-loading.body="loading3" element-loading-text="拼命加载中">

  		      <el-table-column prop="TB_name" label="专利名称">
  		      </el-table-column>

            <el-table-column prop="TB_currentPrice" label="当前价">
  		      </el-table-column>
  		      <el-table-column prop="TB_seller" label="卖家">
  		      </el-table-column>
  		      <el-table-column prop="TB_id" label="专利id">
  		      </el-table-column>
  		    </el-table>

  		    <div class="block">
  	   		<!-- <el-button type="primary">查看全部</el-button> -->
  			    <el-pagination
  			      @size-change="handleSizeChange"
  			      @current-change="handleCurrentPageChange"
  			      :current-page="currentPage"
  			      :page-count = "totalPage"
  			      :page-sizes="[10, 20, 30, 40]"
  			      :page-size="pageSize"
  			      layout="total, sizes, prev, pager, next, jumper">
  			    </el-pagination>
  			  </div>
  		</div>

	   </div>
	<div class="clearfix"></div>
   	<myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './../components/myheader'
import myFooter from './../components/myfooter'

import config from './../publicAPI/config'
import axios from 'axios'

export default {
	components:{
		myHeader,
    myFooter,
	},
	data () {
		return {
		  rootURL: config.URL,	//请求的url
		  tableData:[], 	//一口价表格的内容
		  loading3: true, //一口价加载中

      totalPage: 0,  //一口价总页数
		  currentPage: 1,  //一口价当前页
		  pageSize: 10,  //一口价每页记录
		}
	},
	methods:{
		getListByYiKouJia(){
			let that = this
			this.loading3 = true
			axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceList?page='+ that.currentPage +'&pageSize=' + that.pageSize + '&tokennum='+ localStorage.getItem('xgtoken'))
				.then(function(res){
					that.tableData = []
					that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
					for( var item of res.data.obj ) {
						that.tableData.push({
							TB_name: item.patent.name,
							TB_currentPrice: item.price,
							TB_seller: item.seller.name,
							TB_id: item.id,
						})
						that.loading3 = false

					}
				})
				.catch(function(error){
					console.error(error)
				})
		},


	    handleSizeChange(val) {
          this.pageSize = val;
          this.getListByYiKouJia();
          console.log(`每页 ${val} 条`);
	    },
	    handleCurrentPageChange(val) {
          this.currentPage = val;
          this.getListByYiKouJia();
          console.log(`当前页: ${val}`);
	    }
	},
	created(){
		this.getListByYiKouJia();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
	text-align: center;
	color: #475669;
	font-size: 28px;
}
/*首页交易情况*/
#home-tradeAmt{
	margin-top: 30px;
	margin-bottom: 50px;
	text-align: center;
	color:#444;
}
#home-tradeAmt span{
	color:#FF4949;
	font-size: 22px;
}
/*首页的表格*/
#home-tb-div{
	width: 1000px;
	margin: 0 auto;
	margin-top: 60px !important;
	margin-bottom: 60px;
}
/*分页*/
.block{
	margin-top: 24px;
}
.el-pagination{
	float: right;
}
</style>
