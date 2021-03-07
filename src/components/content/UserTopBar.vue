<template>
  <div id="user_bar">
    <nav-bar style="height: 50px;box-shadow: none;background-color: white;">
			<div slot="left" class="left" @click="$router.push('/')">  
			  <img src="~assets/logo.png" alt="">
			</div>
			<div slot="center" class="center">
				
				<div class="search_box">
					<div class="icon">
						<van-icon name="search"/>
						请点击搜索内容
					</div>
					
				</div>
			</div>
			<div slot="right" class="right"> 
			   <img :src="image" alt="" class="userImg" v-if="image" @click="$router.push('/userinfo')" >
			   <img src="~assets/default_img.jpg" alt="" class="userImg" v-else @click="$router.push('/userinfo')">
				 <div class="downLoad">下载App</div>
			</div>
		</nav-bar>
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: 'UserTopBar',
		components:{
			NavBar
		},
		data(){
			return {
				image:''
			}
		},
		mounted() {
			this.getUserData()
		},
		methods:{
			async getUserData() {
				  if(localStorage.getItem('id')){
						const res =  await this.$http.get('/user/' + localStorage.getItem('id') )
						 if(res.data){
							 this.image =  res.data[0].user_img
						 }
					}
			    
			}
		}
		
  }
</script>

<style scoped>
	#user_bar{
		position: sticky;
		top: 0;
		left: 0;
	}
	.left{
		height: 100%;
		display: flex;
		align-items: center;
	}
  .left img{
		height: 80%;
		width: 90px;
	}
	.center{
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
	.search_box{
		
		font-size: 12px;
		width: 92%;
		background-color:rgba(170,170,170,.5) ;
		height:60% ;
		border-radius: 15px;
		position: relative;
	}
	.icon{
		position: absolute;
		left: 8px;
		top: 50%;
		transform: translate(0,-50%);
		color:rgba(25,25,112,.5)  ;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
		overflow: hidden;  /** 隐藏超出的内容 **/
	}
	.right{
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
	.right img{
		width: 28px;
		height: 60%;
		border-radius: 50%;
	}
	.downLoad{
		font-size: 14px;
		background-color: rgba(255,105,180,.7);
		width: 90px;
		height: 60%;
		border-radius: 8px;
		line-height: 30px;
		margin-left: 6px;
		margin-right: 5px;
		color: white;
	}
</style>
