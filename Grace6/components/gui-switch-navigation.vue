<template>
	<scroll-view 
	:scroll-with-animation="scorllAnimation" 
	:scroll-x="true" 
	:show-scrollbar="false" 
	:class="['gui-scroll-x', isCenter ? 'gui-nav-center' : '']" 
	:style="{width:width+'rpx'}" 
	:scroll-into-view="autoLeft" 
	:scroll-left="scrollLeft">
		<view 
		class="gui-scroll-x-items gui-columns" 
		:id="'tab-'+index+(random+'')" 
		:style="{
			width:size == 0 ? 'auto' : size+'rpx', 
			marginRight:margin+'rpx', 
			paddingLeft:padding, 
			paddingRight:padding
		}" 
		v-for="(item, index) in itemsIn" 
		:key="index" 
		@tap="change" 
		:data-index="index">
			<view class="gui-flex gui-nowrap gui-align-items-start" 
			:class="[textAlign == 'center' ? 'gui-justify-content-center' : '']">
				<text 
				class="gui-block gui-border-box" 
				:class="[titleClass, index == currentIndexIn ? titleActiveClass : []]" 
				:style="{
					textAlign : textAlign, 
					lineHeight:lineHeight, 
					fontSize:currentIndexIn == index ? activeFontSize : fontSize, 
					fontWeight:currentIndexIn == index ? activeFontWeight : ''
				}">{{item.name}}</text>
				<view v-if="item.tips">
					<text
					v-if="item.tips != 'point'" 
					class="gui-nav-tips gui-block" 
					:style="tipsStyle">{{item.tips}}</text>
					<text
					v-else 
					class="gui-nav-tips gui-block" 
					:style="tipsStyle+'; width:12rpx; height:12rpx; over-flow:hidden; padding:0rpx; margin-top:10rpx;'"></text>
				</view>
			</view>
			<view 
			class="gui-flex gui-rows" 
			:style="{justifyContent:activeDirection}">
				<view 
				class="nav-active-line" 
				:class="currentIndexIn == index ? activeLineClass : []" 
				:style="{
					width:activeLineWidth, 
					height:activeLineHeight, 
					borderRadius:activeLineRadius
				}" 
				v-if="currentIndexIn == index"></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	name  : "gui-switch-navigation",
	props : {
		width              : {type : Number,  default : 690},
		isCenter           : {type : Boolean, default : false},
		currentIndex       : {type : Number,  default : 0},
		size               : {type : Number,  default : 120},
		fontSize           : {type : String,  default : '28rpx'},
		activeFontSize     : {type : String,  default : '28rpx'},
		items              : {type : Array,   default : function () {return []}},
		activeLineClass    : {type : Array,   default : function () {
			return ['gui-nav-scale','gui-gtbg-blue', 'gui-gtbg-black'];
			}},
		titleClass         : {type : Array,   default : function () {
			return ['gui-primary-text'];
			}},
		titleActiveClass   : {type : Array,   default : function () {
			return ['gui-primary-text'];
			}},
		activeLineHeight   : {type : String,  default : '5rpx'},
		activeLineWidth    : {type : String,  default : "36rpx"},
		activeLineRadius   : {type : String,  default : "0rpx"},
		activeDirection    : {type : String,  default : ""},
		activeFontWeight   : {type : Number,  default : 700},
		margin             : {type : Number,  default : 0},
		textAlign          : {type : String,  default : ''},
		lineHeight         : {type : String,  default : '50rpx'},
		padding            : {type : String,  default : '0rpx'},
		animatie           : {type : Boolean, default : true},
		scorllAnimation    : {type : Boolean, default : true},
		// #ifdef APP-NVUE
		tipsStyle          : {
			type : String, 
			default : 'background-color:#FF0000; padding-left:10rpx; padding-right:10rpx; color:#FFFFFF; font-size:22rpx',
		}
		// #endif
		// #ifndef APP-NVUE
		tipsStyle          : {
			type : String,  
			default : 'background-color:#FF0000; padding:0 10rpx; color:#FFFFFF; font-size:22rpx'
		}
		// #endif
	},
	data(){
		return {
			currentIndexIn : 0,
			itemsIn        : [],
			random         : 1,
			scrollLeft     : 0,
			scrllTimer     : null,
			autoLeft       : ''
		}
	},
	created:function(){
		this.currentIndexIn = this.currentIndex;
		this.itemsIn        = this.items;
		this.random         = this.randomNum();
	},
	watch:{
		currentIndex : function(value){
			this.currentIndexIn = value;
		},
		currentIndexIn : function(val){
			if(this.scrllTimer != null){clearTimeout(this.scrllTimer);}
			this.scrllTimer = setTimeout(()=>{this.setLeft();}, 200);
		},
		items        : function(value){ this.itemsIn = value; }
	},
	methods:{
		change    : function (e){
			this.currentIndexIn = e.currentTarget.dataset.index;
			this.$emit('change', Number(e.currentTarget.dataset.index))
		},
		randomNum : function () {
			return parseInt(Math.random() * 1000);
		},
		setLeft   : function () {
			if(this.size < 1){
				this.autoLeft = 'tab-'+this.currentIndexIn+''+this.random;
				return ;
			}
			var itemWidth = Number(this.margin) + Number(this.size);
			var left      = (Number(this.currentIndexIn) + 1) * itemWidth - Number(this.width) / 2 - itemWidth / 2;
			var maxLeft   = Number(this.itemsIn.length) * itemWidth - this.width;
			maxLeft       = uni.upx2px(maxLeft - 30);
			left          = uni.upx2px(left);
			if(left > maxLeft){left = maxLeft;}
			if(left < 0){left = 0;}
			this.scrollLeft = left;
		}
	},
	emits : ['change']
}
</script>
<style scoped>
.nav-active-line{margin-top:6rpx;}
.gui-nav-center{justify-content:center; text-align:center;}
/* #ifndef APP-NVUE */
@keyframes gui-nav-scale{0%{transform: scale(0.1);} 100%{transform: scale(1);}}
.gui-nav-scale{animation:gui-nav-scale 350ms forwards;}
/* #endif */
.gui-nav-tips{text-align:center; line-height:30rpx; height:30rpx; border-radius:50rpx; margin-top:5rpx; margin-left:8rpx;}
</style>