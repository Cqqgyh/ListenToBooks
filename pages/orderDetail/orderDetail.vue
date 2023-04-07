<template>
	<gui-page>
		<template v-slot:gBody>
			<view class="gui-relative">
				<view class="gui-list gui-padding gui-bg-orange gui-p-b-80 gui-p-t-80">
					<text class="gui-h3 gui-color-white gui-block gui-p-l-30 gui-p-t-30 gui-p-b-50">已完成</text>
				</view>

				<view class="gui-absolute-lb gui-bg-white gui-creation-live">
					<scroll-view scroll-y style="height: 620rpx; width:670rpx;" class="gui-p-10">
					  <view class="gui-flex gui-align-items-center gui-m-r-50 gui-m-b-20" v-for="n in 5" :key="n">
					  	<image
					  		class="gui-album-img"
					  		mode="aspectFill"
					  		src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
					  	></image>
					  	<view class="gui-flex gui-column gui-flex1 gui-m-l-20">
					  		<text class="gui-block gui-ellipsis-line2 gui-h5">第7回周瑞妻派送宫花 ￥0.15</text>
					  		<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
					  			<text>喜相逢1</text>
					  			<text class="gui-block gui-color-gray">
					  				<text class="gui-text-small">X</text>
					  				1
					  			</text>
					  		</view>
					  	</view>
					  </view>
					</scroll-view>
					
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>商品总价</text>
						<text class="gui-block gui-color-gray">
							<text>￥1.50</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>实付款</text>
						<text class="gui-block gui-color-gray">
							<text class="gui-text-small gui-color-red gui-h5 gui-bold">￥1.50</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-40"></view>
					
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>订单编号</text>
						<text class="gui-block gui-color-gray">
							<text>202303084001673005637871495</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>创建时间</text>
						<text class="gui-block gui-color-gray">
							<text>2023/03/0811:42</text>
						</text>
					</view>
					<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>
					<view class="gui-flex gui-space-between gui-align-items-end gui-m-t-10">
						<text>付款方式</text>
						<text class="gui-block gui-color-gray">
							<text>在线支付</text>
						</text>
					</view>
				</view>
			</view>
		</template>
	</gui-page>
</template>
<script setup lang="ts">
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
