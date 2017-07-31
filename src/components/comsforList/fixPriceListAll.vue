<template>
  <div style="width:550px;height:550px;float:left;margin:10px">

    <div style="padding:10px;background-color:red;width:1240px;height:800px;text-align:left" >
      <smallCard :bridge="item" v-for="item in idList">
      </smallCard>
    </div>
  	<div class="clearfix"></div>
    <div class="block" >
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
</template>
<script>
  import axios from 'axios'
  import config from './../publicAPI/config'
  import { Loading } from 'element-ui';

  import smallCard from './../components/goods_smallCard'
  export default{
    components:{

      smallCard
    },
    data(){
      return{
          rootURL:config.URL,
    		  nameList:[],
    		  purposeList:[],
          idList:[],
item:'',

          totalPage: 0,  //一口价总页数
    		  currentPage: 1,  //一口价当前页
    		  pageSize: 10,  //一口价每页记录
      }
    },
    methods:{
      getInfo(){
//
//
 let loadingInstance = Loading.service({ body: true,text:'来追我啊~哈哈哈！' });
        let that = this
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceList?page='+ that.currentPage +'&pageSize=' + that.pageSize)
              .then(function(res){
					that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
          for( that.item of res.data.obj ) {
            that.idList.push(that.item.id)
					}

loadingInstance.close();
				})
        .catch(function(error){
          console.error(error)
        })

      },


      	    handleSizeChange(val) {
                this.pageSize = val;
                this.idList = [];//这里就要重置了！重置再运行getInfo！
                this.getInfo();
                console.log(`每页 ${val} 条`);
      	    },
      	    handleCurrentPageChange(val) {
                this.currentPage = val;
                this.idList = [];
                this.getInfo();
                console.log(`当前页: ${val}`);
      	    }
    },
    created(){
        this.getInfo()
      }
  }

</script>

<style scoped>
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

    float:right;
  	margin-top: 24px;
    margin-left: 200px;
  }
  .el-pagination{
  	float: right;
  }
</style>
