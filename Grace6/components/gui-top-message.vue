<template>
	<view 
	class="gui-top-message" 
	ref="guipopupfortopmsg" 
	v-if="show" 
	:style="{top : navHeight+'px'}" 
	:class="[out ? 'gui-top-message-out' : 'gui-top-message-in']">
		<slot></slot>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
import graceJS from '@/Grace6/js/grace.js';
export default{
	name  : "gui-top-message",
	props : {
		duration  : {type:Number,  default:2000},
		customNav : {type:Boolean, default:false }
	},
	data() {
		return {
			show    : false,
			out     : false,
			navHeight : 0
		}
	},
	created : function (){
		this.customNavSet();
	},
	methods:{
		customNavSet : function () {
			if(!this.customNav){
				// #ifdef H5
				this.navHeight = 44;
				// #endif
				// #ifndef H5
				this.navHeight = 0;
				// #endif
			}else{
				var system = graceJS.system();
				this.navHeight = system.statusBarHeight;
			}
		},
		open : function(){
			this.out  = false;
			this.show = true;
			// #ifdef APP-NVUE
			this.weexAnimateIn();
			// #endif
			setTimeout(()=>{this.close();}, this.duration);
		},
		close : function(){
			this.out = true;
			// #ifdef APP-NVUE
			this.weexAnimateOut();
			// #endif
			setTimeout(()=>{this.show = false;},350);
		},
		// #ifdef APP-NVUE
		weexAnimateIn : function(){
			graceJS.getRefs('guipopupfortopmsg', this, 0, (guipopupref)=>{
				animation.transition(guipopupref, {
					styles: {transform:'translateY(0px)', opacity:1},
					duration: 350, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				});
			});
		},
		weexAnimateOut : function(){
			graceJS.getRefs('guipopupfortopmsg', this, 0, (guipopupref)=>{
				animation.transition(guipopupref, {
					styles: {transform:'translateY(-200px)', opacity:0},
					duration: 350, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				});
			});
		},
		// #endif
	}
}
</script>
<style scoped>
.gui-top-message{position:fixed; left:0; top:0; width:750rpx; z-index:900; transform:translateY(-200px); opacity:0.1;}
/* #ifdef H5 */
.gui-top-message{top:44px;}
/* #endif */
/* #ifndef APP-NVUE */
@keyframes gui-top-message-in{0%{transform:translateY(-200px); opacity:0.1;} 100%{transform:translateY(0px); opacity:1;}}
.gui-top-message-in{animation:gui-top-message-in 350ms linear forwards;}
@keyframes gui-top-message-out{0%{transform:translateY(0px);  opacity:1;} 100%{transform:translateY(-200px); opacity:1;}}
.gui-top-message-out{animation:gui-top-message-out 350ms linear forwards;}
/* #endif */
</style>