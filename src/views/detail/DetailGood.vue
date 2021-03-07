<template>
  <div v-if="item" id="detail_good" @click="routerPush">
    <div class="photo">
			<img :src="item.img" alt="" >
			<div class="play_show">
				<div><van-icon name="play-circle-o" />666</div>
				<div><van-icon name="comment-o" />{{item.commentlen ? item.commentlen : 66}}</div>
			</div>
		</div>
		<div class="text">{{item.name}}</div>
		
		
  </div>
</template>

<script>
  export default {
    name: 'DetailGood',
		props:{
			item:{}
		},
		methods:{
			routerPush(){
				if(this.item.id != this.$route.query.id){
					this.$router.push({
						path:'article',
						query:{
							id:this.item.id
						}
					})
				}
					
			}
		}
		
  }
</script>

<style scoped>
   #detail_good{
		 width: 47%;
		 height: 130px;
		 
	 }
  .photo{
		position: relative;
		width: 100%;
		height: 93px;
	}
	.photo img{
		width: 100%;
		height: 100%;
	}
	.text{
		font-size: 13px;
		text-overflow: ellipsis;
	}
	.play_show{
		position: absolute;
		bottom: 2px;
		font-size: 13px;
		font-weight: 300;
		width: 100%;
		display: flex;
		height: 17px;
		line-height: 17px;
		justify-content: space-between;
		color: white;
		background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
	}
	.play_show div:nth-child(1){
		margin-left: 4px;
	}
	.play_show div:nth-child(2){
		margin-right: 5px;
	}
</style>
