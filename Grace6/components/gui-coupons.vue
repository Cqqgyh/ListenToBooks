<template>
	<view class="gui-coupons gui-flex gui-row gui-nowrap">
		<view 
		class="gui-coupons-left gui-flex1 gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center gui-bg-white gui-dark-bg-level-3" 
		:style="{height:coupon.height}">
			<view class="gui-coupons-left-number">
				<view class="gui-flex gui-row gui-nowrap gui-justify-content-center gui-align-items-center">
					<text class="gui-color-gray gui-h4">{{coupon.unit}}</text>
					<text class="gui-h3 gui-bold" 
					:style="{color:coupon.color}">{{coupon.number}}</text>
				</view>
				<text class="gui-text-small gui-block gui-text-center" 
				:style="{color:coupon.color}">{{coupon.txt}}</text>
			</view>
			<view class="gui-coupons-left-body">
				<text class="gui-block gui-h5 gui-primary-color">{{coupon.title}}</text>
				<text class="gui-block gui-text-small gui-color-gray">{{coupon.desc}}</text>
			</view>
			<text 
			class="gui-coupons-status"
			v-if="coupon.drawed" 
			:style="{backgroundColor:coupon.color}">{{coupon.drawed}}</text>
		</view>
		<text 
		class="gui-coupons-right gui-color-white gui-text-center gui-block" 
		:style="{
			height:coupon.height, 
			lineHeight:coupon.height, 
			backgroundColor:coupon.color
		}">{{coupon.btn}}</text>
		<view class="gui-coupons-sawtooth" 
		:style="{
			height:coupon.height,
			backgroundColor:coupon.color
		}">
			<view 
			class="gui-coupons-sawtooth-circular gui-bg-gray gui-dark-bg-level-3" 
			v-for="(item, index) in 10" 
			:key="index"></view>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-coupons",
	props : {
		coupon : {
			type : Object,
			default :  function  () {
				return {}
			}
		}
	}
}
</script>
<style scoped>
.gui-coupons{border-top-left-radius:10rpx; border-bottom-left-radius:10rpx;}
.gui-coupons-left{width:500rpx; height:150rpx; padding-right:10rpx; border-radius:8rpx; position:relative;}
.gui-coupons-left-number{width:168rpx; border-right:1px dashed #D2D2D2;}
.gui-coupons-left-body{width:320rpx;}
.gui-coupons-status{color:#FFFFFF; padding:0 10px; height:36rpx; line-height:36rpx; font-size:20rpx; position:absolute; z-index:1; right:6px; top:8px; border-radius:36rpx;}
.gui-coupons-right{width:150rpx; height:150rpx; font-size:32rpx;}
.gui-coupons-sawtooth{width:8px; height:150rpx; overflow:hidden; position:relative;}
.gui-coupons-sawtooth-circular{width:10px; margin:3px 5px; height:10px; border-radius:10px;}
</style>