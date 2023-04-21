<template>
	<gui-page :customFooter="true" v-model="albumDetailInfo" v-if="albumDetailInfo.albumInfo">
		<template v-slot:gBody>
			<scroll-view
				class="gui-bg-white gui-dark-bg-level-3 gui-border-box mianImgBg gui-bg-brown-linear-gradient gui-p-30"
				:scroll-y="true"
				:show-scrollbar="false"
			>
				<view class="gui-margin-top gui-flex gui-row gui-space-between">
					<view class="gui-dark-bg-level-3 gui-color-gray">
						<image
							class="gui-album-img"
							mode="aspectFill"
							:src="albumDetailInfo.albumInfo.coverUrl"
						></image>
					</view>
					<view class="gui-flex gui-column gui-flex1 gui-m-l-20" style="width: 388rpx">
						<text class="gui-color-white" style="font-size: 38rpx">{{ albumDetailInfo.albumInfo.albumTitle }}</text>
						<view class="gui-m-t-10 gui-flex gui-row gui-wrap">
							<gui-tags
								:text="albumDetailInfo.baseCategoryView[`category${n}Name`]"
								:size="22"
								:customClass="['gui-bg-black-opacity2', 'gui-color-white', 'gui-m-r-5', 'gui-m-b-5']"
								v-for="n in 3"
								:key="n"
							></gui-tags>
						</view>
					</view>
				</view>

				<view class="gui-flex gui-row gui-space-between gui-color-white gui-text-center gui-m-t-30">
					<view class="gui-flex gui-column">
						<text class="gui-text-brown-light">
							<text class="iconfont">&#xe651;</text>
							<text class="gui-text-small">{{albumDetailInfo.baseCategoryView.category1Name}}</text>
							<text class="iconfont">&#xe650;</text>
						</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							{{ albumDetailInfo.albumStatVo.commentStatNum || 0}}
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">月票</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							{{ albumDetailInfo.albumStatVo.playStatNum || 0}}
							<text class="gui-text-small gui-text-brown">亿</text>
						</text>
						<text class="gui-text-small gui-text-brown">播放量</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							{{ albumDetailInfo.albumStatVo.collectStatNum || 0}}
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">订阅量</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							{{ albumDetailInfo.albumStatVo.buyStatNum || 0}}
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">购买量</text>
					</view>
				</view>

				<view class="gui-m-t-30"><text class="gui-text-brown">{{albumDetailInfo.albumInfo.albumIntro}}</text></view>

				<view class="gui-m-t-20 gui-border-box gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx" @click="">
					<view class="gui-flex gui-column gui-flex1 gui-color-white"><text>主播介绍</text></view>
					<view class="gui-flex gui-m-t-20">
						<view class="gui-flex1">
							<view class="gui-flex">
								<image
									mode="aspectFill"
									:src="albumDetailInfo.announcer.avatarUrl"
									class="gui-album-avatar"
								></image>
								<view class="gui-flex gui-column gui-m-l-20">
									<text class="gui-color-white">{{ albumDetailInfo.announcer.nickname }}</text>
									<text class="gui-text-brown gui-text-small gui-m-t-20">已被2331.4万人关注</text>
								</view>
							</view>
						</view>
						<view class="gui-bg-black-opacity1 gui-text-center" style="width: 150rpx; height: 60rpx; line-height: 60rpx; border-radius: 20rpx">
							<text class="gui-icons gui-color-white gui-text-small">&#xe6c7; 关注</text>
						</view>
					</view>
					<view class="gui-m-t-20 gui-text-brown gui-text-small"><text>喜马人肉故事机!来呀，等你关注。微博求关注呀</text></view>
				</view>

				<view class="gui-m-t-30">
					<view class="gui-text-center"><text class="gui-color-white gui-h3">简介</text></view>
					<view class="gui-bg-white gui-dark-bg-level-3 gui-m-t-20">
						<gui-spread class="guiSpread" height="600rpx" :isShrink="true">
							<mp-html :content="albumDetailInfo.albumInfo.albumRichIntro" />
						</gui-spread>
					</view>
				</view>
			</scroll-view>
		</template>

		<template v-slot:gFooter>
			<Resizable
				ref="resizableRef"
				:min-height="150"
				:max-height="500"
				:initial-height="200">
				<template #top>
					<view class="gui-text-center resizable-top gui-bg-black">
						<text class="iconfont gui-color-white gui-h3">&#xeb2e;</text>
					</view>
				</template>
				<z-paging
					ref="zPagingRef"
					:paging-style="{height:(resizableRef?.boxHeight - 50 || 100)+'px'}"
					v-model="albumTrackList"
					@query="getAlbumTrackList"
					:fixed="false">
					<template #top>
						<view class="gui-flex gui-space-between gui-align-items-center gui-padding" @click="openAccountPopup">
							<view class="gui-h4 gui-bold">6元开会员 免费听</view>
							<button type="default" class="gui-button gui-bg-red gui-noborder">
								<text class="gui-color-white gui-button-text gui-p-l-20 gui-p-r-20 gui-border-radius">立即开通</text>
							</button>
						</view>
						<view class="gui-flex gui-space-between gui-justify-content-center gui-align-items-center">
							<view
								type="default"
								class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20 gui-flex gui-justify-content-center"
								@click="openBuyPopup"
							>
								<text class="gui-icons gui-block gui-m-r-10 gui-text-brown-light">&#xe649;</text>
								<text class="gui-icons gui-button-text gui-text-brown-light">开始播放</text>
							</view>
							<view
								type="default"
								v-if="albumDetailInfo.albumInfo.isFinished === '1'"
								class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20 gui-flex gui-justify-content-center"
								@click="openSeriesPopup"
							>
								<text class="gui-icons gui-color-white gui-block gui-m-r-10">&#xe625;</text>
								<text class="gui-icons gui-color-white gui-button-text">订阅</text>
							</view>
						</view>
					</template>
					<!--					渲染列表-->
					<view
						class="gui-list-items"
						:class="item.isChecked ? 'track-item-checked' : ''"
						v-for="(item,index) in albumTrackList"
						@click="handleTrackOnClick(index)"
						:key="item.trackId">
						<view class="gui-relative track-item-sort">
							<view
								:class="item.isChecked ? 'track-item-title-checked' : 'gui-color-grey1'"
								class=" gui-h5">{{ item.orderNum + 1 }}</view>
						</view>
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title">
								<text :class="item.isChecked ? 'track-item-title-checked' : 'gui-primary-text '" class="gui-list-title-text gui-ellipsis">{{item.trackTitle}}</text>
							</view>
							<view class="gui-color-gray gui-flex gui-text-small gui-flex gui-align-items-center gui-m-t-20">
								<text class="gui-icons gui-block gui-m-r-10">&#xe649;</text>
								<text class="gui-block gui-m-r-20">{{ item.playStatNum }}</text>
								<text class="gui-icons gui-block gui-m-r-10">&#xe6b8;</text>
								<text class="gui-block gui-m-r-20">{{ item.albumCommentStatNum }}</text>
								<text class="gui-icons gui-block gui-m-r-10">&#xe607;</text>
								<text class="gui-block">{{ formatTime(item.mediaDuration)  }}</text>
							</view>
						</view>
						<view class="gui-flex gui-column gui-color-gray gui-text-center gui-m-l-20 gui-m-r-20">
							<text class="gui-color-gray gui-text-small gui-block gui-m-b-20">{{ item.createTime.slice(0, 10) }}</text>
							<uni-icons v-if="item.isShowPiadMark"  custom-prefix="iconfont" type="shoufeiguanli" class="gui-m-r-10" size="15" color="#ef5350"></uni-icons>
							<uni-icons v-else custom-prefix="iconfont" type="xiazai" class="gui-m-r-10" size="15"></uni-icons>
						</view>
					</view>
				</z-paging>

			</Resizable>
		</template>

	</gui-page>
	<!-- 弹出层，开通会员 -->
	<gui-popup ref="accountPopupRef" position="bottom">
		<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
			<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeAccountPopup">&#xe610;</text>
			<text class="gui-h3 gui-block gui-p-t-20 gui-p-b-20 gui-text-center">开通会员，可免费畅听本专辑</text>
			<view class="gui-flex gui-space-between gui-m-20">
				<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>6个月</text>
					<text>
						￥
						<text class="gui-h2">138</text>
					</text>
					<text class="gui-text-small gui-text-brown">每日仅需￥0.74</text>
				</view>

				<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>3个月</text>
					<text>
						￥
						<text class="gui-h2">73</text>
					</text>
					<text class="gui-text-small gui-text-brown">每日仅需￥0.78</text>
				</view>

				<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>1个月</text>
					<text>
						￥
						<text class="gui-h2">25</text>
					</text>
					<text class="gui-text-small gui-text-brown">每日仅需￥0.8</text>
				</view>
			</view>

			<view class="gui-flex gui-rows gui-nowrap gui-align-items-center" style="margin-top: 80rpx">
				<view class="gui-title-line"></view>
				<text class="gui-h6" style="padding-left: 50rpx; padding-right: 50rpx">开通会员，将享有</text>
				<view class="gui-title-line"></view>
			</view>

			<view class="gui-flex gui-space-between gui-m-50">
				<view class="gui-flex gui-column">
					<view class="gui-bg-orange-opacity1 gui-border-radius">
						<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe641;</text>
					</view>
					<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员免费听</text>
				</view>

				<view class="gui-flex gui-column">
					<view class="gui-bg-orange-opacity1 gui-border-radius">
						<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe8a6;</text>
					</view>
					<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员专享</text>
				</view>

				<view class="gui-flex gui-column">
					<view class="gui-bg-orange-opacity1 gui-border-radius">
						<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe65d;</text>
					</view>
					<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">免音贴广告</text>
				</view>

				<view class="gui-flex gui-column">
					<view class="gui-bg-orange-opacity1 gui-border-radius">
						<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe605;</text>
					</view>
					<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员音效</text>
				</view>
			</view>

			<view class="gui-flex gui-space-between gui-m-30 gui-border gui-p-20">
				<text class="gui-text-black-opacity5 gui-bold">更多会员套餐</text>
				<text class="gui-icons gui-block gui-h3 gui-text-black-opacity3">&#xe601;</text>
			</view>

			<view class="gui-flex gui-padding-x gui-column">
				<view class="gui-h4 gui-color-white gui-flex1 gui-text-center gui-bg-orange-opacity9 gui-p-30 gui-border-radius">首月6元</view>
				<text class="gui-text-small gui-block gui-text-center gui-m-t-20 gui-m-b-20">购买即视为同意《会员服务协议》和《自动续费服务规则》</text>
			</view>
		</view>
	</gui-popup>

	<!-- 弹出层，全集购买 -->
	<gui-popup ref="buyPopupRef" position="bottom">
		<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
			<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeBuyPopup">&#xe610;</text>
			<text class="gui-h3 gui-block gui-p-t-20 gui-p-b-20 gui-text-center">全集购买</text>
			<view class="gui-flex gui-m-20 gui-wrap gui-row">
				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>全集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10 gui-h4">VIP免费</text>
				</view>

				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>本集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">0.30 喜点</text>
				</view>

				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>后10集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">3.00 喜点</text>
				</view>

				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>后20集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">6.00 喜点</text>
				</view>

				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>后50集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">15.00 喜点</text>
				</view>

				<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
					<text>已更未购281集</text>
					<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">84.30 喜点</text>
				</view>
			</view>

			<view class="gui-flex gui-column gui-m-40">
				<text class="gui-text-small gui-block gui-m-b-10 gui-text-black-opacity3">喜马拉雅VIP会员享多项特权</text>
				<text class="gui-text-small gui-block gui-m-b-20 gui-text-black-opacity3">有声书免费听|去声音广告|喜马讲书畅听等9项权益</text>
			</view>

			<view class="gui-h4 gui-color-white gui-flex1 gui-text-center gui-bg-orange-opacity9 gui-p-30 gui-border-radius">会员免费听</view>
		</view>
	</gui-popup>

	<!-- 弹出层，畅听 -->
	<gui-popup ref="seriesPopupRef" position="bottom">
		<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
			<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeSeriesPopup">&#xe610;</text>
			<navigator class="gui-list-items gui-m-40">
				<view class="gui-list-image gui-relative">
					<image
						class="gui-list-image"
						mode="aspectFill"
						src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
					></image>
				</view>
				<view class="gui-list-body gui-border-b">
					<view class="gui-list-title"><text class="gui-list-title-text gui-primary-text">以下方式开启畅听</text></view>
					<text class="gui-list-body-desc gui-color-gray">司南[全4册]《警中录》侧侧轻寒古风.</text>
				</view>
			</navigator>

			<view class="gui-flex gui-row gui-space-between gui-m-40 gui-align-items-center">
				<view class="gui-flex gui-flex1 gui-column">
					<text class="gui-block">6元开会员 免费听</text>
					<text class="gui-block gui-text-small gui-text-brown-light">可收听所有会员内容</text>
				</view>
				<view class="gui-bg-orange-opacity9 gui-color-white gui-p-20">立即开通</view>
			</view>

			<navigator class="gui-m-40 gui-flex gui-space-between gui-bg-black-opacity2 gui-p-20">
				<text class="gui-ellipsis gui-flex1">0.3喜点/集购买本专辑</text>
				<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
			</navigator>

			<view style="height: 100rpx"></view>
		</view>
	</gui-popup>

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onLoad } from "@dcloudio/uni-app"
import GuiPopup from "../../Grace6/components/gui-popup.vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import Resizable from "../../components/Resizable/Resizable.vue"
import { AlbumDetailInterface, TrackInterface } from "../../api/albums/interfaces"
import { albumsService } from "../../api"
import { formatTime } from "../../utils/utils"

const article = ref([]);
const accountPopupRef = ref<InstanceType<typeof GuiPopup>>()
const buyPopupRef = ref<InstanceType<typeof GuiPopup>>()
const seriesPopupRef = ref<InstanceType<typeof GuiPopup>>()
const resizableRef = ref<InstanceType<typeof Resizable>>()
const zPagingRef = ref<InstanceType<typeof ZPaging>>()

const props = defineProps({
	id: {
		type: Number || String,
		default: 2
	}
})
// 专辑信息
const albumDetailInfo = ref({} as AlbumDetailInterface)
//专辑声音列表
const albumTrackList = ref<TrackInterface[]>([])

/* 方法 */
// 获取专辑详情
const getAlbumDetailInfo = async () => {
	try {
		const res = await albumsService.getAlbumDetail(props.id)
		albumDetailInfo.value = res.data
	} catch (error) {
		console.log(error)
	}
}
// 获取专辑声音列表
const getAlbumTrackList= async (page:number, limit:number) => {
	const params = {
		page,
		limit,
		albumId: props.id
	}
	try {
		const res = await albumsService.getAlbumTrackList(params)
		res.data.records.forEach((item:TrackInterface) => {
			item.isChecked = false
		})
		zPagingRef.value.complete(res.data.records)
	} catch (error) {
		console.log(error)
	}
}
// 专辑声音被点击
const handleTrackOnClick = (index:number) => {
	albumTrackList.value.forEach((item:TrackInterface) => {
		item.isChecked = false
	})
	albumTrackList.value[index].isChecked = true

}
const openAccountPopup = () => {
	console.log('openAccountPopup')
	accountPopupRef.value.open();
};

const closeAccountPopup = () => {
	accountPopupRef.value.close();
};

const openBuyPopup = () => {
	buyPopupRef.value.open();
};

const closeBuyPopup = () => {
	buyPopupRef.value.close();
};

const openSeriesPopup = () => {
	console.log(seriesPopupRef.value)
	seriesPopupRef.value.open();
};

const closeSeriesPopup = () => {
	seriesPopupRef.value.close();
};

// 弹出层导航切换
const currentIndex = ref(0);

onLoad(() => {
	getAlbumDetailInfo()
});


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

.popupView {
	height: calc(100vh - var(--window-top) - 200px);
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

.buy-card {
	width: 160rpx;
	text-align: center;
	margin: 10rpx;
}
.resizable-top{
	height: 60rpx;
}
.track-item-checked{
	background-color: #f5f5f5;
}
.track-item-title-checked{
	color: #ff0036;
}
.track-item-sort{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	text-align: center;
}
</style>
