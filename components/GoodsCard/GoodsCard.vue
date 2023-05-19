<template>
  <view class="gui-margin-top gui-flex gui-row gui-space-between gui-m-l-20 gui-m-r-20">
    <!--  主标题-->
    <view
      class="gui-bold gui-block gui-dark-bg-level-3 gui-color-drak gui-flex gui-row gui-align-items-center gui-justify-content-center">
      <text class="gui-m-r-10">{{ goodsData.baseCategory3.name }}</text>
    </view>
    <!--   查看全部-->
    <view @click="handleViewAll" class="gui-dark-bg-level-3 gui-color-gray gui-flex">
      <text class="gui-text-small">查看全部</text>
      <text class="gui-icons gui-block gui-color-drak">&#xe601;</text>
    </view>
  </view>
  <!-- 副标题-->

  <!-- <view class="gui-m-l-20"><text class="gui-text-small gui-color-gray">精选近期收听热度高的主题书籍</text></view>-->

  <view class="gui-margin-top gui-padding-x gui-flex gui-row gui-wrap">
    <view
      class="gui-product"
      hover-class="gui-tap"
      v-for="(item, index) in goodsData.list"
      :key="index"
      @tap="gotoGoodInfo(index, item)">
      <view class="gui-relative">
        <text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white">{{ payTypeMap[item.payType] }}</text>
        <view class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20">
          <text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe649;</text>
          <text>{{ item.playStatNum }}</text>
        </view>
        <gui-image :src="item.coverUrl" :width="220" :height="220"></gui-image>
      </view>
      <view class="gui-product-lines">
        <text class="gui-product-name gui-primary-text">{{ item.albumTitle }}</text>
      </view>
      <view style="height: 30rpx"></view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from "vue"
import { ChannelInterface, GoodsInterface } from "../../api/category/interfaces"
import { PAY_TYPE } from "../../utils/constant"

const props = defineProps({
  goodsData: {
    type: Object as PropType<ChannelInterface>,
    required: true,
    default: () => ({} as ChannelInterface),
  },
})
/* 响应式数据 */
// 收费类型
const payTypeList = ref(PAY_TYPE)
// 计算收费类型的key：value对应值
const payTypeMap = computed(() => {
  const map: {[key:string]:string} = {}
  payTypeList.value.forEach((item) => {
    map[item.value] = item.name
  })
  return map
})

// 分类导航

/* 方法 */
// 点击去商品详情页
const gotoGoodInfo = (index: number, item: GoodsInterface) => {
  console.log(index, item)
  // 跳转到专辑详情页
  uni.navigateTo({
    url: `/pages/detail/detail?id=${item.id}`,
  })
}
// 查看全部
const handleViewAll = () => {
  console.log("查看全部")
  // 去往分类搜索搜索
  uni.navigateTo({
    url: `/pages/search/search?category1Id=${props.goodsData.list[0].category1Id}&category2Id=${props.goodsData.list[0].category2Id}&category3Id=${props.goodsData.list[0].category3Id}&pageTitle=${props.goodsData.baseCategory3.name}`
  })
}

/* 生命周期 */
</script>

<style lang="scss" scoped>
.gui-product {
  width: 220rpx;
  overflow: hidden;
  margin-right: 10rpx;
}
.gui-product-lines {
  margin-top: 10rpx;
}
.gui-product-name {
  font-size: 28rpx;
  line-height: 32rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* * 多行文本溢出... */
  overflow: hidden;
}
</style>
