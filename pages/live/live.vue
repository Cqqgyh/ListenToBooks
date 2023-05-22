<template>
  <gui-page :headerClass="['gui-bg-white']" :customFooter="true">

    <template v-slot:gBody>
      <template v-for="liveTagItem in liveTagList" :key="liveTagItem.id">
        <template v-if="liveList.filter(liveItem => +liveItem.tagId === +liveTagItem.id).length">
          <view class="gui-margin-top gui-flex gui-row gui-space-between gui-m-l-20 gui-m-r-20">
            <!--  主标题-->
            <view
              class="gui-bold gui-block gui-dark-bg-level-3 gui-color-drak gui-flex gui-row gui-align-items-center gui-justify-content-center">
              <text class="gui-m-r-10">{{ liveTagItem.name }}</text>
            </view>
          </view>
          <view class="gui-margin-top gui-padding-x gui-flex gui-row gui-wrap">
            <view
              class="gui-product"
              hover-class="gui-tap"
              v-for="(item, index) in liveList.filter(liveItem => +liveItem.tagId === +liveTagItem.id)"
              :key="index"
              @tap="goToLivePlay(item)">
              <view class="gui-relative">
                <text class="gui-absolute-lt gui-bg-red gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white">
                  {{ getLiveTag(item.tagId) }}
                </text>
                <view
                  class="gui-flex gui-absolute-lb gui-bg-black-opacity7 gui-p-l-5 gui-p-r-5 gui-text-small gui-color-white gui-p-t-5 gui-p-b-5 gui-p-l-20 gui-p-r-20">
                  <text class="gui-icons gui-block gui-color-drak gui-m-r-5 gui-p-t-5">&#xe6fe;</text>
                  <text>{{ item.viewCount }}</text>
                </view>
                <gui-image :src="item.coverUrl" :width="220" :height="220"></gui-image>
              </view>
              <view class="gui-product-lines">
                <text class="gui-product-name gui-primary-text">{{ item.liveTitle }}</text>
              </view>
              <view style="height: 30rpx"></view>
            </view>
          </view>
        </template>
      </template>

    </template>

    <template v-slot:gFooter>
      <!-- 普通模式 -->
      <BottomNav></BottomNav>
    </template>
  </gui-page>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { albumsService, liveService } from "../../api"
import { LiveInterfaceRes, LiveTagInterfaceRes } from "../../api/live/interfaces"
import SubscribeItemCard from "../../components/SubscribeItemCard/SubscribeItemCard.vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"

const liveList = ref([] as LiveInterfaceRes[])
const liveTagList = ref([] as LiveTagInterfaceRes[])

// 获取直播列表
const getLiveList = async () => {
  try {
    const res = await liveService.getLiveList()
    console.log("res", res)
    liveList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 获取直播标签列表
const getLiveTagList = async () => {
  try {
    const res = await liveService.getLiveTagList()
    liveTagList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 获取直播标签
const getLiveTag = (id: number | string) => {
  const tag = liveTagList.value.find((item) => +item.id === +id)
  return tag ? tag.name : ""
}
// 去直播间
const goToLivePlay = (item: LiveInterfaceRes) => {
  console.log("item", item)
  uni.navigateTo({
    url: `/pages/livePlay/livePlay?id=${item.id}`
  })
}
onMounted(() => {
  getLiveList()
  getLiveTagList()
})
</script>

<style scoped lang="scss">
.gui-product {
  width: 220 rpx;
  overflow: hidden;
  margin-right: 10 rpx;
}

.gui-product-lines {
  margin-top: 10 rpx;
}

.gui-product-name {
  font-size: 28 rpx;
  line-height: 32 rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* * 多行文本溢出... */
  overflow: hidden;
}

</style>
