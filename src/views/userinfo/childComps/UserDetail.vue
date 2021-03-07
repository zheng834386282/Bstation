<template>
  <div>
		<div class="">
		  <img src="~assets/bannerTop_new.png" alt="" class="backImg">
		</div>
		<div class="profile">
			<img :src="userinfo.user_img" alt="" class="userImg" v-if="userinfo.user_img"  @click="$router.push('/edit')" >
			<img src="~assets/default_img.jpg" alt="" class="userImg" v-else  @click="$router.push('/edit')">
			<div class="right_box">
				<div class="userData">
					<span>
						<div style="font-size: 16px;color: #000000;">0</div>
						<div>粉丝</div>
						
					</span>
					<span>
						<div style="font-size: 16px;color: #000000;">5</div>
						<div>关注</div>
					</span>
					<span>
						<div style="font-size: 16px;color: #000000;">0</div>
						<div>获赞</div>
					</span>
				</div>
				<div class="user_edit" @click="$router.push('/edit')">
					编辑资料
				</div>
			</div>
			
		</div>
		<div style="padding: 0 12px;background-color: white;">
			
			<h2 v-if="userinfo.username" style="font-weight: unset;font-size: 21px;background-color: white;">{{userinfo.username}}</h2>
			<h2 v-else style="font-weight: unset;font-size: 21px;background-color: white;">此用户无姓名</h2>
			
			<div class="introduction">
				<div class="intro_text" v-if="userinfo.user_desc" style="font-size: 13px;color: rgba(153,153,153,.7);">
					{{userinfo.user_desc}}</div>
				<div class="intro_text" v-else style="font-size: 13px;color: rgba(153,153,153,.7);">
					这个人很神秘，什么都没有留下</div>
				<div style="color: #1E90FF;" @click="showMore">{{default_text}}</div>
			</div>
			
			<div v-if="isShowMore" class="uid_show">
				<span>uid:{{uid}}</span>
			</div>
			
		</div>
		
		<div class="tab_control">
			<div v-for="(item,index) in tabContent" @click="itemClick(index)" :class="{active:index===currentIndex}">{{item}}</div>
		</div>
		
	</div>
	
</template>

<script>
  export default {
    name: 'UserDetail',
		components:{
		},
		data(){
			return {
				isShowMore:false,
				uid:'',
				default_text:"展开",
				tabContent:['动态','视频'],
				currentIndex:0
			}
		},
		props:{
			userinfo:{}
		},
		computed:{
			
		},
		methods:{
			showMore(){
				if(this.default_text=="展开"){
					this.default_text="收起"
					this.isShowMore= !this.isShowMore
				}
				else{
					this.default_text="展开"
					this.isShowMore= !this.isShowMore
				}
			},
			itemClick(index){
				this.currentIndex=index
			}
		}
  }
</script>

<style scoped>
	*{
		padding: 0;
		margin: 0;
	}
	.active{
		color: #FB7299;
	}
	.tab_control div{
		margin: 0 15px;
	}
	.tab_control{
		height: 40px;
		margin: 5px 0;
		background-color: white;
		display: flex;
		line-height: 40px;
		font-size: 13px;
	}
	.uid_show{
		height: 16px;
		background-color: white;
		margin-top: 12px;
		font-size: 12px;
	}
	.uid_show span{
		background-color: #f4f4f4;
		width: 80px;
	}
	.introduction{
		display: flex;
		align-items: center;
	}
	.intro_text{
		flex: 1;
	}
  .backImg {
		width: 100%;
		height: 90px;
	}
	.profile{
		padding: 12px 12px;
		display: flex;
		background-color: white;
	}
	.right_box{
		padding: 0 22px;
		margin-left: 28px;
	}
	.userData{
		flex: 1;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
}	
	.userData span{
		width: 40px;
		height: 40px;
		padding: 0 12px;
		text-align: center;
		font-size: 11px;
		color: #999;
	}
	.userImg{
		width: 84px;
		height: 84px;
		border-radius: 50%;
	}
	.user_edit{
		width: 220px;
		height: 28px;
		color: #FB7299;
    border: 1px solid #FB7299;
		border-radius: 3px;
		text-align: center;
		line-height: 28px;
		font-size: 14px;
		margin-top: -5px;
	}
	.userData span:nth-child(1),.userData span:nth-child(2){
		border-right: 1px solid rgba(153,153,153,.5);
	}
</style>
