<template>
  <div class="com">
    <p>
			评论({{commentList.length}})
		</p>
		<div class="userinfo">
			<div v-if="userData"><img :src="userData.user_img" alt=""></div>
			<div v-else><img src="~assets/default_img.jpg" alt=""></div>
			<div><input type="text" placeholder="请说点什么吧" v-model="input_content" ref="input"></div>
			<div><button @click="btnClick">发表</button></div>
		</div>
		
		<div class="commentInfo" v-for="(item,index) in commentList" :key="index" v-if="commentList" >
			<div class="first_comment">
				<div class="left">
					<img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
					<img src="~assets/default_img.jpg" alt="" v-else>
				</div>
				<div class="right">
					<div class="right_top">
						<span>{{item.userinfo.name}}</span>
						<span>{{item.comment_date}}</span>
					</div>
					<div class="comment_content">
						<span>{{item.comment_content}}</span>
						<span @click="reply(item.comment_id)">回复</span>
					</div>
				</div>
			</div>
			
			<comment-item :commentChild="item.child" :threeBottom="false" ></comment-item>
			
		</div>
		
		
		
  </div>
</template>

<script>
	import CommentItem from './childComp/CommentItem.vue'
  export default {
    name: 'Comment',
		components:{
			CommentItem
		},
		data(){
			return {
				userData:null,
				commentList:[],
				Postcom:{
				    comment_content:'',
				    comment_date:'',
				    parent_id:null,
				    article_id:null,
				},
				input_content:'',
				temp:null
			}
		},
		methods:{
		    async getUserData() {
					if(localStorage.getItem('id')){
						const res =  await this.$http.get('/user/' + localStorage.getItem('id') )
						this.userData = res.data[0]    
					}
		    },
				btnClick(){
					//这个条件一个是看他有没有拿到个人数据
					//这个条件是防止有人登上去之后把本地id和token给清了还能发表评论，(登录完清了之后userData还有第一次存储的)
					if( !this.userData || !localStorage.getItem('id') || !localStorage.getItem('token')){
						this.$toast.fail('请先登录')
						setTimeout(()=>{
							this.$router.push('/login')
						},1000) 
					}
					else{
						// console.log(this.input_content)
						this.publishCom(this.temp) //暂时无法解决点回复之后又不想回复的问题。
						
					}
				},
				getCommentData(){
					this.$http('/comment/' + this.$route.query.id).then(res=>{
							 if(res.data){
								 this.commentList=this.changeCommentData(res.data)
							 }
						
					})
				},
				//利用递归改造评论的数据结构
				changeCommentData(data) {
				  function fn(temp) {
				    let arr1 = [];
				    for (var i = 0; i < data.length; i++) {
				      if (data[i].parent_id == temp) {
				        arr1.push(data[i]);
				        data[i].child = fn(data[i].comment_id);
				      }
				    }
				    return arr1;
				  }
				   return fn(null);
				},
				publishCom(temp){
					const date = new Date()
					let m = date.getMonth() + 1
					let d = date.getDate()
					if(m < 10) {
					    m = '0' + m
					}
					if(d < 10) {
					    d = '0' + d
					}
					let str = `${m}-${d}`
					this.Postcom.comment_content = this.input_content
					this.Postcom.comment_date = str
					this.Postcom.article_id = this.$route.query.id
					this.Postcom.parent_id = temp
					this.$http.post('/comment_post/' + localStorage.getItem('id'),this.Postcom).then(res=>{
						if(res.status == 200) {
						    this.$toast.success('评论发表成功')
								this.getCommentData();
						}
					})
					this.input_content=''
				},
				reply(id){
					// console.log(id)
					this.$refs.input.focus();
					this.temp=id
					
					
				}
		},
		created() {
		    this.getUserData()
				this.getCommentData()
				this.$bus.$on('lowerReply',id=>{
					this.reply(id)
				})
		}
  }
</script>

<style scoped>
	.commentInfo{
		border-bottom: 1px solid rgba(170,170,170,.2);
	}
	.first_comment{
		display: flex;
		padding: 20px 0;
	}
	.commentInfo:last-child{
		border: none;
	}
	
	.right{
		flex: 1;
	}
	.right_top{
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.comment_content{
		display: flex;
		justify-content: space-between;
	}
	.comment_content span:last-child{
		color: #FE7299;
		margin-right: 5px;
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
	.com{
		padding: 0 10px;
	}
	.com p:nth-child(1){
		margin-bottom: 15px;
	}
	.userinfo button{
		width: 80px;
		height: 30px;
		border-radius: 15px;
		border: none;
		color: white;
		background-color: #FE7299;
		margin-left: 7px;
		font-size: 14px;
	}
	.userinfo{
		display: flex;
		align-items: center;
	}
  .userinfo img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.userinfo input{
		border: none;
		background-color:rgba(170,170,170,.5) ;
		border-radius: 15px;
		font-size: 14px;
		height: 30px;
		padding: 0 10px;
		margin-left: 15px;
	}
</style>
