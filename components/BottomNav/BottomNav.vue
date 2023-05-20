<template>
 <!-- 普通模式 -->
 <view style="padding-top: 50rpx" class="gui-relative">
  <gui-flex :customClass="['gui-footer']" direction="row" :wrap="false" alignItems="center">
   <view class="gui-footer-icon-buttons" @tap="navChange(0)">
    <text :class="[currentIndex == 0 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block']">&#xe608;</text>
    <text :class="[currentIndex == 0 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">首页</text>
   </view>
   <view class="gui-footer-icon-buttons" @tap="navChange(1)">
    <text :class="[currentIndex == 1 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block', 'iconfont']">
     &#xe7d5;
    </text>
    <text :class="[currentIndex == 1 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">直播</text>
   </view>
   <view class="gui-footer-icon-buttons"></view>
   <view class="gui-footer-icon-buttons" @tap="navChange(3)">
    <text :class="[currentIndex == 3 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block', 'iconfont']">
     &#xe6ae;
    </text>
    <text :class="[currentIndex == 3 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">排行榜</text>
   </view>
   <view class="gui-footer-icon-buttons" @tap="navChange(4)">
    <text :class="[currentIndex == 4 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-icon', 'gui-block']">&#xe6fe;</text>
    <text :class="[currentIndex == 4 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">我的</text>
   </view>
  </gui-flex>
  <view class="gui-footer-buttons-ab" @tap="navChange(2)">
   <text
     :class="[
							currentIndex == 2 ? 'gui-primary-color' : 'gui-color-gray',
              playerStore.playing ? 'playing' : '',
							'gui-footer',
							'gui-icons',
							'gui-footer-buttons-ab-icon',
							'gui-block',
							'gui-dark-bg-level-2'
						]"
   >
    &#xe648;
   </text>
   <text :class="[currentIndex == 2 ? 'gui-primary-color' : 'gui-color-gray', 'gui-icons', 'gui-footer-icon-buttons-text', 'gui-block']">听专辑</text>
  </view>
 </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app"
import { onMounted, ref } from "vue"
import { getCurrentPageInfo } from "../../utils/utils"
import { usePlayerStore } from "../../stores/player"

const playerStore = usePlayerStore()
// 引入路由
const pages = getCurrentPageInfo()
/* 响应式数据 */
const currentIndex = ref(0);
const navListInfo = ref([
 {
  index: 0,
  path: "/pages/index/index"
 },
 {
  index: 1,
  path: "/pages/live/live"
 },
 {
  index: 2,
  path: `/pages/player/player`
 },
 {
  index: 3,
  path: "/pages/rank/rank"
 },
 {
  index: 4,
  path: "/pages/my/my"
 }
])
// 分类导航

/* 方法 */
// 切换导航
const navChange = (index: number) => {
 currentIndex.value = index;
 uni.navigateTo({
    url: navListInfo.value[index].path
  });
};
/* 生命周期 */
// 挂载时显示正确活动的导航
onMounted(() => {
 console.log('navListInfo.value.find((item) => item.path == pages.route)?.index || 0',navListInfo.value.find((item) => item.path == pages.route)?.index || 0)
 currentIndex.value = navListInfo.value.find((item) => item.path == pages.route)?.index || 0
});
onShow(() => {
 console.log('navListInfo.value.find((item) => item.path == pages.route)?.index || 0',navListInfo.value.find((item) => item.path == pages.route)?.index || 0)
 currentIndex.value = navListInfo.value.find((item) => item.path == pages.route)?.index || 0
})
</script>

<style lang="scss" scoped>

@keyframes rotation{
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
.playing {
  animation: rotation 6.5s linear infinite;
}
</style>

