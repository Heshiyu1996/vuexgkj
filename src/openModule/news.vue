<template>
  <div id="whole" style="margin-top:-20px">

    <div class="news">
      <div class="phone">
        <h3>小功资讯热线：010-6666666</h3>
        <p >您的当前位置：
          <router-link to="/">
            <span style="color:#F08519">首页</span>
          </router-link>
          > 便利资讯</p>
        </div>

        <div >
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="TB_title"  width="300px" label="标题">
              <template scope="scope">
                <div slot="reference" class="name-wrapper " >
                  <el-button type="text" @click="goToDetail(scope.$index, scope.row)">{{ scope.row.title }}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="TB_content" width="450px" label="内容">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.content }}
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="TB_create_time" label="发布时间">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.create_time }}
                </div>
              </template>

            </el-table-column>
            <el-table-column prop="TB_readNumber" label="阅读量">

              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.read_number }}
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div style="margin-top:10px">
            <div style="float:left;text-align:center;margin-top:5px;margin-left:10px">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  顺序选择<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">按时间</el-dropdown-item>
                  <el-dropdown-item command="2">按热度</el-dropdown-item>
                  <el-dropdown-item command="4">按7天内热度</el-dropdown-item>
                  <el-dropdown-item command="3">按30天内热度</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <div class="block">
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
      </div>

    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from './../components/comsforOpen/openHeader'
import myFooter from './../components/comsforOpen/openFooter'

import config from './../publicAPI/config'
import axios from 'axios'

export default {
  components:{
    myHeader,
    myFooter,
  },
  data () {
    return {
      imgSource:[ //轮播图
        require('./../assets/img/car7.jpg'),
        require('./../assets/img/car9.jpg'),
        require('./../assets/img/car8.jpg'),
      ],

      rootURL: config.URL,	//请求的url
      tableData:[], 	//表格的内容

      totalPage: 0,  //总页数
      currentPage: 1,  //当前页
      pageSize: 10,  //每页记录
      order: 1,  //每页记录
    }
  },
  methods:{
    goToDetail(index, row) {
      let that = this
      console.log(index, row);
      that.$router.push({path:'/news/newsDetail/'+row.id})
    },

    getNewList(){
      let that = this
      axios.get(that.rootURL+'/con_infor/getAllCon_infor?page='+ that.currentPage +'&pageSize=' + that.pageSize + '&mode=' +that.order)
      .then(function(res){
        if(res.data.obj==null){
          alert('没有符合要求的资讯！')
          that.tableData = []
        }
        else{
          that.tableData = []
          that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)

          var reg=/<[^<>]+>/g;//可以过滤掉HTML标签的正则表达式
          for( var item of res.data.obj ) {

            that.tableData.push({
              id:item.id,
              title: item.title,
              create_time: item.create_time,
              read_number: item.read_number,
              content: item.content.replace(reg,''),
            })

          }
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    handleCommand(command) {
      console.log(`按 ${command} 排序`);
      this.order = command;
      this.getNewList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNewList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentPageChange(val) {
      this.currentPage = val;
      this.getNewList();
      console.log(`当前页: ${val}`);
    }
  },
  created(){
    this.getNewList();
    console.log('重头再来')
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

.news{
  /*border: 1px solid gray;*/
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background-color:rgba(247, 247, 247,0.2);
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
.newsList{
  width: 100%;
}
.newsList ul{
  padding: 15px;
}
.newsList ul li{
  padding: 10px;
  border-bottom: 1px dotted #D0D0D0;
}
.newsList ul li a:hover{
  color: #F08519;
  text-decoration: underline;
}
.block{
  float: right;
  margin-bottom: 15px;
}

.omit{
  width:840px;
  overflow: hidden;
  vertical-align: top;
  text-overflow:ellipsis;
  white-space: nowrap;/*不换行*/
}
</style>
