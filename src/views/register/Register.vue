<template>
  <div id="register">
    <nav-bar style="background-color: white;"><div slot="center">注册bilibili</div>
		<div slot="right" @click="$router.push('/login')" style="font-size: 13px;margin-left: -48px;">跳转到登录</div>
		</nav-bar>
		<login-text 
		label="姓名" 
		placeholder="请输入姓名" 
		type="text" 
		rule="^.{6,16}$"
		@contentHandle="content=>model.name=content"
		style="margin: 15px 0;"/>
		<login-text label="账号"
		 placeholder="请输入账号"
		 type="text" 
		 @contentHandle="content=>model.username=content"
		 rule="^.{6,16}$" />
		<login-text label="密码"
		 placeholder="请输入密码"
		 type="password"
		 @contentHandle="content=>model.password=content"
		 rule="^.{6,16}$"/>
		<login-btn text="注册" @click.native="registerClick" ></login-btn>
  </div>
</template>

<script>
	import LoginText from 'components/content/LoginText.vue'
	import LoginBtn from 'components/content/LoginBtn.vue'
	import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: 'Register',
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
				//这里这样做是因为在input里如果是大于16
				if(rle.test(this.model.name) && rle.test(this.model.username) && rle.test(this.model.password)){
					const res=await this.$http.post('/register',this.model)
          if(res.data.msg==='注册成功'){
						this.$toast.success(res.data.msg)
						if(res.data.code===200){
							localStorage.setItem('token',res.data.objtoken) //将请求过来的数据的token和id储存在本地
							localStorage.setItem('id',res.data.id) 
							setTimeout(()=>{
								this.$router.push('/userinfo')                //1s后跳转页面
							},1000)
						}
					}
					if(res.data.msg==='注册失败,账号已经存在'){
						this.$toast.fail(res.data.msg)
					}
					//console.log('我一定要第二次打印')  //如果不加async+await的话，这里这个同步一定先执行，await就是先等异步的弄完，就是异步转同步
					
				}
				else{
					this.$toast.fail('格式错误,请重新输入')
				}
			}
		}
  }
</script>

<style scoped>
  #register{
		background-color:rgba(192,192,192,.1);
		height: 100vh;
	}
</style>
