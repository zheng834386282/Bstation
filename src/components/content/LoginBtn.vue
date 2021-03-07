<template>
  <div class="btnparent">
    <div class="login_btn">
			{{text}}
		</div>
  </div>
</template>

<script>
  export default {
    name: 'LoginBtn',
		props:['text']
  }
</script>

<style scoped>
	.btnparent{
		padding: 15px 10px;
	}
 .login_btn{
	 height: 45px;
	 background-color: pink;
	 color: white;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 border-radius: 22.5px;
 }
</style>
