<template>
	<view 
	:style="{width:width+'rpx', overflow:'hidden'}">
		<gui-touch 
		@thStart="thStart" 
		@thMove="thMove" 
		@thEnd="thEnd">
			<view 
			class="gui-flex gui-rows gui-nowrap" 
			:style="{
				width:wrapWidth+'px',
				transform:'translateX('+scLeft+'px)'
			}">
				<view 
				class="gui-scrollitems gui-img-in" 
				hover-class="gui-tap" 
				:style="{
					width:itemWidth+'rpx', 
					height:itemHeight+'rpx', 
					marginRight:itemMargin+'rpx'
				}" 
				v-for="(item, idx) in itemsIn" 
				:key="idx" 
				@tap="tapme(idx)">
					<image 
					class="gui-scroll-image" 
					:style="{
					width:itemWidth+'rpx', 
					height:itemHeight+'rpx'}" 
					:src="item.img"></image>
					<text 
					class="gui-scrollitems-title gui-block gui-bg-black-opacity3 gui-border-box" 
					:style="{width:width+'rpx'}">{{item.title}}</text>
				</view>
			</view>
		</gui-touch>
	</view>
</template>
<script>
export default{
	name  : "gui-scrollitems",
	props : {
		width         : {type : Number, default:690},
		itemWidth     : {type : Number, default:345},
		itemHeight    : {type : Number, default:200},
		itemMargin    : {type : Number, default:10},
		items         : {type : Array,  default:function(){return [];}},
		duration      : {type : Number, default:25}
	},
	data() {
		return {
			scLeft        : 0,
			resetWidth    : 0,
			itemsIn       : [],
			timer         : null,
			timer2        : null,
			speed         : 1,
			timer3        : null,
			wrapWidth     : 5000,
			oX            : 0
		}
	},
	created:function(){
		var len          = this.items.length;
		this.itemsIn     = this.items;
		this.resetWidth  = len * (this.itemWidth + this.itemMargin);
		this.resetWidth  = uni.upx2px(this.resetWidth);
		this.resetWidth *= -1;
		this.itemsIn     = this.itemsIn.concat(this.items);
		this.wrapWidth   = len * (this.itemWidth + this.itemMargin) * 2 + 80;
		this.scrollAnimate();
	},
	methods:{
		scrollAnimate : function () {
			if(this.scLeft <= this.resetWidth){
				this.scLeft = 0;
				this.timer = setTimeout(()=>{this.scrollAnimate()}, this.duration+200);
			}else{
				this.scLeft -= this.speed
				this.timer   = setTimeout(()=>{this.scrollAnimate()}, this.duration);
			}
		},
		thStart : function(e){
			clearTimeout(this.timer);
			this.timer = null;
			this.oX    = this.scLeft;
		},
		thMove : function (e){
			clearTimeout(this.timer);
			var tmpleft   = this.oX + e[0][0];
			if(tmpleft < this.resetWidth){ tmpleft = this.resetWidth;}
			if(tmpleft > 0){tmpleft = 0}
			this.scLeft   = tmpleft;
		},
		thEnd : function(e){
			this.timer = null
			if(this.timer3 != null){clearTimeout(this.timer3);}
			this.timer3 = setTimeout(()=>{
				this.scrollAnimate();
			}, 500);
		},
		tapme : function(idx){
			this.$emit('itemTap', this.itemsIn[idx]);
		}
	},
	emits : ['itemTap']
}
</script>
<style scoped>
.gui-scrollitems{overflow:hidden; position:relative;}
.gui-scrollitems-title{position:absolute; z-index:1; left:0; bottom:0; height:44rpx; line-height:44rpx; padding:0 15rpx; overflow:hidden; font-size:22rpx; color:#FFFFFF;}
</style>
