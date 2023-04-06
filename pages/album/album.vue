<template>
	<gui-page :customHeader="true" :customFooter="true">
		<template v-slot:gHeader>
			<view style="height:44px;" class="gui-flex gui-nowrap gui-rows gui-align-items-center"><gui-header-leading @goHome="goHome" :back="false"></gui-header-leading></view>
		</template>
		<template v-slot:gBody>
			<view class="gui-bg-black-opacity5  gui-color-white">
				<view class="gui-m-30 gui-flex gui-row">
					<view class="gui-relative gui-m-20">
						<text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white">VIP</text>
						<image
							class="gui-album-img"
							mode="aspectFill"
							src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
						></image>
						<view class="gui-badge-point"></view>
					</view>
					<view class="gui-flex1 gui-m-l-30 gui-m-r-30 gui-m-t-10 gui-m-b-10 gui-column">
						<text class="gui-text" style="width:210rpx">武炼巅峰 | 热血玄乎爽文 | 多人协作 | 尽快订阅，优惠多多</text>
						<view class="gui-flex gui-row gui-align-items-center gui-m-t-20">
							<image
								class="gui-album-avatar"
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
							></image>
							<text class="gui-text-small gui-m-l-10">书道</text>
						</view>

						<view class="gui-border-b gui-m-t-20 gui-m-b-20"></view>

						<view class="gui-flex gui-row  gui-text-small">
							<text>已订阅11.15万人</text>

							<view class="gui-flex gui-row gui-m-l-20">
								<text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe67b;</text>
								<text>1215.14万</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<gui-spread width="750rpx" height="600rpx" :isShrink="true"><gui-article-info :article="article"></gui-article-info></gui-spread>

			<text class="gui-block gui-h3 gui-m-l-30 gui-m-r-30 gui-m-t-30 gui-m-b-10">节目(62)</text>
			<view class="gui-m-l-30 gui-m-r-30 gui-m-t-30 gui-m-b-10">
				<view v-for="n in 30" :key="n">
					<view class="gui-flex gui-row gui-m-b-10 gui-m-t-10 gui-p-10">
						<text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe67b;</text>
						<text class="gui-m-l-20">《人生海海》第28集 她们绣字教训他</text>
					</view>
					<view class="gui-border-b-gray"></view>
				</view>
			</view>

			<view class="gui-m-l-30 gui-m-r-30 gui-m-t-30 gui-m-b-10">
				<view class="gui-m-t-20 gui-border-box gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx">
					<view class="gui-flex gui-column gui-flex1 gui-color-white"><text>主播介绍</text></view>
					<view class="gui-flex gui-m-t-20">
						<view class="gui-flex1">
							<view class="gui-flex">
								<image
									mode="aspectFill"
									src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
									class="gui-album-avatar"
								></image>
								<view class="gui-flex gui-column gui-m-l-20">
									<text class="gui-color-white">有声的紫襟</text>
									<text class="gui-text-brown gui-text-small gui-m-t-20">已被2331.4万人关注</text>
								</view>
							</view>
						</view>
						<view class="gui-bg-black-opacity1 gui-text-center" style="width: 150rpx; height: 60rpx; line-height: 60rpx; border-radius: 20rpx">
							<text class="gui-icons gui-color-white gui-text-small">&#xe6c7; 关注</text>
						</view>
					</view>
					<view class="gui-m-t-20 gui-text-brown gui-text-small"><text>喜马人肉故事机!来呀，等你关注。微博求关注呀: 有声的紫襟。更多的内容点击查看</text></view>
				</view>
			</view>

			<view class="gui-flex gui-row gui-space-between gui-align-items-center gui-shoppingcard-footer">
				<text class="gui-bg-white gui-flex1 gui-p-20 gui-text-center">
					购买已更全集
					<text class="gui-color-red gui-h4">￥49.5</text>
				</text>
				<text class="gui-flex1 gui-p-20 gui-text-center gui-bg-black-opacity3 gui-color-white">6元开会员 免费听</text>
			</view>
			<gui-iphone-bottom></gui-iphone-bottom>
			<view style="height:120rpx;"></view>
		</template>
	</gui-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const article = ref([]);

uni.request({
	url: 'https://www.graceui.com/api/html2array',
	success: res => {
		article.value = res.data.data;
	}
});
</script>

<style lang="scss">
.gui-album-img {
	width: 200rpx;
	height: 200rpx;
	border-radius: 20rpx;
}

.gui-album-avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
}

.gui-border-b-gray {
	border-bottom: 1rpx solid #e5e5e5;
}

.gui-shoppingcard-footer {
	position: fixed;
	z-index: 99;
	left: 0;
	bottom: 0;
	width: 750rpx;
	background-color: gray;
}
/* 如果购物车放在 switch 页面并且是 h5 端请打开注释启用下面的样式 */
/* #ifdef H5 */
/* .gui-shoppingcard-footer{bottom:50px;} */
/* #endif */
</style>
