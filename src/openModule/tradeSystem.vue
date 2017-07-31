<template>
  <div>
    <router-view>
    </router-view>
    <div class="clearfix"></div>
    <!-- 首页轮播 开始 -->
    <div id="home-tb-lunbo" style="width:1210px;text-align:center;">
      <div style="width:100%;">
        <el-carousel indicator-position="outside" height="440px">
          <el-carousel-item v-for="item in imgSource">
            <img :src="item" width="1210px" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 首页轮播 结束 -->

    <div id="home-tradeAmt">
      今日总成交额
      <span>{{ tradeAmount.todayPrice }}</span> 元，总成交量
      <span>{{ tradeAmount.todayAmount }}</span> 个， 昨日总成交额
      <span>{{ tradeAmount.lastPrice }}</span>元，总成交量
      <span>{{tradeAmount.lastAmount}}</span> 个
    </div>
    <!-- 首页 三大按钮 开始 -->
    <div style="width:1210px;margin:0 auto;text-align:center;margin-top:-20px">
      <div style="width:1000px;margin: 0 auto;">
        <el-button type="text" @click="checkTokennum">
          <img src="./../assets/img/buy.png"  width="160" class="image" style="margin-right:50px">
        </el-button>
        <router-link to="/tradeSystem/search/byType">
          <img src="./../assets/img/search.png"  width="160" class="image" style="margin-right:50px">
        </router-link>
        <el-button type="text" @click="checkTokennum">
          <img src="./../assets/img/sell.png"  width="160" class="image">
        </el-button>
      </div>
    </div>
    <!-- 首页 三大按钮 结束 -->
    <div class="clearfix"></div>

    <div id="home-tb-div" style="width:1210px;text-align:center;">
      <!-- 拍卖品首页表格 开始 -->
      <div style="width:1080px;margin:0 auto">
        <h1 style="font-family:'Hiragino Sans GB';margin-bottom:15px;">拍卖品</h1>
        <el-table
        :data="tableData1"
        style="width: 100%"
        v-loading.body="loadingForAuc" element-loading-text="拼命加载中">
        <el-table-column
        label="拍卖ID"
        width="90px">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>专利ID: {{ scope.row.patent_ID }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="danger">{{ scope.row.auction_ID }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
      label="专利名"
      width="110px">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.patent_name }}</span>
      </template>
    </el-table-column>

    <el-table-column
    label="最低增幅"
    width="110px">
    <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.min_increment }}</span>
    </template>
  </el-table-column>

  <el-table-column
  label="最低降幅"
  width="110px">
  <template scope="scope">
    <span style="margin-left: 10px">{{ scope.row.min_decrease }}</span>
  </template>
</el-table-column>

<el-table-column
label="当前价"
width="110px">
<template scope="scope">
  <span style="margin-left: 10px">¥ {{ scope.row.price }}</span>
</template>
</el-table-column>

<el-table-column
label="卖家"
width="110px">
<template scope="scope">
  <span style="margin-left: 10px"> {{ scope.row.seller_name }}</span>
</template>
</el-table-column>

<el-table-column
label="结束时间"
width="210px">
<template scope="scope">
  <span style="margin-left: 10px"> {{ scope.row.end_date }} </span>
</template>
</el-table-column>

<el-table-column
label="拍卖类型"
width="110px">
<template scope="scope">
  <span style="margin-left: 10px"> {{ scope.row.type }} </span>
</template>
</el-table-column>

<el-table-column label=""
width="118px">
<template scope="scope">
  <el-button
  type="primary"
  @click="ToDetail_Auc(scope.$index, scope.row)">查看详情</el-button>
</template>
</el-table-column>
</el-table>
<div class="block">
  <el-pagination
  @size-change="handleSizeChange1"
  @current-change="handleCurrentPageChange1"
  :current-page="currentPage1"
  :page-count = "totalPage1"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="pageSize1"
  layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
</div>
</div>
<!-- 拍卖品首页表格 结束 -->
<!-- 一口价首页表格 开始 -->
<div style="width:1080px;margin:0 auto">
  <h1 style="font-family:'Hiragino Sans GB';margin-top:100px;margin-bottom:15px;">一口价</h1>
  <el-table
  :data="tableData2"
  style="width: 100%"
  v-loading.body="loading3" element-loading-text="拼命加载中">
  <el-table-column
  label="一口价ID"
  width="110px">
  <template scope="scope">
    <el-popover trigger="hover" placement="top">
      <p>专利ID: {{ scope.row.patent_ID }}</p>
      <div slot="reference" class="name-wrapper">
        <el-tag type="success">{{ scope.row.fixPrice_ID }}</el-tag>
      </div>
    </el-popover>
  </template>
</el-table-column>

<el-table-column
label="专利名"
width="220px">
<template scope="scope">
  <!-- <el-icon name="time"></el-icon> -->
  <span style="margin-left: 10px">{{ scope.row.patent_name }}</span>
</template>
</el-table-column>

<el-table-column
label="卖家"
width="180px">
<template scope="scope">
  <!-- <el-icon name="time"></el-icon> -->
  <span style="margin-left: 10px">{{ scope.row.seller_name }}</span>
</template>
</el-table-column>

<el-table-column
label="一口价"
width="200px">
<template scope="scope">
  <!-- <el-icon name="time"></el-icon> -->
  <span style="margin-left: 10px">¥ {{ scope.row.price }}</span>
</template>
</el-table-column>

<el-table-column
label="更新时间"
width="250px">
<template scope="scope">
  <!-- <el-icon name="time"></el-icon> -->
  <span style="margin-left: 10px">{{ scope.row.date }}</span>
</template>
</el-table-column>

<el-table-column label=""
width="118px">
<template scope="scope">
  <el-button
  type="primary"
  @click="ToDetail_Fix(scope.$index, scope.row)">查看详情</el-button>
</template>
</el-table-column>
</el-table>
<div class="block">
  <el-pagination
  @size-change="handleSizeChange2"
  @current-change="handleCurrentPageChange2"
  :current-page="currentPage2"
  :page-count = "totalPage2"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="pageSize2"
  layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
</div>
</div>
<!-- 一口价首页表格 结束 -->
</div>
<div class="clearfix"></div>
<myFooter></myFooter>
</div>
</template>

<script>
import myHeader from './../components/myheader'
import myFooter from './../components/myfooter'
import mySearch from './../components/search'
import config from './../publicAPI/config'
import axios from 'axios'

export default {
  components:{
    myHeader,
    myFooter,
    mySearch
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url
      imgSource:[	//轮播图
        require('./../assets/img/car7.jpg'),
        require('./../assets/img/car9.jpg'),
        require('./../assets/img/car8.jpg'),
      ],
      tableData1:[], 	//拍卖品表格的内容
      tableData2:[], 	//一口价表格的内容
      tradeAmount:{		//今日交易额和昨日交易额，暂时写死
        todayPrice: 40100,
        todayAmount: 103,
        lastPrice: 68000,
        lastAmount: 326
      },
      totalPage1: 0,  //拍卖品总页数
      currentPage1:1,  //拍卖品当前页
      pageSize1: 10,  //拍卖品每页记录

      totalPage2: 0,  //一口价总页数
      currentPage2: 1,  //一口价当前页
      pageSize2: 10,  //一口价每页记录

      loadingForAuc: true, //拍卖加载中
      loading3: true, //一口价加载中
    }
  },
  methods:{
    checkTokennum(){
      let that = this
      if( localStorage.getItem("tokennum")==null){
        alert('请先登录再进行！')
      }else{
        that.$router.push({path:'/userIndex'})}
      },

      getListByAuction(){
        let that = this
        this.loadingForAuc = true
        axios.get(that.rootURL+'/orderAuction/getOrderAuctionList?page='+ that.currentPage1 +'&pageSize=' + that.pageSize1)
        .then(function(res){
          that.tableData1 = []
          that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)
          for( var item of res.data.obj ) {
            that.tableData1.push({
              auction_ID: item.auction.id,
              patent_ID : item.auction.patent.id,
              patent_name: item.auction.patent.name,
              min_increment:item.auction.min_increment,
              min_decrease : item.auction.min_decrease,
              seller_name: item.auction.seller.name,
              price : item.auction.current_price,
              end_date : item.auction.end_time,
              type : item.auction.type == 1?'升价':'降价'
            })
            that.loadingForAuc = false

          }
        })
        .catch(function(error){
          console.error(error)
        })
      },
      getListByYiKouJia(){
        let that = this
        this.loading3 = true
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceList?page='+ that.currentPage2 +'&pageSize=' + that.pageSize2)
        .then(function(res){
          that.tableData2 = []
          that.totalPage2 = Math.ceil(res.data.dataCount/that.pageSize2)
          for( var item of res.data.obj ) {
            that.tableData2.push({
              fixPrice_ID: item.id,
              patent_ID : item.patent.id,
              patent_name: item.patent.name,
              seller_name: item.seller.name,
              price : item.price,
              date : item.create_time,
            })
            that.loading3 = false
          }
        })
        .catch(function(error){
          console.error(error)
        })
      },

      handleSizeChange1(val) {
        this.pageSize1 = val;
        // 修改pageSize1（每页显示条数）后，再执行一次getListByPaiMai
        this.getListByAuction();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentPageChange1(val) {
        this.currentPage1 = val;
        this.getListByAuction();
        console.log(`当前页: ${val}`);
      },
      handleSizeChange2(val) {
        this.pageSize2 = val;
        this.getListByYiKouJia();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentPageChange2(val) {
        this.currentPage2 = val;
        this.getListByYiKouJia();
        console.log(`当前页: ${val}`);
      },

      ToDetail_Fix(index, row) {
        let that = this
        console.log(index, row);
        that.$router.push({path:'/Patent/fixPriceInfo/'+row.fixPrice_ID})
      },
      ToDetail_Auc(index, row) {
        let that = this
        console.log(index, row);
        that.$router.push({path:'/Patent/auctionInfo/'+row.auction_ID})
      },
    },
    created(){
      this.getListByAuction();
      this.getListByYiKouJia();
    },
  }
  </script>

  <style scoped>
  h1{
    text-align: center;
    color: #475669;
    font-size: 28px;
  }
  .el-carousel{
    width: 100%;
    text-align: center;
  }
  .el-carousel-item{
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-card{
    float: left;
    margin: 5px 30px;
  }
  /*首页交易情况*/
  #home-tradeAmt{
    width: 1210px;
    margin: 0 auto ;
    margin-top: 20px;
    margin-bottom: 50px;
    text-align: center;
    color:#444;
  }
  #home-tradeAmt span{
    color:#FF4949;
    font-size: 22px;
  }
  /*首页的轮播*/
  #home-tb-lunbo{
    width: 1080px;
    margin: 0 auto !important;
    margin-top: 5px !important;
    margin-bottom: 60px;
  }
  /*首页的表格*/
  #home-tb-div{
    width: 1080px;
    margin: 0 auto !important;
    margin-top: 40px !important;
    margin-bottom: 60px;
  }
  /*分页*/

  .el-button--primary{
    line-height: 0px;
    font-size: 12px;
    width: 80px !important;
  }
  .block{
    margin-top: 24px;
    float:right
  }
  .el-pagination{
    float: right;
  }
  </style>
