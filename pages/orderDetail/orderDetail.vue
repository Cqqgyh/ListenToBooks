<template>
	<gui-page>
		<template v-slot:gBody>
			<view class="gui-relative">
				<view class="gui-list gui-padding gui-bg-orange gui-p-b-80 gui-p-t-80">
					<text class="gui-h3 gui-color-white gui-block gui-p-l-30 gui-p-t-30 gui-p-b-50">{{ orderInfo?.orderStatusName }}</text>
				</view>

				<view class="gui-absolute-lb gui-bg-white gui-creation-live">

					<scroll-view scroll-y style="height: 620rpx; width:670rpx;" class="gui-p-10">
					  <view class="gui-flex gui-align-items-center gui-m-r-50 gui-m-b-20" v-for="item in orderInfo?.orderDetailList" :key="item.id">
					  	<image
					  		class="gui-album-img"
					  		mode="aspectFill"
					  		:src="item?.itemUrl"
					  	></image>
					  	<view class="gui-flex gui-column gui-flex1 gui-m-l-20">
					  		<text class="gui-block gui-ellipsis-line2 gui-h5">{{ ite?.itemName }} ￥{{ item?.itemPrice }}</text>
					  	</view>
					  </view>
					</scroll-view>
					
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>商品总价</text>
						<text class="gui-block gui-color-gray">
							<text>￥{{ orderInfo?.originalAmount }}</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>实付款</text>
						<text class="gui-block gui-color-gray">
							<text class="gui-text-small gui-color-red gui-h5 gui-bold">￥{{ orderInfo?.orderAmount }}</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-40"></view>
					
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>订单编号</text>
						<text class="gui-block gui-color-gray">
							<text>{{ orderInfo?.orderNo }}</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>付款方式</text>
						<text class="gui-block gui-color-gray">
							<text>{{ orderInfo?.payWayName }}</text>
						</text>
					</view>
				</view>
			</view>
		</template>
	</gui-page>
</template>
<script setup lang="ts">

import { order } from "../../api"
import { onLoad } from '@dcloudio/uni-app';
import { ref } from "vue";

const orderInfo = ref()
onLoad(async (options: {orderNo: string}) => {
	const { orderNo } = options 
	const res  = await order.queryOrderInfo(orderNo)
	orderInfo.value = res.data
})

</script>
<style scoped>
.gui-creation-live {
	height: 80rpx;
	bottom: -20rpx;
	left: 25rpx;
	border-radius: 20rpx;
	width: 700rpx;
}

.gui-album-img {
	width: 150rpx;
	height: 150rpx;
	border-radius: 30rpx;
}
</style>
