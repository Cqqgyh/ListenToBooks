<template>
  <gui-popup position="bottom" ref="popup">
    <view class="gui-relative pop-top-container">
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
        <view class="gui-scroll-y-items item-container" v-for="(item,index) in props.attributeList"
              :key="index">
          <text class="item-label">{{ item.attributeName }}</text>
          <view class="item-body">
            <uni-data-checkbox mode="tag" v-model="item.checkedId" :localdata="item.attributeValueList" @change="(e)=>attrChange(e,index)"></uni-data-checkbox>
          </view>
        </view>
      </scroll-view>
    </view>
  </gui-popup>
</template>

<script setup lang="ts">
import { ref, PropType, watch, reactive, ComponentPublicInstance } from "vue"
import { AttributeListInterface } from "../../api/albums/interfaces"
/* 响应式数据 */
const popup = ref<ComponentPublicInstance>()

const props = defineProps({
  attributeList: {
    type: Array as PropType<AttributeListInterface[]>,
    default: () => [] as AttributeListInterface[]
  }
})
// 选中
const attrChange = (e: any,index:number) => {

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
.pop-top-container{
  background-color: #999999;
}
.item-container {
  display: flex;
  flex-direction: column;
}
</style>
