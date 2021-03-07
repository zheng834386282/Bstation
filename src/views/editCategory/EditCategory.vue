<template>
  <div>
    <nav-bar />
		<van-divider 
		content-position="center" 
		dashed 
		:style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" >
		现有栏目</van-divider>
		<div class="selected">
			<span @click="selectedClick(index)" v-for="(item,index) in yes_category" :key="index" >{{item.title}}</span>
		</div>
		
		<van-divider
		content-position="center" 
		dashed 
		:style="{ color: '#DC143C', borderColor: '#DC143C', padding: '0 16px' }" >
		删除栏目</van-divider>
		<div class="de_selected">
			<span @click="deleteClick(index)" v-for="(item,index) in no_category" :key="index" >{{item.title}}</span>
		</div>
  </div>
</template>

<script>
	import NavBar from 'components/content/UserTopBar.vue'
  export default {
    name: 'EditCategory',
		components:{
			NavBar
		},
		data(){
			return {
				yes_category:[],
				no_category:[]
			}
		},
		methods:{
			getCategoryData(){
				this.$http({url:'/category'}).then(res=>{
					if(res){
						res.data.map((item,index)=>{
							//为数组成员加上其他属性
							item.list = []; //这个list就放置我们根据id请求来的detail数据
							item.page = 0;
							item.finished = false;
							item.loading = false;
							item.pagesize = 10;
							return item;
						})
						this.yes_category.push(...res.data)
					}
				})
			},
			selectedClick(index){
				
				
				localStorage.setItem('select',JSON.stringify(this.yes_category[index]))
				this.yes_category.splice(index,1)
				this.no_category.push(JSON.parse(localStorage.getItem('select') ))
				// console.log()
			},
			deleteClick(index){
				localStorage.setItem('no_select',JSON.stringify(this.no_category[index]))
				this.no_category.splice(index,1)
				this.yes_category.push(JSON.parse(localStorage.getItem('no_select') ))
			}
		},
		created() {
			this.getCategoryData()
		},
		deactivated() {
			this.$bus.$emit('updateSelect',this.yes_category)
		}
  }
</script>

<style scoped>
	.de_selected span{
		display: inline-block;
		width: 60px;
		height: 40px;
		border: 1px solid #DC143C;
		text-align: center;
		line-height: 40px;
		margin: 10px;
		color: #DC143C;
	}
	.de_selected{
		padding: 0 16px;
	}
	.selected span{
		display: inline-block;
		width: 60px;
		height: 40px;
		border: 1px solid #1989fa;
		text-align: center;
		line-height: 40px;
		margin: 10px;
	}
  .selected{
		
		color: #1989fa;
		padding: 0 16px;
		
	}
</style>
