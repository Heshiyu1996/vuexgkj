<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <shuaiyu texttext="帅宇好丑" spantext="什么"></shuaiyu>
    <xin texttext="帅宇?" spantext="什么啊"></xin>
  </div>
</template>

<script>
import Hello from './components/Hello'
import shuaiyu from './components/xin'
import xin from './components/xin'

export default {
  components: {
    Hello,
    shuaiyu,
    xin
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
