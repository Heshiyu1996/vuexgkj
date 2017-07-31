<template>
  <div id="whole" :style="{backgroundImage: 'url(' +bg + ')'}" style="margin:0 auto;background-repeat: no-repeat" >
    <div class="bodyBG"  >
      <myHeader></myHeader>
      <img :src="bg" height="760" width="1780px" />
    </div>
  </div>
</template>

<script>
import myHeader from './../components/myheader'

export default {
  components:{
    myHeader,
  },
  data () {
    return {
      bg:require('./../assets/img/404Error.jpg'),

    }
  },
  methods:{
  },
  created(){
  },


}
</script>

<style scoped>
#whole{
  width:100%;
  background: #F7F7F7;
}
.bodyBG{
  background-size: 100% ;
  height:760px;
  width: 100%
}
</style>
