<template>
  <div >
    <div style="margin-top: 15px;width:800px">
    <el-input placeholder="请把要搜索的告诉我们..." v-model="input5" >

    <el-select v-model="select" slot="prepend" placeholder="专利类别">
      <el-option label="所有专利" value="所有专利"></el-option>
      <el-option label="一口价" value="一口价"></el-option>
      <el-option label="拍卖" value="拍卖"></el-option>
    </el-select>
    <el-button slot="append" icon="search" ></el-button>
    </el-input>
    </div>
  </div>
</template>

<style>
  .el-select  {
    width: 150px;
  }

</style>
<script>
export default {
  data() {
    return {
      input5: '',
      select: ''
    }
  },
  methods: {
    submitForm(formName) {
      },
    tryToSearch(){
      let that = this
          var account=that.select
          var content=that.input5
          alert(account+' '+content)
    }
  }

}
</script>
