<template>
	<view class="gui-wrapper">
		<view class="gui-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="gui-tab-view menu-scroll-view" :scroll-top="scrollTop" :scroll-into-view="itemId">
				<view v-for="(item, index) in tabbar" :key="index" class="gui-tab-item" :class="[current == index && 'gui-tab-item-active']" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="gui-right-box" @scroll="rightScroll">
				<view class="gui-page-view">
					<view class="gui-class-item" :id="'item' + index" v-for="(item, index) in tabbar" :key="index">
						<view class="gui-item-title">
							<text>{{ item.name }}</text>
						</view>
						<view class="gui-item-container">
							<view class="gui-thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
								<image class="gui-item-menu-image" :src="item1.icon" mode=""></image>
								<view class="gui-item-menu-name">{{ item1.name }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import classifyData from '@/common/classify.data.js';
import { nextTick, ref, toRef, onMounted, getCurrentInstance } from 'vue';
let scrollTop = ref(0); // tab标题的滚动条位置
let oldScrollTop = ref(0);
let current = ref(0); // 预设当前项的值
let menuHeight = ref(0); // 左边菜单的高度
let menuItemHeight = ref(0); // 左边菜单item的高度
let itemId = ref(''); // 栏目右边scroll-view用于滚动的id
const tabbar = classifyData;
let menuItemPos = ref([]);
let arr = ref([]);
let scrollRightTop = ref(0); // 右边栏目scroll-view的滚动条高度
const instance = getCurrentInstance(); // 获取组件实例
onMounted(async () => {
	getMenuItemTop();
	leftMenuStatus(0);
});

function getMenuItemTop() {
	new Promise(resolve => {
		let selectorQuery = uni.createSelectorQuery();
		selectorQuery
			.selectAll('.gui-class-item')
			.boundingClientRect(rects => {
				if (!rects.length) {
					setTimeout(() => {
						getMenuItemTop();
					}, 10);
					return;
				}
				rects.forEach(rect => {
					arr.value.push(rect.top - rects[0].top);
					resolve();
				});
			})
			.exec();
	});
}

const swichMenu = async index => {
	if (arr.length == 0) {
		await getMenuItemTop();
	}
	if (index == current.value) return;
	scrollRightTop.value = oldScrollTop.value;
	nextTick(() => {
		scrollRightTop.value = arr.value[index];
		current.value = index;
		leftMenuStatus(index);
	});
};

const leftMenuStatus = async index => {
	current.value = index;
	if (menuHeight.value === 0 || menuItemHeight.value === 0) {
		await getElRect('menu-scroll-view', 'menuHeight');
		await getElRect('gui-tab-item', 'menuItemHeight');
	}
	await nextTick(); // 需要 nextTick的等待

	menuHeight.value = instance.proxy.menuHeight;
	menuItemHeight.value = instance.proxy.menuItemHeight;

	scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
};

// 获取一个目标元素的高度
async function getElRect(elClass, dataVal) {
	new Promise((resolve, reject) => {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('.' + elClass)
			.fields(
				{
					size: true
				},
				res => {
					// 如果节点尚未生成，res值为null，循环调用执行
					if (!res) {
						setTimeout(() => {
							getElRect(elClass, dataVal);
						}, 10);
						return;
					}
					instance.proxy[dataVal] = res.height;
					resolve();
				}
			)
			.exec();
	});
}

const rightScroll = async e => {
	oldScrollTop.value = e.detail.scrollTop;
	if (arr.value.length == 0) {
		await getMenuItemTop();
	}
	if (!menuHeight.value) {
		await getElRect('menu-scroll-view', 'menuHeight');
	}
	setTimeout(() => {
		let scrollHeight = e.detail.scrollTop + menuHeight.value / 2;
		for (let i = 0; i < arr.value.length; i++) {
			let height1 = arr.value[i];
			let height2 = arr.value[i + 1];
			if (!height2 || (scrollHeight >= height1 && scrollHeight < height2)) {
				leftMenuStatus(i);
				return;
			}
		}
	}, 10);
};
</script>

<style lang="scss" scoped>
.gui-wrapper {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}

.gui-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.gui-tab-view {
	width: 200rpx;
	height: 100%;
}

.gui-tab-item {
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
	line-height: 1;
}

.gui-tab-item-active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.gui-tab-item-active::before {
	content: '';
	position: absolute;
	border-left: 4px solid red;
	height: 32rpx;
	left: 0;
	top: 39rpx;
}

.gui-tab-view {
	height: 100%;
}

.gui-right-box {
	background-color: rgb(250, 250, 250);
}

.gui-page-view {
	padding: 16rpx;
}

.gui-class-item {
	margin-bottom: 30rpx;
	background-color: #fff;
	padding: 16rpx;
	border-radius: 8rpx;
}

.gui-class-item:last-child {
	min-height: 100vh;
}

.gui-item-title {
	font-size: 26rpx;
	color: gray;
	font-weight: bold;
}

.gui-item-menu-name {
	font-weight: normal;
	font-size: 24rpx;
	color: gray;
}

.gui-item-container {
	display: flex;
	flex-wrap: wrap;
}

.gui-thumb-box {
	width: 33.333333%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 20rpx;
}

.gui-item-menu-image {
	width: 120rpx;
	height: 120rpx;
}
</style>
