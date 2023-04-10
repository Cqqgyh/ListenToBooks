<template>
	<gui-popup position="bottom" ref="popup">
		<view class="gui-relative" style="background-color: #7d7d4b;">
			<view class="gui-p-t-50 gui-flex gui-row">
				<view class="gui-flex gui-flex1 gui-row gui-justify-content-start gui-p-l-20 gui-align-items-center">
					<view class="gui-icons gui-color-white  gui-m-r-40" @click="closePopup">&#xe603;</view>
					<gui-switch-navigation
						:activeLineClass="['gui-nav-scale', 'gui-bg-white']"
						:titleClass="['gui-color-white']"
						:items="[{ id: 0, name: '播放' }, { id: 1, name: '评论' }]"
						activeLineWidth="50rpx"
						:size="100"
						:width="200"
						:currentIndex="currentIndex"
						@change="navchange"
					></gui-switch-navigation>
				</view>
				<view class="gui-flex gui-row  gui-p-l-20 gui-align-items-center">
					<text class="gui-icons gui-block gui-color-white gui-m-r-10">&#xe606;</text>
					<text class="gui-text-small gui-color-white">分享</text>
				</view>
				<view style="width: 180rpx"></view>
			</view>

			<swiper class="tab-card-body" :current="currentIndex" :style="{ height: swiperHeight + 'px' }">
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrollHeight  + 'px' }">
						<view class="gui-relative gui-flex gui-justify-content-center gui-m-l-100 gui-m-r-100 gui-m-t-30 gui-m-b-30">
							<view
								class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20"
							>
								<text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe649;</text>
								<text>715万</text>
							</view>
							<image
								class="gui-border-radius"
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
							></image>
						</view>

						<view class="gui-flex gui-column gui-align-items-center gui-justify-content-center  gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30">
							<text>人生15高加林眼里含泪心中冒火</text>
							<view class="gui-flex gui-row gui-align-items-center gui-m-t-20">
								<image
									class="gui-small-avatar"
									mode="aspectFill"
									src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
								></image>

								<text class="gui-color-yellow gui-text-small gui-m-r-20 gui-m-l-20 gui-flex">
									<text>新经典</text>
									<text class="gui-icons">&#xe601;</text>
								</text>
								<view class="gui-flex gui-row gui-text-small gui-justify-content-center gui-color-white gui-bg-black-opacity2 gui-border-radius gui-p-10">
									<text class="gui-icons gui-m-r-5 gui-p-t-5">&#xe6c7;</text>
									<text>关注</text>
								</view>
							</view>
						</view>

						<view class="gui-flex gui-row gui-space-between gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30">
							<text class="iconfont gui-m-r-5 gui-p-t-5 gui-color-white gui-h3">&#xe611;</text>
							<view class="gui-flex1 gui-m-l-20 gui-m-r-20">
								<gui-single-slider
									:canSlide="false"
									:bglineClass="['gui-bg-white']"
									:barClass="['gui-bg-green', 'gui-color-white']"
									barText="800/1000"
								></gui-single-slider>
							</view>
							<text class="iconfont gui-m-r-5 gui-p-t-5 gui-color-white gui-h3">&#xe612;</text>
						</view>

						<view class="gui-flex gui-row gui-space-between gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30 gui-align-items-center">
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h5">&#xe648;</text>
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h2">&#xe659;</text>
							<text class="iconfont gui-m-r-5 gui-p-t-5 gui-color-white gui-h1">&#xe624;</text>

							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h2">&#xe65a;</text>
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h5">&#xe64c;</text>
						</view>

						<view class="gui-list-items  gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30 gui-bg-black-opacity1 gui-p-20">
							<view class="gui-list-image">
								<image
									class="gui-list-image"
									mode="aspectFill"
									src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
								></image>
							</view>
							<view class="gui-list-body">
								<view class="gui-list-title">
									<text class="gui-text gui-block gui-secondary-text gui-text-left gui-ellipsis gui-color-white">
										[新民间剧场]寻龙天师寻龙天师寻龙天师寻龙天师寻龙天师寻龙天师
									</text>
								</view>
								<text class="gui-list-body-desc gui-text-brown gui-m-t-10 gui-ellipsis">89万人订阅</text>
							</view>

							<view class="gui-p-10 gui-border-radius gui-m-l-20 gui-bg-black-opacity2 gui-flex gui-align-items-center">
								<text class="gui-icons gui-text-brown gui-text-small gui-m-r-10">&#xe6c7;</text>
								<text class="gui-text-small gui-text-brown">免费订阅</text>
							</view>
						</view>
					</scroll-view>

					<view class="gui-absolute-lb gui-bg-black-opacity1 gui-p-t-20 gui-p-b-20 gui-color-white" style="width:100%;">
						<view class="gui-flex gui-row gui-space-between gui-m-l-50 gui-m-r-50 gui-text-center">
							<view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h2 gui-m-b-5">&#xe60a;</text>
								<text class="gui-text-small">99+</text>
							</view>
							<view class="gui-flex gui-row gui-bg-black-opacity1 gui-border-radius gui-p-t-10 gui-p-b-10 gui-p-l-30 gui-p-r-30 gui-align-items-center">
								<text class="gui-icons gui-m-b-5 gui-m-r-10">&#xe69e;</text>
								<text>占个座</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h2 gui-m-b-5">&#xe60e;</text>
								<text class="gui-text-small">3.5万</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h2 gui-m-b-5">&#xe6ea;</text>
								<text class="gui-text-small">2.8万</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h2 gui-m-b-5">&#xe645;</text>
								<text class="gui-text-small">1987</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h2 gui-m-b-5">&#xe6b8;</text>
								<text class="gui-text-small">9967</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="gui-flex gui-space-around gui-bg-white gui-m-t-30 gui-p-t-30  gui-p-l-30 gui-p-r-30 gui-bg-white">
						<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center">
							<text class="gui-icons gui-block gui-m-r-5">&#xe6b8;</text>
							<text>我要评价</text>
						</view>
						<view class="gui-flex gui-flex1 gui-justify-content-end"><gui-star></gui-star></view>
					</view>
					<scroll-view scroll-y :style="{ height: scrollHeight  + 'px' }" class="gui-border-box  gui-p-l-30 gui-p-r-30 gui-bg-white">
						<CommentList></CommentList>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</gui-popup>
</template>

<script setup lang="ts">
import graceJS from '@/Grace6/js/grace.js';

import { ref, computed, onMounted } from 'vue';
const systemHeight = ref(0);
const swiperHeight = computed(() => {
	return systemHeight.value - uni.upx2px(113);
});
const scrollHeight = computed(() => {
	return systemHeight.value - uni.upx2px(113) - uni.upx2px(135);
});
const currentIndex = ref(0);

const navchange = index => {
	currentIndex.value = index;
};

onMounted(() => {
	var systemInfo = graceJS.system();
	console.log(systemInfo);
	systemHeight.value = systemInfo.safeArea.height;
});

const popup = ref(null);

const openPopup = () => {
	popup.value && popup.value.open();
};

const closePopup = () => {
	popup.value && popup.value.close();
};
defineExpose({ openPopup, closePopup });
</script>

<style lang="scss">
.gui-small-avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
}

.gui-text-brown {
	color: #b3a598;
}

.gui-text-brown-light {
	color: #e2bb92;
}
</style>
