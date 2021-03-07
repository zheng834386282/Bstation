<template>
  <div id="home">
			<div style="position: fixed;top: 0;left: 0; z-index: 99;padding: 0;margin: 0;background-color: white;">
				<div style="width: 100vw;"><nav-bar/></div>
				<div style="display: flex;"> 
					<div  style="width: 91vw;">
						<van-tabs v-model="active" swipeable sticky animated >
								<van-tab v-for="(item,index) in category" :title="item.title" :key="index">
								</van-tab>
						</van-tabs>	
					</div>	
					<div style="flex: 1;display: flex;align-items: center;justify-content: center;">
						<div @click="$router.push('/editCategory')" style="background-color: white;"><van-icon name="setting-o" /></div>
					</div>
				</div>
			</div>
			
						<div class="dataList">
							<van-list
							  v-model="categoryItem.loading"
							  :immediate-check="false"
							  :finished="categoryItem.finished"
							  finished-text="我也是有底线的"
							  @load="onLoad"
							>
							<div class="detail_list">
							    <detail-good
							      :item="item"
							      v-for="(item,index) in categoryItem.list"
							      :key="index"
							    />
							</div>
							</van-list>
						</div>
					
		
				
      
  </div>
</template>

<script>
	import NavBar from 'components/content/UserTopBar.vue'
	import DetailGood from 'views/detail/DetailGood.vue'
  export default {
    name: 'Home',
		components:{
			NavBar,
			DetailGood,
		},
		data(){
			return {
				category:[],
				categoryItem:{},
				active:null,
				newCat:[]
			}
		},
		created() {
			this.getCategoryData();
		},
		activated() {
			this.$bus.$on('updateSelect',newCat=>{
				this.newCat = newCat
			})
			this.category = this.newCat
		},
		watch:{
			active(){
				this.categoryItem=this.category[this.active];
				this.getDetailData()
			}
		},
		methods:{
			//1.拿到在导航上的不同分类以及他们对应的id
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
						this.category.push(...res.data)
					}
				})
			},
			
			getDetailData(){
				this.categoryItem.loading=true; //还没请求到时将状态调整为加载状态
				this.$http({url:'/detail/' + this.categoryItem._id,
				params:{
					page: this.categoryItem.page,
					pagesize: this.categoryItem.pagesize
				}}).then(res=>{
					if(res){
						console.log(res)
						this.categoryItem.list.push(...res.data)
						this.categoryItem.loading=false //请求后时将加载状态取消
						 if (res.data.length < this.categoryItem.pagesize){
							 //这里终于体现出pagesize的作用了，最后一页请求的数据是小于10的，作者利用了这一点来判断是否加载结束
							 this.categoryItem.finished = true
						 }
					}
				})
			},
			
			onLoad(){
				this.categoryItem.page+=1;
				this.getDetailData();
			},
			settingClick(){
				console.log(111)
			}
		}
  }
</script>

<style scoped>
	.dataList{
		margin-top: 98px;
	}
	.tabControl{
		display: flex;
	}
	.tabControl span{
		width: 20px;
		height: 20px;
	}
	
	.detail_list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10px;
	}
	
	html,body{
		width: 100%;
	}
  .home{
		width: 100vw;
		overflow: hidden;
	}
</style>
