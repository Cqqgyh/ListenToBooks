<template>
  <gui-page :customHeader="true" :headerClass="['gui-bg-white']" :customFooter="true">
    <template v-slot:gHeader>
      <view style="height: 44px" class="gui-flex">
        <view class="gui-flex gui-row gui-wrap gui-align-items-center gui-m-l-20">
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
          >&#xe666;</text
          >
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
          >&#xe67b;</text
          >
          <text @click="handleGoToOtherPage('/pages/setting/setting')" class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1">&#xe613;</text>
        </view>
        <view style="width: 200rpx"></view>
      </view>
    </template>

    <template v-slot:gBody>
      <view class="gui-relative">
        <view class="gui-list gui-padding gui-bg-white gui-p-b-90">
          <view class="gui-list-items gui-relative">
            <image
              mode="aspectFill"
              :src="user.avatarUrl"
              class="gui-card-img"
            ></image>
            <view class="gui-list-body gui-m-t-10">
              <view class="gui-card-desc">
                <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
                  <text class="gui-card-name gui-primary-text gui-h4 gui-bold">{{user.nickname}}</text>
                  <uni-icons v-if="user.isVip" custom-prefix="iconfont" type="VIP" class="gui-m-r-10" color="#f78414" size="15"></uni-icons>
                </view>
              </view>
            </view>
            <text class="gui-list-arrow-right gui-icons gui-color-gray" @click="handleGoToOtherPage('/pages/updateInfo/updateInfo')">&#xe601;</text>
          </view>
        </view>

        <view class="gui-absolute-lb gui-bg-white gui-creation-live">
          <view class="gui-flex gui-row gui-nowrap gui-space-around gui-p-t-20">
            <view @click="handleGoToOtherPage('/pages/myWork/myWork')" class="gui-flex gui-row gui-align-items-center">
              <text class="gui-icons gui-h3 gui-color-drak">&#xe666;</text>
              <text class="gui-p-l-10">创作中心</text>
            </view>
            <view @click="getLiveRoom" class="gui-flex gui-row gui-align-items-center">
              <text class="iconfont gui-color-drak gui-h3">&#xe7d5;</text>
              <text class="gui-p-l-10">录音/直播</text>
            </view>
          </view>
        </view>
      </view>

      <view class="gui-flex gui-space-between gui-bg-white gui-dark-bg-level-3 gui-padding gui-m-t-20">
        <view class="gui-grid-item" @click="handleGoToOtherPage('')">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe634;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">VIP会员</text>
        </view>
        <view class="gui-grid-item" @click="handleGoToOtherPage('/pages/wallet/wallet')">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe612;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">我的钱包</text>
        </view>
        <view class="gui-grid-item" @click="handleGoToOtherPage('/pages/order/order')">
          <text class="gui-grid-icon gui-icons gui-color-gray">&#xe62f;</text>
          <text class="gui-grid-text gui-icons gui-color-gray">我的订单</text>
        </view>
      </view>

      <view class="gui-bg-white gui-dark-bg-level-3 gui-padding">
        <z-paging
          ref="zPagingRef"
          :paging-style="{height:'1000rpx'}"
          v-model="pageData[pageData.currentPageNav].list"
          @query="getListInfo"
          :fixed="false">
          <template #top>
            <gui-switch-navigation
              :items="navItems"
              textAlign="center"
              :isCenter="true"
              :size="120"
              :margin="0"
              padding="30rpx"
              activeDirection="center"
              lineHeight="50rpx"
              activeFontSize="46rpx"
              :activeLineClass="['gui-nav-scale', 'gui-gtbg-red']"
              @change="(index)=>navChange(index,navItems[index].id)"
            ></gui-switch-navigation>
            <view style="height:20rpx;"></view>
          </template>
          <SubscribeItemCard
            v-if="pageData.currentPageNav === 'subscribe'"
            :data="item"
            :deleteItemHandler="deleteItem"
            :handleCancel="(id)=>albumsService.isSubscribeAlbum(id)"
            :popSetting="pageData[pageData.currentPageNav].popSetting"
            :jumpRoute="pageData[pageData.currentPageNav].jumpRoute"
            v-for="item in pageData[pageData.currentPageNav].list"
            :key="item.albumId"
          />
          <CollectAndHistoryTrackItemCard
            v-if="pageData.currentPageNav === 'collect'"
            :data="item"
            :deleteItemHandler="deleteItem"
            :handleCancel="(id) => albumsService.isCollectTrack(id)"
            :popSetting="pageData[pageData.currentPageNav].popSetting"
            mode="collect"
            :jumpRoute="pageData[pageData.currentPageNav].jumpRoute"
            v-for="item in pageData[pageData.currentPageNav].list"
            :key="item.trackId"></CollectAndHistoryTrackItemCard>
          <CollectAndHistoryTrackItemCard
            v-if="pageData.currentPageNav === 'history'"
            :data="item"
            :deleteItemHandler="deleteItem"
            :handleCancel="(id) => albumsService.deleteHistoryTrack(id)"
            :popSetting="pageData[pageData.currentPageNav].popSetting"
            mode="history"
            :jumpRoute="pageData[pageData.currentPageNav].jumpRoute"
            v-for="item in pageData[pageData.currentPageNav].list"
            :key="item.trackId"></CollectAndHistoryTrackItemCard>
        </z-paging>
      </view>
    </template>

    <template v-slot:gFooter>
      <!-- 普通模式 -->
      <BottomNav></BottomNav>
    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { ref,reactive } from "vue"
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore} from "../../stores/user"
import { storeToRefs } from 'pinia'
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import SubscribeItemCard from "../../components/SubscribeItemCard/SubscribeItemCard.vue"
import { albumsService, liveService } from "../../api"
import { CollectTrackInterface, HistoryTrackInterface, SubscribeAlbumsInterface } from "../../api/albums/interfaces"
const userStore = useUserStore()
let {user} = storeToRefs(userStore)

const zPagingRef = ref<InstanceType<typeof ZPaging>>()

const navItems = ref([
  { name: "订阅", id: 'subscribe' },
  { name: "收藏", id: 'collect' },
  { name: "历史", id: 'history' },
])
// 定义页面数据
const pageData = reactive({
  currentPageNav:'subscribe',
  // 订阅专辑列表
  subscribe: {
    // 专辑列表
    list: [] as SubscribeAlbumsInterface[],
    // 跳转路径
    jumpRoute: '/pages/detail/detail',
    // 弹出框配置
    popSetting:{
      type: "error",
      title: "注意",
      content: "你确定要取消订阅吗？",
      cancelText: "取消",
      confirmText: "确认"
    }
  },
  // 收藏声音列表
  collect: {
    // 声音列表
    list: [] as CollectTrackInterface[],
    // 跳转路径
    jumpRoute: '/pages/player/player',
    // 弹出框配置
    popSetting:{
      type: "error",
      title: "注意",
      content: "你确定要取消收藏吗？",
      cancelText: "取消",
      confirmText: "确认"
    }
  },
  // 历史声音列表
  history: {
    // 声音列表
    list: [] as HistoryTrackInterface[],
    // 跳转路径
    jumpRoute: '/pages/player/player',
    popSetting:{
      type: "error",
      title: "注意",
      content: "你确定要删除此历史吗？",
      cancelText: "取消",
      confirmText: "确认"
    }
  },
})
const currentIndex = ref(4)
// 导航切换
const navChange = (index: number | string,navItemId:string) => {
  pageData.currentPageNav = navItemId
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
    limit: limit
  }
  try {
    if (pageData.currentPageNav === 'subscribe') {
      // 专辑列表
      const res = await albumsService.getSubscribeAlbums(params)
      //将请求的结果数组传递给z-paging
      zPagingRef.value.complete(res.data.records);
    } else if (pageData.currentPageNav === 'collect') {
      // 声音列表
      const res = await albumsService.getCollectTrack(params)
      //将请求的结果数组传递给z-paging
      zPagingRef.value.complete(res.data.records);
    } else if (pageData.currentPageNav === 'history') {
      // 声音列表
      const res = await albumsService.getHistoryTrack(params)
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
  if (pageData.currentPageNav === 'subscribe') {
    // 专辑列表
    pageData.subscribe.list = pageData.subscribe.list.filter((item:SubscribeAlbumsInterface) => item.albumId !== id)
  }  else if (pageData.currentPageNav === 'collect') {
    // 声音列表
    pageData.collect.list = pageData.collect.list.filter((item:CollectTrackInterface) => item.trackId !== id)
  } else if (pageData.currentPageNav === 'history') {
    // 声音列表
    pageData.history.list = pageData.history.list.filter((item:HistoryTrackInterface) => item.trackId !== id)
  }
}
// 去其他页面
const handleGoToOtherPage = (route:string) => {
  if(route) {
      uni.navigateTo({
      url: route
    })
  } else {
    uni.showToast({
      title : "该功能暂未开放",
      icon  : "none"
    })
  }
}
onLoad(async () => {
  console.log(1);
})
// 获取当前用户的直播间
const getLiveRoom = async () => {
  // #ifdef MP-WEIXIN
  // 小程序原生直播文档
  // https://developers.weixin.qq.com/miniprogram/product/live/access-requirement.html
  // https://mp.weixin.qq.com/wxamp/broadcast/access?token=1769749118&lang=zh_CN
  uni.showToast({
    title: '请在H5演示此功能',
    icon: 'none'
  })
  // #endif
  // #ifdef H5
  try {
    const res = await liveService.getCurrentLiveRoom()
    console.log(res)
    if (res.data?.id) {
      uni.navigateTo({
        url: `/pages/livePush/livePush?id=${res.data.id}`
      })
    } else {
      uni.navigateTo({
        url: `/pages/creatLivePush/creatLivePush`
      })
    }
  } catch (error) {
    console.log(error)
  }
  // #endif
}
</script>
<style scoped>
.gui-card-img {
    width: 150rpx;
    height: 150rpx;
    border-radius: 150rpx;
}

.gui-creation-live {
    height: 80rpx;
    bottom: -20rpx;
    left: 50rpx;
    border-radius: 20rpx;
    width: 650rpx;
}
</style>
