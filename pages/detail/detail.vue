<template>
	<gui-page :customHeader="true" :isHeaderSized="false" :headerClass="['gui-bg-brown-linear-gradient']">
		<!-- 自定义头部导航 -->
		<template v-slot:gHeader>
			<view style="height: 44px" class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<gui-header-leading :home="false" :backButtonClass="['gui-color-white']"></gui-header-leading>
				<view class="gui-flex1">
					<view
						class="gui-bg-black-opacity2 gui-flex gui-justify-content-center gui-align-items-center"
						style="border-radius: 20rpx; width: 180rpx; height: 60rpx; line-height: 60rpx"
					>
						<text class="gui-icons gui-block gui-color-white iconfont gui-m-r-10">&#xe610;</text>
						<text class="gui-color-white gui-text gui-button-text">投月票</text>
						<text class="gui-icons gui-block gui-color-white gui-m-l-10">&#xe601;</text>
					</view>
				</view>

				<view class="gui-flex">
					<text class="iconfont gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity2 gui-m-r-10 gui-color-white">&#xe685;</text>
					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity2 gui-m-r-10 gui-color-white">&#xe615;</text>
				</view>
				<view style="width: 180rpx"></view>
			</view>
		</template>
		<!-- 页面主体 -->
		<template v-slot:gBody>
			<scroll-view
				class="gui-bg-white gui-dark-bg-level-3 gui-border-box mianImgBg gui-bg-brown-linear-gradient gui-m-t-100 gui-p-30"
				:style="{
					height: 600 + 'px'
				}"
				:scroll-y="true"
				:show-scrollbar="false"
			>
				<view class="gui-margin-top gui-flex gui-row gui-space-between">
					<view class="gui-dark-bg-level-3 gui-color-gray">
						<image
							class="gui-album-img"
							mode="aspectFill"
							src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
						></image>
					</view>
					<view class="gui-flex gui-column gui-flex1 gui-m-l-20" style="width: 388rpx">
						<text class="gui-color-white" style="font-size: 38rpx">寻龙天师</text>
						<view class="gui-m-t-10 gui-flex gui-row gui-wrap">
							<gui-tags
								text="小标签"
								:size="22"
								:customClass="['gui-bg-black-opacity2', 'gui-color-white', 'gui-m-r-5', 'gui-m-b-5']"
								v-for="n in 10"
								:key="n"
							></gui-tags>
						</view>
					</view>
				</view>

				<view class="gui-flex gui-row gui-space-between gui-color-white gui-text-center gui-m-t-30">
					<view class="gui-flex gui-column">
						<text class="gui-text-brown-light">
							<text class="iconfont">&#xe651;</text>
							NO.6
							<text class="iconfont">&#xe650;</text>
						</text>
						<text class="gui-text-small gui-text-brown">小说</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							9.5
							<text class="gui-text-small gui-text-brown">分</text>
						</text>
						<text class="gui-text-small gui-text-brown">1.6万条评价</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							3.5
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">月票</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							8.3
							<text class="gui-text-small gui-text-brown">亿</text>
						</text>
						<text class="gui-text-small gui-text-brown">播放量</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							83.5
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">订阅量</text>
					</view>
				</view>

				<view class="gui-m-t-30"><text class="gui-text-brown">点击超60亿有声作品《摸金天师》作者，盗墓新作!</text></view>

				<view class="gui-m-t-20 gui-border-box gui-flex gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx" @click="toggleScroll">
					<view class="gui-flex gui-column gui-flex1 gui-color-white">
						<text>剧集与更新</text>
						<text class="gui-m-t-20 gui-text-brown gui-text-small">专辑限时免费中·连载至第2257集</text>
					</view>
					<view><text class="gui-icons gui-block gui-color-white">&#xe601;</text></view>
				</view>

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

				<view class="gui-m-t-30">
					<view class="gui-text-center"><text class="gui-color-white gui-h3">简介</text></view>
					<view class="gui-bg-white gui-dark-bg-level-3 gui-m-t-20">
						<gui-spread class="guiSpread" height="600rpx" :isShrink="true"><gui-article-info :article="article"></gui-article-info></gui-spread>
					</view>
				</view>

				<view class="gui-m-t-30">
					<text class="gui-h3 gui-color-white gui-m-b-20 gui-block">创作团队</text>
					<scroll-view :scroll-x="true" class="create-team-scroll">
						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">有声的</text>
							<text class="gui-text-small gui-text-brown">主播</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">风尘散人本尊</text>
							<text class="gui-text-small gui-text-brown">作者</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">冬菱扇</text>
							<text class="gui-text-small gui-text-brown">所有女角色呀</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">赵露思</text>
							<text class="gui-text-small gui-text-brown">所有女角色呀</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">吴磊</text>
							<text class="gui-text-small gui-text-brown">所有男角色呀</text>
						</view>
					</scroll-view>
				</view>

				<view class="gui-m-t-20 gui-border-box gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx">
					<view class="gui-flex gui-row gui-space-between">
						<view class="gui-text-brown">本月月票贡献榜</view>
						<text class="gui-icons gui-block gui-color-white">&#xe601;</text>
					</view>
					<view class="gui-flex gui-row gui-space-between">
						<view class="gui-flex gui-column gui-align-items-center gui-m-r-100 gui-m-t-30">
							<text class="gui-h2 gui-color-white">915</text>
							<text class="gui-text-brown gui-text-small">本月月票总数</text>
						</view>
						<view class="gui-flex1 gui-flex">
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10 gui-bg-black-opacity6">
								<text class="gui-text-small gui-text-brown">TOP 1</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: goldenrod !important">&#xe6b1;</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10">
								<text class="gui-text-small gui-text-brown">TOP 2</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: silver !important">&#xe6b1;</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10">
								<text class="gui-text-small gui-text-brown">TOP 3</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: coral !important">&#xe6b1;</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 滚动区域 -->

			<view class="mainScrollView" :style="getMainScrollViewStyle" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
				<view class="gui-text-center" @touchstart="dragStart" @touchmove="dragMove" @touchend="dragEnd"><text class="iconfont gui-color-white gui-h3">&#xeb2e;</text></view>
				<scroll-view
					class="popupSVContainer gui-bg-white gui-dark-bg-level-3 gui-border-box"
					:scroll-y="scrollY"
					:show-scrollbar="false"
					:style="{ height: scrollHeight + 'px' }"
				>
					<view class="gui-flex gui-space-between gui-align-items-center gui-m-20">
						<view class="gui-h4" style="font-weight: bold;">6元开会员 免费听</view>
						<button type="default" class="gui-button gui-bg-red gui-noborder">
							<text class="gui-color-white gui-button-text gui-p-l-20 gui-p-r-20 gui-border-radius">立即开通</text>
						</button>
					</view>

					<view class="gui-flex gui-space-between gui-justify-content-center gui-align-items-center">
						<view type="default" class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20 gui-flex gui-justify-content-center">
							<text class="gui-icons gui-block  gui-m-r-10  gui-text-brown-light">&#xe649;</text>
							<text class="gui-icons  gui-button-text  gui-text-brown-light">开始播放</text>
						</view>
						<view type="default" class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20  gui-flex gui-justify-content-center">
							<text class="gui-icons gui-color-white gui-block  gui-m-r-10">&#xe625;</text>
							<text class="gui-icons gui-color-white gui-button-text">免费订阅</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
	</gui-page>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';

let popupViewTopMin = 0;
let popupViewTopMax = 0;
let systemHeight = 0;
const popupViewTop = ref(0);
const scrollY = ref(false);
const coverTransform = ref(0);

let dragStartPos = { x: 0, y: 0 };
let dragEndPos = { x: 0, y: 0 };
let isDragging = false;

const article = ref([]);

const scrollHeight = computed(() => {
	return systemHeight - popupViewTop.value - 50;
});

onMounted(() => {
	const system = uni.getSystemInfoSync();
	popupViewTopMin = 200;
	popupViewTop.value = popupViewTopMax = system.windowHeight - 100;
	coverTransform.value = popupViewTop.value;
	systemHeight = system.windowHeight;

	uni.request({
		url: 'https://www.graceui.com/api/html2array',
		success: res => {
			article.value = res.data.data;
		}
	});
});

const getMainScrollViewStyle = computed(() => {
	return {
		background: 'black',
		transform: `translateY(${popupViewTop.value}px)`
	};
});

const toggleScroll = () => {
	// 如果当前正在拖动，则不执行 toggle 操作
	if (isDragging.value) {
		return;
	}

	const startTop = popupViewTop.value;
	const endTop = scrollY.value ? popupViewTopMax : popupViewTopMin;
	const interval = endTop > startTop ? 10 : -10;
	const timer = setInterval(() => {
		popupViewTop.value += interval;
		if ((interval > 0 && popupViewTop.value >= endTop) || (interval < 0 && popupViewTop.value <= endTop)) {
			clearInterval(timer);
			scrollY.value = !scrollY.value;
		}
	}, 10);
};

const dragStart = e => {
	isDragging = true;
	dragStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const dragMove = e => {
	if (isDragging) {
		const { clientX, clientY } = e.touches[0];
		const dy = clientY - dragStartPos.y;
		popupViewTop.value += dy;
		if (popupViewTop.value <= popupViewTopMin) {
			popupViewTop.value = popupViewTopMin;
		}
		if (popupViewTop.value >= popupViewTopMax) {
			popupViewTop.value = popupViewTopMax;
		}
		dragStartPos = { x: clientX, y: clientY };
	}
};

const dragEnd = () => {
	isDragging = false;
	scrollY.value = true;
};
</script>
<style scoped lang="scss">
.mianImgBg {
	left: 0;
	top: 0;
	z-index: 1;
}
.mainScrollView {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	width: 750rpx;
	border-radius: 8rpx;
}

.popupScrollView {
	height: calc(100vh - var(--window-top) - 250px);
}

.gui-album-img {
	width: 150rpx;
	height: 150rpx;
	border: 2rpx solid gold;
	border-radius: 10rpx;
}

.gui-album-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.gui-text-brown {
	color: #b3a598;
}

.gui-text-brown-light {
	color: #e2bb92;
}

/*  深度样式 */
.guiSpread :deep(.gui-editor-show) {
	width: 690rpx !important;
}

.create-team-scroll {
	white-space: nowrap; // 滚动必须加的属性
	width: 100%;
	padding: 20rpx 20rpx 20rpx 0rpx;
}
.create-team-item {
	display: inline-flex; // item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可
	flex-direction: column;
	align-items: center;
	border-radius: 20rpx;
}

.create-team-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}
</style>
