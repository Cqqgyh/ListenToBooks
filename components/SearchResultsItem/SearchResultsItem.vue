<template>
<uni-card padding="5rpx" @click="handleGoToDetails">
  <view class="gui-margin-top">
    <view class="gui-card-body gui-flex gui-rows gui-nowrap">
      <text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white" style="transform: scale(0.8)">{{ getNameByValue(PAY_TYPE,data.payType) }}</text>
      <image
        mode="aspectFill"
        :src="data.coverUrl"
        class="gui-card-img"></image>
      <view class="gui-card-desc">
        <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
<!--          <view-->
<!--            class="gui-primary-text gui-text-small gui-color-orange1 finished-flag">-->
<!--            {{getNameByValue(FINISH_TYPE,data.isFinished)}}-->
<!--          </view>-->
          <uni-icons
            v-if="data.isFinished === '1'"
            custom-prefix="iconfont"
            type="wanjie"
            color="#ff6e40"
            class="gui-m-r-5"
            size="25"></uni-icons>
          <view class="gui-card-name gui-primary-text gui-ellipsis">
            <rich-text :nodes="replaceTitle(data.albumTitle)"></rich-text>
          </view>
        </view>
        <!-- 副标题-->
        <view class="gui-flex gui-rows gui-nowrap gui-align-items-center gui-m-t-5">
          <text
            class="gui-primary-text gui-ellipsis gui-text-small gui-color-gray">
            {{data.albumIntro }}
          </text>
        </view>
        <view class="gui-flex gui-rows gui-nowrap gui-align-items-center gui-m-t-10">
          <view class="gui-m-r-20">
            <uni-icons custom-prefix="iconfont" type="shengyin_o" class="gui-m-r-10"></uni-icons>
            <text>{{ data.includeTrackCount}}集</text>
          </view>
          <view class="gui-m-r-20">
            <uni-icons custom-prefix="iconfont" type="erji" class="gui-m-r-10"></uni-icons>
            <text>{{ data.playStatNum}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</uni-card>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import { SearchItemInterface } from "../../api/search/interfaces"
import { PAY_TYPE } from "../../utils/constant"
import { getNameByValue } from "../../utils/utils"
const props = defineProps({
  data: {
    type: Object as PropType<SearchItemInterface>,
    required: true,
    default: () => {}
  },
})
/* 响应式数据 */
// 分类导航

/* 方法 */
const handleGoToDetails = () => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${props.data.id}`
  })
}
// 标题高亮正则替换兼容小程序
const replaceTitle = (title: string) => {
  // 假设要替换的字符串为 str，颜色值为 color
  return title.replace(/<font color='(.+?)'>/gi, "<font style=\"color:$1\">");

}
/* 生命周期 */
</script>

<style lang="scss" scoped>
/* 卡片视图 */
.gui-card-body{
  padding-bottom:10rpx;
}
.gui-card-img{
  width:120rpx;
  height:120rpx;
  border-radius:20rpx;
}
.gui-card-desc{
  width:400rpx;
  margin-left:25rpx;
  flex:1;
}
.gui-card-name{
  font-size:28rpx;
  line-height:40rpx;
  margin-right:20rpx;
}
</style>
