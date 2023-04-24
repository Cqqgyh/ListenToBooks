<template>
 <gui-popup  ref="popupRef" position="bottom">
  <view class="uni-popup-share">
   <view class="uni-share-title"><text class="uni-share-title-text">支付方式</text></view>
   <view class="uni-share-content">
    <view class="uni-share-content-box">
     <view
       @click="handleSelect(item)"
       class="uni-share-content-item"
       v-for="(item,index) in bottomData"
       :key="index">
      <image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
      <text class="uni-share-text">{{item.text}}</text>
     </view>

    </view>
   </view>
   <view class="uni-share-button-box">
    <button class="uni-share-button" @click="close">取消</button>
   </view>
  </view>
 </gui-popup>
</template>
<script setup lang="ts">
import { ref } from "vue"
import GuiPopup from "../../Grace6/components/gui-popup.vue"
/* 响应式数据 */
const popupRef = ref<InstanceType<typeof GuiPopup>>()
const bottomData = ref([
 {
  text: '微信',
  icon: '../../static/weixin.png',
  payWay: '1101'
 },
 {
  text: '支付宝',
  icon: '../../static/zhifubao.png',
  payWay: '1102'
 },
 {
  text: '余额',
  icon: '../../static/logo.png',
  payWay: '1103'
 }
])
// 分类导航

/* 方法 */
// 打开弹窗
const open = () => {
 console.log('支付方式弹窗弹出')
  popupRef.value.open()
}
// 关闭弹窗
const close = () => {
  popupRef.value.close()
}
// 点击选择
const handleSelect = (item: any) => {
  console.log(item)
  close()
}
// 对父组件暴露出去
defineExpose({ open, close })
/* 生命周期 */
</script>

<style lang="scss" >
.uni-popup-share {
 background-color: #fff;
 border-top-left-radius: 11px;
 border-top-right-radius: 11px;
}
.uni-share-title {
 /* #ifndef APP-NVUE */
 display: flex;
 /* #endif */
 flex-direction: row;
 align-items: center;
 justify-content: center;
 height: 40px;
}
.uni-share-title-text {
 font-size: 14px;
 color: #666;
}
.uni-share-content {
 /* #ifndef APP-NVUE */
 display: flex;
 /* #endif */
 flex-direction: row;
 justify-content: center;
 padding-top: 10px;
}

.uni-share-content-box {
 /* #ifndef APP-NVUE */
 display: flex;
 /* #endif */
 flex-direction: row;
 flex-wrap: wrap;
 width: 360px;
}

.uni-share-content-item {
 width: 90px;
 /* #ifndef APP-NVUE */
 display: flex;
 /* #endif */
 flex-direction: column;
 justify-content: center;
 padding: 10px 0;
 align-items: center;
}

.uni-share-content-item:active {
 background-color: #f5f5f5;
}

.uni-share-image {
 width: 30px;
 height: 30px;
}

.uni-share-text {
 margin-top: 10px;
 font-size: 14px;
 color: #3B4144;
}

.uni-share-button-box {
 /* #ifndef APP-NVUE */
 display: flex;
 /* #endif */
 flex-direction: row;
 padding: 10px 15px;
}

.uni-share-button {
 flex: 1;
 border-radius: 50px;
 color: #666;
 font-size: 16px;
}

.uni-share-button::after {
 border-radius: 50px;
}
</style>
