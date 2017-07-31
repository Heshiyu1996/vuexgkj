<template>
  <div>
  	 <myHeader></myHeader>
      <div>
        <!-- <keep-alive> -->
        <!-- 这个keepalive没用的 -->
          <transition :name="transitionName" mode="out-in">
            <router-view class="child-view"></router-view>
          </transition>
        <!-- </keep-alive> -->
         <br>
         <br>
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
      transitionName: 'slide-search',
		}
	},
  methods:{
  },
  created(){
  },
  watch: {
    // '$route' (to, from) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   console.log('此时，to.path为：' + to.path)
    //   console.log('此时，from.path为：' + from.path)
    //   let that = this
    //     if((to.path == '/tradeSystem/search/byType')&&(from.path == '/tradeSystem/search/byCategory')){
    //       // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //        this.transitionName = 'slide-right'
    //
    //     }else
    //     this.transitionName = 'slide-left'
    // }
  },

}
</script>

<style scoped>
</style>
