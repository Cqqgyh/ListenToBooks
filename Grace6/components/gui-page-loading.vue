<template>
	<view 
	class="gui-page-loading gui-flex gui-nowrap gui-align-items-center gui-justify-content-center gui-page-loading-bg"
	@tap.stop="stopfun" 
	@touchmove.stop.prevent="stopfun" 
	v-if="isLoading">
		<view class="gui-column">
			<!-- #ifndef APP-NVUE -->
			<view class="gui-page-loading-point gui-flex gui-rows gui-justify-content-center">
				<view class="gui-page-loading-points animate1 gui-page-loading-color"></view>
				<view class="gui-page-loading-points animate2 gui-page-loading-color"></view>
				<view class="gui-page-loading-points animate3 gui-page-loading-color"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view class="gui-page-loading-point gui-flex gui-rows gui-justify-content-center">
				<view class="gui-page-loading-points gui-page-loading-color" ref="loadingPoints1"></view>
				<view class="gui-page-loading-points gui-page-loading-color" ref="loadingPoints2"></view>
				<view class="gui-page-loading-points gui-page-loading-color" ref="loadingPoints3"></view>
			</view>
			<!-- #endif -->
			<view class="gui-row gui-justify-content-center">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const BindingX = uni.requireNativePlugin('bindingx');
// #endif
export default{
	name  : "gui-page-loading",
	props : {},
	data() {
		return {
			isLoading      : false,
			BindingXObjs   : [null,null,null],
			AnimateObjs    : [null,null,null],
			animateTimer   : 800,
			intervalID     : null
		}
	},
	watch:{
		// #ifdef APP-NVUE
		isLoading : function (val) {
			if(val){
				setTimeout(()=>{
					this.getRefs('loadingPoints1', 0, (refs)=>{
						this.BindingXObjs = [
							refs.ref,
							this.$refs.loadingPoints2.ref,
							this.$refs.loadingPoints3.ref
						];
						this.startAnimate();
					});
				}, 100);
				this.intervalID = setInterval(()=>{
					if(this.isLoading){
						this.startAnimate();
					}else{
						clearInterval(this.intervalID);
					}
				}, 2000);
			}
		}
		// #endif
	},
	methods:{
		// #ifdef APP-NVUE
		startAnimate   : function(){
			this.loadingAnimate(0);
			setTimeout(()=>{this.loadingAnimate(1);},300);
			setTimeout(()=>{this.loadingAnimate(2);},600);
		},
		loadingAnimate : function (id) {
			this.AnimateObjs[id] = BindingX.bind({
				eventType      : 'timing',
				exitExpression : 't>'+this.animateTimer,
				props          : [
					{
						element    : this.BindingXObjs[id], 
						property   : 'transform.scale',
						expression : "1+t/"+this.animateTimer+"/3"
					},
					{
						element    : this.BindingXObjs[id], 
						property   : 'opacity',
						expression : "0.6+t/"+this.animateTimer
					}
				]
			}, (e)=>{
				if(e.state === 'exit') {
					BindingX.unbind({
						token : this.AnimateObjs[id].token,
						eventType: 'timing'
					});
					this.AnimateObjs[id] = BindingX.bind({
						eventType      : 'timing',
						exitExpression : 't>'+this.animateTimer,
						props          : [
							{
								element    : this.BindingXObjs[id], 
								property   : 'transform.scale',
								expression : "1.35-t/"+this.animateTimer+"/3"
							},
							{
								element    : this.BindingXObjs[id], 
								property   : 'opacity',
								expression : "1.6-t/"+this.animateTimer
							}
						]
					}, (e)=>{
						if(e.state === 'exit') {
							BindingX.unbind({
								token : this.AnimateObjs[id].token,
								eventType: 'timing'
							});
						}
					});
				}
			});
		},
		// #endif
		stopfun        : function(e){
			e.stopPropagation(); return null;
		},
		open           : function(){
			this.isLoading = true;
		},
		close          : function(){
			setTimeout(()=>{
				this.isLoading = false; 
			},100);
		},
		getRefs : function(ref, count, fun){
			if(count >= 50){
				fun(this.$refs[ref]);
				return false;
			}
			var refReturn = this.$refs[ref];
			if(refReturn){
				fun(refReturn);
			}else{
				count++;
				setTimeout(()=>{
					this.getRefs(ref, count, fun);
				}, 100);
			}
		}
	}
}
</script>
<style scoped>
/* #ifndef APP-NVUE */
@keyframes pageLoading1{0% {opacity:0.5; transform:scale(1);} 40% {opacity:1; transform:scale(1.3);}  60%{opacity:0.5; transform:scale(1);}}
@keyframes pageLoading2{20% {opacity:0.5; transform:scale(1);} 60% {opacity:1; transform:scale(1.3);}  80% {opacity:0.5; transform:scale(1);}}
@keyframes pageLoading3{40% {opacity:0.5; transform:scale(1);} 80% {opacity:1; transform:scale(1.3);}  100% {opacity:0.5; transform:scale(1);}}
.animate1{animation:pageLoading1 1.2s infinite linear;}
.animate2{animation:pageLoading2 1.2s infinite linear;}
.animate3{animation:pageLoading3 1.2s infinite linear;}
/* #endif */
</style>