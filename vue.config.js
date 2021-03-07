module.exports={
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'common':'@/common',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views'
				//不需要router和store的路径别名是因为所有文件都可以使用this.$router/store
			}
		}
	}
}

