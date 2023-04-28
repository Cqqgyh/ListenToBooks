<template>
	<view class="gui-bg-grey">
		<z-paging
		ref="zPagingRef"
		:paging-style="{background: '#F8F8F8'}"
		v-model="orders"
		@query="getOrderList"
		show-refresher-update-time
		auto-show-back-to-top
	>
		<!-- 数据展示区域 -->
		<view 
			class="gui-order gui-bg-white gui-dark-bg-level-3" 
			v-for="(order, oIndex) in orders" 
			:key="oIndex"
			@click="goToDetail(order.orderNo)"
			>
			<view class="gui-flex gui-row gui-space-between gui-align-items-center gui-m-b-20">
				<text class="gui-order-number gui-primary-text">订单号 : {{ order.orderNo }}</text>
			</view>
			<!-- 循环展示订单 -->
			<view v-for="(shop, indexShop) in order.orderDetailList" :key="indexShop">
				<!-- 循环订单商品 -->
				<view class="gui-order-goods gui-flex">
					<view class="gui-order-goods-img"><gui-image :src="shop.itemUrl" :width="100" :height="100"></gui-image></view>
					<text class="gui-order-goods-name gui-secondary-text">{{ shop.itemName }}</text>
					<text class="gui-order-goods-price">￥{{ shop.itemPrice }} </text>
				</view>
			</view>
			<!-- 订单底部 -->
			<view class="gui-order-footer gui-flex gui-row gui-space-between gui-align-items-center">
				<text class="gui-order-number">{{ order.orderStatusName }} {{ order.orderDate }}</text>
				<text class="gui-text-small gui-color-gray">共1件商品，合计:￥{{order.orderAmount}}</text>
			</view>
		</view>
	</z-paging>
	</view>
</template>
<script setup lang="ts">
import { order } from "../../api"
import { ref } from 'vue';
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
let orders = ref()
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const getOrderList = async (page:number, limit:number) => {
	const res:any  = await order.queryOrdeList({page, limit})
	zPagingRef.value.complete(res.data.records)
}

const goToDetail = (orderNo: string) => {
	uni.navigateTo({
		url: `/pages/orderDetail/orderDetail?orderNo=${orderNo}`
	})
}
</script>
<style scoped>
.header {
	padding: 15rpx 30rpx;
	height: 100rpx;
}
.gui-order {
	padding: 25rpx;
	margin: 25rpx;
	margin-bottom: 0rpx;
	border-radius: 10rpx;
}
.gui-order-number {
	line-height: 50rpx;
	font-size: 26rpx;
	width: 300rpx;
	flex: 1;
}
.gui-shop {
	line-height: 88rpx;
	font-size: 28rpx;
	font-weight: bold;
}
.gui-order-goods {
	flex-direction: row;
	flex-wrap: nowrap;
	padding-bottom: 20rpx;
	align-items: flex-start;
}
.gui-order-goods-img {
	width: 100rpx;
	height: 100rpx;
}
.gui-order-goods-name {
	line-height: 40rpx;
	width: 200rpx;
	flex: 1;
	overflow: hidden;
	font-size: 26rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.gui-order-goods-price {
	font-size: 24rpx;
	line-height: 50rpx;
	width: 150rpx;
	text-align: right;
}
.gui-order-footer {
	margin-top: 2px;
}

.gui-order-status {
	line-height: 50rpx;
	font-size: 26rpx;
	width: 100rpx;
	text-align: center;
}
.gui-order-btn {
	width: 150rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 22rpx;
	text-align: center;
	border-radius: 60rpx;
	margin-left: 20rpx;
}
.gui-order-btn-red {
	border-color: #ff0036;
	color: #ff0036;
}

.gui-empty-icon {
	font-size: 130rpx;
	line-height: 130rpx;
	margin-top: 200rpx;
}
</style>
