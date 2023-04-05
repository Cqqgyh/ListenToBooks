<template>
	<view class="gui-flex gui-space-around gui-m-t-20 gui-m-b-20">
		<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center"><text class="gui-bold">评论区 1.6万</text></view>
		<view class="gui-flex gui-flex1 gui-justify-content-end">
			<text class="gui-block gui-m-r-20">热门</text>
			<text class="gui-block gui-m-r-20">|</text>
			<text>最新</text>
		</view>
	</view>

	<view class="gui-flex gui-row gui-wrap">
		<gui-tags text="更新慢(25)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="代入感强(137)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="音色好美(13)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="表白主播(37)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="情节设计好(111)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="幽默好笑(40)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
		<gui-tags text="情节进展慢(22)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
	</view>

	<view class="gui-m-t-30">
		<view
			style="margin-top: 30rpx"
			class="gui-comments-items gui-flex gui-row gui-nowrap gui-space-between gui-bg-white gui-dark-bg-level-3"
			v-for="(item, index) in commentContents"
			:key="index"
		>
			<image :src="item.face" class="gui-comments-face"></image>
			<view class="gui-comments-body">
				<view class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
					<text class="gui-comments-header-text gui-text gui-primary-color">{{ item.name }}</text>
					<text class="gui-comments-header-text gui-icons gui-color-gray gui-text-small" :class="[item.isPraise ? 'gui-primary-color' : '']">
						&#xe6ea; {{ item.praise }}
					</text>
				</view>
				<text class="gui-comments-content gui-block">{{ item.content }}</text>
				<view class="gui-comments-imgs gui-flex gui-rows gui-wrap" v-if="item.imgs">
					<view class="gui-comments-image" v-for="(img, indexImg) in item.imgs" :key="indexImg" @click.stop="showImgs(index, indexImg)">
						<gui-image :src="img" :width="180" :height="180" mode="aspectFill"></gui-image>
					</view>
				</view>
				<view v-if="item.Reply">
					<text v-for="(itemRe, indexRe) in item.Reply" :key="indexRe" class="gui-comments-replay gui-block gui-bg-gray gui-dark-bg-level-2">
						{{ itemRe.name }} : {{ itemRe.content }}
					</text>
				</view>
				<view class="gui-comments-info gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
					<text class="gui-comments-replay-btn gui-block gui-bg-gray gui-dark-bg-level-2 gui-primary-text">回复</text>
					<text class="gui-comments-info-text gui-color-gray">{{ item.date }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const face =
	'https://images.unsplash.com/photo-1663717249250-804cb861ed74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5M3x8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80';
const img = 'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw5N3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60';

const commentContents = ref([
	{
		content: '故国三千里，深宫二十年。一声何满子，双泪落君前。',
		name: '回复昵称',
		face: face,
		date: '08/10 08:00',
		praise: 188,
		isPraise: false,
		Reply: [{ name: '张晓曦', content: '不错不错' }, { name: '王大陆', content: '赞了~' }]
	},
	{
		content: '而今渐行渐远，渐觉虽悔难追。漫寄消寄息，终久奚为。也拟重论缱绻，争奈翻覆思维。纵再会，只恐恩情，难似当时。',
		name: '路过繁华',
		face: face,
		date: '02/10 18:00',
		praise: 288
	},
	{
		content: '图片回复，点击图片可以预览......',
		name: '林夕阳',
		imgs: [img, img, img],
		face: face,
		date: '08/12 09:00',
		praise: 955,
		isPraise: true
	}
]);

const showImgs = (commentsIndex, imgIndex) => {
	uni.previewImage({
		urls: commentContents.value[commentsIndex].imgs,
		current: commentContents.value[commentsIndex].imgs[imgIndex]
	});
};
</script>

<style lang="scss"></style>
