<template>
  <div style="float:right;">
    <div style="width:330px;margin-top:10px;margin-bottom:10px">
      <el-tabs type="border-card">
        <el-tab-pane label="技术供给">
          <div  style="float:left;">
            <div class="block" style="margin-left:240px;margin-top:-15px;float:right;width:420px">
              <el-pagination
                @size-change="handleSizeChange0"
                @current-change="handleCurrentPageChange0"
                :page-count = "totalPage0"
                :page-size="pageSize0"
                layout="total,prev,next">
              </el-pagination>
            </div>
            <div class="clearfix"></div>
            <div style="width:330px;height:300px;padding-left:10px;text-align:left;margin:0 auto;margin-left:-5px" >
              <div v-for="single in hotList" style="width:140px;height:140px;float:left;margin-bottom:10px;margin-right:15px;">
                <router-link :to="'/Patent/fixPriceInfo/' + single.id">
                    <el-card  :body-style="{ padding: '0px' }">
                      <img :src="single.img" class="image_Hot">
                      <div style="padding:15px;">
                        <div style="float:left;width:50px;height:25px;margin-left:-10px">
                          <el-tag v-if="true" type="success"> 一口价</el-tag>
                        </div>

                        <div style="text-align:right;float:right;" >
                        <div class="omit" style="margin-right:-10px;line-height:35px;ext-align:right;font-weight:bolder;font-size:12px;width:78px;height:25px;float:left;color:rgb(230, 94, 64)">
                            ¥ {{single.price}}
                        </div>
                        </div>


                                                              <div class="omit" style="font-size:12px;line-height:16px;width:155px;height:20px;margin-top:5px;float:left">
                                                                {{single.name}}
                                                              </div>

                      </div>
                    </el-card>
              </router-link>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="技术提问">
          <div style="float:left">
              <div class="block" style="margin-left:240px;margin-top:-15px;float:right;width:420px">
                <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentPageChange1"
                  :page-count = "totalPage1"
                  :page-size="pageSize1"
                  layout="total,prev,next">
                </el-pagination>
              </div>
              <div class="clearfix"></div>

            <div style="padding:0px;width:100px;height:350px;text-align:left" >
              <div v-for="single in questionList" style="width:300px;height:70px;margin:0 auto;">
                    <el-card class="box-card" :body-style="{ padding: '10px' }" >
                      <div style="float:left;padding-top:10px;width:60px;height:50px;margin-top:-5px">
                      <img :src="'http://og07ks0jb.bkt.clouddn.com/' + single.headPhotos" class="askerImg">
                      </div>
                      <div style="padding:10px;">

                        <div id="name" class="omit" style="margin-top:-10px;width:200px;height:30px;float:left">
                          <router-link :to="'/tradeSystem/questionDetail/' + single.askID">
                            <el-button type="text" >{{ single.title }}</el-button>
                          </router-link>
                        </div>

                        <div style="text-align:left;margin-left:5px;font-size:12px;width:200px;margin-bottom:5px;float:left;line-height:25px;color:gray" class="omit" >
                           {{single.description}}
                        </div>



                      </div>
                    </el-card>
              <!-- </router-link> -->
              </div>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>


</template>

<script>

import axios from 'axios'
import config from './../publicAPI/config'
export default {
  data () {
    return {

      rootURL: config.URL,
      hotList:[],
      questionList : [],
      totalPage0: 0,
      currentPage0: 1,
      pageSize0: 4,

      totalPage1: 0,
      currentPage1: 1,
      pageSize1: 5,
    }
  },

  methods: {
    getQuestionsList(){
      let that = this
       var name_Msg = ''

      this.questionList = [];
        that.item=''
      axios.get(that.rootURL+'/TechnicalQuestion/getTechnicalQuestionsByKeyword?page='+ that.currentPage1 +'&pageSize=' + that.pageSize1 +'&keyword=' +name_Msg)
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
                  }
                )
                  }
                }
      })
      .catch(function(error){
        console.error(error)
      })

    },
    getHotFixPriceList(){
      let that = this

      this.hotList = [];
        that.item=''
      axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceByName?page='+ that.currentPage0 +'&pageSize=' + that.pageSize0)
            .then(function(res){
              if(res.data.obj==null){
             that.currentPage0 =1
            }
              else{
                that.totalPage0 = Math.ceil(res.data.dataCount/that.pageSize0)
                for( that.item of res.data.obj ) {
                  if(that.item.patent.patentImages!='')
                that.hotList.push({
                    img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
                    name:that.item.patent.name,
                    purpose:that.item.patent.purpose,
                    price:that.item.price,
                    status:that.item.status == 1?'进行中':'已结束',
                    id:that.item.id
                  })
                  else{
                    that.hotList.push({
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

    },
    handleSizeChange0(val) {
      let that = this
        this.pageSize0 = val;
        this.hotList = [];
      this.getHotFixPriceList();
    },
    handleCurrentPageChange0(val) {
        this.currentPage0 = val;
        this.hotList = [];
        this.getHotFixPriceList();
    },
    handleSizeChange1(val) {
      let that = this
        this.pageSize1 = val;

        this.questionList = [];

      this.getQuestionsList();
    },
    handleCurrentPageChange1(val) {
        this.currentPage1 = val;
        this.questionList = [];
        this.getQuestionsList();
    },
    render(){
        let that = this
         console.log(that.$route.matched[0].name)
         if((that.$route.matched[0].name == 'fixPriceInfoDetail')||(that.$route.matched[0].name == 'auctionInfoDetail')){
        this.getHotFixPriceList()
        this.getQuestionsList()
      }
    },
},
      created() {
          this.render()
      },
      watch:{
        '$route':'render'
      }

}


</script>

<style scoped>
.image_Hot {
  width:130px;
  height:70px;
  display: block;
}

.omit {
    width: 840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*不换行*/
}

.askerImg{
  float: left;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: -2px;
}
</style>
