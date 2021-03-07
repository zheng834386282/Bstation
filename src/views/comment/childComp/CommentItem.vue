<template>
  <div id="comment_item" v-if="commentChild" >
		<div  v-for="(item,index) in commentChild" :key="index" >
			<div class="lower_comment">
				<div class="left">
					<img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
					<img src="~assets/default_img.jpg" alt="" v-else>
				</div>
				<div class="right">
					<div class="right_top">
						<span>{{item.userinfo.name}}</span>
						<span>{{item.comment_date}}</span>
					</div>
					<div v-if="!threeBottom" class="comment_content">
					  <span>{{item.comment_content}}</span>
					  <span @click="lowerReply(item.comment_id)">回复</span>
					</div>
					<div v-else class="comment_content">
						<span>回复<span style="color:#478ef0">{{item.parent_user_info.name}}</span>:{{item.comment_content}}</span>
						<span @click="lowerReply(item.comment_id)">回复</span>
					</div>
				</div>
			</div>
			<div v-if="item.child" ><CommendChildItem  :commentChild="item.child" :threeBottom='true'></CommendChildItem></div>
		</div>
		
  </div>
</template>
<script>
  export default {
    name: 'CommendChildItem',
		props:['commentChild','threeBottom'],
		methods:{
			lowerReply(id){
				// console.log(id)
				
				this.$bus.$emit('lowerReply',id)
			}
		}
  }
</script>

<style  scoped>
	.comment_content{
		display: flex;
		justify-content: space-between;
	}
	.comment_content span:first-child{
		width: 235px;
	}
	.comment_content span:last-child{
		color: #FE7299;
		width: 40px;
		text-align: center;
	}
  #comment_item{
		/* margin-bottom: 14px; */
	}
	#commentInfo:last-child{
		border: none;
	}
	
	.lower_comment{
		display: flex;
		padding: 0 0 0 20px;
		margin: 0 0 20px 0;
	}
	
	
	.right{
		flex: 1;
	}
	.right_top{
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	
	.left{
		width: 30px;
		height: 30px;
		margin-right: 10px;
		
	}
	.left img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	
</style>
