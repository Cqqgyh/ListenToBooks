<template>
	<gui-popup position="bottom" ref="popup">
		<view class="gui-relative" style="background-color: gray;">
			<view class="gui-flex gui-row gui-space-between">
				<view class="gui-p-t-20 gui-p-b-20 gui-color-white gui-m-l-40">请选择专辑分类</view>
				<view class="gui-icons gui-color-white gui-p-t-20 gui-p-b-20  gui-m-r-40" @click="closePopup">&#xe603;</view>
			</view>
		</view>

		<view style="height:700rpx;" class="gui-bg-white gui-p-20">内容内容内容内容内容内容内容</view>
	</gui-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const popup = ref(null);

const openPopup = () => {
	console.log(popup.value);
	popup.value && popup.value.open();
};

const closePopup = () => {
	popup.value && popup.value.close();
};
defineExpose({ openPopup, closePopup });
</script>

<style lang="scss"></style>
