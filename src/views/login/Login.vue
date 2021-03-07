<template>
  <div id="login">
    <nav-bar style="background-color: white;"><div slot="center">登录bilibili</div>
		<div slot="right" @click="$router.push('/register')" style="font-size: 13px;margin:0 10px 0 -48px;">跳转到注册</div>
		</nav-bar>
		
		<login-text label="账号"
		 placeholder="请输入账号"
		 type="text" 
		 @contentHandle="content=>model.username=content"
		 style="margin: 15px 0;"
		 rule="^.{6,16}$" />
		<login-text label="密码"
		 placeholder="请输入密码"
		 type="password"
		 @contentHandle="content=>model.password=content"
		 rule="^.{6,16}$"/>
		<login-btn text="登录" @click.native="registerClick" ></login-btn>
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue' 
	import LoginText from 'components/content/LoginText.vue'
	import LoginBtn from 'components/content/LoginBtn.vue'
  export default {
    name: 'Login',
		components:{
			NavBar,
			LoginText,
			LoginBtn
		},
		data(){
			return {
				model:{
					name:'',
					username:'',
					password:''
				}
			}
		},
		methods:{
			async registerClick(){
				let rle=/^.{6,16}$/
				
				if(rle.test(this.model.username) && rle.test(this.model.password)){
					//登录按钮点击时，去后台请求数据，这里的res就是后台返回的数据
					//里面有登录成功信息还有登录时携带的id以及token，我们在拿到之后同样存储到本地
					const res=await this.$http.post('/login',this.model)
          this.$toast.success(res.data.msg)
					if(res.data.code==200){
						localStorage.setItem('token',res.data.token) //将请求过来的数据的token和id储存在本地
						localStorage.setItem('id',res.data.id) 
						setTimeout(()=>{
							this.$router.push('/userinfo')
						},1000)
					}
					
				}
				else{
					this.$toast.fail('账号密码错误,请重新输入')
				}
			}
		}
  }
</script>

<style scoped>
  #login{
		background-color:rgba(192,192,192,.1);
		height: 100vh;
	}
</style>
