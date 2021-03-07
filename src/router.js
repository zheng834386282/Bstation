import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Register=  ()=>import ('views/register/Register.vue')
const Login=  ()=>import ('views/login/Login.vue')
const UserInfo = ()=>import ('views/userinfo/UserInfo.vue')
const Edit = ()=>import ('views/edit/Edit.vue')
const Home = ()=>import ('views/home/Home.vue')
const Article = ()=>import ('views/article/Article.vue')
const EditCategory = ()=>import ('views/editCategory/EditCategory.vue')
const router = new Router({
  mode: 'history',
  routes: [
		{
			path:'/',
			redirect:'/home'
		},
		{
		  path:'/home',
		  component:Home, 
		  meta:{
		    keepalive:true
		  }
		},
		{
		  path: '/home',
		  component: Home
		},
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
		{
		  path: '/userinfo',
		  component: UserInfo,
			meta:{
				isToken:true
			}
		},
		{
		  path: '/edit',
		  component: Edit
		},
		{
		  path: '/article',
		  component: Article
		},
		{
		  path: '/editCategory',
		  component: EditCategory,
			meta:{
			  keepalive:true
			}
		},
  ]
})

router.beforeEach((to,from,next)=>{
	if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.isToken==true){
		Vue.prototype.$toast.fail('请先登录')
		router.push('/login')
	}
	next()
})
export default router