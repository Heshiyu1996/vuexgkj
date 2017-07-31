<template>
  <div>

        <el-row :gutter="20" class="row-bg" >
          <el-col :span="14" :title="NameMsg" ><div  class=" grid-content bg-purple goodsName omit" style="width:950px;height:46px">{{NameMsg}}</div></el-col>



          <el-col :span="5" >
                      <el-tooltip content="可以唯一确定一件商品"placement="right" effect="light" >
            <div class="bg-purple-light grid-content goodsNum omit" style="width:176px;height:46px">
              商品编号：{{NumberMsg}}
            </div>

       </el-tooltip>
          </el-col>

        </el-row>



        <el-row :gutter="20" class="row-bg">
          <el-col :span="19" :title="SummaryMsg"><div class="grid-content bg-purple-light2 goodsSummary omit" >{{SummaryMsg}}</div></el-col>
        </el-row>

</div>
</template>

<script>
  export default {
    props:['name','summary','number'],
    data(){
      return{
        // SummaryMsg:this.SummaryMsg
        NameMsg:'carl',
        SummaryMsg:'hello!',
        NumberMsg:'CN202280222'
      }
    }
  }
</script>

<style scoped>
  .goodsName,.goodsSummary,.goodsNum{
    font-size: 24px;
    padding:8px;
    font-family: "微软雅黑";
    color:rgb(70, 80, 93);
  }
  .goodsSummary{
      font-size: 14px;
      height:35px
    }
  .goodsNum{
    text-align: left;
    line-height: 30px;
    font-size: 10px;
      }
  .goodsSummary{
    margin-left: 20px
  }
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple {
    background: #a0b1c8;
  }
  .bg-purple-light {
    background: #e7e9ed;
  }
 .bg-purple-light2 {
   background: #d3dce6;
 }
  .grid-content {
    border-radius: 4px;
    min-height: 10px;
  }
  .row-bg {
    width:1040px;
    padding: 5px 0;
  }

  .omit{
  	width:784px;
  	overflow: hidden;
  	vertical-align: top;
  	text-overflow:ellipsis;
  	white-space: nowrap;/*不换行*/
  }
</style>
