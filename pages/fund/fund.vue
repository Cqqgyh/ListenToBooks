<template>
	<gui-page :customHeader="true" :headerClass="['gui-bg-gray', 'gui-dark-bg-level-1']">
		<!-- 自定义头部导航 -->
		<template v-slot:gHeader>
			<view style="height:44px;" class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<gui-header-leading :home="false" :back="true"></gui-header-leading>
				<view class="gui-flex1"></view>
				<view class="gui-flex gui-row gui-justify-content-center">
					<gui-switch-navigation
						:width="300"
						textAlign="center"
						:isCenter="true"
						activeDirection="center"
						:items="[{ id: 0, name: '消费记录' }, { id: 1, name: '充值记录' }]"
						@change="navchange"
					></gui-switch-navigation>
				</view>
				<view style="width:220rpx;"></view>
			</view>
		</template>
		<!-- 页面主体 -->
		<template v-slot:gBody>
			<view class="gui-padding">
				<scroll-view :style="{ height: 100 + 'vh' }">
					<view class="gui-m-b-20" v-for="n in 30" :key="n">
						<view class="gui-flex gui-row gui-space-between">
							<view class="gui-flex gui-column gui-flex1">
								<text>充值300个懒人币</text>
								<text class="gui-text-small  gui-text-black-opacity3">2023-03-01 09:04:15</text>
							</view>
							<view class="gui-flex gui-column">
								<text class="gui-color-orange gui-bold">+30元</text>
								<text class="gui-text-small gui-text-black-opacity3">交易关闭</text>
							</view>
						</view>
						<view class="gui-border-b gui-m-t-20"></view>
					</view>
				</scroll-view>
			</view>
		</template>
	</gui-page>
</template>
<script setup lang="ts"></script>
<style scoped></style>
