<template>
<div class="box">
    <div class="boxImg"><img :src="path"></div>
    <div class="boxIntro">{{ msg }}</div>
    <div class="boxButton" :style="btnBoxWidth">
        <el-button  type="primary" v-for="btn in buttons">{{ btn }}</el-button>
    </div>
</div>
</template>

<script>
export default {
	props:[ 'btnset' ],
	data () {
		return {
			msg:'这是一个非常实用的专利，也有益于人们在日常的使用',
			buttons: this.btnset,
			path: require('./../assets/img/logo.png'),
//			btnBoxWidth:{
//				width: '120px'
			}
	},
	created(){
		if(this.btnset.length<=2){
			this.btnBoxWidth = {
				width: '60px'
			}
		}else{
			this.btnBoxWidth = {
				width: '120px'
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    display: inline-block;
    margin: 25px;
    padding: 10px 5px;
    border: 1px solid #dadada;
    width: 420px;
    height: 100px;
}
.boxImg{
    display: inline-block;
    float: left;
    margin-right: 10px;
    width: 80px;
    height: 80px;
}
.boxIntro{
    text-align: left;
    float: left;
    margin-right: 10px;
    width: 180px;
    height: 60px;
    font-size: 12px;
    color:#475669;
    margin-top: 4px;
    line-height: 20px;
}
.boxButton{
	float: right;
    width: 120px;
    height: 80px;
}

img{
	width: 80px;
	height: 80px;
}

.el-button{
	/*width: 60px;*/
	/*height: 22px;*/
	padding: 7px 12px;
	margin: 4px 2px !important;
}
</style>
