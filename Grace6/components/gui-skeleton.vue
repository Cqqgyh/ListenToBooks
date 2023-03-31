<template>
	<view>
		<view 
		class="gui-skeleton-animate" 
		:class="customClass" 
		:style="customStyle" 
		v-if="!show"></view>
		<view v-if="show">
			<slot></slot>
		</view>
	</view>
</template>
<script>
export default{
	name : "gui-skeleton",
	data() {
		return {
			show:false
		}
	},
	props:{
		customClass : {type : Array, default  : function(){
			return ['gui-bg-white', 'gui-dark-bg-level-3'];
		}},
		customStyle : {type : String, default  : ''},
		delayTime   : {type : Number, default  : 500},
		canShow     : {type : Boolean, default : true}
	},
	created:function(){
		setTimeout(()=>{
			if(this.canShow){this.show = true;}
		}, this.delayTime);
	}
}
</script>
<style scoped>
/* #ifndef APP-NVUE */
@keyframes gui-skeleton-animate{0%{opacity:1;} 25%{opacity:0.5;} 50%{opacity:0.6;} 75%{opacity:1;} 100%{opacity:1;}}
.gui-skeleton-animate{animation:gui-skeleton-animate 1.6s ease-in infinite;}
/* #endif */
</style>
