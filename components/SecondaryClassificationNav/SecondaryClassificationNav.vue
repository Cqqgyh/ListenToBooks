<template>
 <view class="gui-grid gui-bg-white gui-dark-bg-level-3 gui-padding">
  <view
    v-for="(item, index) in navData"
    :key="index"
    @click="handleNavItemOnClick(item)"
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
// 导航被点击
const handleNavItemOnClick = (item:CategoryTreePropsInterface) => {
 console.log('handleNavItemOnClick',item.category2Id)
 // 去往分类搜索搜索
 uni.navigateTo({
  url: `/pages/search/search?category1Id=${props.category1Id}&category2Id=${item.category2Id}&category3Id=${item.id}&pageTitle=${item.name}`
 })
}
const goToCategoryPage = () => {
 uni.navigateTo({
  url: `/pages/categories/categories?category1Id=${props.category1Id}&pageTitle=${props.category1Name}`
 })
}

/* 生命周期 */
</script>

<style lang="scss" scoped>
.grid4 {
 width: 150rpx;
}
</style>
