import App from './../App'
import news from './../openModule/news'
import newsDetail from './../openModule/newsDetail'

import experts from './../openModule/experts'
import tradeSystem from './../openModule/tradeSystem'
import byCategory from './../tradeModule/byCategory'
import virtualSys from './../tradeModule/virtualSys'
import patentList from './../tradeModule/patentList'
import patentCommonInfo from './../tradeModule/patentCommonInfo'
import patentFixInfo from './../tradeModule/patentFixInfo'
import patentAucInfo from './../tradeModule/patentAucInfo'
import patentOrderDetail from './../tradeModule/patentOrderDetail'
import login from './../tradeModule/login'
import register from './../tradeModule/register'
import user from '../tradeModule/userMyconcern'

import myheader from './../components/myheader'
import mysearch from './../components/search'
import myfooter from './../components/myfooter'
import smallPic from './../components/smallPic'
import hsy from './../hsy/hsy'
import hsy2 from './../hsy/hsy2'
import hsy3 from './../hsy/hsy3'
import hsy4 from './../hsy/hsy4'
import hsy5 from './../hsy/hsy5'
import fixPriceInfoDetail from './../tradeModule/patentFixInfo'
import auctionInfoDetail from './../tradeModule/patentAucInfo'
import questionList from './../tradeModule/patentQuestionList'
import questionDetail from './../tradeModule/patentQuestionDetail'

import userIndex from './../personalCenter/userIndex'

import resultList from './../components/resultList'
import search from './../tradeModule/search'
import byType from './../tradeModule/byType'
import searchIndex from './../tradeModule/searchIndex'

import loginBox from './../components/loginBox'
import Error404 from './../openModule/404Error'
import openSystem from './../openModule/openSystem'
import openSystemIndex from './../openModule/openSystemIndex'
import questions_Management from './../personalCenter/questions_Management'
import patents_Management from './../personalCenter/patents_Management'
import financial_Management from './../personalCenter/financial_Management'
import account_Management from './../personalCenter/account_Management'
import orders_Management from './../personalCenter/orders_Management'
export default [
	{//开放式创新首页
		path: '/',
		name: 'app',
		component: App,
	},
	{//404错误页面
		path: '/Error404',
		name: 'Error404',
		component: Error404,

	},
	// {//便利资讯内容
	// 	path: '/news/newsDetail/:newID',
	// 	name: 'newsDetail',
	// 	component: newsDetail,
	// 	children:[{
	// 		 path:'',
	// 	}]
	// },
	{//交易平台
		path: '/tradeSystem',
		name: 'tradeSystem',
		component: tradeSystem,
		children:[{
			 path:'',
			 component:myheader,
// 不是在这里加
		}]
	},
	// {//专利分类
	// 	path: '/tradeSystem/sorts',
	// 	name: 'sorts',
	// 	component: sorts,
	// },
	{//虚拟
		path: '/tradeSystem/virtualSys',
		name: 'virtualSys',
		component: virtualSys,
	},
	{//技术问题求解
		path: '/tradeSystem/questionList',
		name: 'questionList',
		component: questionList,
		children:[
						{
						path:'',
						component:myheader,
					}]

	},
	{//技术求解详情
		path: '/tradeSystem/questionDetail/:queID',
		name: 'questionDetail',
		component: questionDetail,
	},
	{//专利列表 父
		path: '/tradeSystem/search',
		name: 'search',
		component: search,
		children:[
			  {
			 		path:'byType',
			 		component:byType,
			  	meta: {
			  		keepAlive: true
			  	},
			 	},

			 	{
			 		path:'byCategory',
			 		component:byCategory,
			  	meta: {
			  		keepAlive: true
			  },
			 	},
		 	]
	},

	{//开放式
		path: '/openSystem',
		name: 'openSystem',
		component: openSystem,
		children:[
			 {
				 path:'index',
				 component:openSystemIndex,
				 meta: {
					 keepAlive: true
			 },//这里true可以控制，byType这个组件是要被缓存的！
			 },
 			 {
 				 path:'experts',
 				 component:experts,
				 meta: {
					 keepAlive: true
			 },
 			 },
 			 {
 				 path:'news',
 				 component:news,
				 meta: {
					 keepAlive: true
			 	 },
 			 },
			 {//便利资讯内容
				 path: '/news/newsDetail/:newID',
				 name: 'newsDetail',
				 component: newsDetail,
				 children:[{
						path:'',
				 }]
			 },
		 ]

	},
	{//专利列表嵌套
		path: '/tradeSystem/patentList',
		name: 'patentList',
		component: patentList,
	},
	{//专利列表
		path: '/tradeSystem/patentList',
		name: 'patentList',
		component: patentList,
	},
	{//专利详情（所有）
		path: '/tradeSystem/patentCommonInfo/:patentID',
		name: 'patentCommonInfo',
		component: patentCommonInfo,
		children:[{
			 path:'',
			 component:loginBox,
		}]
	},
	{//专利详情（一口价）
		path: '/tradeSystem/patentFixInfo',
		name: 'patentFixInfo',
		component: patentFixInfo,
	},
	{//专利详情（拍卖）
		path: '/tradeSystem/patentAucInfo',
		name: 'patentAucInfo',
		component: patentAucInfo,
	},
	{//个人中心
		path: '/tradeSystem/user',
		name: 'user',
		component: user,
	},

	//要删的
	{//头部
		path: '/header',
		name: 'header',
		component: myheader,


	},
	{//搜索框
		path: '/search',
		name: 'search',
		component: mysearch,
	},
	{//尾部
		path: '/footer',
		name: 'footer',
		component: myfooter,
	},
	{//帅宇测试
		path: '/hsy',
		name: 'hsy',
		component: hsy,
	},
	{//帅宇测试
		path: '/hsy2',
		name: 'hsy2',
		component: hsy2,
	},
	{//帅宇测试
		path: '/hsy3',
		name: 'hsy3',
		component: hsy3,
	},
	{//帅宇测试
		path: '/hsy5',
		name: 'hsy5',
		component: hsy5,
	},
	{//帅宇测试
		path: '/hsy4',
		name: 'hsy4',
		component: hsy4,
		children:[{
			path:'/hsy55',
			component:myheader,
		},
		{
			path:'/hsy66',
			component:myfooter
		}]
	},
	{//帅宇测试
		path: '/tradeSystem/register',
		name: 'register',
		component: register,
	},
	{//帅宇测试
		path: '/tradeSystem/login',
		name: 'login',
		component: login,
	},
	{//帅宇测试
		path: '/tradeSystem/patentOrderDetail/:orderID',
		name: 'patentOrderDetail',
		component: patentOrderDetail,
	},
	{
		path: '/Patent/fixPriceInfo/:id',
		name: 'fixPriceInfoDetail',
		component: fixPriceInfoDetail,
		children:[{
			 path:'',
			 component:loginBox,
		},
		]
	},
	{
		path: '/Patent/auctionInfo/:id',
		name: 'auctionInfoDetail',
		component: auctionInfoDetail,
		children:[{
			 path:'',
			 component:loginBox,
		}]
	},

	{//Dawn测试——个人中心首页
		path: '/userIndex',
		name: 'userIndex',
		component: userIndex,
		children:[{
			 path:'',
		},
		{
			 path:'patents',
			 component:patents_Management
		},
		{
			 path:'questions',
			 component:questions_Management
		},
		{
			 path:'financial',
			 component:financial_Management
		},
		{
			 path:'account',
			 component:account_Management
		},
		{
			 path:'orders',
			 component:orders_Management
		},
		]
	},


	{//重定向到首页
		path: '*', redirect: '/Error404'
	},

]
