<template>
  <gui-popup position="bottom" ref="popup">
    <view class="gui-relative" style="background-color: gray;">
      <view class="gui-flex gui-row gui-space-between">
        <view class="gui-p-t-20 gui-p-b-20 gui-color-white gui-m-l-40">请选择专辑标签</view>
        <view class="gui-icons gui-color-white gui-p-t-20 gui-p-b-20  gui-m-r-40" @click="closePopup">&#xe603;</view>
      </view>
    </view>

    <view
      class="gui-bg-white gui-dark-bg-level-3 gui-padding">
      <scroll-view
        :show-scrollbar="false"
        :scroll-y="true"
        style="height:720rpx;">
        <view class="gui-scroll-y-items item-container" v-for="(item,index) in [...props.attributeList,...props.attributeList]"
              :key="index">
          <text class="item-label">{{ item.attributeName }}</text>
          <view class="item-body">
            <uni-data-checkbox mode="tag" v-model="item.data" :localdata="item.attributeValueList" @change="(e)=>attrChange(e,index)"></uni-data-checkbox>
          </view>
        </view>
      </scroll-view>
    </view>
  </gui-popup>
</template>

<script setup lang="ts">
import { ref, PropType, watch, reactive } from "vue"
import { AttributeInterface, AttributeListInterface } from "../../pages/createAlbum/interfaces"

/* 响应式数据 */
const popup = ref(null)
const props = defineProps({
  attributeList: {
    type: Array as PropType<AttributeListInterface[]>,
    default: () => []
  }
})
// 收集选中数据的列表集合
const checkedAttributeList = ref([])

// 监视attributeList

// 选中
const attrChange = (e: any,index) => {
  const { id, value } = e
  console.log(e.detail.data,index)
}
// 组件初始化方法
const init = () => {
  // 初始化选中数据

}

const openPopup = () => {
  console.log(popup.value)
  popup.value && popup.value.open()
}

const closePopup = () => {
  popup.value && popup.value.close()
}
defineExpose({ openPopup, closePopup })
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-direction: column;
}
</style>
