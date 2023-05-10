<template>
  <gui-page :customFooter="true" :customHeader="true">
    <template v-slot:gHeader>
      <view style="height: 44px" class="gui-flex gui-bg-white">
        <view class="gui-flex gui-row gui-wrap gui-align-items-center gui-m-l-20">
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
          >&#xe666;</text
          >
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1 gui-m-r-10"
          >&#xe67b;</text
          >
          <text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity1">&#xe613;</text>
        </view>
        <view style="width: 200rpx"></view>
      </view>
    </template>

    <template v-slot:gFixedTop>
			<!-- 一级导航 -->
			<view class="gui-flex gui-m-b-20">
				<view class="gui-bg-white gui-dark-bg-level-3 gui-p-r-20">
					<gui-switch-navigation
						:items="navItems"
						:currentIndex="category1NavIndex"
						@change="category1NavChange"
						textAlign="center"
						:isCenter="true"
						activeDirection="center"
						:size="0"
						:margin="10"
						padding="30rpx"
						activeLineHeight="4rpx"
						:width="750">
					</gui-switch-navigation>
				</view>
			</view>
		</template>

    <template v-slot:gBody>
      <view style="height:88rpx;"></view>
      <!-- 左侧导航 -->
      <view class="gui-wrapper">
        <view class="gui-menu-wrap">
          <scroll-view
            scroll-y
            scroll-with-animation
            class="gui-tab-view menu-scroll-view"
            :scroll-top="scrollTop"
          >
            <view
              v-for="(item, index) in tabbarItems"
              :key="index"
              class="gui-tab-item"
              :class="[dimension == item.dimension && 'gui-tab-item-active']"
              @tap.stop="switchMenu(item.dimension)"
            >
              <text class="u-line-1">{{ item.name }}</text>
            </view>
          </scroll-view>
          <scroll-view
          scroll-y
          scroll-with-animation
          class="gui-right-box"
          >
            <view v-if="rankList">
              <SearchResultsItem
              v-for="(item) in rankList"
              :data="item"
              :key="item.id"
              
            />
            </view>

            <ZPagingEmptyView v-else/>
          </scroll-view>
        </view>
      </view>
    </template>

    <template v-slot:gFooter>
			<BottomNav></BottomNav>
		</template>
  </gui-page>
</template>

<script setup lang="ts">
import { ref,watchEffect, onMounted } from "vue"
import { courseService, albumsService } from "../../api"
import { 
  CategoryTreePropsInterface,
} from "../../api/category/interfaces"
import { recursionTree } from "../../utils/utils"
import SearchResultsItem from "../../components/SearchResultsItem/SearchResultsItem.vue"
import ZPagingEmptyView from "../../uni_modules/z-paging/components/z-paging-empty-view/z-paging-empty-view.vue"

// 当前一级分类导航索引
const category1NavIndex = ref(0);
// 一级分类id
const category1Id = ref()
// 排行榜数据
const rankList = ref([])
// 分类导航数据
const navItems = ref<CategoryTreePropsInterface[]>([]);

// 侧边栏数据
const tabbarItems = [
  { name: '热度', dimension: 'hotScore'},
  { name: '播放量', dimension: 'playStatNum'},
  { name: '订阅量', dimension: 'subscribeStatNum'},
  { name: '购买量', dimension: 'buyStatNum'},
  { name: '评论数', dimension: 'albumCommentStatNum'},
]

let scrollTop = ref(0) // tab标题的滚动条位置
let dimension = ref('hotScore') // 预设当前项的值

// 监视一级分类索引变化
watchEffect(() => {
	if(navItems.value.length){
		// 一级索引变化时，获取一级分类下商品数据
		// getCategory1IdDataInfo(navItems.value[category1NavIndex.value].id)
	}
})

const switchMenu = (current:string) => {
  if (current === dimension.value) {
    return;
  }
  // 请求数据
  dimension.value = current
  getRankList()
}


// 获取一级分类导航数据
const getCategoryList = async () => {
	try {
		const res: any = await courseService.getAllCategory()
    recursionTree(res.data, "name", "categoryName", "categoryChild")
		recursionTree(res.data, "id", "categoryId", "categoryChild")
		recursionTree(res.data, "children", "categoryChild")
    category1Id.value = res.data[0].id
		navItems.value =  (res.data as unknown) as CategoryTreePropsInterface[]
    // 获取排行榜数据
    getRankList()
	} catch (error) {
		console.log(error)
	}
}

/**
 * @description: 获取排行榜列表
 * @returns {*}
 */
const getRankList = async () => {
  const res: any = await albumsService.findRankingList(category1Id.value, dimension.value)
  rankList.value = res.data
}
 
// 一级分类导航切换
const category1NavChange = (index: number) => {
	category1NavIndex.value = index
  category1Id.value = navItems.value[index].id
  getRankList()
}

/* 生命周期 */
onMounted(() => {
	getCategoryList()
});

</script>

<style scoped lang="scss" >
.gui-wrapper {
  // height: calc(100vh);
  /* #ifdef H5 */
  // height: calc(100vh - var(--window-top));
  /* #endif */
  display: flex;
  flex-direction: column;
}

.gui-menu-wrap {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.gui-tab-view {
  width: 200rpx;
  height: 100%;
  background-color: #f6f6f6;
}

.gui-tab-item {
  height: 100rpx;
  background: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #444;
  font-weight: 400;
  line-height: 1;
}

.gui-tab-item-active {
  position: relative;
  color: #000;
  font-weight: 600;
  background: #fff;
}

.gui-tab-item-active::before {
  content: "";
  position: absolute;
  border-left: 4px solid red;
  height: 32rpx;
  left: 0;
  top: 39rpx;
}

.gui-tab-view {
  height: 100%;
}

.gui-right-box {
  background-color:#f6f6f6;
}

.gui-page-view {
  padding: 16rpx;
}

.gui-class-item {
  margin-bottom: 30rpx;
  //background-color: #fff;
  padding: 16rpx;
  border-radius: 8rpx;
}

.gui-class-item:last-child {
  min-height: 100vh;
}

.gui-item-title {
  font-size: 26rpx;
  color: gray;
  font-weight: bold;
}

.gui-item-menu-name {
  font-weight: normal;
  font-size: 30rpx;
}

.gui-item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.gui-thumb-box {
  width: 240rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80rpx;
  padding: 30rpx 10rpx;
  background-color: #fff;
  border-radius: 8rpx;
  color: rgba(0, 0, 0, 0.65);
}
</style>