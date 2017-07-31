<template>
  <div id="whole" :style="{backgroundImage: 'url(' +bg + ')'}" style="margin:0 auto;background-repeat: no-repeat" >
    <!-- 背景图 + 导航 开始 -->
    <div class="bodyBG">
      <myHeader></myHeader>
    </div>
    <!-- 背景图 + 导航 结束 -->

    <!-- 轮播图 开始 -->
    <div style="width:960px;margin:0 auto;">
      <div style="width:100%;">
        <el-carousel indicator-position="outside"  height="400px">
          <el-carousel-item v-for="item in imgSource">
                  <el-card class="box-card" :body-style="{ padding: '10px' }" >
            <img :src="item" height="380" width="940px" />
                </el-card>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 轮播图 结束 -->

    <!-- 第一层 开始 -->
    <div style="width:960px;margin:0 auto;">
      <!-- 小功简介 开始 -->
      <div style="float:left;width:300px;margin-top:10px" class="openIndexNewsBox ">
              <div style="margin:0 auto;line-height:17px;margin-bottom:5px;" class="titleBlock" >
                <div style="float:left;background-color:black;width:4px;	border-radius: 124px !important;">&nbsp;</div>
                <div style="font-family:'微软雅黑';margin-left:5px;float:left;color:white;font-weight:bold">小功 </div>
                <div style="font-family:'微软雅黑';float:left;float:left;color:#377ab7;width:50px;font-weight:bold">简介</div>
                <div style="margin-right:5px;font-size:12px;line-height:25px;font-family:'微软雅黑';margin-left:15px;float:left;color:black;font-weight:bold">Introduction</div>
              </div>
                <div class="clearfix" style="margin-bottom:4px"></div>
              <div>
                <el-card style="height:205px;background-color:rgb(247,247, 247)" class="box-card" :body-style="{ padding: '10px' }">
                    <div style="">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小功科技公司成立于1998年11月，由马化腾、张志东、许晨晔、陈一丹、曾李青五位创始人共同创立。
                    </div>
                    <div style="font-size:12px;float:right">
                    <div style="float:left;line-height:150px">扫一扫，了解更多资讯</div>
                    <img  src="./../assets/img/erweima.jpg" style="margin:10px;width:70px;height:70px;">
                    </div>
                </el-card>
              </div>
      </div>
      <!-- 小功简介 结束 -->
      <!-- 便利资讯 开始 -->
      <div style="float:right;width:650px;margin-left:10px;margin-top:10px;margin-bottom:20px" class="openIndexNewsBox ">
            <div style="margin:0 auto;line-height:17px;" class="titleBlock" >
              <div style="float:left;background-color:black;width:4px;	border-radius: 124px !important;">&nbsp;</div>
              <div style="font-family:'微软雅黑';margin-left:5px;float:left;color:white;font-weight:bold">便利 </div>
              <div style="font-family:'微软雅黑';float:left;float:left;color:#377ab7;width:50px;font-weight:bold"> 资讯</div>
              <div style="margin-right:5px;font-size:12px;line-height:25px;font-family:'微软雅黑';margin-left:15px;float:left;color:black;font-weight:bold">News</div>
                <div style="float:right;margin-bottom:-5px;margin-right:5px">
                  <router-link to="/news">
                    <el-button type="text">More</el-button>
                  </router-link>
                  </div>
            </div>
            <el-table :data="tableData"  style="width: 100%;" v-loading.body="loading3" element-loading-text="拼命加载便利资讯" :show-header="false">
              <el-table-column v-if="false" label="id">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.id }}
                    </div>
                </template>

              </el-table-column>
              <el-table-column width="520px" label="标题">

                <template scope="scope">
                    <div slot="reference" class="name-wrapper " style="text-align:left">
                      <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.title }}</el-button>
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="发布时间">
                <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.create_time }}
                    </div>
                </template>
              </el-table-column>
            </el-table>
      </div>
      <!-- 便利资讯 结束 -->
    </div>
    <!-- 第一层 结束 -->

    <!-- 第二层 开始 -->
    <div style="width:960px;margin:0 auto;">
      <!-- 专家大咖 开始 -->
      <div v-loading.body="loadingForExpertList" style="float:left;width:300px;margin-top:35px" class="openIndexNewsBox ">
                <div style="margin:0 auto;line-height:17px;" >
                  <div style="float:left;background-color:black;width:4px;	border-radius: 124px !important;">&nbsp;</div>
                  <div style="font-family:'微软雅黑';margin-left:5px;float:left;color:black;font-weight:bold">专家</div>
                  <div style="font-family:'微软雅黑';float:left;float:left;color:#377ab7;width:50px;font-weight:bold">大咖</div>

                  <div style="font-size:12px;line-height:25px;font-family:'微软雅黑';margin-left:15px;float:left;color:black;font-weight:bold">Experts</div>                  <div style="float:right;margin-bottom:-5px;margin-right:5px">
                      <router-link to="/experts">
                        <el-button type="text">More</el-button>
                      </router-link>
                      </div>
                </div>
                <div style="float:right;">
                  <div style="width:300px;text-align:left" >
                    <div v-for="esingle in expertList" style="width:300px;height:85px;float:left;margin-bottom:-1px">

                      <el-card class="box-card" style="background-color:rgb(247,247, 247)" :body-style="{ padding: '0px' }">

                        <div class="expertImg" >
                          <img  :src="esingle.headPhoto" style="margin:10px;margin-right:15px" class="askerImg">
                        </div>
                          <div style="font-size:14px">
                            <div style="float:left;width:90px;font-size:18px;font-weight:bold;height:30px">{{esingle.name}}</div>
                            <div style="float:left;height:24px;width:50px;text-align:left;">专业：</div>
                              <div class="omit" style="float:left;width:80px;height:24px;">{{esingle.specialty}}</div>
                            <div style="float:left;width:200px;">手机：{{esingle.phone}}</div>
                            <div style="float:left;width:200px;margin-bottom:8px">邮箱：{{esingle.email}}</div>
                          </div>
                      </el-card>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>

      </div>
      <!-- 专家大咖 结束 -->
      <!-- 技术求解 开始 -->
      <div v-loading.body="loadingForQuestionList" style="float:right;width:650px;margin-top:15px;" class="openIndexNewsBox ">
                <div style="margin:0 auto;line-height:17px;" class="titleBlock" >
                  <div style="float:left;background-color:black;width:4px;	border-radius: 124px !important;">&nbsp;</div>
                  <div style="font-family:'微软雅黑';margin-left:5px;float:left;color:black;font-weight:bold">技术</div>
                  <div style="font-family:'微软雅黑';float:left;float:left;color:#377ab7;width:50px;font-weight:bold">求解</div>
                  <div style="font-size:12px;line-height:25px;font-family:'微软雅黑';margin-left:15px;float:left;color:black;font-weight:bold">Solution</div>
                    <div style="float:right;margin-bottom:-5px;margin-right:5px">
                      <router-link to="/tradeSystem/questionList">
                        <el-button type="text">More</el-button>
                      </router-link>
                      </div>
                </div>
                <div style="float:left;">
                  <div style="text-align:left" >
                    <div v-for="single in questionList" style="width:650px;margin-bottom:5px;">
                          <el-card class="box-card" style="background-color:rgb(247,247, 247)" :body-style="{ padding: '10px' }" >
                            <img :src="'http://og07ks0jb.bkt.clouddn.com/' + single.headPhotos" class="askerImg">
                            <div style="padding:10px;">

                              <div id="name"  style="margin-left:15px;margin-top:-15px;width:510px;height:10px;float:left">
                                <router-link :to="'/tradeSystem/questionDetail/' + single.askID">
                                  <el-button type="text" @click="">{{ single.title }}</el-button>
                                </router-link>
                              </div>

                              <div style="text-align:right;font-size:12px;width:220px;margin-top:-10px;float:right;line-height:20px;color:gray;" class="omit" >
                                截止时间：{{single.end_time}}
                              </div>


                              <div style="text-align:left;margin-left:25px;font-size:12px;width:500px;margin-bottom:5px;float:left;line-height:20px;color:gray" class="omit" >
                                 {{single.description}}
                              </div>

                              <div style="text-align:right;margin-left:25px;font-size:14px;width:220px;margin-top:-5px;float:right;line-height:25px;color:gray;margin-bottom:2px" class="omit" >
                                 提问者：{{single.asker}}
                              </div>

                            </div>
                          </el-card>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>

      </div>
      <!-- 技术求解 结束 -->
    </div>
    <!-- 第二层 结束 -->

    <!-- 第三层 开始 -->
    <div style="width:960px;margin:0 auto;">
        <!-- 热门技术 开始 -->
        <div  style="float:left;width:960px;margin-top:20px;" class="openIndexNewsBox ">
          <div style="margin:0 auto;line-height:17px;" class="titleBlock" >
            <div style="float:left;background-color:black;width:4px;	border-radius: 124px !important;">&nbsp;</div>
            <div style="font-family:'微软雅黑';margin-left:5px;float:left;color:black;font-weight:bold">热门</div>
            <div style="font-family:'微软雅黑';float:left;float:left;color:#377ab7;width:50px;font-weight:bold">技术</div>
            <div style="font-size:12px;line-height:25px;font-family:'微软雅黑';margin-left:15px;float:left;color:black;font-weight:bold">Solution</div>
            <div style="float:right;margin-bottom:-5px;margin-right:5px">
              <router-link to="/tradeSystem/search/byType">
                <el-button type="text">More</el-button>
              </router-link>
            </div>
          </div>
            <!-- 热门一口价 开始-->
            <div v-loading.body="loadingForFixHotList"  style="float:left;">
              <div style="width:960px;margin:0 auto;">
                <div style="width:100%;">
                  <el-carousel indicator-position="outside"  height="270px" :interval="4000" arrow="always">
                    <el-carousel-item><!-- 第一页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px" v-for="single in fix_1_4">
                            <hotCom_Fix :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Fix>
                          </div>
                      </div>
                    </el-carousel-item>
                    <el-carousel-item><!-- 第二页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px" v-for="single in fix_5_8">
                            <hotCom_Fix :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Fix>
                          </div>
                      </div>
                    </el-carousel-item>
                    <el-carousel-item><!-- 第三页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px"  v-for="single in fix_9_12">
                            <hotCom_Fix :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Fix>
                          </div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </div>
            <!-- 热门一口价 结束-->
            <!-- 热门拍卖 开始-->
            <div v-loading.body="loadingForAucHotList"  style="float:left;" >
              <div style="width:960px;margin:0 auto;">
                <div style="width:100%;">
                  <el-carousel indicator-position="outside"  height="270px" :interval="4000" arrow="always">
                    <el-carousel-item><!-- 第一页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px" v-for="single in auc_1_4">
                            <hotCom_Auc :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Auc>
                          </div>
                      </div>
                    </el-carousel-item>
                    <el-carousel-item><!-- 第二页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px" v-for="single in auc_5_8">
                            <hotCom_Auc :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Auc>
                          </div>
                      </div>
                    </el-carousel-item>
                    <el-carousel-item><!-- 第三页 -->
                      <div style="border-top:1px dashed gray;float:left;padding:30px;padding-left:45px;padding-top:20px;width:100%;height:100%">
                          <div style="float:left;width:210px;height:230px;margin-right:10px" v-for="single in auc_9_12">
                            <hotCom_Auc :name="single.name" :id="single.id" :img="single.img" :purpose="single.purpose"></hotCom_Auc>
                          </div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </div>
          </div>
        <!-- 热门技术 结束 -->
    </div>
    <!-- 第三层 结束 -->
    <div class="clearfix"></div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './../components/comsforOpen/openHeader2'
import myFooter from './../components/comsforOpen/openFooter'
import config from './../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import hotCom_Fix from './../components/comsforOpen/openHot_Fix'
import hotCom_Auc from './../components/comsforOpen/openHot_Auc'
export default {
  components:{
    myHeader,
    myFooter,
    hotCom_Fix,
    hotCom_Auc
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url
      bg:require('./../assets/img/openIndexBG2.jpg'),
      imgSource:[ //轮播图
         require('./../assets/img/car7.jpg'),
         require('./../assets/img/car9.jpg'),
         require('./../assets/img/car8.jpg'),
      ],
		  loading3: true,
      loadingForAucHotList:true,
      loadingForFixHotList:true,
      loadingForExpertList:true,
      loadingForQuestionList:true,
      totalPage: 0,
		  currentPage: 1,
		  pageSize: 5,

		  tableData:[], 	//一口价表格的内容
      questionList:[],//求解表格的内容
      expertList:[],
      fixSomeList:[],

      fix_1_4:[],     //一口价热门第一页
      fix_5_8:[],
      fix_9_12:[],
      auc_1_4:[],     //拍卖热门第一页
      auc_5_8:[],
      auc_9_12:[],
    }
  },
  methods:{
    getAucHotList(){
      // let loadingInstance = Loading.service({ body: true });
      let that = this
      that.loadingForAucHotList = true
      this.auc_1_4 = [];
      this.auc_5_8 = [];
      this.auc_9_12 = [];
      that.item=''
      axios.get(that.rootURL+'/orderAuction/getOrderAuctionByName?page=1&pageSize=12&status=1&orderS=read_number&orderO=desc')
            .then(function(res){
                that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)

                var count = 1 //计数，插数组
                for( that.item of res.data.obj ) {
                  if((count>=1)&&(count<=4)){
                    if(that.item.patent.patentImages!=''){
                        that.auc_1_4.push({
                          img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                          name:that.item.patent.name,
                          purpose:that.item.patent.purpose,
                          price:that.item.price,
                          id:that.item.id
                        })
                      }else{
                        that.auc_1_4.push({
                          img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                          name:that.item.patent.name,
                          purpose:that.item.patent.purpose,
                          price:that.item.price,
                          id:that.item.id
                        })
                  }
                }else{
                    if((count>=5)&&(count<=8)){
                      if(that.item.patent.patentImages!=''){
                          that.auc_5_8.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }else{
                          that.auc_5_8.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }
                    }else{
                      if(that.item.patent.patentImages!=''){
                          that.auc_9_12.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }else{
                          that.auc_9_12.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                    }
                }
              }

              count++;
            }
            console.log('fix_9_12：'+that.fix_9_12)
            that.loadingForAucHotList = false
      })
      .catch(function(error){
        console.error(error)
      })
    },
    getFixHotList(){
      let that = this
      that.loadingForFixHotList = true
      that.name_Msg = that.input5

      this.fix_1_4 = [];
      this.fix_5_8 = [];
      this.fix_9_12 = [];
      that.item=''
      axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceByName?page=1&pageSize=12&status=1&orderS=read_number&orderO=desc')
            .then(function(res){
                that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)

                var count = 1 //计数，插数组
                for( that.item of res.data.obj ) {
                  if((count>=1)&&(count<=4)){
                    if(that.item.patent.patentImages!=''){
                        that.fix_1_4.push({
                          img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                          name:that.item.patent.name,
                          purpose:that.item.patent.purpose,
                          price:that.item.price,
                          id:that.item.id
                        })
                      }else{
                        that.fix_1_4.push({
                          img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                          name:that.item.patent.name,
                          purpose:that.item.patent.purpose,
                          price:that.item.price,
                          id:that.item.id
                        })
                  }
                }else{
                    if((count>=5)&&(count<=8)){
                      if(that.item.patent.patentImages!=''){
                          that.fix_5_8.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }else{
                          that.fix_5_8.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }
                    }else{
                      if(that.item.patent.patentImages!=''){
                          that.fix_9_12.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                        }else{
                          that.fix_9_12.push({
                            img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                            name:that.item.patent.name,
                            purpose:that.item.patent.purpose,
                            price:that.item.price,
                            id:that.item.id
                          })
                    }
                }
              }

              count++;
            }
            console.log('fix_9_12：'+that.fix_9_12)
        that.loadingForFixHotList = false
      })
      .catch(function(error){
        console.error(error)
      })
    },
    getExpertList(){
        let that = this
        that.loadingForExpertList = true
        this.expertList = [];
        that.item=''
        axios.get(that.rootURL+'/expert/getAllExperts?page=1&pageSize=5')
            .then(function(res){
              if(res.data.obj==null)
               that.currentPage =1
              else{
                that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
                for( that.item of res.data.obj ) {
                that.expertList.push(
                  {
                    name:that.item.user.name,
                    phone:that.item.user.purpose,
                    email:that.item.user.email,
                    specialty:that.item.specialty,
                    headPhoto:'http://og07ks0jb.bkt.clouddn.com/'+that.item.user.headPhotoslist[0].url
                  })
                }
              }
        that.loadingForExpertList = false
      })
      .catch(function(error){
        console.error(error)
      })
    },
    getQuestionsList(){
      let that = this
      that.loadingForQuestionList = true
      this.questionList = [];
      that.item=''
      axios.get(that.rootURL+'/TechnicalQuestion/getTechnicalQuestions?page=1&pageSize=5')
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
                    end_time:that.item.end_time,
                  }
                )
                  }
                }
        that.loadingForQuestionList = false
      })
      .catch(function(error){
        console.error(error)
      })

    },
    goToDetail(index, row) {
      let that = this
      console.log(index, row);
      that.$router.push({path:'/news/newsDetail/'+row.id})
    },
  	getNewList(){
  		let that = this
  		this.loading3 = true
  		axios.get(that.rootURL+'/con_infor/getAllCon_infor?page='+ that.currentPage +'&pageSize=' + that.pageSize + '&mode=1')
  			.then(function(res){
          if(res.data.obj==null){
          alert('没有符合要求的资讯！')
          that.tableData = []
  						that.loading3 = false
        }
          else{
  					that.tableData = []
  					that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
  					for( var item of res.data.obj ) {
  						that.tableData.push({
                id:item.id,
                title: item.title,
  							create_time: item.create_time,
  							read_number: item.read_number,
  							content: item.content,
  						})
  						that.loading3 = false
  					}
          }
  			})
  			.catch(function(error){
  				console.error(error)
  			})
    	},
  	},

  	created(){
  		this.getNewList();
      this.getQuestionsList();
      this.getExpertList();
      this.getFixHotList()
      this.getAucHotList()
  	}
}
</script>

<style scoped>
#whole{
  width:100%;
  background: #F7F7F7;
}
.bodyBG{
  /*background-image: url('./openIndexBG2.jpg');*/
  background-size: 100% ;
  height:110px;
  width: 100%
}
.block{
  float: right;
  margin-bottom: 15px;
}
.titleBlock {
background-color: red
}
.askerImg{
  float: left;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: -2px;
}
.expertInfo{
  float: left;
  padding: 10px 20px;
  line-height: 25px;
}
.omit{
  width:840px;
  overflow: hidden;
  vertical-align: top;
  text-overflow:ellipsis;
  white-space: nowrap;/*不换行*/
}

.image {
  width: 240px;
  height:180px;
  display: block;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
}

.el-carousel__item:nth-child(2n+1) {
}
</style>
