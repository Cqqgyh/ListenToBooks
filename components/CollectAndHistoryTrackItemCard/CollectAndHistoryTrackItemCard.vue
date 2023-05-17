<template>
 <uni-card margin="5px" padding="5px" spacing="3px">
  <view class="gui-list-items" >
   <view @click="handleJump" class="gui-list-image gui-relative">
    <image
      class="gui-list-image"
      mode="aspectFill"
      :src="data.coverUrl"
    ></image>
   </view>
   <view @click="handleJump" class="gui-list-body gui-border-b text-container">
    <view class="gui-list-title">
     <text class="gui-text gui-block gui-secondary-text gui-text-left gui-ellipsis"
     >{{data.trackTitle}}</text
     >
    </view>
    <text v-if="mode === 'collect'" class="gui-list-body-desc gui-color-gray gui-ellipsis">收藏于:{{ data.createTime.slice(0, 10) }}</text>
    <text v-if="mode === 'history'" class="gui-list-body-desc gui-color-gray gui-ellipsis">专辑:{{ data.albumTitle }}</text>
    <view v-if="mode === 'history'" class="gui-flex gui-align-items-center">
     <uni-icons   custom-prefix="iconfont" type="shichang" class="gui-m-r-10" size="15"></uni-icons>
     <text class="gui-list-body-desc gui-color-gray gui-ellipsis">{{ formatTime(data.mediaDuration) }}</text>
     <text class="gui-list-body-desc gui-ellipsis gui-m-l-15 gui-color-orange2">已播 {{ data.playRate }}</text>
    </view>
   </view>
   <uni-icons  @click="cancelPopUpRef.open()" custom-prefix="iconfont" type="shanchu" class="gui-m-r-10" size="15"></uni-icons>
  </view>
 </uni-card>
 <!-- 弹窗-->
 <uni-popup ref="cancelPopUpRef" type="dialog">
  <uni-popup-dialog
    :type="popSetting.type"
    :cancelText="popSetting.cancelText"
    :confirmText="popSetting.confirmText"
    :title="popSetting.title"
    :content="popSetting.content"
    @confirm="() => handleCancel( mode=== 'collect' ? data.trackId as number : data.id as number)"
  ></uni-popup-dialog>
 </uni-popup>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import {
 CollectTrackInterface,
 DialogInterface,
 HistoryTrackInterface,
} from "../../api/albums/interfaces"
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue"
import { formatTime } from "../../utils/utils"
/* 响应式数据 */
const cancelPopUpRef= ref<InstanceType<typeof UniPopup>>()
const props = defineProps({
 // 分类导航
 data:{
  type: Object as PropType<CollectTrackInterface & HistoryTrackInterface>,
  required: true,
  default: () => {
   return {}
  }
 },
 deleteItemHandler: {
  type: Function,
  required: true,
  default: () => {}
 },
 handleCancel: {
  type: Function,
  default: () => {}
 },
 popSetting:{
  type: Object as PropType<DialogInterface>,
  required: true,
  default: () => {
   return {
    type: "error",
    title: "注意",
    content: "你确定要取消订阅吗？",
    cancelText: "取消",
    confirmText: "确认"
   } as DialogInterface
  }
 },
 mode: {
  type: String,
  default: "collect"
 },
 jumpRoute: {
  type: String,
  required: true,
 }
})
// 分类导航

/* 方法 */
const handleCancel = async (albumId: number | string) => {
 try {
  const res = await props.handleCancel(albumId)
  // const res = await albumsService.isCollectTrack(albumId)
  // 通知父组件删除这个数据
  props.deleteItemHandler(albumId)
 } catch (error) {
 }
}
// 跳转
const handleJump = () => {
 uni.navigateTo({
  url: `${props.jumpRoute}?albumId=${props.data.albumId}&trackId=${props.data.trackId}`
 })
}
// 打开弹窗

/* 生命周期 */
</script>

<style lang="scss" scoped>
.gui-list-image {
 width: 140rpx;
 height: 140rpx;
 border-radius: 10rpx;
 font-size: 0;
}
.text-container{
 padding:5rpx 0;
 margin: 0 30rpx;
}
</style>
