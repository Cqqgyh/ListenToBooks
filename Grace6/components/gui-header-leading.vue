<template>
	<view 
	class="gui-header-leader gui-flex gui-row gui-nowrap gui-align-items-center">
		<view 
		v-if="home" 
		:style="{
			opacity : show ? 1 : 0
		}" 
		class="gui-header-leader-btns" 
		hover-class="gui-tap">
			<text 
			:class="homeButtonClass" 
			class="gui-header-leader-btns gui-block gui-icons" 
			@tap="goHome">&#xe655;</text>
		</view>
		<view 
		v-if="back" 
		class="gui-header-leader-btns" 
		:style="{
			opacity : show ? 1 : 0
		}" 
		hover-class="gui-tap">
			<text 
			style="font-size:44rpx;"
			:class="backButtonClass" 
			class="gui-header-leader-btns gui-block gui-icons" 
			@tap="goBack">&#xe600;</text>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-header-leading",
	props : {
		back        : {type:Boolean, default:true},
		home        : {type:Boolean, default:true},
		backButtonClass : {type:Array, default:function(){return ['gui-primary-text'];}},
		homeButtonClass : {type:Array, default:function(){return ['gui-primary-text'];}}
	},
	data() {
		return {
			show  : true
		}
	},
	mounted:function(){
		// #ifdef MP-ALIPAY
		this.show = false;
		// #endif
		// #ifdef MP-BAIDU
		this.show = false;
		// #endif
		// #ifdef MP-JD
		this.show = false;
		// #endif
	},
	methods:{
		goBack : function () {
			uni.navigateBack({delta:1}); 
			this.$emit('goBack');
		},
		goHome : function () {
			this.$emit('goHome');
		}
	},
	emits : ['goBack', 'goHome']
}
</script>
<style scoped>
.gui-header-leader{height:55rpx; border-radius:55rpx; font-weight:bold; margin-left:20rpx; overflow:hidden;}
.gui-header-leader-btns{width:50rpx; line-height:50rpx; font-size:40rpx; margin:0rpx; overflow:hidden;}
</style>