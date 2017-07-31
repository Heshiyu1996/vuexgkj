<template>
  <div id="whole">
    <div class="test1">
      ac
    </div>
  <myFooter></myFooter>
</div>
</template>

<script>
import myFooter from './../components/comsforOpen/openFooter'
import axios from 'axios'
import config from './../publicAPI/config'
import { Loading } from 'element-ui';

export default {
  components:{
    myFooter,
  },
  data () {
    return {
      rootURL:config.URL,
    }
  },
  methods: {
  },
  created(){
  }
}
</script>

<style scoped>
#whole{
  background: transparent;
}
.test1{
  display: flex;
  flex-flow: row wrap;
}
</style>
