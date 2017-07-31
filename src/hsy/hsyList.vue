<template>
  <div>
  	<myHeader></myHeader>
  	<div class="clearfix"></div>
    <div id="bigBlock">

    <!-- 内置搜索栏 开始 -->
          <div  id="searchBox" style="width:1210px;text-align:center;margin:0 auto">
   		       <div style="margin-top:30px;width:860px;margin: 0 auto;">

              <div>
                <div style="margin-top: 15px;width:800px">
                <el-input placeholder="请把要搜索的告诉我们..." v-model="input5" @keyup.enter.native="tryToSearch">

                <el-select v-model="select" slot="prepend" placeholder="下拉选择类别">
                  <el-option label="所有专利" value="所有专利"></el-option>
                  <el-option label="一口价" value="一口价"></el-option>
                  <el-option label="拍卖" value="拍卖"></el-option>
                </el-select>

                <el-button slot="append" icon="search" @click="tryToSearch" ></el-button>
                </el-input>
                </div>
              </div>
          <div style="float:left;margin-left:0px;width:804px;margin-top:5px">
           <el-alert :v-if="showTip" :title="Tip" type="info":closable="false">
           </el-alert>
        </div>
          </div>
   	    </div>
    <!-- 内置搜索栏 结束 -->

    	<div class="clearfix"></div>

    <!-- 列表展示区 开始  -->

   	<div id="home-tb-div" style="width:1210px;text-align:center;margin:0 auto;padding-left:90px;">
      <div >
          <!-- 所有专利（模糊）开始 -->
          <div  v-if="Some" style="width:250px;float:left;margin:10px">
            <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left" >
              <div v-for="esingle in SomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:25px">

                <router-link :to="'/tradeSystem/patentCommonInfo/' + esingle.id">
                  <el-card class="box-card" :body-style="{ padding: '0px' }">
                    <img :src="esingle.img" class="image">
                    <div style="padding:10px;">
                      <div style="float:left;width:210px;margin-top:-8px">
                        <el-tag type="primary" v-for="single in esingle.cat">{{single}}</el-tag>
                      </div>
                      <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;margin-top:5px;float:left">{{esingle.name}}</div>

                      <div style="text-align:left;float:right;width:80px;font-size:12px;color:gray;"id="price" >所有人：
                      <div style="float:left;text-align:right;width:80px;font-size:14px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >{{esingle.seller}}</div>
                      </div>
                      <div class="clearfix"></div>
                      <div class="bottom clearfix">
                        <div class="purpose omit" id="purpose" style="margin-left:10px;margin-top:-10px;">{{esingle.purpose}}</div>
                          </div>
                    </div>
                  </el-card>
                </router-link>

              </div>
            </div>
            <div class="clearfix"></div>
            <div class="block"  style="float:left;width:420px;">
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
          <!-- 所有专利（模糊）结束 -->


          <!-- 一口价（模糊）开始 -->

      <div  v-if="FixPriceSome" style="width:250px;float:left;margin:10px">
        <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left" >
          <div v-for="single in fixSomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:25px">
            <router-link :to="'/Patent/fixPriceInfo/' + single.id">
                <el-card class="box-card" :body-style="{ padding: '0px' }">
                  <img :src="single.img" class="image">
                  <!-- <img src="./../assets/img/newyear1.jpg" class="image"> -->
                  <div style="padding:15px;">
                    <div style="float:left;width:10px">
                      <el-tag v-if="true" type="success"> 一口价</el-tag>
                    </div>
                    <div style="text-align:right;float:right;width:165px;"id="price" >
                    <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >  ¥ {{single.price}}</div>
                    </div>

                    <div id="name" class="omit" style="line-height:16px;width:150px;height:20px;margin-top:5px;float:left">{{single.name}}</div>
                    <div style="float:right;text-align:right;font-size:14px;width:50px;float:right;line-height:25px;color:rgb(147, 139, 138)" class="omit" > {{single.status}}</div>

                    <div class="bottom clearfix">
                      <div class="purpose omit" id="purpose" style="margin-left:10px">{{single.purpose}}</div>
                        </div>
                  </div>
                </el-card>
          </router-link>
          </div>
        </div>
        <div class="clearfix"></div>
          <div class="block" style="float:left;width:420px">
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

          <!-- 一口价（模糊）结束 -->

          <!-- 拍卖（模糊）开始 -->
       <div v-if="auctionSome" style="width:250px;float:left;margin:10px">
        <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left" >
          <div  v-for="asingle in aucSomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:25px">
            <router-link :to="'/Patent/auctionInfo/' + asingle.id">
                <el-card class="box-card" :body-style="{ padding: '0px' }">
                  <img :src="asingle.img" class="image">
                  <div style="padding:15px;">
                    <div style="float:left;width:10px">
                      <el-tag v-if="true" type="danger"> 拍卖品</el-tag>
                    </div>

                    <div style="text-align:right;float:right;width:165px;"id="price" >
                    <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >  ¥ {{asingle.price}}</div>
                    </div>
                    <div id="name" class="omit" style="line-height:16px;width:150px;height:20px;margin-top:5px;float:left">{{asingle.name}}</div>
                    <div style="float:right;text-align:right;font-size:14px;width:60px;float:right;line-height:15px;color:rgb(147, 139, 138)" class="omit" > {{asingle.status}}</div>
                    <div class="bottom clearfix">
                      <div class="purpose omit" id="purpose" style="margin-left:10px">{{asingle.purpose}}</div>
                    </div>
                  </div>
                </el-card>
        </router-link>
          </div>
        </div>
      	<div class="clearfix"></div>
        <div class="block"  style="float:left;width:420px" >
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
          <!-- 拍卖（模糊）结束 -->

      </div>
<!-- 列表展示区 结束 -->
	  </div>
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
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'


export default {
	components:{
		myHeader,
    myFooter,
    mySearch,
	},
	data () {
		return {
		  rootURL: config.URL,	//请求的url
      idList1:[],
      item1:'',
      rootURL: config.URL,	//请求的url
      tableData:[], 	//一口价表格的内容
      loading3: true, //一口价加载中

        input5: '',
        select: '',
        trueInput5:'',

      // auctionSome:false,
      All:false,

      Some:false,
      FixPriceSome:false,
      auctionSome:false,

      currentCatId: '',
      currentCatName: '',
      showTip: false,
      Tip:'请通过左侧下拉框，选择目录名来查询技术',


                totalPage: 0,
          		  currentPage: 1,
          		  pageSize: 12,


      totalPage1: 0,  //一口价总页数
      currentPage1: 1,  //一口价当前页
      pageSize1: 12,  //一口价每页记录
      name_Msg:'',


                totalPage2: 0,
          		  currentPage2: 1,
          		  pageSize2: 12,

              SomeList:[],

      fixSomeList:[],

            aucSomeList:[],

                  paths_Msg:[],

		}
	},
  methods:{
    getSomeList(){
let loadingInstance = Loading.service({ body: true });

let that = this
that.name_Msg = that.input5

this.SomeList = [];
  that.item=''
      axios.get(that.rootURL+'/patent/getMorePatentByName?page='+ that.currentPage +'&pageSize=' + that.pageSize +'&name=' + that.name_Msg)
            .then(function(res){
              if(res.data.obj==null)
              alert("没有符合条件的技术！")
              else{


        that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
        for( that.item of res.data.obj ) {

          if(that.item.catalog1en!=null){
            that.paths_Msg.push(that.item.catalog1en.name)
              if(that.item.catalog2en!=null){
                  that.paths_Msg.push(that.item.catalog2en.name)
                    if(that.item.catalog3en!=null){
                        that.paths_Msg.push(that.item.catalog3en.name)
                          if(that.item.catalog4en!=null){
                              that.paths_Msg.push(that.item.catalog4en.name)
                          }

                    }
              }
          }


          if(that.item.patentImages!=''){
        that.SomeList.push(
          {
            img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patentImages[0].url,
            id:that.item.id,
            name:that.item.name,
            purpose:that.item.purpose,
            seller:that.item.user.name,
            cat:that.paths_Msg
          }
        )
      }
          else{
            that.SomeList.push(
              {
                img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                id:that.item.id,
                name:that.item.name,
                purpose:that.item.purpose,
                seller:that.item.user.name,
                cat:that.paths_Msg
              }
            )
          }
        that.paths_Msg=[]
          }
        }
loadingInstance.close();
      })
      .catch(function(error){
        console.error(error)
      })

    },

    getFixPriceSomeList(){
      let loadingInstance = Loading.service({ body: true });
      let that = this
      that.name_Msg = that.input5

      this.fixSomeList = [];
        that.item=''
      axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceByName?page='+ that.currentPage1 +'&pageSize=' + that.pageSize1 +'&name=' + that.name_Msg)
            .then(function(res){
              if(res.data.obj==null){
             that.currentPage1 =1
            }
              else{
                that.name_Msg=''
                that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)
                for( that.item of res.data.obj ) {
                  if(that.item.patent.patentImages!='')
                that.fixSomeList.push({
                    img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                    name:that.item.patent.name,
                    purpose:that.item.patent.purpose,
                    price:that.item.price,
                    status:that.item.status == 1?'进行中':'已结束',
                    id:that.item.id
                  })
                  else{
                    that.fixSomeList.push({
                        img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                        name:that.item.patent.name,
                        purpose:that.item.patent.purpose,
                        price:that.item.price,
                        status:that.item.status == 1?'进行中':'已结束',
                        id:that.item.id
                      })
                  }
                  }
                }
        loadingInstance.close();
      })
      .catch(function(error){
        console.error(error)
      })

    },

    getAucSomeList(){
 let loadingInstance = Loading.service({ lock: true ,text:'已经加载的很快了！' });
 let that = this
 that.name_Msg = that.input5

       this.aucSomeList = [];
         that.item=''
        axios.get(that.rootURL+'/orderAuction/getOrderAuctionByName?page='+ that.currentPage2 +'&pageSize=' + that.pageSize2 +'&name=' + that.name_Msg)
              .then(function(res){
                if(res.data.obj==null){
               that.currentPage2 =1
              }
              else{
					that.totalPage2 = Math.ceil(res.data.dataCount/that.pageSize2)
          for( that.item of res.data.obj ) {
            if(that.item.patent.patentImages!='')
            that.aucSomeList.push({
                img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                name:that.item.patent.name,
                purpose:that.item.patent.purpose,
                price:that.item.current_price,
                status:that.item.status == 1?'进行中':'已结束',
                id:that.item.id
              })
            else{
              that.aucSomeList.push({ name:that.item.patent.name,
                  img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                  purpose:that.item.patent.purpose,
                  price:that.item.current_price,
                  status:that.item.status == 1?'进行中':'已结束',
                  id:that.item.id
                })
            }
}
}
loadingInstance.close();
				})
        .catch(function(error){
          console.error(error)
        })

      },
      handleSizeChange2(val) {
        let that = this
          this.pageSize2 = val;

          this.aucSomeList = [];

        this.getAucSomeList();
          console.log('我再sizeChange2里：'+`每页 ${val} 条`);
      },
      handleCurrentPageChange2(val) {
          this.currentPage2 = val;
          this.aucSomeList = [];
          this.getAucSomeList();
          console.log(`当前页: ${val}`);
      },


    handleSizeChange1(val) {
      let that = this
        this.pageSize1 = val;

        this.fixSomeList = [];

      this.getFixPriceSomeList();
        console.log('我再sizeChange1里：'+`每页 ${val} 条`);
    },
    handleCurrentPageChange1(val) {
        this.currentPage1 = val;
        this.fixSomeList = [];
        this.getFixPriceSomeList();
        console.log(`当前页: ${val}`);
    },


    handleSizeChange(val) {
      let that = this
        this.pageSize = val;

        this.SomeList = [];

      this.getSomeList();
        console.log('我再sizeChange1里：'+`每页 ${val} 条`);
    },
    handleCurrentPageChange(val) {
        this.currentPage = val;
        this.SomeList = [];
        this.getSomeList();
        console.log(`当前页: ${val}`);
    },










    tryToSearch() {
          let that = this
          var myChoose=that.select
          var myInput5=that.input5
          that.trueInput5 = that.input5
          if(that.select!=''){
              if(myInput5==''){
                if(myChoose=='所有专利'){
                that.Tip=('由于你没有输入任何内容，将为你呈现【'+myChoose+'】')
                that.auctionSome=false;
                that.Some=true;
                this.SomeList = [];
                that.getSomeList();

                that.FixPriceSome=false;
                }
                if(myChoose=='一口价'){
                that.Tip=('由于你没有输入任何内容，将为你呈现有关于【'+myChoose+'】的所有技术')
                this.fixSomeList = [];
                that.getFixPriceSomeList();
                that.auctionSome=false;
                that.All=false;
                that.FixPriceSome=true;
                that.Some=false;
                }
                if(myChoose=='拍卖'){
                that.Tip=('由于你没有输入任何内容，将为你呈现有关于【'+myChoose+'】的所有技术')
                that.auctionSome=true;
                that.getAucSomeList();
                that.All=false;

                that.FixPriceSome=false;
                that.Some=false;
                }
            }
            else{
            that.Tip=('将为你呈现有关于【'+myChoose+'】，并且带有关键字【'+myInput5+'】的所有技术')
              if(myChoose=='一口价'){
              that.FixPriceSome=true;
              that.getFixPriceSomeList();
              that.auctionSome=false;
              that.All=false;

              that.Some=false;
              }
              if(myChoose=='拍卖'){
              that.FixPriceSome=false;
              that.auctionSome=true;
              that.getAucSomeList();
              that.All=false
              that.Some=false;
              }
              if(myChoose=='所有专利'){
                that.FixPriceSome=false;
                that.auctionSome=false;
                that.All=false
                that.Some=true;
                this.SomeList = [];
                that.getSomeList();
              }
            }
        }else{
          alert("请选择专利类别！")
        }
    },


  },
}
</script>

<style scoped>
h1{
	text-align: center;
	color: #475669;
	font-size: 28px;
}
.el-card{
	float: left;
	margin: 5px 30px;
}

#searchBox{
	width: 1080px;
	margin-top: 20px !important;
  margin: 0 auto
}
#home-tb-div{
	width: 1080px;
	margin: 0 auto !important;
	margin-bottom: 60px;
}
/*分页*/
.block{
	margin-top: 24px;
}
.el-pagination{
	float: right;
}

/*一口价模糊*/

  .purpose {
    font-size: 13px;
    color: #999;
  }
  .omit{
    line-height: 13px;
    width:200px;
    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 240px;
    height:180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }/*分页*/
  .block{
    float:left;
  	margin-top: 24px;
    margin-left: 610px;
  }
  .el-pagination{
  	float: right;
  }
</style>
