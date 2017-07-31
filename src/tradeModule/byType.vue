<template>

  <div style="width:100%">
    <div id="bigBlock">
      <!-- 内置搜索栏 开始 -->
      <div  id="searchBox" style="width:1210px;text-align:center;margin:0 auto;">
        <div style="margin-top:30px;width:960px;margin: 0 auto;">

          <div style="padding-top:10px;width:1000px;">
            <div style="float:left;margin-top:15px;margin-left:-5px;margin-right:5px"><el-button type="warning"  @click="goBack()"  >按 目 录</el-button></div>

            <div style="float:left;margin-top: 15px;width:800px">
              <el-input placeholder="请把要搜索的告诉我们..." v-model="input5">
                <el-select v-model="value" slot="prepend" placeholder="所有专利" @change="handleValue">
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="tryToSearch()"> 搜 索 </el-button>
              </el-input>
              <div style="float:left;margin-left:0px;width:800px;margin-top:5px;margin-bottom:5px">
              <el-alert  :title="Tip" :type="tipType":closable="false">
              </el-alert>
            </div>
            </div>
          </div>
          <div class="condition_Fix" style="margin-left:5px">
            <el-tag v-if="show_conditions_Fix" >
              <div style="width:500px;color:black">
                <div style="width:1080px;height:40px;">
                  <div style="float:left;width:250px;">
                    <div style="float:left;width:60px;height:25px;margin-top:3px;">
                      状态：
                    </div>
                    <div style="float:left;">
                      <el-radio-group v-model="Radio_status_Fix" size="small">
                        <el-radio-button label=""> 所 有 </el-radio-button>
                        <el-radio-button label="1">进行中</el-radio-button>
                        <el-radio-button label="2">已结束</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>

                  <div style="float:left;width:270px">
                    <div style="float:left;height:25px;margin-top:3px;margin-left:10px">
                      价格区间：
                    </div>
                    <div style="float:left;width:80px">
                      <div style="float:left;width:15px;height:25px;margin-top:3px;">¥</div>
                      <el-input v-model="priceRange_low_Fix" placeholder="最低价" size="small"></el-input>
                    </div>
                    <div style="float:left;;width:35px;text-align:right;height:25px;margin-top:3px;"> ～ </div>
                    <div style="float:right;width:80px">
                      <el-input v-model="priceRange_high_Fix" placeholder="最高价"  size="small"></el-input>
                    </div>
                  </div>

                  <div style="margin-left:30px;float:left;width:280px">
                    <div style="float:left;height:25px;margin-top:3px;margin-left:10px">
                      排序类型：
                    </div>
                    <div style="float:left;width:100px;">
                      <el-radio-group v-model="Radio_type_Fix" size="small">
                        <el-radio-button label="create_time">按时间</el-radio-button>
                        <el-radio-button label="price">按价格</el-radio-button>
                        <el-radio-button label="read_number">按浏览次数</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>

                  <div style="margin-left:15px;float:left;width:170px;">
                    <div style="float:left;height:25px;margin-top:3px;margin-left:10px">
                      排序方式：
                    </div>
                    <div style="float:left;width:100px">
                      <el-radio-group v-model="Radio_order_Fix" size="small">
                        <el-radio-button label="asc">升序</el-radio-button>
                        <el-radio-button label="desc">降序</el-radio-button>
                      </el-radio-group>

                    </div>
                  </div>

                </div>

              </div>
            </el-tag>
          </div>

          <div class="condition_Auc" style="margin-left:5px">
            <el-tag v-if="show_conditions_Auc" >
              <div style="width:500px;color:black">
                <div style="width:1100px;height:40px;">
                  <div style="float:left;width:250px;">
                    <div style="float:left;width:40px;height:25px;margin-top:3px;">
                      状态：
                    </div>
                    <div style="float:left;">
                      <el-radio-group v-model="Radio_status_Auc" size="small">
                        <el-radio-button label=""> 所 有 </el-radio-button>
                        <el-radio-button label="1">进行中</el-radio-button>
                        <el-radio-button label="2">已结束</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>

                  <div style="margin-left:-60px;float:left;width:260px;">
                    <div style="float:left;height:25px;margin-top:3px;margin-left:10px">
                      类型：
                    </div>
                    <div style="float:left;width:100px;">
                      <el-radio-group v-model="Radio_style_Auc" size="small">
                        <el-radio-button label=""> 所 有 </el-radio-button>
                        <el-radio-button label="1">升价拍卖</el-radio-button>
                        <el-radio-button label="2">降价拍卖</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>

                  <div style="float:left;width:270px;margin-left:-40px;height:40px">
                    <div style="float:left;height:25px;margin-top:3px;margin-left:10px">
                      时间：
                    </div>
                    <div class="timeRange" style="width:200px">
                      <div style="width:200px">
                        <el-date-picker
                        :clearable="noClear"
                        size="small"
                        v-model="timeRange_Auc0"
                        type="daterange"
                        placeholder="选择日期范围"
                        @change="getDates"
                        >
                      </el-date-picker>
                    </div>
                  </div>
                </div>

                <div style="margin-left:30px;float:left;width:190px">
                  <div style="float:left;height:25px;margin-top:3px;margin-left:-60px">
                    排序类型：
                  </div>
                  <div style="float:left;width:100px;">
                    <el-radio-group v-model="Radio_type_Auc" size="small">
                      <el-radio-button label="start_time">按时间</el-radio-button>
                      <el-radio-button label="current_price">按当前价</el-radio-button>
                      <el-radio-button label="read_number">按浏览数</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>

                <div style="margin-left:15px;float:left;width:170px;">
                  <div style="float:left;height:25px;margin-top:3px;margin-left:-10px">
                    方式：
                  </div>
                  <div style="float:left;width:100px">
                    <el-radio-group v-model="Radio_order_Auc" size="small">
                      <el-radio-button label="asc">升序</el-radio-button>
                      <el-radio-button label="desc">降序</el-radio-button>
                    </el-radio-group>

                  </div>
                </div>
              </div>
            </div>
            </el-tag>
          </div>
        </div>
      </div>
      <!-- 内置搜索栏 结束 -->

      <div class="clearfix"></div>

      <!-- 列表展示区 开始  -->

      <div id="home-tb-div" style="width:1210px;text-align:center;margin:0 auto;">
        <div>
          <!-- <resultList :some1='someTF' :FixPriceSome='FixPriceSomeTF' :auctionSome='auctionSomeTF' :input5='input5' :select='select'></resultList> -->
          <div style="height:900px;margin-top:-20px;">

            <div style="text-align:center;padding-left:90px;margin:0 auto;">
              <div class="clearfix"></div>
              <div>
                <!-- 所有专利（模糊）开始 -->
                <div style="width:250px;float:left;margin:10px"  v-show="SomeTF" >
                  <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left;height:900px" >
                    <div class="smallCard" v-for="esingle in SomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:30px">

                      <router-link :to="'/tradeSystem/patentCommonInfo/' + esingle.id">
                        <el-tag>
                          <el-card class="box-card" :body-style="{ padding: '0px' }">
                            <img :src="esingle.img" class="image">
                            <div style="padding:10px;">
                              <div style="float:left;width:210px;margin-top:-8px">
                                <el-tag type="primary" v-for="single in esingle.cat">{{single}}</el-tag>
                              </div>
                              <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;margin-top:5px;float:left;color:black;font-size:16px">{{esingle.name}}</div>

                              <div style="text-align:left;float:right;width:80px;font-size:12px;color:gray;"id="price" >所有人：
                                <div style="float:left;text-align:right;width:80px;font-size:14px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >{{esingle.seller}}</div>
                              </div>
                              <div class="clearfix"></div>
                              <div class="bottom clearfix">
                                <div class="purpose omit" id="purpose" style="margin-left:10px;margin-top:-10px;">{{esingle.purpose}}</div>
                              </div>
                            </div>
                          </el-card>
                        </el-tag>
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
                <div  v-show="FixPriceSomeTF" style="width:250px;float:left;margin:10px;">
                  <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left;height:900px" >
                    <div  class="smallCard" v-for="single in fixSomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:25px">
                      <router-link :to="'/Patent/fixPriceInfo/' + single.id">
                        <el-tag>
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

                              <div id="name" class="omit" style="line-height:16px;width:150px;height:20px;margin-top:5px;float:left;color:black;font-size:16px">{{single.name}}</div>
                              <div style="float:right;text-align:right;font-size:14px;width:50px;float:right;line-height:25px;color:rgb(147, 139, 138)" class="omit" > {{single.status}}</div>

                              <div class="bottom clearfix">
                                <div class="purpose omit" id="purpose" style="margin-left:10px">{{single.purpose}}</div>
                              </div>
                            </div>
                          </el-card>
                          <el-tag>
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
                  <div v-show="auctionSomeTF" style="width:250px;float:left;margin:10px">
                    <div style="margin-left:-70px;padding:10px;width:1100px;text-align:left;height:900px" >
                      <div class="smallCard" v-for="asingle in aucSomeList" style="width:250px;height:250px;float:left;margin:10px;margin-bottom:25px">
                        <router-link :to="'/Patent/auctionInfo/' + asingle.id">
                          <el-tag>
                            <el-card class="box-card" :body-style="{ padding: '0px' }">
                              <img :src="asingle.img" class="image">
                              <div style="padding:15px;">
                                <div style="float:left;width:10px">
                                  <el-tag v-if="true" type="danger"> 拍卖品</el-tag>
                                </div>

                                <div style="text-align:right;float:right;width:165px;"id="price" >
                                  <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >  ¥ {{asingle.price}}</div>
                                </div>
                                <div id="name" class="omit" style="line-height:16px;width:150px;height:20px;margin-top:5px;float:left;color:black;font-size:16px">{{asingle.name}}</div>
                                <div style="float:right;text-align:right;font-size:14px;width:60px;float:right;line-height:15px;color:rgb(147, 139, 138)" class="omit" > {{asingle.status}}</div>
                                <div class="bottom clearfix">
                                  <div class="purpose omit" id="purpose" style="margin-left:10px">{{asingle.purpose}}</div>
                                </div>
                              </div>
                            </el-card>
                          </el-tag>
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
            </div>
        </div>
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
// import mySearch from './../components/search'
import config from './../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'

import resultList from './../components/resultList'
export default {
  components:{
    myHeader,
    myFooter,
    // mySearch,
    resultList,
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
      select: '所有专利',

      Some:false,
      FixPriceSome:false,
      auctionSome:false,

      currentCatId: '',
      currentCatName: '',
      showTip: false,
      Tip:'请通过左侧下拉框，选择目录名来查询技术',
      tipType:'info',

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
      FixPriceSomeTF:false,
      auctionSomeTF:false,
      SomeTF:false,

      options: [{
        value: '所有专利',
        label: '所有专利'
        }, {
          value: '一口价',
          label: '一口价'
        }, {
          value: '拍卖',
          label: '拍卖',
      }],

      value:'所有专利',
      transitionName: 'slide-left',

      //↓↓ 一口价筛选条件
      show_conditions_Fix:false,
      Radio_status_Fix: '',//【状态组】的选择
      priceRange_low_Fix:0,//【价格组—最低价】的选择
      priceRange_high_Fix:99999,//【价格组—最高价】的选择
      Radio_type_Fix:'create_time',//【排序类型组】的选择
      Radio_order_Fix:'asc',//【排序方式组】的选择

      //↓↓ 拍卖筛选条件
      show_conditions_Auc:false,
      Radio_status_Auc: '',//【状态组】的选择

      Radio_type_Auc:'start_time',//【排序类型组】的选择
      Radio_style_Auc:'',//【拍卖类型组】默认为所有
      Radio_order_Auc:'asc',//【排序方式组】的选择

      timeRange_Auc0:'',//【拍卖时间组】初始值（仅供显示用）
      timeRange_Auc:'',//【拍卖时间组】实际值
      timeRange_Auc_Left:'',//【拍卖时间组】实际传入值
      timeRange_Auc_Right:'',//【拍卖时间组】实际传入值

      noClear:false,//不显示清除按钮
    }
  },
  methods:{
    getDates(date){//此函数用于从日期选择器获得input
      let that = this
      this.timeRange_Auc = date
      that.timeRange_Auc_Left  = that.timeRange_Auc.split(' - ')[0]
      that.timeRange_Auc_Right = that.timeRange_Auc.split(' - ')[1]
    },
    goBack(){
      let that = this
      that.$router.push({path:'/tradeSystem/search/byCategory'})
    },
    searchAll(){
      this.tryToSearch()
    },
    handleValue(data){
      let that = this
      that.select = data
      if(data == '所有专利'){
        that.SomeTF = true
        that.FixPriceSomeTF = false
        that.auctionSomeTF = false
      }
      if(data == '一口价'){
        that.SomeTF = false
        that.FixPriceSomeTF = true
        that.auctionSomeTF = false
      }
      if(data == '拍卖'){
        that.SomeTF = false
        that.FixPriceSomeTF = false
        that.auctionSomeTF = true
      }
    },

    getSomeList(){
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
      })
      .catch(function(error){
        console.error(error)
      })

    },
    getFixPriceSomeList(){
      let that = this
      that.name_Msg = that.input5
      that.fixSomeList = [];
      that.item=''
      if(that.name_Msg!=null){
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceByName?' +
        'page='+ that.currentPage1 +
        '&pageSize=' + that.pageSize1 +
        '&name=' + that.name_Msg +
        '&status=' + that.Radio_status_Fix +
        '&low_price=' + that.priceRange_low_Fix +
        '&high_price=' + that.priceRange_high_Fix +
        '&orderS=' + that.Radio_type_Fix +
        '&orderO=' + that.Radio_order_Fix
      )
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
      })
      .catch(function(error){
        console.error(error)
      })
      }else{
        console.log('给我空格怎么搜？！')
      }
    },
    getAucSomeList(){
      let that = this
      that.name_Msg = that.input5
      this.aucSomeList = [];
      that.item=''
      if(that.timeRange_Auc_Left !='' && that.timeRange_Auc_Right !=''){//没填《时间范围》的情况
        axios.get(that.rootURL+'/orderAuction/getOrderAuctionByName?'+
        'page='+ that.currentPage2 +
        '&pageSize=' + that.pageSize2 +
        '&name=' + that.name_Msg +
        '&status=' + that.Radio_status_Auc +
        '&min_end_time=' + that.timeRange_Auc_Left +
        '&max_end_time=' + that.timeRange_Auc_Right +
        '&type=' + that.Radio_style_Auc +
        '&orderS=' + that.Radio_type_Auc +
        '&orderO=' + that.Radio_order_Auc
        )
        .then(function(res){
          if(res.data.obj==null){
            that.currentPage2 =1
            alert(res.data.msg)
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
        })
        .catch(function(error){
          console.error(error)
        })
        }else{//填了《时间范围》的情况
          axios.get(that.rootURL+'/orderAuction/getOrderAuctionByName?'+
          'page='+ that.currentPage2 +
          '&pageSize=' + that.pageSize2 +
          '&name=' + that.name_Msg +
          '&status=' + that.Radio_status_Auc +
          //  '&min_end_time=' + that.timeRange_Auc_Left +
          //  '&max_end_time=' + that.timeRange_Auc_Right +
          '&type=' + that.Radio_style_Auc +
          '&orderS=' + that.Radio_type_Auc +
          '&orderO=' + that.Radio_order_Auc
        )
        .then(function(res){
          if(res.data.obj==null){
            that.currentPage2 =1
            alert(res.data.msg)
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
        })
        .catch(function(error){
          console.error(error)
        })
      }
    },

    handleSizeChange2(val) {
      let that = this
      this.pageSize2 = val;

      this.aucSomeList = [];

      this.getAucSomeList();
    },
    handleCurrentPageChange2(val) {
      this.currentPage2 = val;
      this.aucSomeList = [];
      this.getAucSomeList();
    },

    handleSizeChange1(val) {
      let that = this
      this.pageSize1 = val;
      this.fixSomeList = [];
      this.getFixPriceSomeList();
    },
    handleCurrentPageChange1(val) {
      this.currentPage1 = val;
      this.fixSomeList = [];
      this.getFixPriceSomeList();
    },

    handleSizeChange(val) {
      let that = this
      this.pageSize = val;

      this.SomeList = [];

      this.getSomeList();
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.SomeList = [];
      this.getSomeList();
    },

    tryToSearch() {
      let that = this
      var myChoose=that.select
      that.Tip = '【 搜索结果 】 ' + ' 类型：'+ that.select+' ， 关键字：' + that.input5

      if(that.select!=''){
        if(that.input5==''){
          if(myChoose=='所有专利'){
            that.auctionSomeTF=false;
            that.SomeTF=true;
            that.FixPriceSomeTF=false;
            this.SomeList = [];
            that.getSomeList();
          }
          if(myChoose=='一口价'){
            this.fixSomeList = [];
            that.auctionSomeTF=false;
            that.FixPriceSomeTF=true;
            that.SomeTF=false;
            that.getFixPriceSomeList();
          }
          if(myChoose=='拍卖'){
            that.auctionSomeTF=true;
            that.SomeTF=false;
            that.FixPriceSomeTF=false;
            that.getAucSomeList();
          }
        }
        else{
          if(myChoose=='一口价'){
            that.FixPriceSomeTF=true;
            that.auctionSomeTF=false;
            that.SomeTF=false;
            that.getFixPriceSomeList();
          }
          if(myChoose=='拍卖'){
            that.FixPriceSomeTF=false;
            that.auctionSomeTF=true;
            that.SomeTF=false;
            that.getAucSomeList();
          }
          if(myChoose=='所有专利'){
            that.FixPriceSomeTF=false;
            that.auctionSomeTF=false;
            that.SomeTF=true;
            this.SomeList = [];
            that.getSomeList();
          }
        }
      }else{
        alert("请选择专利类别！")
      }
    },
 },
watch:{
  input5(val){
    let that = this
    that.input5 = val
  },
  someTF(val) {
    let that = this
    if(val == true){
      this.SomeT = true
      that.FixPriceSomeTF = false
      that.auctionSomeTF = false
      that.tipType = 'info'
      that.show_conditions_Fix=false
      that.show_conditions_Auc=false
      that.SomeList = [];
      that.aucSomeList = [];
      that.fixSomeList = [];
      //  that.tryToSearch()
      //  alert('someTF变化时执行的')
    }else{
      that.SomeTF = false
    }
  },
  FixPriceSomeTF(val) {
    let that = this
    if(val == true){
      that.FixPriceSomeTF = true
      that.SomeTF = false
      that.auctionSomeTF = false

      that.show_conditions_Fix=true
      that.show_conditions_Auc=false
      that.tipType = 'success'

      that.SomeList = [];
      that.aucSomeList = [];
      that.fixSomeList = [];
      //  that.tryToSearch()
      //  alert('fxpTF变化执行的')
    }else{
      that.FixPriceSomeTF = false
    }
  },
  auctionSomeTF(val) {
    let that = this
    if(val == true){
      that.auctionSomeTF = true
      that.FixPriceSomeTF = false
      that.SomeTF = false
      that.tipType = 'error'
      that.show_conditions_Auc=true
      that.show_conditions_Fix=false



      that.SomeList = [];
      that.aucSomeList = [];
      that.fixSomeList = [];

    }else{

      that.auctionSomeTF = false
    }
  },
  select(val){
    let that = this
    that.select = val

    that.SomeList = [];
    that.aucSomeList = [];
    that.fixSomeList = [];
    that.tryToSearch()
    if(that.select == '所有专利'){

      that.show_conditions_Auc=false
      that.show_conditions_Fix=false
      that.tipType = 'info'

    }

  }
},
created(){
  let that = this
  that.tryToSearch()
},
}
</script>

<style scoped>
#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  margin-top: -20px;
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
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

  .condition_Fix .el-tag{
    background-color: white;
    border:1px solid  green;

    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }
  .el-button--warning{
    width:100px;
    height:77px;
    /*margin-top:50px*/
  }
  .condition_Auc .el-tag{
    background-color: white;
    border:1px solid  rgb(235, 5, 94);
    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }

  .smallCard .el-tag{
    background-color: transparent
  }
  </style>
