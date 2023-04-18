<template>
 <view class="gui-grid gui-bg-white gui-dark-bg-level-3 gui-padding">
  <view
    v-for="(item, index) in navData"
    :key="index"
    class="gui-grid-item gui-m-10 grid4 gui-bg-black-opacity1"
  >
   <text class="gui-grid-text gui-primary-text">{{ item.name }}</text>
  </view>
  <view class="gui-grid-item gui-m-10 grid4 gui-bg-black-opacity1" @click="goToCategoryPage">
   <text class="gui-grid-text gui-primary-text">全部</text>
  </view>
 </view>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import { CategoryTreePropsInterface } from "../../api/category/interfaces"
/* 响应式数据 */
const props = defineProps({
 navData: {
  type: Array as PropType<CategoryTreePropsInterface[]>,
  required: true,
  default: []
 },
 category1Id: {
  type: Number || String,
  required: true,
 },
 category1Name: {
  type: String,
  required: true,
 },
})
// 分类导航

/* 方法 */
const goToCategoryPage = () => {
 uni.navigateTo({
  url: `/pages/categories/categories?category1Id=${props.category1Id}&category1Name=${props.category1Name}`
 })
}

/* 生命周期 */
</script>

<style lang="scss" scoped>
.grid4 {
 width: 150rpx;
}
</style>
