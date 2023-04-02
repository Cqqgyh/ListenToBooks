<template>
	<gui-page :customHeader="true" :customFooter="true">
		<template v-slot:gHeader>
			<view style="height: 44px" class="gui-flex">
				<view class="gui-dark-bg-level-1 gui-p-15 gui-flex1">
					<gui-search :customClass="['gui-bg-black-opacity1']" @inputting="inputting" @confirm="confirm"></gui-search>
				</view>
				<view class="gui-flex gui-row gui-wrap gui-align-items-center">
					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black4 gui-m-r-10">&#xe69e;</text>
					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black4">&#xe6c7;</text>
				</view>
				<view style="width: 200rpx"></view>
			</view>
		</template>

		<template v-slot:gBody>
			<view class="gui-flex gui-m-l-20 gui-m-b-20">
				<view class="gui-bg-white gui-dark-bg-level-3 gui-p-r-20"><gui-switch-navigation :items="navItems" @change="navchange" :width="640"></gui-switch-navigation></view>
				<view class="gui-m-l-10 gui-m-t-5"><text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-100 gui-bg-black4">&#xe614;</text></view>
			</view>

			<gui-swiper :swiperItems="swiperItems" :width="750" :height="330" :indicatorActiveWidth="38"></gui-swiper>

			<view class="gui-grid gui-bg-white gui-dark-bg-level-3 gui-padding">
				<view
					v-for="(item, idx) in ['排行榜', '出版小说', '人物传记', '科幻奇幻', '悬疑推理', '健康科普', '财经通识', '全部']"
					:key="idx"
					class="gui-grid-item gui-m-10 grid4 gui-bg-black-opacity1"
				>
					<text class="gui-grid-text gui-primary-text">{{ item }}</text>
				</view>
			</view>

			<view class="gui-margin-top gui-flex gui-row gui-space-between gui-m-l-20 gui-m-r-20">
				<view class="gui-block gui-dark-bg-level-3 gui-color-drak gui-flex gui-row gui-align-items-center gui-justify-content-center" style="font-weight: bold">
					<text class="gui-m-r-10">本周热门</text>
					<text class="gui-m-r-10">|</text>
					<text class="gui-m-r-10">好书推荐</text>
				</view>
				<view class="gui-dark-bg-level-3 gui-color-gray gui-flex">
					<text class="gui-text-small">查看全部</text>
					<text class="gui-icons gui-block gui-color-drak">&#xe601;</text>
				</view>
			</view>
			<view class="gui-m-l-20"><text class="gui-text-small gui-color-gray">精选近期收听热度高的主题书籍</text></view>

			<view class="gui-margin-top gui-padding-x gui-flex gui-row gui-wrap gui-space-between">
				<view class="gui-product" hover-class="gui-tap" v-for="(item, index) in products" :key="index" @tap="gotoInfo(index, item)">
					<view class="gui-relative">
						<text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white">VIP</text>
						<view class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20">
							<text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe649;</text>
							<text>715万</text>
						</view>
						<gui-image :src="item.img" :width="220" :height="220"></gui-image>
					</view>
					<view class="gui-product-lines">
						<text class="gui-product-name gui-primary-text">{{ item.name }}</text>
					</view>
					<view style="height: 30rpx"></view>
				</view>
			</view>
		</template>

		<template v-slot:gFooter>
			<!-- 普通模式 -->
			<view style="padding-top: 50rpx" class="gui-relative">
				<gui-flex :customClass="['gui-footer']" direction="row" :wrap="false" alignItems="center">
					<view class="gui-footer-icon-buttons" @tap="navChange(0)">
						<text :class="[currentIndex == 0 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block']">&#xe608;</text>
						<text :class="[currentIndex == 0 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">首页</text>
					</view>
					<view class="gui-footer-icon-buttons" @tap="navChange(1)">
						<text :class="[currentIndex == 1 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block', 'iconfont']">
							&#xe7d5;
						</text>
						<text :class="[currentIndex == 1 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">直播</text>
					</view>
					<view class="gui-footer-icon-buttons"></view>
					<view class="gui-footer-icon-buttons" @tap="navChange(3)">
						<text :class="[currentIndex == 3 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block', 'iconfont']">
							&#xe6ae;
						</text>
						<text :class="[currentIndex == 3 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">排行榜</text>
					</view>
					<view class="gui-footer-icon-buttons" @tap="navChange(4)">
						<text :class="[currentIndex == 4 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block']">&#xe6fe;</text>
						<text :class="[currentIndex == 4 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">我的</text>
					</view>
				</gui-flex>
				<view class="gui-footer-buttons-ab" @tap="navChange(2)">
					<text
						:class="[
							currentIndex == 2 ? 'gui-primary-color' : 'gui-color-gray',
							'gui-footer',
							'gui-icons',
							'gui-footer-buttons-ab-icon',
							'gui-block',
							'gui-dark-bg-level-2'
						]"
					>
						&#xe648;
					</text>
					<text :class="[currentIndex == 2 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">听专辑</text>
				</view>
			</view>
		</template>
	</gui-page>
</template>
<script setup lang="ts">
import graceJS from '@/Grace6/js/grace.js';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { count } = storeToRefs(useCounterStore());
const { increment } = useCounterStore();
var img = 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=90';
const swiperItems = ref([
	{
		img: img,
		url: '',
		title: '测试标题 001',
		opentype: 'navigate'
	},
	{
		img: img,
		url: '',
		title: '测试标题 002',
		opentype: 'navigate'
	},
	{
		img: img,
		url: '',
		title: '测试标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
		opentype: 'navigate'
	}
]);

const navItems = ref([]);
graceJS.get('https://www.graceui.com/api/tabs/forV5', {}, {}, res => {
	navItems.value = res.data;
	console.log(res);
});

const products = ref([]);
graceJS.get('https://www.graceui.com/api/products/lists', {}, {}, res => {
	products.value = res.data;
	console.log(res.data);
});

const currentIndex = ref(0);

const requestDemo = async () => {
	// 请求前置函数
	uni.gRequest.befor = () => {
		uni.showLoading({ title: '加载中 ...' });
	};
	// 请求后置函数
	uni.gRequest.after = () => {
		uni.hideLoading();
	};
	// GET 请求
	try {
		// 请求成功
		let res = await uni.gRequest.get('/album/category/getBaseCategoryList', {}, false);
		console.log(res);
	} catch (e) {
		// 请求失败
		console.log(e);
	}
};

requestDemo();
</script>
<style scoped>
.grid4 {
	width: 150rpx;
}

.gui-product {
	width: 220rpx;
	overflow: hidden;
}
.gui-product-lines {
	margin-top: 10rpx;
}
.gui-product-name {
	font-size: 28rpx;
	line-height: 32rpx;
}
</style>
