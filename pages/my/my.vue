<template>
  <gui-page :customHeader="true" :headerClass="['gui-bg-green']" :customFooter="true">
    <template v-slot:gHeader>
      <view style="height: 44px" class="gui-flex">
        <view class="gui-flex gui-row gui-wrap gui-align-items-center gui-m-l-20">
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
            >&#xe666;</text
          >
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
            >&#xe67b;</text
          >
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1">&#xe613;</text>
        </view>
        <view style="width: 200rpx"></view>
      </view>
    </template>

    <template v-slot:gBody>
      <view class="gui-relative">
        <view class="gui-list gui-padding gui-bg-green gui-p-b-80">
          <view class="gui-list-items">
            <image
              mode="aspectFill"
              src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
              class="gui-card-img"
            ></image>
            <view class="gui-list-body">
              <view class="gui-card-desc">
                <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
                  <text class="gui-card-name gui-primary-text gui-h4 gui-bold">听友 1234567890</text>
                </view>
                <view class="gui-flex gui-row gui-text gui-m-t-10">
                  <view class="gui-flex gui-column gui-align-items-center">
                    <text>3</text>
                    <text>收听(小时)</text>
                  </view>
                  <view class="gui-flex gui-column gui-align-items-center gui-m-l-30 gui-m-r-30">
                    <text>30</text>
                    <text>粉丝</text>
                  </view>
                  <view class="gui-flex gui-column gui-align-items-center">
                    <text>8</text>
                    <text>关注</text>
                  </view>
                </view>
              </view>
            </view>
            <text class="gui-list-arrow-right gui-icons gui-color-gray">&#xe601;</text>
          </view>
        </view>

        <view class="gui-absolute-lb gui-bg-white gui-creation-live">
          <view class="gui-flex gui-row gui-nowrap gui-space-around gui-p-t-20">
            <view class="gui-flex gui-row gui-align-items-center">
              <text class="gui-icons gui-h3 gui-color-drak">&#xe666;</text>
              <text class="gui-p-l-10">创作中心</text>
            </view>
            <view class="gui-flex gui-row gui-align-items-center">
              <text class="iconfont gui-color-drak gui-h3">&#xe7d5;</text>
              <text class="gui-p-l-10">录音/直播</text>
            </view>
          </view>
        </view>
      </view>

      <view class="gui-grid gui-bg-white gui-dark-bg-level-3 gui-padding gui-m-t-20">
        <view class="gui-grid-item">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe634;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">VIP会员</text>
        </view>
        <view class="gui-grid-item">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe612;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">我的钱包</text>
        </view>
        <view class="gui-grid-item">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe62f;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">我的订单</text>
        </view>
        <view class="gui-grid-item">
          <text class="gui-grid-icon iconfont gui-color-gray">&#xe646;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">商城</text>
        </view>
        <view class="gui-grid-item">
          <text class="gui-grid-icon iconfont gui-color-gray">&#xe61b;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">全部服务</text>
        </view>
      </view>

      <view class="gui-bg-white gui-dark-bg-level-3 gui-padding">
        <gui-switch-navigation
          :items="navItems"
          textAlign="center"
          :size="120"
          activeDirection="center"
          lineHeight="50rpx"
          activeFontSize="46rpx"
          :activeLineClass="['gui-nav-scale', 'gui-gtbg-red']"
        ></gui-switch-navigation>

        <scroll-view scroll-y style="height: 620rpx" class="gui-p-t-20">
          <navigator class="gui-list-items" v-for="n in 20" :key="n">
            <view class="gui-list-image gui-relative">
              <text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white">VIP</text>
              <view
                class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20"
              >
                <text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe649;</text>
                <text>715万</text>
              </view>
              <image
                class="gui-list-image"
                mode="aspectFill"
                src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
              ></image>
              <view class="gui-badge-point"></view>
            </view>
            <view class="gui-list-body gui-border-b">
              <view class="gui-list-title">
                <text class="gui-text gui-block gui-secondary-text gui-text-left gui-ellipsis"
                  >武炼巅峰 | 热血玄乎爽文 | 多人协作 | 尽快订阅，优惠多多</text
                >
              </view>
              <text class="gui-list-body-desc gui-color-gray gui-ellipsis">23小时前更新 武炼巅峰 第944章 计谋用尽</text>
              <gui-tags
                text="完结"
                :size="22"
                :width="50"
                borderColor="#FF0036"
                :customClass="['gui-transparent-bg', 'gui-color-red', 'gui-m-t-10']"
              ></gui-tags>
            </view>
            <text class="gui-list-arrow-right iconfont gui-color-gray-light">&#xe73a;</text>
          </navigator>
        </scroll-view>
      </view>
    </template>

    <template v-slot:gFooter>
      <!-- 普通模式 -->
      <BottomNav></BottomNav>
    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { courseService } from '../../api'
import { onLoad } from '@dcloudio/uni-app'
const navItems = ref([
  { name: "追更", id: 0 },
  { name: "订阅", id: 1 },
  { name: "收藏", id: 2 },
  { name: "历史", id: 3 },
  { name: "下载", id: 4 },
])

const currentIndex = ref(4)
onLoad(async () => {
  console.log(1);

  // const res = courseService.findAllCategory1()
  // console.log(res);
})
</script>
<style scoped>
.gui-card-img {
  width: 150rpx;
  height: 150rpx;
  border-radius: 150rpx;
}

.gui-list-image {
  width: 150rpx;
  height: 150rpx;
  border-radius: 10rpx;
  font-size: 0;
}

.gui-creation-live {
  height: 80rpx;
  bottom: -20rpx;
  left: 50rpx;
  border-radius: 20rpx;
  width: 650rpx;
}
</style>
