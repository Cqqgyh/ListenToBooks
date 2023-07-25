<template>
  <gui-page>
    <template v-slot:gBody>
      <view class="gui-bg-yellow gui-m-30 gui-p-30 gui-border-radius">
        <text>账户余额</text>
        <view class="gui-flex gui-space-between gui-align-items-center">
          <view>
            <text>￥</text>
            <text class="gui-h1">{{ userStore.amount }}</text>
          </view>
          <view @click="investPopupRef.open()" class="gui-bg-white gui-p-30 gui-border-radius">
            <text class="gui-color-orange gui-bold">充 值</text>
          </view>
        </view>
      </view>

      <view class="gui-m-30">

        <navigator url="/pages/fund/fund?id=consume" class="gui-list-items">
          <view class="gui-list-body gui-border-b">
            <view class="gui-list-title">
              <text class="gui-list-title-text gui-list-one-line gui-primary-text">消费记录</text>
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
        </navigator>

        <navigator url="/pages/fund/fund?id=invest" class="gui-list-items">
          <view class="gui-list-body gui-border-b">
            <view class="gui-list-title">
              <text class="gui-list-title-text gui-list-one-line gui-primary-text">充值记录</text>
            </view>
          </view>
          <text class="gui-list-arrow-right gui-icons gui-color-gray-light">&#xe601;</text>
        </navigator>


      </view>
    </template>
  </gui-page>

  <!-- 弹出层，全集购买 -->
  <gui-popup ref="investPopupRef" position="bottom">
    <view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
      <text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeInvestPopup">&#xe610;</text>
      <text class="gui-h3 gui-block gui-p-t-20 gui-p-b-20 gui-text-center">充值</text>
      <view class="gui-flex gui-padding gui-wrap gui-row buy-track-container">

        <view
          v-for="(item,index) in investSettingsList"
          :key="index"
          @click="handleInvest(item)"
          class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
          <text class="gui-text-orange-opacity9 gui-block gui-padding gui-h6">{{ item.name }}</text>
        </view>
        <!--        自定义充值金额-->
        <view
          @click="openCustomAmountPopup"
          class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
          <text class="gui-block gui-padding gui-h6">自定义</text>
        </view>
      </view>

    </view>
  </gui-popup>
  <!-- 自定义金额 -->
  <uni-popup ref="customAmountPopupRef" type="dialog">
    <uni-popup-dialog
      ref="customAmountDialogRef"
      mode="input"
      title="自定义金额"
      value=""
      before-close
      placeholder="请输入正自然数"
      @confirm="handleCustomizeInvest"></uni-popup-dialog>
  </uni-popup>
</template>

<script setup lang="ts">
import GuiPopup from "../../Grace6/components/gui-popup.vue"
import { onMounted, ref } from "vue"
import { useOrderStore } from "../../stores/order"
import { useUserStore } from "../../stores/user"
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue"
import { useUpdateUserInfo } from "../../hooks/useUpdateUserInfo"
/* 响应式数据 */
const orderStore = useOrderStore()
const userStore = useUserStore()
const investPopupRef = ref<InstanceType<typeof GuiPopup>>()
const customAmountPopupRef = ref<InstanceType<typeof UniPopup>>()

// 充值选项
const investSettingsList = ref([
  {
    price: 10,
    name: "10元"
  },
  {
    price: 20,
    name: "20元"
  },
  {
    price: 30,
    name: "30元"
  },
  {
    price: 50,
    name: "50元"
  },
  {
    price: 100,
    name: "100元"
  }
])
// 分类导航

/* 方法 */
// 关闭重置弹窗
const closeInvestPopup = () => {
  investPopupRef.value.close()
}
// 充值
const handleInvest = (item: typeof investSettingsList.value[0]) => {
  console.log(item)
  // 关闭弹窗
  closeInvestPopup()
  // 调用支付
  orderStore.investAmount(item.price)
}
// 打开自定义金额弹窗，关闭其他弹窗
const openCustomAmountPopup = () => {
  closeInvestPopup()
  customAmountPopupRef.value.open()
}
// 自定义充值金额
const handleCustomizeInvest = (value: string) => {
  const amount = value.trim()
  const regex = /^[1-9]\d*$/
  if (regex.test(amount)) {
    // 关闭弹窗
    customAmountPopupRef.value.close()
    // 调用支付
    orderStore.investAmount(Number(amount))

  } else {
    // 弹出提示
    uni.showToast({
      title: "请输入正自然数",
      icon: "none"
    })
  }


}

onMounted(() => {
  // 更新余额信息
  userStore.getAccountBalance()
})

/* 生命周期 */
</script>

<style lang="scss">
.buy-card {
  width: 160rpx;
  text-align: center;
  margin: 10rpx;
}
</style>
