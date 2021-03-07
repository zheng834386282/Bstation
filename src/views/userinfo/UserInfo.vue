<template>
  <div id="user_info">
		<user-top-bar />
		<user-detail  :userinfo="userData" />
  </div>
</template>

<script>
	import UserTopBar from 'components/content/UserTopBar.vue'
	import UserDetail from './childComps/UserDetail.vue'
  export default {
    name: 'UserInfo',
		components:{
			UserTopBar,
			UserDetail
		},
		data(){
			return {
				userData:{}
			}
		},
		methods:{
		    async getUserData() {
					//既然我登录进来时向本地存储了id，那这个时候进来userinfo时就根据这个id请求这个id的用户数据
		        const res =  await this.$http.get('/user/' + localStorage.getItem('id') )
						
							//这样写请求头有点麻烦，实际当我们进入(push)进userinfo时可以使用axios拦截器拿到当前config
							//config里就有请求头，所以我在http.js中已经配好了这里就不必再写请求头
							// headers:{
							// 	'Authorization':'Bearer ' + localStorage.getItem('token')
							// }
							
					//请求到的这个res里面的data包含这个用户的所有信息如id/username/password/user_desc(简介)/user_img(头像)
						this.userData = res.data[0]    
						
		    }
		},
		created() {
		    this.getUserData()
		}
  }
</script>

<style scoped>
  #user_info{
		height: 100vh;
		background-color:rgba(192,192,192,.1);
	}
</style>
