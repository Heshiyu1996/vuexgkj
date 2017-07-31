<template>
  <div id="whole">
    <div class="experts" style="margin:0 auto;padding:20px;padding-left:10px">
      <div class="phone" style="background-color:rgba(247, 247, 247,0.2);width:940px">
        <h3>小功资讯热线：010-6666666</h3>
        <p>您的当前位置：首页 > 专家区</p>
      </div>

      <div   class="expertsList" style="background-color:rgba(247, 247, 247,0.2);padding:10px;width:940px;text-align:left;height:740px" >
        <div v-for="esingle in SomeList" style="width:400px;height:130px;float:left;margin:10px;margin-left:35px;margin-bottom:5px">
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div class="expertImg">
              <img  :src="esingle.headPhoto" style="margin:10px;width:100%;height:100%;border-radius:50%;">
            </div>
            <div class="expertInfo">
              <h4>名字：{{esingle.name}}</h4>
              <p>手机号码：{{esingle.phone}}</p>
              <p>邮箱：{{esingle.email}}</p>
              <p>专业：{{esingle.specialty}}</p>
            </div>
          </el-card>
        </div>
      </div>

      <div class="clearfix"></div>
      <div class="block" style="margin-top:25px">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="currentPage"
        :page-count = "totalPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize">
        </el-pagination>
      </div>

  </div>
  <div class="clearfix"></div>
  <myFooter></myFooter>
</div>
</template>

<script>
import myFooter from './../components/comsforOpen/openFooter'
import axios from 'axios'
import config from './../publicAPI/config'
import { Loading } from 'element-ui';

export default {
  components:{
    myFooter,
  },
  data () {
    return {
      imgSource:[ //轮播图
        require('./../assets/img/car7.jpg'),
        require('./../assets/img/car9.jpg'),
        require('./../assets/img/car8.jpg'),
      ],
      rootURL:config.URL,
      item:'',
      totalPage: 0,  //一口价总页数
      currentPage: 1,  //一口价当前页
      pageSize: 10,  //一口价每页记录
      SomeList:[],
    }
  },
  methods: {
    getExpertsList(){
      let that = this
      this.SomeList = [];
      that.item=''
      axios.get(that.rootURL+'/expert/getAllExperts?page='+ that.currentPage +'&pageSize='+that.pageSize)
      .then(function(res){
        if(res.data.obj==null)
        that.currentPage =1
        else{
          that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
          for( that.item of res.data.obj ) {
            that.SomeList.push(
              {
                name:that.item.user.name,
                phone:that.item.user.purpose,
                email:that.item.user.email,
                specialty:that.item.specialty,
                headPhoto:'http://og07ks0jb.bkt.clouddn.com/'+that.item.user.headPhotoslist[0].url
              }
            )
          }
        }
      })
      .catch(function(error){
        console.error(error)
      })

    },

    handleSizeChange(val) {
      let that = this
      this.pageSize = val;
      this.SomeList = [];
      this.getExpertsList();
      console.log('我再sizeChange1里：'+`每页 ${val} 条`);
    },

    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.SomeList = [];
      this.getExpertsList();
      console.log(`当前页: ${val}`);
    },
  },
  created(){
    this.SomeList = [];
    this.getExpertsList()
  }
}
</script>

<style scoped>
#whole{
  background: transparent;
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

.experts{
  /*border: 1px solid gray;*/
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background: transparent;
  -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
  -moz-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for firefox */
  -webkit-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for safari or chrome */
  box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for opera or ie9 */
}
.phone{
  border-bottom: 1px solid #D0D0D0;
  padding-right:10px;
  line-height: 30px;
  text-align: right;
}
.phone h3{
  color: #324057;
}
.phone p{
  color: #F08519;
}
.expertsList{
  display: inline-block;
  width: 100%;
}
.expertBox{
  float: left;
  border-bottom: 1px dashed #D0D0D0;
  border-right: 1px dashed #D0D0D0;
  border-radius: 5px;
  width: 45%;
  margin: 10px 20px;
  height: 150px;
  padding: 25px 20px 20px 50px;
}
.expertImg{
  float: left;
  border-radius: 50%;
  width: 105px;
  height: 105px;
}
.expertInfo{
  float: left;
  padding: 10px 20px;
  line-height: 25px;
}
.block{
  width: 1000px;
  float: right;
  margin-bottom: 15px;
  text-align: right;
}
</style>
