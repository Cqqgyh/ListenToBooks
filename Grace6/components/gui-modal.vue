<template>
	<gui-popup 
	ref="guipopupformodal" 
	:width="width" 
	:canCloseByShade="canCloseByShade" 
	:zIndex="zIndex" 
	@close="eClose">
		<view 
		:class="customClass" 
		class="gui-relative" 
		@tap.stop.prevent="stopfun">
			<view>
				<text 
				class="gui-block gui-text-center gui-primary-text" 
				:style="titleStyle" 
				v-if="title != ''">{{title}}</text>
			</view>
			<view>
				<slot name="content"></slot>
			</view>
			<view>
				<slot name="btns"></slot>
			</view>
			<text 
			class="gui-popup-close gui-block gui-absolute-rt gui-icons gui-color-gray"
			:style="'width:76rpx; height:76rpx; line-height:76rpx; text-align:center;'+closeBtnStyle" 
			@tap.stop.prevent="close" 
			v-if="isCloseBtn">&#xe7a5;</text>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "gui-modal",
	props : {
		width           : { type  : String,  default : '580rpx'},
		isCloseBtn      : { type  : Boolean, default : true },
		closeBtnStyle   : { type  : String,  default : 'font-size:28rpx;' },
		title           : { type  : String,  default : '' },
		titleStyle      : { type  : String,  default : 'line-height:100rpx; font-size:28rpx; font-weight:700;'},
		canCloseByShade : { type  : Boolean, default : true },
		zIndex          : { type  : Number,  default : 99 },
		customClass     : { type  : Array,   default : function(){return ['gui-bg-white', 'gui-dark-bg-level-3'];}}
	},
	methods:{
		open  : function(){
			this.$refs.guipopupformodal.open();
			this.$emit('open');
		},
		close : function(){
			this.$refs.guipopupformodal.close();
			this.$emit('close');
		},
		stopfun : function(e){
			e.stopPropagation();
			return null;
		},
		eClose : function(){
			this.$emit('close');
		}
	},
	emits : ['open', 'close']
}
</script>
<style scoped>
</style>