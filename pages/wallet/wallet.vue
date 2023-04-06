<template>
	<gui-page>
		<template v-slot:gBody>
				<view class="gui-bg-yellow gui-m-30 gui-p-30 gui-border-radius">
					<text>账户余额</text>
					<view class="gui-flex gui-space-between gui-align-items-center">
						<view>
							<text>￥</text>
							<text class="gui-h1">0</text>
						</view>
						<view class="gui-bg-white gui-p-30 gui-border-radius"><text class="gui-color-orange gui-bold">充 值</text></view>
					</view>
				</view>

				<view class="gui-m-30">
					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title">
								<text class="gui-list-title-text gui-list-one-line gui-primary-text">支付设置</text>
								<text class="gui-list-title-desc gui-color-gray">开通会员自动续费更省钱</text>
							</view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">消费记录</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">充值记录</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">听读券余额</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">使用兑换码兑换听读券</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">我的已购</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">我的拼团</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>

					<navigator class="gui-list-items">
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-list-one-line gui-primary-text">我的赠送</text></view>
						</view>
						<text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
					</navigator>
				</view>
		</template>
	</gui-page>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
