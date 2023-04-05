<template>
	<gui-page :customHeader="true">
		<!-- 自定义头部导航 -->
		<template v-slot:gHeader>
			<view style="height: 44px" class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<gui-header-leading @goHome="goHome"></gui-header-leading>
				<text class="gui-h5 gui-bold gui-flex1 gui-text-center gui-ellipsis gui-primary-text">我的作品</text>
				<view class="gui-flex"><text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity3 gui-m-r-10">&#xe6c7;</text></view>
				<view style="width: 180rpx"></view>
			</view>
		</template>
		<!-- 页面主体 -->
		<template v-slot:gBody>
			<gui-switch-navigation
				:items="[{ id: 0, name: '专辑', tips: '8' }, { id: 1, name: '声音' }]"
				:size="0"
				:margin="20"
				padding="30rpx"
				activeLineHeight="4rpx"
			></gui-switch-navigation>
			<view class="gui-flex gui-p-l-30">
				<gui-select-menu
					:items="['全部分类', '精选优品', '价格较低', '只买贵的', '其他方式']"
					@select="select4"
					:isInput="true"
					inputType="search"
					ref="selectMenu3"
				></gui-select-menu>
			</view>

			<scroll-view :scroll-y="true" :style="{ height: mainHeight + 'px' }">
				<view class="gui-card-view gui-bg-white gui-dark-bg-level-3 gui-margin-top gui-box-shadow" v-for="index in 20" :key="index">
					<view class="gui-card-body gui-border-b gui-flex gui-rows gui-nowrap">
						<image
							mode="aspectFill"
							src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
							class="gui-card-img"
						></image>
						<view class="gui-card-desc">
							<view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
								<text class="gui-card-name gui-primary-text gui-ellipsis">百年孤独 | 马克思传世名著(王明军演播)</text>
								<text class="gui-card-update gui-text-small gui-primary-color">23天前更新</text>
							</view>
							<text class="gui-card-text gui-block gui-secondary-text gui-ellipsis" style="margin-top: 10rpx">
								马尔克斯首部中文有声书，王明军演播马尔克斯首部中文有声书，王明军演播马尔克斯首部中文有声书，王明军演播
							</text>

							<view class="gui-flex gui-space-around gui-m-t-20 gui-color-gray gui-text-small">
								<text class="gui-icons gui-block gui-m-r-10">
									&#xe800;
									<text class="gui-m-l-10">21</text>
								</text>
								<text class="gui-icons gui-block gui-m-r-10">
									&#xe67b;
									<text class="gui-m-l-10">14</text>
								</text>
								<text class="gui-icons gui-block gui-m-r-10">
									&#xe645;
									<text class="gui-m-l-10">1</text>
								</text>
							</view>
						</view>
					</view>
					<view class="gui-card-footer gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
						<text class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe615;分享</text>
						<text class="iconfont gui-color-gray gui-card-footer-item gui-border-r">&#xe8b9;数据</text>
						<text class="gui-icons gui-color-gray gui-card-footer-item">&#xe69e; 编辑</text>
						<text class="iconfont gui-color-gray gui-card-footer-item">&#xe73a; 更多</text>
					</view>
				</view>
			</scroll-view>
		</template>
	</gui-page>
</template>
<script>
import graceJS from '@/Grace6/js/grace.js';
export default {
	data() {
		return {
			mainHeight: 300
		};
	},
	onLoad: function() {
		var systemInfo = graceJS.system();
		this.mainHeight = systemInfo.windowHeight - uni.upx2px(500);
	},
	methods: {
		goHome: function() {
			uni.redirectTo({
				url: '/pages/index/index'
			});
		}
	}
};
</script>
<style scoped lang="scss">
/* 卡片视图 */
.gui-card-view {
	padding: 25rpx;
	margin: 0 30rpx;
	margin-top: 30rpx;
}
.gui-card-body {
	padding-bottom: 30rpx;
}
.gui-card-img {
	width: 100rpx;
	height: 100rpx;
	border-radius: 80rpx;
}
.gui-card-desc {
	width: 400rpx;
	margin-left: 25rpx;
	flex: 1;
}
.gui-card-name {
	font-size: 28rpx;
	line-height: 40rpx;
}

.gui-card-update {
	width: 180rpx;
}
.gui-card-text {
	line-height: 40rpx;
	font-size: 24rpx;
}
.gui-card-footer {
	margin-top: 25rpx;
}
.gui-card-footer-item {
	text-align: center;
	flex: 1;
	line-height: 38rpx;
	font-size: 26rpx;
}
/* #ifndef APP-NVUE */
.gui-card-footer-item {
	display: block;
}
.gui-box-shadow {
	box-shadow: 0px 0px 3rpx #999999;
}
/* #endif */
</style>
