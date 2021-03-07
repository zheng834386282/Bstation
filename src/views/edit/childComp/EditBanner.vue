<template>
  <div class="banner">
    <span class="left">{{left}}</span>
		<span>
			<slot name="right"></slot>
		</span>
  </div>
</template>

<script>
  export default {
    name: 'EditBanner',
		props:['left']
  }
</script>

<style scoped>
  .banner{
		padding: 12px;
		font-size: 14px;
		background-color: white;
		border-bottom: 2px solid rgba(192,192,192,.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
