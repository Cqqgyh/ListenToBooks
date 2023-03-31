<template>
	<view class="gui-spread" 
	:class="[isShrink ? 'gui-transition-all' : '']" 
	:style="{height:reHeight}">
		<view :style="{
			paddingBottom: !isBtn && isShrink ? '80rpx' : '0rpx'
		}">
			<slot></slot>
		</view>
		<text 
		v-if="isBtn" 
		@tap="spreadContent" 
		:style="{fontSize:btnTxtSize, zIndex:zIndex, width:width}"
		class="gui-primary-text gui-icons gui-block gui-spread-btn gui-bg-white gui-dark-bg-level-1">&#xe69d; {{btnTxt}}</text>
		
		<text 
		v-if="!isBtn && isShrink" 
		@tap="shrinkContent" 
		:style="{fontSize:btnTxtSize, zIndex:zIndex, width:width}"
		class="gui-primary-text gui-icons gui-block gui-spread-btn gui-bg-white gui-dark-bg-level-1">&#xe638; {{shrinkBtnTxt}}</text>
	</view>
</template>
<script>
export default {
	name  : "gui-spread",
	props : {
		width       : { type : String, default : "690rpx" },
		height      : { type : String, default : "600rpx" },
		btnTxt      : { type : String, default : "展开阅读全文" },
		btnTxtSize  : { type : String, default : "28rpx" },
		zIndex      : { type : Number, default : 1 },
		isShrink    : { type : Boolean,default : false},
		shrinkBtnTxt: { type : String, default : "收缩文章"}
	},
	data() {
		return {
			reHeight: "600px",
			isBtn : true
		}
	},
	created:function(){
		this.reHeight = this.height;
	},
	methods: {
		spreadContent : function () {
			// #ifdef MP-BAIDU
			this.reHeight = '';
			// #endif
			// #ifndef MP-BAIDU
			this.reHeight = 'auto';
			// #endif
			// #ifdef APP-NVUE
			this.reHeight = '';
			// #endif
			this.isBtn    = false;
		},
		shrinkContent : function () {
			this.reHeight = this.height;
			this.isBtn    = true;
		}
	},
}
</script>
<style scoped>
.gui-spread{overflow:hidden; position:relative;}
.gui-spread-btn{height:91rpx; line-height:88rpx; position:absolute; z-index:999; left:0; bottom:-3rpx; text-align:center;font-size:28rpx;opacity:0.96;}
</style>
