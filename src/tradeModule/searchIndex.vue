<template>
  <div>

      <div>
        这是Search主页，你可以选择 2 种 搜索方式：
        <router-link to="/tradeSystem/search/byType">/tradeSystem/search/byType</router-link>
        <br>
        <router-link to="/tradeSystem/search/byCategory">/tradeSystem/search/byCategory</router-link>

      </div>

  </div>
</template>

<script>

import resultList from './../components/resultList'
export default {
	components:{
    resultList,
	},
	data () {
		return {

		}
	},
  methods:{
  },
  created(){
  },

}
</script>

<style scoped>
</style>
