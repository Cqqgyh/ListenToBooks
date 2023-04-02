<template>
  <gui-page :customHeader="true" :fullPage="true" :isHeaderSized="false" :customFooter="true">
    <!-- 自定义头部导航 -->
    <template v-slot:gHeader>
      <!-- 返回按钮 -->
      <view class="gui-flex gui-row gui-nowrap gui-align-items-center" style="height: 44px">
        <gui-header-leading></gui-header-leading>
      </view>
    </template>
    <template v-slot:gBody>
      <view class="gui-flex1">
        <!-- 背景图片 -->
        <image
          src="https://images.unsplash.com/photo-1663615280810-81f2f47f3b23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxODh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          class="bgimg"
        ></image>
        <!-- 列表主体 -->
        <view
          class="ranking-list gui-absolute-lt gui-bg-gray gui-dark-bg-level-3"
          :style="{
            top: '440rpx',
            left: '30rpx',
            height: mainHeight + 'px',
          }"
        >
          <!-- 头部个人信息 -->
          <view style="margin-top: 38rpx" :style="{ height: accStatus ? '280rpx' : '160rpx' }">
            <gui-switch-navigation
              :items="[
                { id: 0, name: '全部' },
                { id: 1, name: '推荐' },
              ]"
              textAlign="center"
              :isCenter="true"
              activeDirection="center"
              :size="0"
              :margin="20"
              padding="30rpx"
              activeLineHeight="4rpx"
            ></gui-switch-navigation>
            <gui-accordion-card :status="accStatus" @open="accStatus = true" @close="accStatus = false">
              <template v-slot:title>
                <view class="gui-flex gui-nowrap gui-components-list-title gui-space-between gui-m-l-30 gui-m-r-30">
                  <gui-tags text="综合排序" :borderRadius="50"></gui-tags>
                  <gui-tags text="播放最多" :customClass="['gui-bg-gray', 'gui-color-black']" :size="26"></gui-tags>
                  <gui-tags text="最近更新" :customClass="['gui-bg-gray', 'gui-color-black']" :size="26"></gui-tags>
                  <text
                    :class="[accStatus ? 'gui-primary-color' : 'gui-color-gray']"
                    class="gui-components-list-icon gui-icons"
                    >&#xe61f;</text
                  >
                </view>
              </template>
              <template v-slot:body>
                <view class="gui-flex gui-row gui-wrap gui-m-l-20 gui-m-r-20">
                  <gui-tags
                    text="全部分类"
                    :customClass="['gui-bg-gray', 'gui-color-black']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                  <gui-tags
                    text="有声小说"
                    :customClass="['gui-bg-red', 'gui-color-white']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                  <gui-tags
                    text="儿童"
                    :customClass="['gui-bg-gray', 'gui-color-black']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                  <gui-tags
                    text="人文国学"
                    :customClass="['gui-bg-gray', 'gui-color-black']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                  <gui-tags
                    text="出版小说"
                    :customClass="['gui-bg-gray', 'gui-color-black']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                  <gui-tags
                    text="人物传记"
                    :customClass="['gui-bg-gray', 'gui-color-black']"
                    :size="26"
                    :lineHeight="1"
                  ></gui-tags>
                </view>
              </template>
            </gui-accordion-card>
          </view>
          <view class="ranking-lists">
            <scroll-view :scroll-y="true" :style="{ height: mainHeight - 120 + 'px' }">
              <view
                class="gui-card-view gui-bg-white gui-dark-bg-level-3 gui-margin-top gui-box-shadow"
                v-for="index in 20"
                :key="index"
              >
                <view class="gui-card-body gui-border-b gui-flex gui-rows gui-nowrap">
                  <image
                    mode="aspectFill"
                    src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
                    class="gui-card-img"
                  ></image>
                  <view class="gui-card-desc">
                    <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
                      <text class="gui-card-name gui-primary-text gui-ellipsis">
                        <text class="gui-text-small gui-primary-color gui-m-r-10">完结</text>百年孤独 |
                        马克思传世名著(王明军演播)</text
                      >
                    </view>
                    <text
                      class="gui-card-text gui-block gui-secondary-text gui-ellipsis-line2"
                      style="margin-top: 10rpx"
                      >马尔克斯首部中文有声书，王明军演播马尔克斯首部中文有声书，王明军演播马尔克斯首部中文有声书，王明军演播</text
                    >
                  </view>
                </view>
                <view class="gui-card-footer gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
                  <text class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe649; 2098.2万</text>
                  <text class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe800; 76集</text>
                  <text class="gui-icons gui-color-gray gui-card-footer-item">&#xe61e; 详情</text>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </template>

    <template v-slot:gFooter>
      <view style="padding-top: 50rpx" class="gui-relative">
        <view class="gui-footer-buttons-ab">
          <text
            :class="[
              currentIndex == 2 ? 'gui-primary-color' : 'gui-bg-black-opacity2',
              'gui-footer',
              'gui-icons',
              'gui-footer-buttons-ab-icon',
              'gui-block',
              'gui-dark-bg-level-2',
            ]"
          >
            &#xe648;
          </text>
          <text
            :class="[
              currentIndex == 2 ? 'gui-primary-color' : 'gui-bg-black-opacity2',
              'gui-icons',
              'gui-footer-icon-buttons-text',
              'gui-block',
            ]"
            >听专辑</text
          >
        </view>
      </view>
    </template>
  </gui-page>
</template>
<script>
import graceJS from "@/Grace6/js/grace.js"
export default {
  data() {
    return {
      mainHeight: 300,
      accStatus: false,
    }
  },
  onLoad: function () {
    var systemInfo = graceJS.system()
    this.mainHeight = systemInfo.windowHeight - uni.upx2px(500)
  },
  methods: {},
}
</script>
<style scoped>
.bgimg {
  width: 750rpx;
  height: 750rpx;
}
.ranking-list {
  width: 690rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.ranking-lists {
  padding: 25rpx;
}

/* 卡片视图 */
.gui-card-view {
  padding: 25rpx;
  margin: 0 30rpx;
  margin-top: 30rpx;
}
.gui-card-body {
  padding-bottom: 30rpx;
}
.gui-card-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 80rpx;
}
.gui-card-desc {
  width: 400rpx;
  margin-left: 25rpx;
  flex: 1;
}
.gui-card-name {
  font-size: 28rpx;
  line-height: 40rpx;
  margin-right: 20rpx;
}
.gui-card-text {
  line-height: 40rpx;
  font-size: 24rpx;
}
.gui-card-footer {
  margin-top: 25rpx;
}
.gui-card-footer-item {
  width: 100rpx;
  text-align: center;
  flex: 1;
  line-height: 38rpx;
  font-size: 26rpx;
}
/* #ifndef APP-NVUE */
.gui-card-footer-item {
  display: block;
}
.gui-box-shadow {
  box-shadow: 0px 0px 3rpx #999999;
}
/* #endif */
</style>
