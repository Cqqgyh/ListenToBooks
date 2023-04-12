<template>
  <gui-page>
    <template v-slot:gBody>
      <view class="gui-flex1 gui-flex gui-column gui-padding">
        <!-- 分类导航 -->
        <view class="">
          <gui-switch-navigation
            textAlign="center"
            :isCenter="true"
            activeDirection="center"
            :size="0"
            :margin="0"
            padding="30rpx"
            activeLineHeight="4rpx"
            activeLineWidth="40rpx"
            :items="navItems"
            @change="navchange"
          ></gui-switch-navigation>
        </view>
        <!-- 下拉选择-->
        <view class="select-container">
          <gui-select-menu :items="selectItemNames" @select="select"></gui-select-menu>
		  <view class="gui-text-small select-add">
			<text class="gui-icons gui-block gui-color-gray gui-text">&#xe6c7;</text>
		  </view>
        </view>
      </view>
    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
/* 响应式数据 */
// 分类导航
const navItems = ref([
  { name: "专辑", id: 0 },
  { name: "声音", id: 1 },
  { name: "视频", id: 2 },
  { name: "有声PPT", id: 3 },
  { name: "咔嚓笔记", id: 4 },
])
// 下拉选择
const selectItems = ref([
  { name: "全部", id: 0 },
  { name: "进行中", id: 1 },
  { name: "已通过", id: 2 },
  { name: "未通过", id: 3 }
])
// 计算下拉选择的名字数组集合
const selectItemNames = ref(selectItems.value.map((item) => item.name))

/* 方法 */
// 导航切换
const navchange = (item: number | string) => {
  console.log(item)
}
// 下拉选择切换
const select = (item: number | string) => {
  console.log(item)
}
// 去往创作专辑页面
</script>

<style lang="scss" scoped>
.select-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select-add{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50rpx;
  }
}
</style>
