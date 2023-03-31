<template>
	<view 
	class="gui-load-more gui-flex gui-row gui-align-items-center gui-justify-content-center" 
	@tap.stop.prevent="tapme">
		<view 
		v-if="loadMoreStatus == 0">
			<text 
			class="gui-block" 
			:style="{
				height:loadMoreFontSize,
			}"></text>
		</view>
		<view 
		class="gui-load-more-icon" 
		ref="loadingiconforloadmore" 
		v-if="loadMoreStatus == 1">
			<text 
			:class="customClass" 
			class="gui-icons gui-rotate360 gui-block"
			:style="{
				fontSize:loadMoreFontSize,
			}">&#xe9db;</text>
		</view>
		<text class="gui-block" 
		:class="customClass" 
		:style="{
			fontSize:loadMoreFontSize, 
		}">{{loadMoreText[loadMoreStatus]}}</text>
	</view>
</template>
<script>
// #ifdef APP-NVUE
var animation = weex.requireModule('animation');
// #endif
export default{
	name  : "gui-loadmore",
	props : {
		loadMoreText     : {type:Array, default:function () {
			return ['','数据加载中', '已加载全部数据', '暂无数据'];
		}},
		customClass      : {type:Array, default:function () {return ['gui-color-gray'];}},
		loadMoreFontSize : {type:String, default:'26rpx'},
		status           : {type:Number, default:0},
	},
	data() {
		return {
			loadMoreStatus : 0,
			hidden         : false
		}
	},
	created:function(){
		this.loadMoreStatus = this.status;
		if(this.status == 1){
			// #ifdef APP-NVUE
			setTimeout(()=>{
				this.rotate360();
			}, 200);
			// #endif
		}
	},
	methods:{
		loading    : function(){
			this.loadMoreStatus = 1;
			// #ifdef APP-NVUE
			setTimeout(()=>{
				this.rotate360();
			}, 200);
			// #endif
		},
		stoploadmore : function(){
			this.loadMoreStatus = 0;
		},
		stopLoadmore : function(){
			this.loadMoreStatus = 0;
		},
		nomore : function(){
			this.loadMoreStatus = 2;
		},
		empty  : function(){
			this.loadMoreStatus = 3;
		},
		hide   : function(){
			this.hidden = true;
		},
		rotate360 : function(){
			var el = this.$refs.loadingiconforloadmore;
			animation.transition(el, {
				styles     : {transform: 'rotate(7200deg)'},
				duration   : 20000,
				timingFunction: 'linear',
				needLayout :false,
				delay: 0
			});
		},
		tapme : function(){
			if(this.loadMoreStatus == 0){
				this.$emit('tapme');
			}
		}
	},
	emits:['tapme']
}
</script>
<style scoped>
.gui-load-more{padding:25rpx;}
.gui-load-more-text{line-height:35rpx;} 
.gui-load-more-icon{padding:0 12rpx; line-height:35rpx;}
</style>