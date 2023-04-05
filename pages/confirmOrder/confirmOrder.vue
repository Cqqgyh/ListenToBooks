<template>
	<gui-page>
		<template v-slot:gBody>
			<view class="gui-flex gui-column gui-m-40 gui-bg-white gui-p-20 gui-border-radius">
				<view class="gui-flex gui-row gui-space-between">
					<text class="gui-color-gray">购买账号</text>
					<text class="gui-color-gray">账号余额</text>
				</view>
				<view class="gui-flex gui-row gui-space-between gui-m-t-20">
					<text class="gui-h4">听友453623673</text>
					<view>
						<text class="gui-h4 gui-bold">4.30</text>
						<text class="gui-text-small">喜点</text>
					</view>
				</view>
			</view>

			<view class="gui-m-40 gui-bg-white gui-p-20 gui-border-radius">
				<view class="gui-flex gui-align-items-center">
					<image
						class="gui-album-img"
						mode="aspectFill"
						src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
					></image>

					<view class="gui-flex gui-column gui-flex1 gui-m-l-20">
						<text class="gui-block gui-ellipsis-line2 gui-h5">人生|路遥著人生之路电视剧原著杨 晨张震演播 更多详情的内容请点点击查看</text>
						<text class="gui-text-small gui-m-t-20 gui-m-b-20 gui-block gui-color-red">7天无忧退</text>
						<view class="gui-flex gui-space-between gui-align-items-end">
							<text class="gui-h3 gui-bold">￥39.00</text>
							<text class="gui-block gui-color-gray">
								<text class="gui-text-small">X</text>
								1
							</text>
						</view>
					</view>
				</view>

				<view class="split-line gui-m-t-20 gui-m-b-20"></view>

				<view class="gui-flex gui-justify-content-end gui-m-t-40 gui-m-b-40">
					<text class="gui-bold">
						小计:
						<text class="gui-color-red">￥39.00</text>
					</text>
				</view>
			</view>

			<view class="gui-shoppingcard-footer gui-bg-gray gui-dark-bg-level-1 gui-border-box gui-border-t">
				<view class="gui-flex gui-row gui-space-between gui-align-items-center">
					<view class="gui-flex gui-column">
						<text class="gui-text gui-primary-text gui-flex gui-row gui-nowrap">
							合计:
							<text class="gui-color-red gui-h4">￥39.00</text>
						</text>
						<text class="gui-text-small gui-color-gray">已优惠￥0.00</text>
					</view>
					<text class="gui-shoppingcard-checkout gui-bg-red gui-block gui-color-white" @tap="checkout">立即结算</text>
				</view>
				<view><gui-iphone-bottom></gui-iphone-bottom></view>
			</view>
		</template>
	</gui-page>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.gui-album-img {
	width: 150rpx;
	height: 150rpx;
	border-radius: 30rpx;
}

.split-line {
	height: 1rpx;
	width: 100%;
	background-color: #e5e5e5;
}

.gui-shoppingcard-footer {
	position: fixed;
	z-index: 99;
	left: 0;
	bottom: 0;
	width: 750rpx;
	padding-left: 30rpx;
}


.gui-shoppingcard-checkout {
	width: 260rpx;
	height: 100rpx;
	line-height: 100rpx;
	font-size: 28rpx;
	text-align: center;
}

/* 如果购物车放在 switch 页面并且是 h5 端请打开注释启用下面的样式 */
/* #ifdef H5 */
/* .gui-shoppingcard-footer{bottom:50px;} */
/* #endif */
</style>
