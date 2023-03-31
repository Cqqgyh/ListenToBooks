<template>
	<view 
	class="gui-slide2unlock gui-border-box" 
	:class="bgClass" 
	:style="{
		width:width+'rpx', 
		paddingRight:padding+'rpx', 
		paddingLeft:padding+'rpx', 
		height:(size+padding*2)+'rpx'
	}">
		<text 
		class="gui-slide2unlock-text gui-block gui-icons" 
		:class="[ moving ? 'gui-fade' : '' ]" 
		:style="{
			width:width+'rpx', 
			lineHeight:(size+padding*2)+'rpx', 
			color:disabled?activeColor:'#898989'
		}">{{disabled?msgUnlock:msg}} &#xe601;&#xe601;</text>
		<movable-area 
		class="movable-area" 
		:style="{
			width:(width - padding* 2) +'rpx', 
			height:size+'rpx', borderRadius:borderRadius,
			top : padding+'rpx'
		}">
			<movable-view 
			direction="horizontal" 
			@change="change" 
			:x="moveX" 
			:disabled="disabled" 
			:style="{
				width:size+'rpx', 
				height:size+'rpx'
			}">
				<text 
				class="gui-icons gui-block gui-slide2unlock-block" 
				:class="blockClass" 
				v-if="!disabled" 
				:style="{
					textAlign:'center', 
					borderRadius:borderRadius, 
					width:size+'rpx', 
					height:size+'rpx', 
					lineHeight:size+'rpx', 
					color:iconColor, 
					fontSize:iconSize}">&#xe641;</text>
				<text 
				class="gui-icons gui-block gui-slide2unlock-block" 
				v-if="disabled" 
				:style="{
					textAlign:'center',
					backgroundColor:disabled ? activeColor : blockColor, 
					borderRadius:borderRadius, 
					width:size+'rpx', 
					height:size+'rpx', 
					lineHeight:size+'rpx', 
					color:iconColor, 
					fontSize:iconSize
				}">&#xe86a;</text>
			</movable-view>
		</movable-area>
	</view>
</template>
<script>
export default{
	name  : "gui-slide-to-unlock",
	props : {
		width            : {type : Number, default:690 },
		padding          : {type : Number, default:6},
		size             : {type : Number, default:68},
		bgClass          : {type : Array,  default:function(){return ['gui-bg-white', 'gui-dark-bg-level-3'];}},
		blockClass       : {type : Array,  default:function(){return ['gui-bg-primary', 'gui-color-white'];}},
		activeColor      : {type : String, default:'#39B55A'},
		iconSize         : {type : String, default:'36rpx'},
		iconColor        : {type : String, default:'#FFFFFF'},
		borderRadius     : {type : String, default:'6rpx'},
		msg              : {type : String, default:'请向右滑动滑块解锁'},
		msgUnlock        : {type : String, default:'解锁成功'}
	},
	data() {
		return {
			maxWidth  : 300,
			moveX     : 0,
			disabled  : false,
			locktimer : null,
			moving    : false
		}
	},
	created:function(){
		this.maxWidth = uni.upx2px(this.width - this.padding * 2 - this.size - 2);
		this.moveX    = uni.upx2px(this.padding); 
	},
	methods:{
		change:function(e){
			if(this.disabled){return ;}
			this.moving    = true;
			if(this.locktimer != null){clearTimeout(this.locktimer);}
			this.locktimer = setTimeout(() => {
				if(e.detail.x >= this.maxWidth){
					this.moveX    = this.width;
					this.disabled = true;
					this.moving   = false;
					this.$emit('unlock');
				}else{
					this.moveX = uni.upx2px(this.padding) + Math.random();
					this.moving   = false;
				}
			}, 300);
		}
	},
	emits:['unlock']
}
</script>
<style scoped>
.gui-slide2unlock{position:relative;}
.movable-area{position:absolute; left:0; top:0; z-index:2;}
.gui-slide2unlock-block{opacity:0.88; text-align:center;}
.gui-slide2unlock-text{text-align:center; font-size:26rpx; position:absolute; left:0; top:0; z-index:1;}
/* #ifndef APP-NVUE */
@keyframes gui-fade{0%{opacity:1;} 50%{opacity:0;} 100%{opacity:1;}}
.gui-fade{animation:gui-fade 2s ease-in infinite;}
/* #endif */
</style>
