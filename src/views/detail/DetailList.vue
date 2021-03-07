<template>
  <div v-if="detailDataList" id="detail_list">
    <detail-good v-for="(item,index) in detailDataList" :item="item" :key="index" ></detail-good>
  </div>
</template>

<script>
	import DetailGood from './DetailGood.vue'
  export default {
    name: 'DetailList',
		components:{
			DetailGood
		},
		props:['detailDataList'],
		
  }
</script>

<style scoped>
  #detail_list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10px;
	}
</style>
