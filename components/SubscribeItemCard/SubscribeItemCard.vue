<template>
<uni-card margin="5px" padding="5px" spacing="3px">
 <view  class="gui-list-items">
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
    >{{data.albumTitle}}</text
    >
   </view>
   <text class="gui-list-body-desc gui-color-gray gui-ellipsis">最后更新时间:{{ data.createTime.slice(0, 10) }}</text>
   <gui-tags
     v-if="data?.isFinished === '1'"
     text="完结"
     :size="22"
     :width="50"
     borderColor="#FF0036"
     :customClass="['gui-transparent-bg', 'gui-color-red', 'gui-m-t-10']"
   ></gui-tags>
  </view>
  <uni-icons  @click="cancelSubscribePopUpRef.open()" custom-prefix="iconfont" type="shanchu" class="gui-m-r-10" size="15"></uni-icons>
 </view>
</uni-card>
 <!-- 弹窗-->
 <uni-popup ref="cancelSubscribePopUpRef" type="dialog">
  <uni-popup-dialog
    :type="popSetting.type"
    :cancelText="popSetting.cancelText"
    :confirmText="popSetting.confirmText"
    :title="popSetting.title"
    :content="popSetting.content"
    @confirm="() => handleCancel(data.albumId)"
  ></uni-popup-dialog>
 </uni-popup>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import { DialogInterface, SubscribeAlbumsInterface } from "../../api/albums/interfaces"
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue"
/* 响应式数据 */
const  cancelSubscribePopUpRef= ref<InstanceType<typeof UniPopup>>()
const props = defineProps({
 // 分类导航
 data:{
  type: Object as PropType<SubscribeAlbumsInterface>,
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
 jumpRoute: {
  type: String,
  required: true,
 }
})
// 分类导航

/* 方法 */
const handleCancel = async (albumId: number) => {
 console.log("取消订阅",albumId)
 try {
  const res = await props.handleCancel(albumId)
  console.log('res',res)
  // 通知父组件删除这个数据
  props.deleteItemHandler(albumId)
 } catch (error) {
 }
}
// 跳转
const handleJump = () => {
 // 如果存在id，拼接id
 let id = props.data.albumId ? `?id=${props.data.albumId}` : ""
 uni.navigateTo({
  url: props.jumpRoute + id
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
