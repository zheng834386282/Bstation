<template>
  <div>
     <van-field  :label="label" :placeholder="placeholder" :type="type" 
		 :rule="rule" v-model="content" 
			@input="handleInt"
			/>
  </div>
</template>

<script>
  export default {
    name: 'LoginText',
		props:['label','placeholder','type','rule'],
		data(){
			return{
				content:''
			}
		},
		methods:{
			handleInt(){
				// console.log(this.content)
				
					this.$emit('contentHandle',this.content)
				
				
			}
		}
  }
</script>

<style scoped>
   
</style>
