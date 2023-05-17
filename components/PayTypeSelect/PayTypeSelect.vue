<template>
 <gui-popup  ref="popupRef" position="bottom">
  <view class="uni-popup-share">
   <view class="uni-share-title"><text class="uni-share-title-text">支付方式</text></view>
   <view class="uni-share-content">
    <view class="uni-share-content-box">
     <template
       v-for="(item,index) in bottomData"
       :key="index">
      <view
        v-if="item.isShow"
        @click="handleSelect(item)"
        class="uni-share-content-item"
       >
       <image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
       <text class="uni-share-text">{{item.text}}</text>
      </view>
     </template>

    </view>
   </view>
   <view class="uni-share-button-box">
    <button class="uni-share-button" @click="close">取消</button>
   </view>
  </view>
 </gui-popup>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import GuiPopup from "../../Grace6/components/gui-popup.vue"
import { PAY_WAY_MAP } from "../../utils/constant"
import { useOrderStore } from "../../stores/order"
/* 响应式数据 */
const popupRef = ref<InstanceType<typeof GuiPopup>>()
const props = defineProps({
 wechatSetting:{
  // payMode 支付模式 0正常订单支付 1通过订单号支付
  type: Object as PropType<{isShow:boolean,payMode?: 0 | 1}>,
  default: () => ({ isShow: true, payMode:0})
 },
 alipaySetting:{
  // payMode 支付模式 0正常订单支付 1通过订单号支付
  type: Object as PropType<{isShow:boolean,payMode?: 0 | 1}>,
  default: () => ({ isShow: true, payMode:0})
 },
 balanceSetting:{
  // payMode 支付模式 0正常订单支付 1通过订单号支付
  type: Object as PropType<{isShow:boolean,payMode?: 0 | 1}>,
  default: () => ({ isShow: true, payMode:0})
 },
})
const orderStore = useOrderStore()
const bottomData = ref([
 {
  text: '微信',
  icon: '../../static/weixin.png',
  payWay: PAY_WAY_MAP.WeChat,
  isShow: props.wechatSetting?.isShow,
  payMode: props.wechatSetting?.payMode
 },
 {
  text: '支付宝',
  icon: '../../static/zhifubao.png',
  payWay: PAY_WAY_MAP.Alipay,
  isShow: props.alipaySetting?.isShow,
  payMode: props.alipaySetting?.payMode
 },
 {
  text: '余额',
  icon: '../../static/logo.png',
  payWay: PAY_WAY_MAP.Balance,
  isShow: props.balanceSetting?.isShow,
  payMode: props.balanceSetting?.payMode
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
  // 设置订单支付方式
  orderStore.setOrderPayWay(item.payWay)
  // 调起支付
  // 判断支付模式
 if (item.payMode === 0 || item.payMode === undefined){
  orderStore.submitOrder()
 } else if (item.payMode === 1){
  orderStore.submitOrderForOrderNumber()
 }
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
