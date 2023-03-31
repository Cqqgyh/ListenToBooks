<template>
	<view 
	class="gui-mp-navigation-spacing" 
	:style="{width:width+'px'}"></view>
</template>
<script>
export default{
	name  : "gui-mp-navigation-spacing",
	data() {
		return {
			width: 0
		}
	},
	created:function(){
		// #ifdef MP
			let system         = uni.getSystemInfoSync();
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.width         = menuButtonInfo.width + (system.windowWidth - menuButtonInfo.right);
		// #endif
	}
}
</script>
<style scoped>
.gui-navigation-spacing{width:0px; height:20px;}
</style>
