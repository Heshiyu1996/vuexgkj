<template>
  <div id="app">
    <xin v-on:message="receiveMessage" texttext="帅宇?"></xin>
    <!-- <button @click="onResultChange()">ff</button> -->

  </div>
</template>

<script>
import xin from './xin'

export default {
  components: {
    xin
  },
  data(){
    return{

    }
  },
  methods:{
    receiveMessage(val){
      alert('父亲说' + val);
    },
  },
  watch:{
    onResultChange(val){
      alert('你改成了：11' + val);
    }
  }
}
</script>

<style>
</style>
