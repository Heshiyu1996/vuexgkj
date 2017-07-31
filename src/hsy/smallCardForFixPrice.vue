<template>
  <div style="width:250px;height:250px;float:left;margin:10px;margin-bottom:45px">
    <router-link :to="'/Patent/fixPriceInfo/' + bridge_Msg">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <img src="./../assets/img/newyear1.jpg" class="image">
        <div style="padding:15px;">
          <div style="float:left;width:10px">
            <el-tag v-if="true" type="success"> 一口价</el-tag>
          </div>
          <div style="text-align:right;float:right;width:165px;"id="price" >
          <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >  ¥ 1</div>
          </div>

          <div id="name" class="omit" style="line-height:16px;width:150px;height:20px;margin-top:5px;float:left">2</div>
          <div style="float:right;text-align:right;font-size:14px;width:50px;float:right;line-height:25px;color:rgb(147, 139, 138)" class="omit" > 3</div>

          <div class="bottom clearfix">
            <div class="purpose omit" id="purpose" style="margin-left:10px">4</div>
              </div>
        </div>
      </el-card>
</router-link>

  </div>
</template>
<script>
  import axios from 'axios'
  import config from './../publicAPI/config'

  export default{
    props:['bridge'],
    data(){
      return{
          rootURL:config.URL,
          name_Msg:'正在拉取aaaaaaaaaaaaaaaasssssssssssssss',
          price_Msg:'110',
          purpose_Msg:'正在拉取...',
          status_Msg:'s',
          bridge_Msg:this.bridge,
          id_Msg:'s',
      }
    },
    methods:{
      getInfo(){

        let that = this
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixPriceById?id='+ that.bridge_Msg)
        .then(function(res){
        var item = res.data.obj
          that.name_Msg = item.patent.name
          that.purpose_Msg = item.patent.purpose
          that.price_Msg = item.price
          if(item.status==1)
          that.status_Msg = '进行中'
          if(item.status==2)
          that.status_Msg = '已结束'

          that.id_Msg = item.id
				})
        .catch(function(error){
          console.error(error)
        })
      },
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
    line-height: 35px;
    width:200px;
    height:25px;
    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
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
  }
</style>
