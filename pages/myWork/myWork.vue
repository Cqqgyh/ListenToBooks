
<template>
  <view class="content">
    <z-paging
        ref="zPagingRef"
      v-model="(pageData as any)[pageData.currentPageNav].list"
      @query="getListInfo"
      show-refresher-update-time
      auto-show-back-to-top>
      <!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
      <template #top>
        <view class="gui-dark-bg-level-3 gui-padding nav-top-container">
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
              @change="(index:number)=>navChange(index,navItems[index].id)"
            ></gui-switch-navigation>
          </view>
          <!-- 下拉选择-->
          <view class="select-container">
            <gui-select-menu ref="guiSelectMenuRef" :items="(pageData as any)[pageData.currentPageNav].statusList.map((item: any) => item.name)" @select="select"></gui-select-menu>
            <view class="gui-text-small select-add" @click="()=>addOrEditItem()">
              <text class="gui-icons gui-block gui-color-gray gui-text">&#xe6c7;</text>
            </view>
          </view>
        </view>
      </template>
      <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
      <!--			专辑列表Item-->
      <AlbumItemCard
        v-if="pageData.currentPageNav === 'albumListInfo'"
        v-for="(item,index) in pageData.albumListInfo.list"
        :data="item"
        :editItemHandler="addOrEditItem"
        :deleteItemHandler="deleteItem"
        :key="item.albumId"></AlbumItemCard>
      <!--			声音列表Item-->
      <TrackItemCard
        v-if="pageData.currentPageNav === 'trackInfoListInfo'"
        v-for="(item,index) in pageData.trackInfoListInfo.list"
        :data="item"
        :editItemHandler="addOrEditItem"
        :deleteItemHandler="deleteItem"
        :key="item.trackId"></TrackItemCard>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from "vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import { albumsService } from "../../api"
import GuiSelectMenu from "../../Grace6/components/gui-select-menu.vue"
import { AlbumInfoListInterface, TrackInfoListInterface } from "../../api/albums/interfaces"
import { emitter } from "../../utils/mitt"
/* 响应式数据 */
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const guiSelectMenuRef = ref<InstanceType<typeof GuiSelectMenu>>()
// 分类导航
const navItems = ref([
  { name: "专辑", id: 'albumListInfo' },
  { name: "声音", id: 'trackInfoListInfo' },
  { name: "视频", id: '2' },
  { name: "有声PPT", id: '3' },
  { name: "咔嚓笔记", id: '4' }
])
// 定义页面数据
const pageData = reactive({
  currentPageNav:'albumListInfo',
  userId: 0,
  // 专辑列表
  albumListInfo: {
    // 专辑列表
    list: [] as AlbumInfoListInterface[],
    // 专辑新增修改路由路径
    addEditRoutePath: '/pages/createAlbum/createAlbum',
    // 状态列表
    statusList: [
      { name: "全部", status: '' },
      { name: "已通过", status: '0301' },
      { name: "未通过", status: '0302' }
    ],
    // 状态
    status: '',
  },
  // 声音列表
  trackInfoListInfo: {
    // 专辑列表
    list: [] as TrackInfoListInterface[],
    // 声音新增修改路由路径
    addEditRoutePath: '/pages/createTrack/createTrack',
    // 状态列表
    statusList: [
      { name: "全部", status: '' },
      { name: "已通过", status: '0501' },
      { name: "未通过", status: '0502' }
    ],
    // 状态
    status: '',
  }
})

/* 方法 */
// 重置下拉列表数据
const resetSelectItems = () => {
  let index:number = 0
  if (pageData.currentPageNav === 'albumListInfo'){
    index = pageData.albumListInfo.statusList.findIndex(item => item.status === pageData.albumListInfo.status)
  } else if (pageData.currentPageNav === 'trackInfoListInfo'){
    index = pageData.trackInfoListInfo.statusList.findIndex(item => item.status === pageData.trackInfoListInfo.status)
  }
  // 下拉列表重新选择
  guiSelectMenuRef.value.setCurrentIndex(index !== -1 ? index : 0)
}
// 导航切换
const navChange = (index: number | string,navItemId:string) => {
  pageData.currentPageNav = navItemId
  // 重置下拉列表数据
  resetSelectItems()
  // 当切换tab或搜索时请调用组件的reload方法
  zPagingRef.value.reload()
  console.log('navChange',index,navItemId)
}
// 获取列表数据
const getListInfo = async (page: number, limit: number) => {
  //组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
  //这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  //模拟请求服务器获取分页数据，请替换成自己的网络请求
  const params = {
    page: page,
    limit: limit,
    status:(pageData as {[key: string]: any})[pageData.currentPageNav].status,
  }
  try {
    if (pageData.currentPageNav === 'albumListInfo') {
      // 专辑列表
      const res = await albumsService.getAlbumList(params)
      //将请求的结果数组传递给z-paging
      zPagingRef.value.complete(res.data.records);
    } else if (pageData.currentPageNav === 'trackInfoListInfo') {
      // 声音列表
      const res = await albumsService.getTrackList(params)
      //将请求的结果数组传递给z-paging
      zPagingRef.value.complete(res.data.records);
    }
  } catch (error) {
    console.log(error)
    zPagingRef.value.complete(false);
  }
}
// 子组件被删除，触发父组件的删除列表子项事件
const deleteItem = (id: number | string) => {
  if (pageData.currentPageNav === 'albumListInfo') {
    // 专辑列表
    pageData.albumListInfo.list = pageData.albumListInfo.list.filter((item:AlbumInfoListInterface) => item.albumId !== id)
  } else if (pageData.currentPageNav === 'trackInfoListInfo') {
    // 声音列表
    pageData.trackInfoListInfo.list = pageData.trackInfoListInfo.list.filter((item:TrackInfoListInterface) => item.trackId !== id)
  }
}
// 添加
const addOrEditItem = (id?:number | string) => {
  const idStr = id ? `?id=${id}` : ''
  uni.navigateTo({
    url: (pageData[pageData.currentPageNav as 'albumListInfo']).addEditRoutePath + idStr
  })
}
// 下拉选择切换
const select = (index: number) => {
  // 切换请求列表的状态信息
  // pageData.status = selectItems.value[index].status
  // 切换列表的状态信息
  (pageData as {[key: string]: any})[pageData.currentPageNav].status = (pageData as {[key: string]: any})[pageData.currentPageNav].statusList[index].status
  // 当切换tab或搜索时请调用组件的reload方法
  zPagingRef.value.reload()
}
// 重载页面
const reload = () => {
  // 重置下拉列表数据
  resetSelectItems()
  // 当切换tab或搜索时请调用组件的reload方法
  zPagingRef.value.reload()
}
// 注册重载页面方法
emitter.on('reloadMyWork', function() {
  // reloadMyWork
  console.log('reloadMyWork')
  // 处理接收到的消息
  reload()
})
/* 生命周期 */
// 页面卸载时，移除事件监听
onUnmounted(() => {
  emitter.off('reloadMyWork')
})
</script>

<style lang="scss" scoped>
.swiper{
  height: 100%;
}
.nav-top-container {
  background-color: #fff;
  padding-bottom: 0;
}
.select-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .select-add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50rpx;
  }
}
</style>

