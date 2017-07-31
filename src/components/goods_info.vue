<template>
  <div>
<el-collapse v-model="activeNames" style="width:861px">
  <el-collapse-item title="商品描述" name="1">
    <div>{{descrip_Msg}}</div>
  </el-collapse-item>

  <el-collapse-item title="设计说明" name="2">
    <div>{{design_Msg}}</div>
  </el-collapse-item>

</el-collapse>
</div>
</template>

<script>
  import axios from 'axios'
  import config from './../publicAPI/config'
  export default {
      props:['type','bridge'],
    data() {
      return {
        activeNames: ['1','2'],

        rootURL:config.URL,
        descrip_Msg:'正在拉取...',
        design_Msg:'正在拉取...',
        bridge_Msg:this.bridge,
        type_Msg:this.type,

      };
    },
    methods:{
      getInfoForFixPrice(){
        let that = this
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixPriceById?id='+ that.bridge_Msg)
        .then(function(res){
        var item = res.data.obj
          that.descrip_Msg = item.patent.description
          that.design_Msg = item.patent.design

        })
        .catch(function(error){
          console.error(error)
        })
      },

      getInfoForAuction(){
        let that = this
        axios.get(that.rootURL+'/orderAuction/getOrderAuctionById?id='+ that.bridge_Msg)
        .then(function(res){
        var item = res.data.obj
          that.descrip_Msg = item.patent.description
          that.design_Msg = item.patent.design

				})
        .catch(function(error){
          console.error(error)
        })
      },
    //   checkType(){
    //     let that = this
    //     if(that.type=='1'){
    //     that.getInfoForFixPrice()
    //   }
    //   if(that.type=='2'){
    //   that.getInfoForAuction()
    // }
    // }
    },
    created(){
        // this.checkType()
      }
  }
</script>

<style scoped>

</style>
