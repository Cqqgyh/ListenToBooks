<template>
  <gui-page>
    <template v-slot:gBody>
      <!-- 顶部个人信息 -->
      <view class="gui-list gui-padding gui-border-b-gray">
        <view class="gui-list-items">
          <view class="gui-list-image ucenter-face gui-relative">
            <image
              class="gui-list-image ucenter-face-image"
              src="https://images.unsplash.com/photo-1662695094714-966fc339a2e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
              mode="aspectFill"
            ></image>
          </view>
          <view class="gui-list-body">
            <view class="gui-list-title">
              <text clagui-paddingss="gui-list-title-text gui-primary-color">用户昵称</text>
            </view>
            <text class="gui-list-body-desc gui-color-gray gui-block">描述信息或签名信息</text>
          </view>
          <view class="vip-channel">
            <text class="vip-channel-text gui-text-small gui-color-gray">立即开通</text>
          </view>
        </view>
        <!-- 线条 -->
        <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
          <view class="gui-title-line gui-flex-grow line"></view>
        </view>
        <!-- 特权 -->
        <view class="gui-margin-top gui-flex gui-rows gui-nowrap gui-space-between">
          <view class="vip-privilege"  v-for="(item,index) in 4" :key="item">
            <view class="">
              <image
                class="gui-list-image"
                src="https://images.unsplash.com/photo-1662695094714-966fc339a2e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                mode="aspectFill"
              ></image>
            </view>
            <view class="gui-text-small"> 精品免费听 </view>
            <view class="gui-text-small"> 部分节目独享 </view>
          </view>

        </view>
      </view>
    </template>
  </gui-page>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.vip-channel {
  background-color: #dcac80;
  padding: 5rpx 15rpx;
  border-radius: 30rpx;
  .vip-channel-text {
    color: #744c28;
  }
}
.line {
  background-color: #edcaa8;
}
.vip-privilege {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: yellowgreen;
  font-size: 24rpx;
}
/* 如果购物车放在 switch 页面并且是 h5 端请打开注释启用下面的样式 */
/* #ifdef H5 */
/* .gui-shoppingcard-footer{bottom:50px;} */
/* #endif */
</style>
