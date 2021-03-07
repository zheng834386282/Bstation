<template>
  <div v-if="model">
		<div style="position: fixed;top: 0;left: 0;z-index: 99;background-color: white;width: 100vw;"><nav-bar /></div>
    <div style="margin-top: 50px;">
			<div class="video">
				<video controls="controls" :src="model.content"></video>
			</div>
			<div class="publisher_info">
				
				<div class="title">
					<div><van-icon name="fire-o" />热门</div>
					<div>{{model.name}}</div>
				</div> 
				
				<div class="play_data">
					<div class="left">
						<img :src="model.userinfo.user_img" alt="" v-if="model.userinfo.user_img">
						<img src="~assets/head_img.jpg" alt="" v-else>
						<span>{{model.userinfo.name}}</span>
					</div>
					
					<div class="right">
						<span><van-icon name="good-job" size="18px" />10.6万</span>
						<span @click="collectClick" :class="{active:isActive}"><van-icon name="star" size="18px" />3.7万</span>
						<span><van-icon name="todo-list" size="18px" />缓存</span>
					</div>
				</div>
			</div>
			<div class="detail_list">
				<detail-good @click.native="itemClick" v-for="(item,index) in commendList" :item="item" :key="index" />
			</div>
			
			<Comment ref="comment" />
		</div>
		
  </div>
</template>

<script>
	import NavBar from 'components/content/UserTopBar.vue'
	import DetailGood from 'views/detail/DetailGood.vue'
	import Comment from 'views/comment/Comment.vue'
  export default {
    name: 'Article',
		components:{
			NavBar,
			DetailGood,
			Comment
		},
		data(){
			return {
				model:null,
				commendList:[],
				isActive:false
			}
		},
		methods:{
			getArticleData(){
				this.$http('/article/'+ this.$route.query.id).then(res=>{
					if(res){
						this.model =  res.data[0]
					}
				})
			},
			getCommendData(){
				this.$http('/commend/').then(res=>{
					if(res){
						this.commendList = res.data
					}
				})
			},
			itemClick(){ //小item点击时，不能只跳转路由，还要重新根据id请求数据重新渲染画面才行。
				this.getArticleData()
				this.getCommendData()
				this.$refs.comment.getCommentData()
			},
			collectClick(){
				//这里注意后台区分了两种操作的请求
				//如果是点击收藏的请求，后台规定用post请求才能返回数据(点一次这个数据里的msg就是'收藏成功') 点两次msg就是'取消收藏成功'
				//如果是进入页面时查看该article是否被收藏，这个请求后台规定用get请求，返回的数据中就没有msg了，而是success:false/true
				this.$http.post('/collection/' + localStorage.getItem('id'),{article_id:this.$route.query.id } ).then(res=>{
					// console.log(res)
					if(res.data.msg =="收藏成功"){
						this.isActive=true
					}
					else{
						this.isActive=false
					}
				})
			},
			checkCollect(){
				 this.$http.get('/collection/' + localStorage.getItem('id'),{
				      params:{
				         article_id:this.$route.query.id
				             }
				    }).then(res=>{
					// this.$http.get('/collection/' + localStorage.getItem('id'),{article_id:this.$route.query.id} ).then(res=>{
					// 	console.log(res)
					if(res.data.success==true){
						this.isActive=true
					}
					else{
						this.isActive=false
					}
				})
			}
		},
		watch:{
		    $route(){
		        this.getArticleData()
		        this.getCommendData()
		        this.checkCollect()
						this.$refs.comment.getCommentData()
		    }
		},
		created() {
			this.getArticleData()
			this.getCommendData()
			this.checkCollect()
		}
  }
</script>

<style scoped>
	.detail_list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10px;
	}
	.play_data{
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		margin-top: 20px;
	}
	
	.left{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
	}
	.right{
		width: 190px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #aaa;
	}
	.right span{
		height: 25px;
		line-height: -8px;
	}
	
	.play_data img{
	
		width: 20px;
		height: 20px;
		border-radius: 50%;
		
	}
	.title div:nth-child(1){
		display: inline-block;
		color: #fe7299;
		width: 60px;
		height: 26px;
		background-color: #F4F4F4;
		text-align: center;
		line-height: 26px;
		border-radius: 15px;
		font-size: 14px;
		font-weight: bold;
		margin-right: 8px;
	}
	.title{
		display: flex;
	}
	.title div:nth-child(2){
		flex: 1;
		height: 52px;
		font-size: 16px;
		line-height: 26px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2; /** 显示的行数 **/
		overflow: hidden;  /** 隐藏超出的内容 **/
	}
	.publisher_info{
		padding: 0 10px;
		margin-top: 13px;
	}
  .video{
		width: 100%;
		height: 202px;
		
	}
	video{
		width: 100%;
		height: 202px;
	}
	.active{
		color: #FE7299;
	}
</style>
