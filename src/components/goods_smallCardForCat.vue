<template>
  <router-link  to="/tradeSystem/sorts">
  <div style="width:250px;height:250px;float:left;margin:10px;margin-bottom:45px">

        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <img src="./../assets/img/newyear1.jpg" class="image">
          <div style="padding: 15px;">

            <div id="name" prop="TBname" class="omit" style="width:200px">{{name_Msg}}</div>

            <div class="bottom clearfix">
              <div class="purpose omit" id="purpose">{{purpose_Msg}}</div>
            <div class="bottom clearfix purpose omit" style="width:630px;margin-top:10px;height:30px">

              <el-tag type="primary" :to="{ path: '/hsy' }">{{cat_Msg}}</el-tag>
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
          name_Msg:'正在拉取...',
          purpose_Msg:'正在拉取...',
          cat_Msg:[],
          bridge_Msg:this.bridge
      }
    },
    methods:{
      getInfo(){

        let that = this
        axios.get(that.rootURL+'/patent/getPatentById?id='+ that.bridge_Msg)
        .then(function(res){
        var item = res.data.obj
        if(item.catalog1en!=null){
          that.cat_Msg.push(item.catalog1en.name)
            if(item.catalog2en!=null){
                that.cat_Msg.push(item.catalog2en.name)
                  if(item.catalog3en!=null){
                      that.cat_Msg.push(item.catalog3en.name)
                        if(item.catalog4en!=null){
                        }

                  }
            }
        }
          that.name_Msg = item.name
            if(item.purpose!="")
          that.purpose_Msg = item.purpose
            if(item.purpose=="") {
          that.purpose_Msg = "~用户没有填写哦~！"
          console.log('发现空的设计目的！')
          }

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
    color: gray;
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
