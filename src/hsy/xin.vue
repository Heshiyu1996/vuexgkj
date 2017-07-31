<template>
  <div class="xin">
    {{msg}}
    <button @click="chan()">a</button>
  </div>
</template>

<script>
export default {
  props: [ 'texttext'],
  data () {
    return {
      msg: this.texttext,
      oo: this.spantext,
      showtext: 'show',
      btnSHOWHide: false,
      items:[
        {text:'1', url:'www.baidu.com'},
        {text:'2', url:'www.google.com'},
        {text:'3', url:'www.weibo.com'}
      ]
    }
  },
  methods:{
    chan(){
      this.msg = "s"
    },
    newmethod(){
      if(this.btnSHOWHide==false){
        this.btnSHOWHide  = true;
        this.showtext  = 'hide';
      }else{
        this.btnSHOWHide  = false;
        this.showtext  = 'show';
      }

    }
  },
  watch:{
    msg(val){
       alert('你变了aaaaaa！'+val);
       let that = this
       alert(val);
       that.$emit("message",val);
       alert('你变了aaaaaa！');

    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
