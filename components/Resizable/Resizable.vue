<template>
 <view class="container" :style="{ height: boxHeight + 'px' }">
  <view @touchmove.stop.prevent="handleTouchMove">
   <slot name="top" />
  </view>
  <view class="content">
   <slot></slot>
  </view>
 </view>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue"
import { myThrottle } from "../../utils/utils"

const props = defineProps({
 minHeight: {
  type: Number,
  default: 100
 },
 maxHeight: {
  type: Number,
  default: 300
 },
 initialHeight: {
  type: Number,
  default: 200
 }
})

const startY = ref(0)
const boxHeight = ref(props.initialHeight)
const minHeight = ref(props.minHeight)
const maxHeight = ref(props.maxHeight)

function onTouchMove(e:any) {
 console.log('onTouchMove')
 if (startY.value === 0) {
  startY.value = e.changedTouches[0].clientY
  return
 }
 const diff = startY.value - e.changedTouches[0].clientY
 boxHeight.value += diff

 // 约束高度不超出最小/最大范围
 if (boxHeight.value < minHeight.value) {
  boxHeight.value = minHeight.value
 } else if (boxHeight.value > maxHeight.value) {
  boxHeight.value = maxHeight.value
 }

 startY.value = e.changedTouches[0].clientY
}
const handleTouchMove = myThrottle(onTouchMove, 100)
// 监听高度变化并添加过渡效果
let timeoutId:number

watch(boxHeight, () => {
 clearTimeout(timeoutId)
 timeoutId = setTimeout(() => {
  boxHeight.value = Math.round(boxHeight.value)
 }, 10)
})

defineExpose({
 boxHeight
})
</script>
<style scoped>
.container {
 width: 100vw;
 background-color: transparent;
 transition: height 0.2s ease-in-out;
}
.content{
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
