<template>
	<gui-page ref="guiPage">
		<template v-slot:gBody>
			<view>
				<text>{{ count }}</text>
			</view>
			<button @click="increment">increment</button>
		</template>
	</gui-page>
</template>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
const { count } = storeToRefs(useCounterStore());
const { increment } = useCounterStore();

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
		let res = await uni.gRequest.get('/todos/1', {}, false);
		console.log(res);
	} catch (e) {
		// 请求失败
		console.log(e);
	}
};

requestDemo();
</script>
<style></style>
