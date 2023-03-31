<template>
	<view 
	class="gui-page-refresh gui-flex gui-column gui-justify-content-center" 
	:style="{height:refreshHeight+'px'}">
		<view 
		:style="{height:refreshFontSize+'rpx'}" 
		class="gui-flex gui-row gui-justify-content-center gui-align-items-center">
			<text
			class="gui-icons gui-block" 
			v-if="refreshStatus == 0 || refreshStatus == 1" 
			:class="customClass[refreshStatus]" 
			:style="{
				fontSize:refreshFontSize+'rpx',
				width:refreshFontSize+'rpx',
				height:refreshFontSize+'rpx',
				lineHeight:refreshFontSize+'rpx'
			}">&#xe66c;</text>
			<text
			ref="loadingIcon" 
			v-if="refreshStatus == 2" 
			class="gui-icons gui-block gui-text-center gui-rotate360" 
			:class="customClass[refreshStatus]" 
			:style="{
				fontSize:refreshFontSize+'rpx',
				width:refreshFontSize+'rpx',
				height:refreshFontSize+'rpx',
				lineHeight:refreshFontSize+'rpx'
			}">&#xe95a;</text>
			<text 
			class="gui-icons" 
			:class="customClass[refreshStatus]" 
			v-if="refreshStatus == 3" 
			:style="{
				fontSize:refreshFontSize+'rpx',
				width:refreshFontSize+'rpx',
				height:refreshFontSize+'rpx',
				lineHeight:refreshFontSize+'rpx'
			}">&#xe7f8;</text>
			<text 
			style="margin-left:12rpx;" 
			class="gui-page-refresh-text gui-block" 
			:class="customClass[refreshStatus]" 
			:style="{fontSize:refreshFontSize+'rpx'}">{{refreshText[refreshStatus]}}</text>
		</view>
	</view>
</template>
<script>
// #ifdef APP-NVUE
var animation = weex.requireModule('animation');
const dom     = weex.requireModule('dom');
// #endif
export default{
	name  : "gui-refresh", 
	props : {
		refreshText    : {type:Array,   default:function () {
			return ['继续下拉刷新','松开手指开始刷新','数据刷新中','数据已刷新'];
		}},
		customClass : {type:Array,   default:function () {
			return [
				['gui-color-gray'],
				['gui-color-gray'],
				['gui-primary-text'],
				['gui-color-green'],
			];
		}},
		refreshFontSize : {type:Number, default:28},
		triggerHeight   : {type:Number, default:50}
	},
	data() {
		return {
			reScrollTop         : 0,
			refreshHeight       : 0,
			refreshY            : 0,
			refreshStatus       : 0,
			refreshTimer        : 0
		}
	},
	methods:{
		touchstart : function (e){
			if(this.reScrollTop > 10){return ;}
			this.refreshY = e.changedTouches[0].pageY;
		},
		touchmove : function(e){
			if(this.refreshStatus >= 1){ return null;}
			if(this.reScrollTop > 10){return ;}
			var moveY = e.changedTouches[0].pageY - this.refreshY;
			moveY     = moveY / 2;
			if(moveY >= this.triggerHeight){
				moveY = this.triggerHeight;
				this.refreshStatus = 1;
			}
			if(moveY > 15){this.refreshHeight = moveY;}
		},
		touchend : function (e) {
			if(this.reScrollTop > 10){return ;}
			if(this.refreshStatus < 1){
				return this.resetFresh();
			}else if(this.refreshStatus == 1){
				this.refreshStatus = 2;
				// #ifdef APP-NVUE
				setTimeout(()=>{
					this.rotate360();
				}, 200);
				// #endif
				this.$emit('reload');
			}
		},
		scroll:function(e){
			this.reScrollTop = e.detail.scrollTop;
		},
		endReload : function(){
			this.refreshStatus = 3;
			setTimeout(()=>{this.resetFresh()}, 1000);
		},
		resetFresh : function () {
			this.refreshHeight = 0;
			this.refreshStatus = 0;
			return null;
		},
		rotate360 : function(){
			var el = this.$refs.loadingIcon;
			animation.transition(el, {
				styles     : {
					transform: 'rotate(7200deg)', 
					transformOrigin :'center'
				},
				duration   : 20000,
				timingFunction: 'linear',
				needLayout :false,
				delay: 0
			});
		}
	},
	emits : ['reload']
}
</script>
<style scoped>
.gui-page-refresh{overflow:hidden}
.gui-page-refresh-text{line-height:38rpx;height:38rpx;}
/* #ifndef APP-NVUE */
@keyframes gload-hide{0%{opacity:1; height:50px;} 70%{opacity:1; height:50px;} 100%{opacity:0; height:0px;}}
.gload-hide{animation:gload-hide 1s linear;}
/* #endif */
</style>