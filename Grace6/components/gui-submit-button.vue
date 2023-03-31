<template>
	<view 
	class="gui-sbutton-in" 
	:class="[
		baseClass, 
		status == 1 ? defaultClass : '' ,
		status == 2 ? loadingClass : '' ,
		status == 3 ? successClass : '', 
		status >= 3 ? 'gui-btn-fade-in' : '', 
		status == 4 ? failClass : ''
	]">
		<view 
		class="gui-sbutton" 
		v-if="status == 1">
			<slot name="default"></slot>
		</view>
		<view 
		class="gui-sbutton gui-flex gui-rows gui-nowrap gui-justify-content-center gui-align-items-center" 
		:class="[baseClass]" 
		v-if="status == 2">
			<view 
			ref="loadingPoints1" 
			:class="[loaingPointClass, 'gui-sbutton-loading1']"></view>
			<view 
			ref="loadingPoints2" 
			:class="[loaingPointClass, 'gui-sbutton-loading2']"></view>
			<view 
			ref="loadingPoints3" 
			:class="[loaingPointClass, 'gui-sbutton-loading3']"></view>
		</view>
		<view 
		class="gui-sbutton" 
		v-if="status == 3">
			<slot name="success"></slot>
		</view>
		<view 
		class="gui-sbutton" 
		v-if="status == 4">
			<slot name="error"></slot>
		</view>
		<view 
		class="gui-sbutton gui-sbutton-slot">
			<slot name="realBtn"></slot>
		</view>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const BindingX = uni.requireNativePlugin('bindingx');
// #endif
export default{
	name    : "gui-submit-button",
	props   : {
		titleClass        : {type:String, default : 'gui-sbutton-text'},
		loaingPointClass  : {type:String, default : 'gui-sbutton-loading-point'},
		baseClass         : {type:String, default : 'gui-sbutton'},
		defaultClass      : {type:String, default : 'gui-sbutton-default'},
		loadingClass      : {type:String, default : 'gui-sbutton-loading'},
		successClass      : {type:String, default : 'gui-sbutton-success'},
		failClass         : {type:String, default : 'gui-sbutton-fail'}
	},
	data() {
		return {
			status         : 1,
			animateTimer   : 800,
			BindingXObjs   : [null,null,null],
			AnimateObjs    : [null,null,null],
			intervalID     : null
		}
	},
	// #ifdef APP-NVUE
	watch:{
		status:function(val){
			switch(val){
				case 1 :
					clearInterval(this.intervalID);
				break;
				case 2 :
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
						this.startAnimate();
					}, 1000);
				break;
				case 3 :
					clearInterval(this.intervalID);
				break;
				case 4 :
					clearInterval(this.intervalID);
				break;
				default : 
					clearInterval(this.intervalID);
			}
		}
	},
	// #endif
	methods : {
		reset : function () {
			this.status = 1;
		},
		loading : function () {
			this.status = 2;
		},
		success : function () {
			this.status = 3;
		},
		fail : function () {
			this.status = 4;
		},
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
		getRefs        : function(ref, count, fun){
			if(count >= 30){return null;}
			var refReturn = this.$refs[ref];
			if(refReturn){
				fun(refReturn);
				return;
			}else{
				count++;
				setTimeout(()=>{
					this.getRefs(ref, count, fun);
				}, 50);
			}
		}
	}
}
</script>
<style scoped>
.gui-sbutton-in{position:relative; overflow:hidden;}
.gui-sbutton-slot{opacity:0; position:absolute; left:0; top:0; z-index:1;}

/* #ifndef APP-NVUE */
.gui-sbutton-loading1{animation:gui-sbutton-loading1 1200ms ease-in infinite;}
@keyframes gui-sbutton-loading1{
	0%{transform: translateY(0px);}
	25%{transform: translateY(2px);}
	100%{transform: translateY(0px);}
}
.gui-sbutton-loading2{animation:gui-sbutton-loading2 1200ms ease-in infinite;}
@keyframes gui-sbutton-loading2{
	0%{transform: translateY(0px);}
	25%{transform: translateY(0px);}
	50%{transform: translateY(2px);}
	75%{transform: translateY(2px);}
	100%{transform: translateY(0px);}
}
.gui-sbutton-loading3{animation:gui-sbutton-loading3 1200ms ease-in infinite;}
@keyframes gui-sbutton-loading3{
	0%{transform: translateY(0px);}
	25%{transform: translateY(0px);}
	50%{transform: translateY(0px);}
	75%{transform: translateY(2px);}
	100%{transform: translateY(0px);}
}
@keyframes gui-btn-fade-in{0%{opacity:0.5;} 100%{opacity:1;}}
.gui-btn-fade-in{animation:gui-btn-fade-in 350ms ease-in forwards;}
/* #endif */
</style>
