<template>
  <div>
  	<myHeader></myHeader>
  	<div class="clearfix"></div>

    <div style="">
    <!-- 内置搜索栏 开始 -->
          <div id="searchBox" style="text-align:center;margin:0 auto;width:1280px;">
   		       <div style="margin-top:30px;width:1000px;margin:0 auto;">

              <div style="float:left;width:540px;margin-left:-10px">
                 <el-alert :title="Tip" type="info":closable="false">
                 </el-alert>
              </div>
              <div>

                <div style="float:right;width:380px;margin-right:70px">
                <el-input placeholder="输入提问的关键字..." v-model="input5" @keyup.enter.native="tryToSearch">
                <el-button slot="append" icon="search" @click="tryToSearch" ></el-button>
                </el-input>
                </div>
              </div>
              </div>
   	      </div>
    <!-- 内置搜索栏 结束 -->

    	<div class="clearfix"></div>



	  </div>
    <!-- 列表展示区 开始  -->
    <div id="home-tb-div" style="width:1280px;text-align:center;margin:0 auto;padding-left:40px;">
      <div  style="float:left;">

        <!-- 用图片 开始 -->
              <div style="float:left;margin:10px;">
                <div style="padding:10px;width:1100px;text-align:left" >
                  <div v-for="single in questionList" style="width:1000px;height:60px;margin:0 auto;">
                        <el-card class="box-card" :body-style="{ padding: '10px' }" >
                          <img :src="'http://og07ks0jb.bkt.clouddn.com/' + single.headPhotos" class="askerImg">
                          <div style="padding:10px;">

                            <div id="name" class="omit" style="margin-left:15px;margin-top:-15px;width:510px;height:30px;float:left">
                              <router-link :to="'/tradeSystem/questionDetail/' + single.askID">
                            <el-button type="text" >{{ single.title }}</el-button>
                              </router-link>
                            </div>

                            <div style="text-align:right;font-size:12px;width:220px;margin-top:-10px;float:right;line-height:25px;color:gray;" class="omit" >
                              发布时间：{{single.create_time}}
                            </div>


                            <div style="text-align:left;margin-left:5px;font-size:12px;width:500px;margin-bottom:5px;float:left;line-height:25px;color:gray" class="omit" >
                               {{single.description}}
                            </div>

                            <div style="float:left;text-align:right;margin-left:113px;font-size:14px;width:60px;margin-top:5px;line-height:15px;color:gray" class="omit" >
                            <i class="el-icon-edit"></i>
                            </div>
                            <div style="float:left;text-align:right;font-size:14px;width:80px;margin-top:5px;line-height:15px;color:gray" class="omit" >
                          {{single.asker}}</div>

                          <div style="float:left;text-align:right;font-size:14px;width:29px;margin-top:5px;line-height:15px;color:gray" class="omit" >
                            <i class="el-icon-date"></i>
                          </div>
                          <div style="float:left;text-align:left;font-size:14px;width:40px;margin-top:5px;line-height:15px;color:gray" class="omit" >
                        &nbsp; ({{single.answerCount}}) </div>

                          <div style="float:left;text-align:right;font-size:14px;width:29px;margin-top:5px;line-height:15px;color:gray" class="omit" >
                            <i class="el-icon-check"></i>
                          </div>
                          </div>
                        </el-card>
                  <!-- </router-link> -->
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
        <!-- 用图片 结束 -->


      </div>
    <!-- 列表展示区 结束 -->
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
      tableData:[], 	//一口价表格的内容
      loading3: true, //一口价加载中

        input5: '',
        trueInput5:'',

      Tip:'可以通过右侧搜索栏，快速找到你想要找的提问',



      totalPage1: 0,
      currentPage1: 1,
      pageSize1: 10,



      questionList:[],

		}
	},
  methods:{


    handleSizeChange1(val) {
      let that = this
        this.pageSize1 = val;

        this.questionList = [];

      this.getQuestionsList();
        console.log('我再sizeChange1里：'+`每页 ${val} 条`);
    },
    handleCurrentPageChange1(val) {
        this.currentPage1 = val;
        this.questionList = [];
        this.getQuestionsList();
        console.log(`当前页: ${val}`);
    },

    getQuestionsList(){
      let loadingInstance = Loading.service({ body: true });
      let that = this
      // that.name_Msg = that.input5
      if(that.input5!=''){
        that.Tip=('将为你呈现带有关键字【'+that.input5+'】的所有技术')

      }
      this.questionList = [];
        that.item=''
      axios.get(that.rootURL+'/TechnicalQuestion/getTechnicalQuestionsByKeyword?page='+ that.currentPage1 +'&pageSize=' + that.pageSize1 +'&keyword=' +that.input5)
            .then(function(res){
              if(res.data.obj==null){
             that.currentPage1 =1
            }
              else{
                // that.name_Msg=''
                that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)
                for( that.item of res.data.obj ) {
                that.questionList.push(
                  {
                    askID:that.item.id,
                    title:that.item.title,
                    headPhotos:that.item.user.headPhotoslist[0].url,
                    description:that.item.description,
                    asker:that.item.user.name,
                    create_time:that.item.create_time,
                    answerCount:that.item.count
                  }
                )
                  }
                }
        loadingInstance.close();
      })
      .catch(function(error){
        console.error(error)
      })

    },

tryToSearch(){
  this.getQuestionsList()
},




  },
  created(){
    this.getQuestionsList();
  }
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
	margin: 0 auto !important;
	margin-bottom: 60px;
}

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
    width: 100%;
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
  .askerImg{
    float: left;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -2px;
  }
</style>
