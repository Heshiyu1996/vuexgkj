<template>
  <div class="xin">
    <button @click="newmethod()">{{showtext}}</button>
    <h1 v-if="btnSHOWHide" >{{ msg }}
      <span v-for="single in items">{{single.text}} {{ single.url }}</span>
    </h1>

  </div>
</template>

<script>
export default {
  props: [ 'texttext', 'spantext' ],
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
    btnSHOWHide:function(){
       alert('你变了！');
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
