<template>
	<view class="gui-swiper-card-wrap">
		<swiper 
		:style="{
			width:width+'rpx', 
			height:heightIn+'rpx'
		}" 
		class="gui-swiper-card" 
		:indicator-dots="false" 
		:interval="interval" 
		:circular="true" 
		:autoplay="autoplay" 
		:current="currentIndex" 
		:previous-margin="spacing+'rpx'" 
		:next-margin="spacing+'rpx'" 
		@change="swiperchange">
			<swiper-item 
			v-for="(item, index) in swiperItems" 
			:key="index" 
			class="gui-swiper-card-item gui-border-box">
				<navigator 
				class="gui-swiper-card-nav gui-transition-all" 
				:url="item.url" 
				:open-type="item.opentype" 
				hover-class="none" 
				v-if="item.opentype != 'click'" 
				:style="{
					paddingLeft:current != index ? padding +'rpx':'0rpx',
					paddingRight:current != index ? padding +'rpx':'0rpx',
					paddingTop:current != index ? paddingY +'rpx':'0rpx',
					paddingBottom:current != index ? paddingY +'rpx':'0rpx'
				}">
					<image 
					:style="{
						borderRadius : borderRadius, 
						width:current != index ? widthInSamll+'rpx':widthIn+'rpx',
						height:current != index ? heightInSmall+'rpx':heightIn+'rpx',
						opacity:current != index ? opacity : 1
					}" 
					:src="item.img" 
					:mode="imgMode" 
					class="gui-swiper-card-image gui-transition-all" />
				</navigator>
				<view 
				class="gui-swiper-card-nav gui-transition-all" 
				hover-class="none" 
				v-if="item.opentype == 'click'" 
				@tap.stop="taped" 
				:data-index="index" 
				:style="{
					paddingLeft:current != index ? padding +'rpx':'0rpx',
					paddingRight:current != index ? padding +'rpx':'0rpx',
					paddingTop:current != index ? paddingY +'rpx':'0rpx',
					paddingBottom:current != index ? paddingY +'rpx':'0rpx'
				}">
					<image 
					:style="{
						borderRadius : borderRadius, 
						width:current != index ? widthInSamll+'rpx':widthIn+'rpx',
						height:current != index ? heightInSmall+'rpx':heightIn+'rpx',
						opacity:current != index ? opacity : 1
					}" 
					:src="item.img" 
					:mode="imgMode" 
					class="gui-swiper-card-image gui-transition-all" />
				</view>
				<view 
				v-if="indicatorType == 'number'" 
				class="gui-indicator-dot-numbers gui-flex gui-row gui-nowrap" 
				:class="indicatorBarBgClass" 
				:style="{
					height:indicatorBarHeight+'rpx', 
					'border-bottom-left-radius':borderRadius, 
					'border-bottom-right-radius':borderRadius,
					width:current != index ? widthInSamll+'rpx':widthIn+'rpx', 
					left:current != index ? padding+'rpx':'0rpx', 
					bottom:current != index ? paddingY+'rpx':'0rpx'
				}">
					<text 
					class="gui-indicator-dot-text" 
					:style="{
						paddingLeft:'20rpx', 
						'fontStyle':'italic', 
						color:titleColor
					}">{{index+1}}</text>
					<text 
					class="gui-indicator-dot-text" 
					:style="{
						'fontSize':'36rpx', 
						color:titleColor
					}">/</text>
					<text 
					class="gui-indicator-dot-text" 
					:style="{
						fontSize:'28rpx', 
						paddingRight:'20rpx', 
						fontStyle:'italic', 
						color:titleColor
					}">{{swiperItems.length}}</text>
					<text 
					class="gui-swiper-text gui-block-text gui-flex1 gui-ellipsis" 
					:style="{
						color:titleColor, 
						fontSize:titleSize, 
						height:indicatorBarHeight+'rpx', 
						lineHeight:indicatorBarHeight+'rpx'
					}">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<!--  进度圆点  -->
		<view 
		class="gui-indicator-dots gui-flex gui-row gui-nowrap gui-justify-content-center gui-align-items-center gui-border-box" 
		v-if="indicatorType == 'dot'" 
		:style="{
			width:width+'rpx', 
			height:indicatorBarHeight+'rpx', 
			position:indicatorPosition, 
			paddingLeft:spacing+'rpx', 
			paddingRight:spacing+'rpx', 
			'justify-content':indicatorDirection
		}">
			<view 
			class="gui-indicator-dots-wrap gui-flex gui-row gui-nowrap gui-justify-content-center">
				<view 
				v-for="(item, index) in swiperItems" 
				:key="index" 
				:class="[
					'gui-indicator-dot', 
					current == index ? 'dot-show' : '', 
					current == index ? indicatorActiveClass : indicatorClass
				]" 
				:style="{
					width           : current != index ? indicatorWidth+'rpx' : indicatorActiveWidth +'rpx',
					height          : indicatorHeight+'rpx',
					borderRadius    : indicatorRadius+'rpx',
				}"></view>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-swiper",
	props : {
		width :{ type : Number, default : 750 },
		height:{ type : Number, default : 300 },
		swiperItems : { 
			type : Array, 
			default : function(){
				return new Array();
			}
		},
		borderRadius : { type : String, default : '10rpx'},
		indicatorBarHeight:{type : Number, default : 68},
		indicatorBarBgClass:{
			type : Array, 
			default : function(){
				return ['gui-bg-black-opacity5'];
			}
		},
		indicatorWidth : { type:Number, default:18 },
		indicatorActiveWidth :{ type:Number, default:18 },
		indicatorHeight : { type:Number, default:18 },
		indicatorRadius:{ type:Number, default:18 },
		indicatorClass : {
			type : Array, 
			default : function(){
				return ['gui-bg-gray','gui-dark-bg-level-5'];
			}
		},
		indicatorActiveClass : {
			type : Array, 
			default : function(){
				return ['gui-bg-primary'];
			}
		},
		indicatorType:{ type : String, default : "dot" },
		indicatorPosition:{ type : String, default : "absolute" },
		indicatorDirection:{type:String, default:'center'},
		// #ifndef APP-NVUE
		spacing : { type : Number, default : 50 },
		// #endif
		// #ifdef APP-NVUE
		spacing : { type : Number, default : 0 },
		// #endif
		// #ifdef APP-NVUE
		padding : { type : Number, default : 0 },
		// #endif
		// #ifndef APP-NVUE
		padding : { type : Number, default : 26 },
		// #endif
		interval : { type : Number, default : 5000 },
		autoplay : { type : Boolean, default : true },
		currentIndex : { type : Number, default : 0 },
		opacity:{ type : Number, default:0.66},
		titleColor:{type:String, default:"#FFFFFF"},
		titleSize:{type:String, default:"28rpx"},
		imgMode:{type:String, default:'aspectFill'}
	},
	data() {
		return {
			current : 0,
			isReady : false,
			widthIn : 750,
			heightIn  : 300,
			widthInSamll:700,
			heightInSmall:280,
			paddingY:0
		}
	},
	watch:{
		currentIndex : function (val) {
			this.current = val;
		}
	},
	created:function(){
		this.current = this.currentIndex;
		this.init();
	},
	methods:{
		init : function(){
			// 图片宽高计算
			this.widthIn   = this.width - this.spacing*2;
			this.heightIn  = this.height / this.width * this.widthIn;
			this.paddingY  = this.padding * this.height / this.width;
			this.widthInSamll  = this.widthIn -  this.padding * 2;
			this.heightInSmall = this.heightIn - this.paddingY * 2;
		},
		swiperchange : function (e) {
			var current = e.detail.current;
			this.current = current;
			this.$emit('swiperchange', current);
		},
		taped : function(e){
			this.$emit('taped', e.currentTarget.dataset.index);
		}
	},
	emits : ['swiperchange', 'taped']
}
</script>
<style scoped>
.gui-swiper-card-wrap{position:relative;}
.gui-swiper-card{overflow:hidden;}
.gui-swiper-card-item{font-size:0; overflow:hidden; line-height:0;}
.gui-swiper-card-nav{font-size:0; position:relative;}
.gui-indicator-dots{width:750rpx; overflow:hidden; z-index:1; left:0; bottom:0;}
.gui-indicator-dot{margin:6rpx;}
.gui-indicator-dots-wrap{padding:0 20rpx;}
.gui-indicator-dot-text{text-align:center; line-height:68rpx; padding:0 4rpx; color:#FFFFFF; font-size:32rpx;}
.gui-indicator-dot-numbers{overflow:hidden; align-items:center; position:absolute; z-index:1; left:0; bottom:0;}
.gui-swiper-text{width:200rpx; line-height:68rpx; padding-right:25rpx; overflow:hidden;}
/* #ifndef APP-NVUE */
@keyframes dot-show{from{opacity:0.1;}to{opacity:1;}}
.dot-show{animation:dot-show 300ms linear forwards;}
/* #endif */
</style>
