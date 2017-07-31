<template>
  <router-link  to="/tradeSystem/sorts">
  <div style="width:250px;height:250px;float:left;margin:10px">
<!-- 刚刚打通Bridge -->
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <img src="./../assets/img/newyear1.jpg" class="image">
          <div style="padding:15px;">
            <div style="float:left;width:10px">
              <el-tag v-if="true" type="danger"> 拍卖品</el-tag>
            </div>


                        <div style="text-align:right;float:right;width:165px;"id="price" >
                        <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >  ¥ 55555{{price_Msg}}</div>
                        </div>

                                                <div id="name" class="omit" style="width:150px;background-color:yellow;float:left">{{name_Msg}}</div>
                                                <div style="float:right;text-align:right;background-color:red;font-size:14px;width:60px;float:right;line-height:15px;color:rgb(147, 139, 138)" class="omit" > 售卖中{{status_Msg}}</div>

            <div class="bottom clearfix">
              <div class="purpose omit" id="purpose">{{purpose_Msg}}</div>


            </div>
          </div>
        </el-card>


  </div>
</router-link>
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
          bridge_Msg:this.bridge
      }
    },
    methods:{
      getInfo(){

        let that = this
        axios.get(that.rootURL+'/orderAuction/getOrderAuctionById?id='+ that.bridge_Msg)
        .then(function(res){
        var item = res.data.obj
          that.name_Msg = item.patent.name
            if(item.purpose!="")
          that.purpose_Msg = item.patent.purpose
            if(item.purpose=="") {
          that.purpose_Msg = "用户没有填！"
          console.log('发现空的设计目的！')
          }

				})
        .catch(function(error){
          console.error(error)
        })
      },

    },
    created(){
        // this.getInfo()
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
