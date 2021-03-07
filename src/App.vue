<template>
  <div id="app">
		<keep-alive>
		    <router-view v-if="$route.meta.keepalive" />
		</keep-alive>
		    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<style>
#app {
  width: 100vw;
	overflow-x: hidden;
}
*{
	padding: 0;
	margin: 0;
}
</style>
