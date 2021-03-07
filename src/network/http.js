import axios from 'axios'
import router from '../router.js'
import Vue from 'vue'

		const http=axios.create({
			baseURL:'http://112.74.99.5:3000/web/api',
			timeout:8000
		})
		
		//2.1:请求拦截
		http.interceptors.request.use(config=>{
			console.log(config)
			    if(localStorage.getItem('id') && localStorage.getItem('token')){
						// console.log(config)
						config.headers.Authorization='Bearer ' + localStorage.getItem('token')
					}
				  return config
			}
		,err=>console.log(err) )
					
					
		//2.2:响应拦截
		http.interceptors.response.use(res=>{			
			return res
		},err=>{  
			//如果用户在后台localStorage处清空了token，但用户还能停留在userinfo界面就不大好了
			//因为此时已经请求过了，所以请求拦截不起作用，只能依靠响应拦截
			//实际上token清空时后台会有响应过来个error，里面有个response里返回了错误码401
			//所以我们要在他请空token时，利用后台返回的error.response.status为401作判断让他跳转至登录界面
			console.dir(err)
			
			//当然以下代码也可以用路由前置守卫完成，注意在需要判断token的路由加meta属性
			
			// if(err.response.status==401 || err.response.status==402){
			// 	router.push('/login')
			// 	Vue.prototype.$toast.fail(err.response.data.message)
			// }
			
		})
		export default http
	
