<template>
	<view 
	class="gui-right-menus" 
	:style="styles">
		<view 
		v-if="show" 
		ref="guirightmenu" 
		class="gui-rt-menus-animate" 
		:class="[outting ? 'slideOutRight' : 'slideInRight']">
			<slot name="menus-more"></slot>
		</view>
		<view 
		hover-class="gui-tap" 
		@tap.stop="toggle">
			<slot name="menus-primary"></slot>
		</view>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
import graceJS from '@/Grace6/js/grace.js';
// #endif
export default{
	name  : "gui-right-menus",
	props : {
		styles:{type:String, default:'right:20rpx; bottom:200rpx; z-index:999; width:100rpx;'},
	},
	data() {
		return {
			show    : false,
			outting : false
		}
	},
	methods:{
		toggle : function () {
			if(this.show){this.close();}else{this.open();}
		},
		open:function () {
			this.show    = true;
			this.outting = false;
			// #ifdef APP-NVUE
			graceJS.getRefs('guirightmenu', this, 0, (ref)=>{
				animation.transition(ref, {
					styles         : { transform:'translateX(0px)' },
					duration       : 200, //ms
					timingFunction : 'ease',
					delay          : 0 //ms
				});
			});
			// #endif
		},
		close : function () {
			this.outting  = true;
			setTimeout(()=>{ this.show = false; }, 200);
			// #ifdef APP-NVUE
			graceJS.getRefs('guirightmenu', this, 0, (ref)=>{
				animation.transition(ref, {
					styles         : { transform:'translateX(100px)' },
					duration       : 200, //ms
					timingFunction : 'ease',
					delay          : 0 //ms
				});
			});
			// #endif
		}
	}
}
</script>
<style scoped>
/* #ifndef APP-NVUE */
@import "@/Grace6/css/animate.css";
.gui-rt-menus-animate{animation-duration:200ms; animation-timing-function:linear;}
/* #endif */
/* #ifdef APP-NVUE */
.gui-rt-menus-animate{transform:translateX(100px);}
/* #endif */
.gui-right-menus{position:fixed;}
</style>