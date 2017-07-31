<template>
  <div>
    <el-button type="primary" @click="shos">show</el-button>
    <el-button type="primary" @click="get">get</el-button>

    <el-tag v-if="sho" >
    <div style="width:500px;color:black">
      <div style="width:960px;height:40px;">
        <div style="float:left;width:190px;">
          <div style="float:left;width:60px;">
          状态：
          </div>
          <div style="float:left;">
          <el-radio-group v-model="Radio_status" size="small">
            <el-radio-button label="1">进行中</el-radio-button>
            <el-radio-button label="2">已结束</el-radio-button>
           </el-radio-group>
          </div>
         </div>

         <div style="float:left;width:250px">
           <div style="float:left;">
           价格区间：
           </div>
           <div style="float:left;width:80px">
           <div style="float:left;width:15px">¥</div>
           <el-input v-model="priceRange_low" placeholder="最低价" size="small"></el-input>
           </div>
             <div style="float:left;;width:30px;text-align:right;"> ～ </div>
             <div style="float:right;width:80px">
               <div style="float:left;width:15px">¥</div>
             <el-input v-model="priceRange_high" placeholder="最高价"  size="small"></el-input>
             </div>
          </div>

          <div style="margin-left:30px;float:left;width:250px">
            <div style="float:left">
            排序类型：
            </div>
              <div style="float:left;width:100px;">
                <el-radio-group v-model="Radio_type" size="small">
                  <el-radio-button label="price">按价格</el-radio-button>
                  <el-radio-button label="create_time">按时间</el-radio-button>
                  <el-radio-button label="read_number">按浏览次数</el-radio-button>
                </el-radio-group>
              </div>
           </div>

           <div style="margin-left:20px;float:left;width:160px">
             <div style="float:left">
             排序方式：
             </div>
               <div style="float:left;width:100px">
                 <el-radio-group v-model="Radio_order" size="small">
                   <el-radio-button label="asc">升序</el-radio-button>
                   <el-radio-button label="desc">降序</el-radio-button>
                 </el-radio-group>
               </div>
            </div>
      </div>

      <div style="width:250px;height:40px;">

      </div>

      <div style="width:250px;height:50px;">

      </div>
    </div>
    </el-tag>
</div>
</template>
<script>
  export default {
    data() {
      return {
        sho:true,
        Radio_status: 1,//【状态组】的选择

        priceRange_low:0,//【价格组—最低价】的选择
        priceRange_high:0,//【价格组—最高价】的选择

        Radio_type:'create_time',//【排序类型组】的选择
        Radio_order:'asc',//【排序方式组】的选择

      };
    },
    methods:{
      shos(){
        let that =this
        if(that.sho==true)
          that.sho=false
          else{
            that.sho=true

          }
          that.Radio_status=2
      },
      get(){
        let that = this
        console.log(that.Radio_status)
        console.log(that.priceRange_low)
        console.log(that.priceRange_high)
        console.log(that.Radio_type)
        console.log(that.Radio_order)
      }
    }
  };
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
}
.el-tag{
  background-color: white;
  border:1px solid gray;
  height:50px;
  padding:10px;
  padding-left:20px;
  width:960px;
}
</style>
