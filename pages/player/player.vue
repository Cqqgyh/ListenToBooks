<template>
	<view>
		<view class="gui-relative" style="background-color: #7d7d4b;">
			<view class="gui-p-t-40 gui-flex gui-row">
				<view class="gui-flex gui-flex1 gui-row gui-justify-content-start gui-p-l-20 gui-align-items-center">
					<view class="gui-icons gui-color-white  gui-m-r-40" @click="handleJump">&#xe603;</view>
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
				<view class="gui-flex gui-row  gui-p-l-20 gui-p-r-20 gui-align-items-center">
					<text class="gui-icons gui-block gui-color-white gui-m-r-10">&#xe606;</text>
					<text class="gui-text-small gui-color-white">分享</text>
				</view>
			</view>

			<swiper class="tab-card-body" :current="currentIndex" :style="{ height: swiperHeight + 'px' }">
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrollHeight  + 'px' }">
						<view class="gui-relative gui-flex gui-justify-content-center gui-m-l-100 gui-m-r-100 gui-m-t-30 gui-m-b-30">
							<view
								class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20"
							>
								<text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe649;</text>
								<text>{{ trackStaVo?.playStatNum }}</text>
							</view>
							<image
								class="gui-border-radius"
								mode="aspectFill"
								:src="trackInfo?.coverUrl"
							></image>
						</view>

						<view class="gui-flex gui-column gui-align-items-center gui-justify-content-center  gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30">

							<view class="gui-flex gui-row gui-align-items-center gui-m-t-20">
								<!-- <image
									class="gui-small-avatar"
									mode="aspectFill"
									:src="album."
								></image> -->

								<!-- <text class="gui-color-yellow gui-text-small gui-m-r-20 gui-m-l-20 gui-flex">
									<text>新经典</text>
									<text class="gui-icons">&#xe601;</text>
								</text> -->
								<text>{{ trackInfo?.trackTitle }}</text>
								<!-- <view class="gui-flex gui-row gui-text-small gui-justify-content-center gui-color-white gui-bg-black-opacity2 gui-border-radius gui-p-10">
									<text class="gui-icons gui-m-r-5 gui-p-t-5">&#xe6c7;</text>
									<text>关注</text>
								</view> -->
							</view>
						</view>

						<view class="gui-flex gui-row gui-space-between gui-align-items-center gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30">
							<text class="iconfont gui-m-r-5 gui-p-t-5 gui-color-white gui-h5">{{ audios.currentTime }}</text>
							<view class="gui-flex1 gui-m-l-20 gui-m-r-20" style="width: 100rpx">
								<slider
									step="1"
									activeColor="#f86442"
									block-color="#fff"
									block-size="10"
									:min="0"
									:max="sliders.max"
									:value="sliders.progressTime"
									@change="sliderChange"
									@touchstart="handleSliderMoveStart "
      						@touchend="handleSliderMoveEnd"
								/>
							</view>
							<text class="iconfont gui-m-r-5 gui-p-t-5 gui-color-white gui-h5" style="width: 100rpx">{{ audios.duration }}</text>
						</view>

						<view class="gui-flex gui-row gui-space-between gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30 gui-align-items-center">
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h5" @click="openAlbumPopup">&#xe648;</text>
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h2" @click="prevAudio">&#xe659;</text>
							<uni-icons custom-prefix="iconfont" type="pause" class="iconfont gui-p-t-5 gui-color-white gui-h1" size="80rpx" color="#fff" @click="pauseAudio" v-if="audios.playStatus"></uni-icons>
							<text class="iconfont gui-p-t-5 gui-color-white gui-h1" @click="playAudio" v-else>&#xe624;</text>
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h2" @click="nextAudio">&#xe65a;</text>
							<text class="gui-icons gui-m-r-5 gui-p-t-5 gui-color-white gui-h5">&#xe64c;</text>
						</view>

						<view class="gui-list-items  gui-m-l-50 gui-m-r-50 gui-m-t-30 gui-m-b-30 gui-bg-black-opacity1 gui-p-20">
							<view class="gui-list-image">
								<image
									class="gui-list-image"
									mode="aspectFill"
									:src="album?.coverUrl"
								></image>
							</view>
							<view class="gui-list-body">
								<view class="gui-list-title">
									<text class="gui-text gui-block gui-secondary-text gui-text-left gui-ellipsis gui-color-white">
										{{ album?.albumTitle }}
									</text>
								</view>
								<text class="gui-list-body-desc gui-text-brown gui-m-t-10 gui-ellipsis">{{ trackStaVo?.collectStatNum }}人订阅</text>
							</view>

							<view class="gui-p-10 gui-border-radius gui-m-l-20 gui-bg-black-opacity2 gui-flex gui-align-items-center">
								<!-- <text class="gui-icons gui-text-brown gui-text-small gui-m-r-10">&#xe6c7;</text> -->
								<text class="gui-text-small gui-text-brown">免费订阅</text>
							</view>
						</view>
					</scroll-view>

					<view class="gui-absolute-lb gui-bg-black-opacity1 gui-p-t-20 gui-p-b-20 gui-color-white" style="width:100%;">
						<view class="gui-flex gui-row gui-space-between gui-m-l-50 gui-m-r-50 gui-text-center">
							<!-- <view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h3 gui-m-b-5">&#xe60a;</text>
								<text class="gui-text-small">99+</text>
							</view> -->
							<view @click="handleComment" class="gui-flex gui-flex1 gui-row gui-bg-black-opacity1 gui-border-radius gui-p-t-10 gui-p-b-10 gui-p-l-30 gui-p-r-30 gui-align-items-center">
								<text class="gui-icons gui-m-b-5 gui-m-r-10">&#xe69e;</text>
								<text>发表评论</text>
							</view>
							<!-- <view class="gui-flex gui-column gui-align-items-center">
								<text class="gui-icons gui-h3 gui-m-b-5">&#xe6ea;</text>
								<text class="gui-text-small">2.8万</text>
							</view> -->
							<view class="gui-flex gui-margin-x gui-column gui-align-items-center" @click="handleCollect">
								<text class="gui-icons gui-h3 gui-m-b-5" v-if="isCollect">&#xe605;</text>
								<text class="gui-icons gui-h3 gui-m-b-5" v-else>&#xe6ad;</text>
								<text class="gui-text-small">{{ trackStaVo?.collectStatNum || 0 }}</text>
							</view>
							<!-- 评论 -->
							<view class="gui-flex gui-column gui-align-items-center" @click="handleComment">
								<text class="gui-icons gui-h3 gui-m-b-5">&#xe6b8;</text>
								<text class="gui-text-small">{{ trackStaVo?.commentStatNum || 0 }}</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<!-- <view class="gui-flex gui-space-around gui-bg-white gui-m-t-30 gui-p-t-30  gui-p-l-30 gui-p-r-30 gui-bg-white">
						<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center">
							<text class="gui-icons gui-block gui-m-r-5">&#xe6b8;</text>
							<text>我要评价</text>
						</view>
						<view class="gui-flex gui-flex1 gui-justify-content-end"><gui-star></gui-star></view>
					</view> -->
						<CommentList :albumId="albumId" :trackId="audios.trackId" :style="{ height: scrollHeight  + 'px' }"></CommentList>
<!--					<scroll-view scroll-y :style="{ height: scrollHeight  + 'px' }" class="gui-border-box  gui-p-l-30 gui-p-r-30 gui-bg-white">-->
<!--						<CommentList :albumId="albumId"></CommentList>-->
<!--					</scroll-view>-->
					<view class="">

					</view>
				</swiper-item>
			</swiper>
		</view>
		<uni-popup
			ref="albumPopupRef"
			safeArea
			type="bottom"
			backgroundColor="#fff"
		>
			<view class="header">
				<view class="title">播放列表</view>
				<view class="cancel-btn" @click="closeAlbumPopup">取消</view>
			</view>
			<z-paging
				ref="zPagingRef"
				:paging-style="{height: '500px'}"
				v-model="audioList"
				@query="getAblumAudioList"
				:fixed="false">
				<view class="audio-list">
					<view
						class="gui-list-items "
						v-for="item in audioList"
						:key="item.trackId"
						@click="changeAudio(item)"
						>
						<view class="gui-relative track-item-sort">
							<view
								:class="item?.trackId == audios.trackId ? 'track-item-title-checked' : 'gui-color-grey1'"
								class=" gui-h5">{{ item.orderNum + 1 }}</view>
						</view>
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title">
								<text :class="item?.trackId == audios.trackId ? 'track-item-title-checked' : 'gui-primary-text '" class="gui-list-title-text gui-ellipsis">{{item.trackTitle}}</text>
							</view>
							<view class="gui-color-gray gui-flex gui-text-small gui-flex gui-align-items-center gui-m-t-20">
								<text v-if="item?.trackId == audios.trackId" class="gui-icons gui-block gui-m-r-10">&#xe64b;</text>
								<text v-else class="gui-icons gui-block gui-m-r-10">&#xe649;</text>
								<text class="gui-block gui-m-r-20">{{ item.playStatNum }}</text>
								<text class="gui-icons gui-block gui-m-r-10">&#xe6b8;</text>
								<text class="gui-block gui-m-r-20">{{ item?.albumCommentStatNum }}</text>
								<text class="gui-icons gui-block gui-m-r-10">&#xe607;</text>
								<text class="gui-block">{{ formatTime(item.mediaDuration)  }}</text>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
import graceJS from '@/Grace6/js/grace.js';
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import { albumsService } from "../../api"
import {
  TrackInfoInterface,
	TrackStaVoInterface,
	TrackInterface,
} from "../../api/albums/interfaces"
import { ref, computed, onMounted, reactive } from 'vue';
import { onLoad } from "@dcloudio/uni-app"
import { formatTime } from '../../utils/utils'
import { usePlayerStore } from "../../stores/player"
import { CommentInterface } from "../../api/comment/interfaces"

const props = defineProps({
	albumId: {
		type: String,
		required: true,
	}
})
const playerStore = usePlayerStore()
const systemHeight = ref(0);
const swiperHeight = computed(() => {
	return systemHeight.value - uni.upx2px(113);
});
const scrollHeight = computed(() => {
	return systemHeight.value - uni.upx2px(113) - uni.upx2px(135);
});
const currentIndex = ref(0);

// 初始化背景音频控件
const bgAudioManager = uni.getBackgroundAudioManager();

const isCollect = ref<boolean>(false)
// 音频相关信息
let trackInfo = ref<TrackInfoInterface>()
// 音频统计信息
let trackStaVo  = ref<TrackStaVoInterface>()
// 专辑信息
let album = ref()
// 音频相关参数
const audios = reactive({
	/** 音频总时长 */
	duration: '00:00',
	/** 当前进度 */
	currentTime: '00:00',
	/** 音频播放状态 */
	playStatus: false,
	/** 正在播放的音频id */
	trackId: 0,
	/** 专辑id */
	albumId: 0,
	/** 跳转进度 */
	breakSecond: 0
})

/** 声音列表 */
const audioList = ref<TrackInterface[]>([])

// 进度条相关参数
const sliders =  reactive({
	/** 是否正在拖动进度条 */
	isDraging: false,
	/** 进度条时间 */
	progressTime: 0,
	/** 进度条总长度 */
	max: 0,
})

const albumPopupRef = ref()

const navchange = index => {
	currentIndex.value = index;
};

/**
 * @description 打开popup
 */
 const openAlbumPopup = () => {
  albumPopupRef.value.open()
}
/**
 * @description 关闭popup
 */
const closeAlbumPopup = () => {
  albumPopupRef.value.close()
}

/**
 * @description: 进度条改变事件
 * @returns {*}
 */
const sliderChange = (e) => {
	// 拖动slider的值
	const position = e.detail.value
	seekAudio(position)
}

/**
 * @description: 开始拖动进度条事件
 * @returns {*}
 */
const handleSliderMoveStart = () =>  {
	sliders.isDraging = true
}
/**
 * @description: 结束拖动进度条时间
 * @returns {*}
 */
const handleSliderMoveEnd = () => {
	sliders.isDraging = false
}

/**
 * 音频跳转
 */
 const seekAudio = (position: number) => {
	bgAudioManager.seek(position)
	// 修改当前进度
	audios.currentTime = formatTime(position)
	sliders.progressTime = position
}

/**
 * @description: 路由跳转到上一页
 * @returns {*}
 */
const handleJump = () => {
	uni.navigateBack()
}
/**
 * @description 切换音频事件
 */
const changeAudio = (item: TrackInterface) => {
	// 判断是不是播放的同一个音频
	if(item.trackId !== audios.trackId) {
		getTrackInfo(item.trackId)
	}
}
/**
 * @description: 切换上一首音频
 * @returns {*}
 */
const prevAudio = () => {
	// 判断是不是第一首，是则提示
	const firstId = audioList.value[0]?.trackId
	if (firstId === audios.trackId) {
		uni.showToast({
			title : "当前已经是第一首了",
			icon  : "none"
		})
		return;
	}
	// 获取上一首的id
	console.log(audios.trackId);
	// 从播放列表寻找
	let id = 0;
	audioList.value.forEach((item, index) => {
		if (item.trackId === audios.trackId) {
			id = audioList.value[index - 1]?.trackId
		}
	})

	getTrackInfo(id)
}
 /**
 * @description: 切换下一首音频
 * @returns {*}
 */
const nextAudio = () => {
	// 判断是不是最后一首。是则提示
	const len = audioList.value.length
	const lastId = audioList.value[len - 1]?.trackId
	if (lastId === audios.trackId) {
		uni.showToast({
			title : "当前播放列表已是最新的了，请加载更多",
			icon  : "none"
		})
		return;
	}
	// 获取下一首的id
	console.log(audios.trackId);
	// 从播放列表寻找
	let id = 0;
	audioList.value.forEach((item, index) => {
		if (item.trackId === audios.trackId) {
			id = audioList.value[index + 1]?.trackId
		}
	})
	getTrackInfo(id)
}
/**
 * @description: 修改音频地址
 * @returns {*}
 */
const createBgAudioManager = () => {
	// 音频测试地址
	// innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
	if (bgAudioManager) {

		// 若原先的音频未暂停，则先暂停
		if (!bgAudioManager.paused) {
			// stop和pause是不一样的，stop直接停止播放，然后从头开始
			bgAudioManager.stop();
    }
		bgAudioManager.title = trackInfo.value?.trackTitle;
		bgAudioManager.coverImgUrl = trackInfo.value?.coverUrl
		// 设置了src以后会自动播放
		bgAudioManager.src = trackInfo.value?.mediaUrl;
		// bgAudioManager.autoplay = true;
		initAudio(bgAudioManager)
	}
}
/**
 * @description: 暂停音频
 * @returns {*}
 */
const pauseAudio = () => {
	bgAudioManager.pause() // 停止
}

/**
 * @description: 播放音频
 * @returns {*}
 */
const playAudio = () => {
	bgAudioManager.play() // 播放
}

/**
 * @description: 初始化音频相关的方法
 * @param {*} ctx
 * @returns {*}
 */
const initAudio = (ctx: any) => {
	ctx.onTimeUpdate(() => {
		// 当拖动进度条的时候不需要更新进度，使用seek方法
		if(!sliders.isDraging) {
			// 获取当前进度
			const currentTime:number = ctx.currentTime
			// 跟新音频进度和slider进度
			if (currentTime) {
				sliders.progressTime = ctx.currentTime
				audios.currentTime = formatTime(currentTime);
			}
		}
	})
	ctx.onCanplay(() => {

		setTimeout(() => {
			console.log('音频长度', bgAudioManager.duration);
			// 音频长度,时分秒格式
			const duration = bgAudioManager.duration
			audios.duration = formatTime(duration);
			// 进度条长度=音频长度
			sliders.max = duration
		}, 300)
	})
	ctx.onPlay(() => {
		audios.playStatus = true
		playerStore.changePlayStatus(true)
		// 跳转进度
		seekAudio(audios.breakSecond)
		// 上报播放进度
		setInterval(async() => {
			// 每10秒请求一次接口
			const params = {
				albumId: audios.albumId,
				trackId: audios.trackId,
				breakSecond: sliders.progressTime
			}
			if (bgAudioManager.paused) return
			await albumsService.updateListenProcess(params)
		}, 10000); // 定时器每10秒触发一次
	})
	ctx.onPause(() => {
		audios.playStatus = false
		playerStore.changePlayStatus(false)
	})
	ctx.onEnded(() => {
		// 播放结束自动切换到下一首歌
		nextAudio()
	})
	ctx.onError(() => {
		audios.playStatus = false
		playerStore.changePlayStatus(false)
	})
}

/**
 * @description: 评论
 * @returns {*}
 */
const handleComment = () => {
	currentIndex.value = 1
}

/**
 * @description: 是否收藏声音
 * @returns {*}
 */
const getIsCollect = async () => {
	const res: any = await albumsService.isCollectTrack(audios.trackId)
	isCollect.value = res.data
}

/**
 * @description: 收藏
 * @returns {*}
 */
const handleCollect = async () => {
	const res: any = await albumsService.collectTrack(audios.trackId)
	isCollect.value = res.data
	uni.showToast({
		title: !res.data ? '取消收藏成功' : '收藏成功',
		icon: 'none'
	})
}
/**
 * @description: 获取专辑声音详情信息
 * @returns {*}
 */
 const getTrackInfo = async (trackId: number) => {
  try {
    const res = await albumsService.getTrackInfo(trackId)
		trackInfo.value = res.data
		audios.trackId = res.data?.id as number;
		createBgAudioManager()
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description: 获取专辑声音统计信息
 * @param {*} id
 * @returns {*}
 */
const getTrackStatVo = async () => {
	try {
		const res = await albumsService.getTrackStaVo(audios.trackId)
		trackStaVo.value = res.data
	} catch(error) {
		console.log(error)
	}
}

/**
 * @description: 获取专辑声音列表信息
 * @returns {*}
 */
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const getAblumAudioList = async (page:number, limit:number) => {
	const params = {
		page,
		limit,
		albumId: audios.albumId
	}
	const res = await albumsService.getAlbumTrackList(params)
	// audioList.value = res.data.records
	zPagingRef.value.complete(res.data.records)
}

/**
 * @description: 获取专辑详情信息
 * @returns {*}
 */
const getAlbumDetail = async(id: number) => {
	const res = await albumsService.getAlbumInfo(id)
	album.value = res.data
}

/**
 * @description: 获取专辑详情信息
 * @returns {*}
 */
const getBreakSecond = async() => {
	const res: any = await albumsService.getTrackBreakSecond(audios.trackId)
	audios.breakSecond = res.data
}

onLoad(async (options: any) => {
	console.log('options', options);
	if (JSON.stringify(options) !== "{}") {
		audios.trackId = options.trackId
		audios.albumId = options.albumId
	} else {
		// 如果不是从单集点击进来的，请求接口，播放最近播放的一次历史
		const { data } = await albumsService.getLatelyTrack()
		audios.trackId = data.trackId
		audios.albumId = data.albumId
	}
	// 获取上次播放的声音
	getBreakSecond()
	// 获取专辑详情
	getAlbumDetail(audios.albumId)
	// 获取音频详情
	getTrackInfo(audios.trackId)
	// 获取声音列表
	getAblumAudioList(1, 10)
	// 获取音频统计信息
	getTrackStatVo()
	// 是否收藏
	getIsCollect()
})

onMounted(() => {
	var systemInfo = graceJS.system();
	systemHeight.value = systemInfo.safeArea.height;
});
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

.audio-list {
	height: 500px;
	width: 100%;
	overflow-y: auto;
	padding: 0 16rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	background-color: #fff;
	color: #333;
	height: 50px;
	line-height: 50px;
	padding: 0 32rpx;
}

.track-item-checked{
	background-color: #f5f5f5;
}
.track-item-title-checked{
	color: #ff0036;
}
</style>
