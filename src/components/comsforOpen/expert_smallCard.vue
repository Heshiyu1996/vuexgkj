<template>

  <div style="width:400px;float:left;margin:50px;margin-top:10px;margin-bottom:10px">
<!-- 刚刚打通Bridge -->
        <el-card class="box-card" :body-style="{ padding: '0px' }">

          <div class="expertImg">
            <img  src="./../../assets/img/newyear1.jpg" style="margin:10px;width:100%;height:100%;border-radius:50%;">
              </div>
            <div class="expertInfo">
              <h4>名字：{{name_Msg}}</h4>
              <p>手机号码：{{phone_Msg}}</p>
              <p>邮箱：{{email_Msg}}</p>
              <p>专业：{{specialty_Msg}}</p>
            </div>
        </el-card>


  </div>

</template>
<script>
  import axios from 'axios'
  import config from './../../publicAPI/config'

  export default{
    props:['dakaId'],
    data(){
      return{
          rootURL:config.URL,
          name_Msg:'正在拉取...',
          phone_Msg:'正在拉取...',
          email_Msg:'正在拉取...',
          specialty_Msg:'正在拉取...',
          dakaId_Msg:this.dakaId
      }
    },
    methods:{
      getInfo(){

        let that = this
        axios.get(that.rootURL+'/expert/getExpertByUserId?userId='+ that.dakaId_Msg)
        .then(function(res){
        var item = res.data.obj
          that.name_Msg = item.user.name
          that.phone_Msg = item.user.phone
          that.email_Msg = item.user.email
          that.specialty_Msg = item.user.specialty

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
#whole{
  background: #F7F7F7;
}

.experts{
  /*border: 1px solid gray;*/
  width: 1100px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background: #FFFFFF;
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
  line-height: 35px;
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
  height: 200px;
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
  padding: 10px 40px;
  line-height: 30px;
  height: 150px
}
</style>
