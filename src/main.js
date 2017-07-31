// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './publicAPI/routes'
import './assets/style/reset.css'
import ElementUI from 'element-ui'
import axios from 'axios'


import config from './publicAPI/config'
import 'element-ui/lib/theme-default/index.css'

import './../node_modules/wangeditor/dist/css/wangEditor.css'
import './../node_modules/wangeditor/dist/js/lib/jquery-1.10.2.min.js'

import './../node_modules/wangeditor/dist/js/wangEditor.js'
import './../node_modules/vue/dist/vue.js'


Vue.use(VueRouter)
Vue.use(ElementUI)



const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})


/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app')
// vm.$mount( [elementOrSelector] )
