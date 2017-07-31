<template>
  <div>

      <el-tabs v-model="activeName" @tab-click="handleClick" >


       <el-tab-pane label="用户管理a" name="first" @onclick="alert(2)">
         <div style="border:1px solid red">
           <router-view></router-view>
         </div>
        </el-tab-pane>

        <el-tab-pane label="配置管理" name="second">
          <div style="border:1px solid red">
            <router-view></router-view>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>

      <el-button type="text" @click="change">f</elbutton>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'third'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.label, event);
        if(tab.label=='用户管理a'){
          this.$router.push({path:'/hsy55'})
        }
        if(tab.label=='配置管理'){
          this.$router.push({path:'/hsy66'})
        }
      },
      change(){
        let that = this
        that.activeName = "fourth"
      }
    }
  };
</script>
