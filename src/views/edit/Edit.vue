<template>
  <div id="edit" >
    <div style="margin-bottom: 15px;"><user-top-bar  /></div>
		<div class="upload">
			<van-uploader :after-read="afterRead" class="uploader" preview-size="100vw" />
			<edit-banner left="头像" class="avatar">
				<img :src="userData.user_img" alt="" slot="right" v-if="userData.user_img" >
				<img src="~assets/default_img.jpg" alt="" slot="right" v-else>
			</edit-banner>
		</div>
		
		<edit-banner left="昵称"  @click.native="nameshow=true"  >
			<a href="javascript:;" slot="right">{{userData.name}}</a>
		</edit-banner>
		<edit-banner left="UID"   >
			<a href="javascript:;" slot="right">{{userData.ccc}}</a>
		</edit-banner>
		<edit-banner left="性别" @click.native="select_show=true"   >
			<a href="javascript:;" slot="right">{{showGender}}</a>
		</edit-banner>
		<edit-banner left="出生日期"   >
			<a href="javascript:;" slot="right">{{userData.aaa}}</a>
		</edit-banner>
		<edit-banner left="个性签名"  @click.native="textshow=true"  >
			<a href="javascript:;" slot="right">{{userData.user_desc}}</a>
		</edit-banner>
		
		<div class="backHome" @click="$router.push('/userinfo')">
			返回个人中心
		</div>
				
		<van-dialog 
		v-model="nameshow"
		title="昵称" 
		show-cancel-button 
		@confirm="confirmClick"
		@cancel="content='' "
		>
			<van-field  v-model="content" autofocus />
		</van-dialog>
		
		<van-dialog
		v-model="textshow"
		title="个性签名" 
		show-cancel-button 
		@confirm="textAreaClick"
		@cancel="content='' "
		>
		<van-field v-model="content" type="textarea" autofocus />
		</van-dialog>
		
		<van-action-sheet v-model="select_show" 
		:actions="actions"
		@select="onSelect"
		cancel-text="取消"
		/>
  </div>
</template>

<script>
	import UserTopBar from 'components/content/UserTopBar.vue'
	import EditBanner from './childComp/EditBanner.vue'
  export default {
    name: 'Edit',
		components:{
			UserTopBar,
			EditBanner
		},
		computed:{
			showGender(){
				if(this.userData.gender==1){return '男'}
				else if(this.userData.gender==0){return '女'}
				else {return ''}
			}
		},
		data(){
			return {
				userData:{},
				nameshow:false,
				textshow:false,
				content:'',
				select_show:false,
				actions: [{ name: '男',val:1 },
				         { name: '女' ,val:0}]
			}
		},
		methods:{
		    async getUserData() {
					//既然我登录进来时向本地存储了id，那这个时候进来userinfo时就根据这个id请求这个id的用户数据
		        const res =  await this.$http.get('/user/' + localStorage.getItem('id') )
						// console.log(res)
						this.userData = res.data[0]    
		    },
				async afterRead(file){ //选择文件发上去之后，会传过来一个对象这里命名为file，这个大对象里面有个小对象叫file
					// console.log(file)    
					const fromdata = new FormData()
					fromdata.append('file',file.file) //我们要把这个小对象用append发到后台上，并以后台规定的命名 'file' 上传
					const res =  await this.$http.post('/upload',fromdata) //res就是后台返回给我们的数据
					this.userData.user_img = res.data.url
					this.UserUpdate() 
				},
				async UserUpdate() { //请求后台将后台的数据也修改一下，不然图片上传完刷新下就没了
				    const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.userData)
				    if(res.data.code == 200){
				        this.$toast.success('修改成功')
				    } 
				},
				confirmClick() {
				    this.userData.name =  this.content
				    this.UserUpdate()  //记得调用这个把后台数据也更新下
				    this.content = ''
				},
				textAreaClick(){
					this.userData.user_desc =  this.content
					this.UserUpdate()  //记得调用这个把后台数据也更新下
					this.content = ''
				},
				onSelect(item){
					this.select_show=false
					this.userData.gender=item.val
					this.UserUpdate()  
				}
		},
		created() {
		    this.getUserData()
		}
  }
</script>

<style scoped>
	.backHome{
		margin-top: 20px;
		height: 50px;
		background-color: white;
		font-size: 16px;
		text-align: center;
		line-height: 50px;
		border-radius: 5px;
	}
	.upload{
		position: relative;
		overflow: hidden;
	}
	.uploader{
		position: absolute;
		opacity: 0;
	}
  #edit{
		height: 100vh;
		background-color:rgba(192,192,192,.1);
	}
	a{
		color: #000000;
	}
  .avatar img{
	height: 45px;
	width: 45px;
	border-radius: 50%;
  }
</style>
