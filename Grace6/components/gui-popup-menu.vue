<template>
	<view 
	class="gui-relative" 
	v-if="showIn">
		<view 
		class="gui-popup-mask"
		:class="[showIn?'gui-shade-in':'', outting ? 'gui-shade-out' : '']" 
		@tap.stop="close" 
		@touchmove.stop.prevent="stopfun"
		:style="{
			backgroundColor:background, zIndex:zIndex
		}" 
		v-if="showIn"></view>
		<view 
		class="gui-popup-menu" 
		v-if="showIn" 
		ref="guipopupmenu" 
		:class="[showIn?'gui-shade-in':'', outting ? 'gui-shade-out' : '']" 
		:style="{
			top:top+'px', right:right+'px', width:menuWidth, 
			zIndex:zIndex+1, height:showIn?'':'0rpx'
		}">
			<!-- #ifndef APP-NVUE -->
			<view 
			:class="['gui-flex', 'gui-rows', 'arrow-d-'+arrowDirection]" 
			v-if="isArrow">
				<view 
				class="arrow-up" 
				:style="{margin:arrowMargin}"></view>
			</view>
			<!-- #endif -->
			<view 
			:style="{width:menuWidth}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
import graceJS from '@/Grace6/js/grace.js';
export default {
	name  : "gui-popup-menu",
	props : {
		menuWidth    :  { type : String,  default : '258rpx' },
		background   :  { type : String,  default : 'rgba(0,0,0, 0.7)' },
		zIndex       :  { type : Number,  default : 99 },
		isArrow      :  { type : Boolean, default : true},
		arrowDirection : {type : String,  default : "right"},
		arrowMargin  :  { type : String, default : "0 15rpx"}
	},
	data() {
		return {
			showIn  : false,
			top     : 0,
			right   : 0,
			outting : false
		}
	},
	methods: {
		stopfun  : function(e){e.stopPropagation(); return null;},
		open     : function(){
			this.outting = false;
			this.showIn  = true;
			// #ifdef APP-NVUE
			graceJS.getRefs('guipopupmenu', this, 0, (guipopupref)=>{
				animation.transition(guipopupref, {
					styles: {opacity:1, transform:'scale(1)'},
					duration: 200, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				});
			});
			// #endif
		},
		close     : function(){
			this.outting    = true;
			setTimeout(()=>{
				this.showIn = false;
			},200);
			// #ifdef APP-NVUE
			graceJS.getRefs('guipopupmenu', this, 0, (guipopupref)=>{
				animation.transition(guipopupref, {
					styles: {opacity:0, transform:'scale(0.5)'},
					duration: 200, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				});
			});
			// #endif
		},
		setTop   : function (top) {
			this.top = top;
		},
		setRight : function (right) {
			this.right = right;
		}
	}
}
</script>
<style scoped>
.gui-popup-menu{width:258rpx; right:0; top:0; position:absolute; opacity:0; transform:scale(0.1);}
.gui-popup-mask{width:750rpx; position:fixed; left:0; top:0px; bottom:0; flex:1;}
/* #ifndef APP-NVUE */
.gui-popup-mask{height:100%;}
.arrow-up{width:0; height:0; border-left:18rpx solid transparent; border-right:18rpx solid transparent; border-bottom:18rpx solid #FFFFFF;}
.arrow-d-right{justify-content:flex-end;}
.arrow-d-center{justify-content:center;}
.arrow-d-left{justify-content:flex-start;}
.gui-shade-in{animation:gui-shade-in-a 150ms ease-in forwards;}
@keyframes gui-shade-in-a{0%{transform:scale(0.1); opacity:0;} 100%{transform: scale(1); opacity:1;}}
.gui-shade-out{animation:gui-shade-out-a 150ms ease-out forwards;}
@keyframes gui-shade-out-a{0%{transform:scale(1); opacity:1;} 100%{transform: scale(0.5); opacity:0;}}
/* #endif */
/* #ifdef APP-NVUE */
.gui-popup-menu{position:fixed;}
/* #endif */

/* #ifndef APP-NVUE */
@media (prefers-color-scheme: dark){
	.arrow-up{border-bottom-color:rgba(59, 59, 59, 1);}
}
/* #endif */
</style>