<template>
	<gui-page>
		<!-- 页面主体 -->
		<template v-slot:gBody>
			<view class="gui-padding"><text class="gui-text gui-color-gray">创建专辑</text></view>
			<view>
				<form @submit="submit">
					<view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑名称</text>
							<view class="gui-form-body"><input type="text" class="gui-form-input" name="name1" placeholder="请输入专辑名称" /></view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑分类</text>
							<view class="gui-form-body" @click="openCategoryPopup">这里应该使用popup选择</view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑封面</text>
							<view class="gui-form-body"><gui-upload-images ref="uploadimgcom" uploadServerUrl="https://您的域名/地址" :maxFileNumber="1"></gui-upload-images></view>
						</view>

						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑标签</text>
							<view class="gui-form-body">这里应该跳转到标签选择页</view>
						</view>

						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑卖点</text>
							<view class="gui-form-body"><input type="text" class="gui-form-input" name="name1" placeholder="请输入专辑卖点" /></view>
						</view>
						<view class="gui-form-item gui-border-b">
							<text class="gui-form-label">专辑简介</text>
							<view class="gui-form-body"><gui-editor ref="guieditor"></gui-editor></view>
						</view>
					</view>
					<view class="gui-margin-top gui-flex gui-row gui-nowrap gui-justify-content-end gui-padding-x">
						<button type="default" class="gui-button gui-bg-primary gui-noborder" style="width:168rpx;" formType="submit">
							<text class="gui-color-white gui-button-text">提交</text>
						</button>
					</view>
					<view style="height:60rpx;"></view>
				</form>
			</view>
			<CategoryPopup ref="categoryPopup"></CategoryPopup>
		</template>
	</gui-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const categoryPopup = ref(null);
const openCategoryPopup = () => {
	categoryPopup.value.openPopup();
};

const closeCategoryPopup = () => {
	categoryPopup.value.closePopup();
};
</script>
<style scoped></style>
