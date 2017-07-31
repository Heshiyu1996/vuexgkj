<template>
  <div>
    <!-- 头部 -->
    <myHeader></myHeader>
<div class="clearfix" width=100%></div>
        <div style="width:880px;margin:0 auto;text-align:center;">
            <!-- 面包屑 -->
            <!-- <myRoute></myRoute> -->
            <br>
            <br>
        <div style="margin-top:20px">
              <span style="float:left">
                <orderInfo :bridge="C" ></orderInfo>
              </span>
        </div>
	      <div class="clearfix"></div>

        <div style="float:left;width:1355px;margin-left:-240px;text-align:center">
          <myFooter></myFooter>
        </div>
          </div>
<!--
    </div>
              <div>
                <myFooter></myFooter>
              </div>

    </div> -->
  </div>
</div>
</template>

<script>
 import myHeader from './../components/myheader'
 // import myRoute  from './../components/myroute'

 import orderInfo  from './../components/goods_orderInfo'

 import myFooter from './../components/myfooter'

  import axios from 'axios'
  import config from './../publicAPI/config'

export default {
  components: {
    myHeader,
    orderInfo,
    myFooter
  },
  data(){
return{
    rootURL:config.URL,
}
  },
    methods:{

      hsytt(){
        let that = this
        var orderID = this.$route.params.orderID
        that.C=orderID
      },
    },
    created(){
      this.hsytt()
    }
}

</script>

<style scoped>
.bigFrame{
	border-style:dashed;
	margin:0 auto;
	width:1140px;
	margin-top: 10px;
	border-color: rgb(160,160,160 );
}

.biankuang tr td{
	text-align: right;
	padding-right: 18px
}
.buttons tr td button{
	width: 318px;
	height: 46px;
	border: 1px solid #377ab7;
	outline: none;
	border-radius: 2px;
	font-size: 16px;
	color: #fff;
	background: #377ab7;
	padding: 3px 10px;
}

.buttons tr td button:hover{
	background: #276387;
	border: 1px solid #377ab7;
}
.buttons button{

	width: 318px;
	height: 46px;
	border: 1px solid #2E426C;
	outline: none;
	border-radius: 2px;
	font-size: 16px;
	color: #fff;
	background: #2E426C;
	padding: 3px 10px;
}


.buttons button:hover{
	background: #215a78;
	border: 1px solid #377ab7;
}
</style>
