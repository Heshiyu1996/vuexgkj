<template>
  <div style="width:100%">
    <div id="bigBlock">
      <div id="home-tb-div" style="width:1100px;text-align:center;margin:0 auto;height:900px">
        <div style="float:left;margin-left:20px">
          <el-select v-model="value" @change="getTwo" placeholder="一级目录" >
            <el-option
              v-for="ite in options"
              :label="ite.label"
              :value="ite.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" placeholder="二级目录" @change="getThree">
            <el-option
              v-for="item in options2"
              :label="item.label2"
              :value="item.value2">
            </el-option>
          </el-select>
          <el-select v-model="value3" placeholder="三级目录">
            <el-option
              v-for="item in options3"
              :label="item.label3"
              :value="item.value3">
            </el-option>
          </el-select>
        </div>
        <div style="text-align:center;float:left;margin-left:20px;width:600px">
          <div style="width:200px;margin-left:-10px;float:left">
            <div style="float:left;width:100px;">
              <el-button type="primary" @click="handleCat">搜 索 技 术</el-button>
            </div>
            <div>
              <el-button type="success" @click="goBack">按 类 型</el-button>
            </div>
          </div>
          <div style="float:left;margin-left:12px;width:380px;">
            <el-alert
              :title="Tip" type="info":closable="false">
            </el-alert>
          </div>
        </div>
        <div class="clearfix"  ></div>
        <div style="margin:10px;margin:0 auto">
          <div style="padding:10px;padding-left:60px;width:1100px;text-align:left" >
            <!-- 所有专利（模糊）开始 -->
            <div  v-if="Some" style="width:250px;float:left;margin:10px">
              <div style="height:900px;margin-left:-70px;padding:10px;width:1100px;text-align:left" >
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
                          <div style="float:left;text-align:right;width:80px;font-size:14px;float:right;line-height:20px;color:rgb(230, 94, 64)" class="omit" >{{esingle.seller}}</div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="bottom clearfix">
                          <div class="purpose omit" id="purpose" style="margin-left:10px;margin-top:-10px;height:16px">{{esingle.purpose}}</div>
                        </div>
                      </div>
                    </el-card>
                  </router-link>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="block"  style="float:left;margin-top:-10px;margin-left:650px;width:420px;">
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
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './../components/myheader'
import mySearch from './../components/search'
import myFooter from './../components/myfooter'

import config from './../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'

export default {
  components:{
    myHeader,
    mySearch,
    myFooter
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url

      idList:[],
      item:'',


      rootURL: config.URL,	//请求的url
      tableData:[],
      loading3: true,

      currentCatId: '',
      currentCatName: '',
      Tip:'请通过左侧下拉框，选择目录名来查询技术',
      Some:false,
      SomeList:[],

      totalPage: 0,
      currentPage: 1,
      pageSize: 12,

      paths_Msg:[],
      paths_Tips:[],
      options: [{
        value: '1',
        label: '车身'
      }, {
        value: '2',
        label: '车灯'
      }, {
        value: '3',
        label: '发动机'
      }, {
        value: '4',
        label: '车架'
      }, {
        value: '5',
        label: '喷漆'
      }, {
        value: '6',
        label: '底盘'
      }, {
        value: '7',
        label: '电气设备'
      }, {
        value: '8',
        label: '模型'
      }, {
        value: '9',
        label: '汽车库'
      }, {
        value: '10',
        label: '软件'
      }],

      options2: [],
      options3: [],
      value: '',
      value2: '',
      value3: '',

    }
  },
  methods:{
    goBack(){
      let that = this
      that.$router.push({path:'/tradeSystem/search/byType'})
    },
    getSomeList(){
      let loadingInstance = Loading.service({ body: true });
      let that = this
      this.SomeList = [];
      that.item=''
      axios.get(that.rootURL+'/patent/getPatentByP_C?page='+ that.currentPage +'&pageSize=' + that.pageSize +'&cata_id=' + that.currentCatId)
      .then(function(res){
        if(res.data.obj==null)
        alert("没有符合条件的技术！")
        else{
          that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
          for( that.item of res.data.obj ) {

            if(that.item.catalog1en!=null){
              that.paths_Msg.push(that.item.catalog1en.name)
              that.paths_Tips.push(that.item.catalog1en.name)
              if(that.item.catalog2en!=null){
                that.paths_Msg.push(that.item.catalog2en.name)
                that.paths_Tips.push(that.item.catalog2en.name)
                if(that.item.catalog3en!=null){
                  that.paths_Msg.push(that.item.catalog3en.name)
                  that.paths_Tips.push(that.item.catalog3en.name)
                  if(that.item.catalog4en!=null){
                    that.paths_Msg.push(that.item.catalog4en.name)
                    that.paths_Tips.push(that.item.catalog4en.name)
                  }

                }
              }
            }
            var paths =''
            if(that.paths_Tips!=''){
              paths = paths + '【' + that.paths_Tips.pop() + '】'
              if(that.paths_Tips!=''){
                paths = paths + '【' + that.paths_Tips.pop() + '】'
                if(that.paths_Tips!=''){
                  paths = paths + '【' + that.paths_Tips.pop() + '】'
                }
              }
            }
            that.Tip=('以下就是有关于'+paths+'的技术')

            if(that.item.patentImages!=''){
              that.SomeList.push({
                img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patentImages[0].url,
                id:that.item.id,
                name:that.item.name,
                purpose:that.item.purpose,
                seller:that.item.user.name,
                cat:that.paths_Msg
              })
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
        that.Some=true;
        localStorage.removeItem('catID')
      })
      .catch(function(error){
        console.error(error)
      })

    },

    handleCat(val) {
      let that = this
      // console.log(that.value,that.value2,that.value3)
      if(that.value3!=''&&that.value3!='空'){
        that.currentCatId=that.value3;
      }else{
        if(that.value2!=''&&that.value2!='空'){
          that.currentCatId=that.value2;
        }else{
          that.currentCatId=that.value1;
        }
      }
      if(that.currentCatId!=undefined){
        that.Some=true;
        this.SomeList = [];
        that.getSomeList();
      }else{
        that.Tip = ('这个目录下是空的！')
      }

    },

    handleSizeChange(val) {
      let that = this
      this.pageSize = val;
      this.SomeList = [];
      that.getSomeList();
    },
    handleCurrentPageChange(val) {
      let that = this
      this.currentPage = val;
      this.SomeList = [];
      that.getSomeList();
    },

    getTwo(data){
      // console.log(data);
      let that = this
      that.options2=[]
      that.value2=''

      axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
      .then(function(res) {

        if(res.data.obj!=null)    {
          for(var it of res.data.obj)
          that.options2.push({
            label2: it.name,
            value2: it.id,
          })
          that.value2=that.options2[0].value2

        }
        else{
          // console.log('2'+res.data.msg)
          that.value2 = '空'

        }

      })
      .catch(function(error) {
        console.error(error)
      })


    },
    getThree(data){
      // console.log(data);
      let that = this
      that.options3=[]
      that.value3=''
      if(that.value2!='空')
      axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
      .then(function(res) {
        if(res.data.obj!=null){
          for(var it of res.data.obj)
          that.options3.push({
            label3: it.name,
            value3: it.id,
          })

          that.value3=that.options3[0].value3

        }
        else{
          // console.log('3'+res.data.msg)
          that.value3 = '空'
        }
      })
      .catch(function(error) {
        console.error(error)
      })


    },
    loadFromLocalStorage(id){
      let that = this
      if(localStorage.getItem('catID')!=null){
        var id = localStorage.getItem('catID')
        that.currentCatId = id
        that.getSomeList()
      }

    },
  },
  created(){
    this.loadFromLocalStorage()
  },
  watch:{
    '$route':'loadFromLocalStorage'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
#topBlock{
  width: 100%;
}
h1{
  text-align: center;
  color: #475669;
  font-size: 28px;
}
/*首页的表格*/
#home-tb-div{
  width: 1080px;
  margin: 0 auto !important;
  margin-top: 20px !important;
  margin-bottom: 60px;
}

.image {
  width: 240px;
  height:180px;
  display: block;
}

.purpose {
  font-size: 14px;
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
.block{
  float:left;
  margin-top: 24px;
  margin-left: 610px;
}
</style>
