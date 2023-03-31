<template>
	<view 
	class="gui-scroll-body gui-flex gui-row gui-nowrap">
		<!-- #ifdef APP-NVUE -->
		<view 
		class="gui-scroll-msg gui-scrolling" 
		ref="guiscrollbody">
			<slot></slot>
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view 
		class="gui-scroll-msg gui-scrolling" 
		:style="{'animation-duration':speed+'s'}">
			<slot></slot>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
// #ifdef APP-NVUE
const BindingX = uni.requireNativePlugin('bindingx');
// #endif
export default {
	name  : "gui-scroll-message",
	props : {
		speed    : {type:Number, default:12},
		distance : {type:Number, default:1200}
	},
	data() {
		return {
			BindingXObj : {},
			AnimateObj  : 0
		}
	},
	// #ifdef APP-NVUE
	mounted:function(){
		setTimeout(()=>{
			this.BindingXObj = this.$refs.guiscrollbody.ref;
			this.animationL();
		}, 100);
	},
	methods:{
		animationL : function(){
			this.AnimateObj = BindingX.bind({
				eventType      : 'timing',
				exitExpression : 't>'+(this.speed*1000),
				props          : [
				  {
					element    : this.BindingXObj, 
					property   : 'transform.translateX',
					expression : "500+(-"+this.distance+")*t/"+(this.speed*1000)
				  }
				]
			}, (e)=>{
				if(e.state === 'exit') {
					setTimeout(()=>{
						this.animationL();
					},100);
				}
			});
		}
	}
	// #endif
}
</script>
<style scoped>
.gui-scroll-body{overflow:hidden;}
/* #ifndef APP-NVUE */
.gui-scrolling{animation:graceScrollingx 12s linear infinite;}
@keyframes graceScrollingx{ 0% { transform:translateX(60%); } 100% { transform: translateX(-100%); }}
/* #endif */
</style>