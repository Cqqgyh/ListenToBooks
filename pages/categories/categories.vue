<template>
  <view class="gui-wrapper">
    <view class="gui-menu-wrap">
      <scroll-view
        scroll-y
        scroll-with-animation
        class="gui-tab-view menu-scroll-view"
        :scroll-top="scrollTop"
        :scroll-into-view="itemId"
      >
        <view
          v-for="(item, index) in tabBar"
          :key="index"
          class="gui-tab-item"
          :class="[current == index && 'gui-tab-item-active']"
          @tap.stop="switchMenu(index)"
        >
          <text class="u-line-1">{{ item.categoryName }}</text>
        </view>
      </scroll-view>
      <scroll-view
        :scroll-top="scrollRightTop"
        scroll-y
        scroll-with-animation
        class="gui-right-box"
        @scroll="rightScroll"
      >
        <view class="gui-page-view">
          <view class="gui-class-item" :id="'item' + index" v-for="(item, index) in tabBar" :key="index">
            <view class="gui-item-title">
              <text>{{ item.categoryName }}</text>
            </view>
            <view class="gui-item-container">
              <view @click="handleNavItemOnClick(item1)" class="gui-thumb-box" v-for="(item1, index1) in item.categoryChild" :key="index1">
                <view class="gui-item-menu-name">{{ item1.categoryName }}</view>
              </view>
            </view>
            <view style="height:100rpx;width: 10px;"></view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref, toRef, onMounted, getCurrentInstance } from "vue"
import { courseService } from "../../api"
import { CategoryTreeInterface } from "../../api/category/interfaces"
let scrollTop = ref(0) // tab标题的滚动条位置
let oldScrollTop = ref(0) // 上一次tab标题的滚动条位置
let current = ref(0) // 预设当前项的值
let menuHeight = ref(0) // 左边菜单的高度
let menuItemHeight = ref(0) // 左边菜单item的高度
let itemId = ref("") // 栏目右边scroll-view用于滚动的id
const tabBar = ref<CategoryTreeInterface[]>([])
let navItemsHeightList = ref([]) // 保存每个栏目的高度
let scrollRightTop = ref(0) // 右边栏目scroll-view的滚动条高度
const instance = getCurrentInstance() // 获取组件实例
// 页面可以通过定义 props 来直接接收 url 传入的参数
// 如：uni.navigateTo({ url: '/pages/index/index?id=10' })
const props = defineProps({
  category1Id:{
    type: Number || String,
    required: true,
  }, // 一级分类Id
  pageTitle:{
    type: String,
    required: true,
  }, // 一级分类Id
});


/* 方法 */
// 根据一级分类id获取全部分类信息
const getCategoryTree = async () => {
  try {
    const res = await courseService.getCategory1IdAllInfo(props.category1Id)
    tabBar.value = res.data.categoryChild || []
  } catch (error) {
    console.log(error)
  }
}
// 导航被点击
const handleNavItemOnClick = (item:CategoryTreeInterface) => {
  // 去往分类搜索搜索
  uni.navigateTo({
    url: `/pages/search/search?category1Id=${props.category1Id}&category3Id=${item.categoryId}&pageTitle=${item.categoryName}`
  })
}
// 获取每个栏目的高度
function getMenuItemTop() {
  new Promise((resolve) => {
    let selectorQuery = uni.createSelectorQuery()
    selectorQuery
      .selectAll(".gui-class-item")
      .boundingClientRect((rects) => {
        if (!rects.length) {
          setTimeout(() => {
            getMenuItemTop()
          }, 10)
          return
        }
        rects.forEach((rect) => {
          navItemsHeightList.value.push(rect.top - rects[0].top)
          resolve()
        })
      })
      .exec()
  })
}

// 切换栏目
const switchMenu = async (index) => {
  // 如果没有获取到每个栏目的高度，就先获取
  if (navItemsHeightList.value.length === 0) {
    await getMenuItemTop()
  }
  // 如果点击的是当前栏目，就不执行
  if (index == current.value) return
  // 设置右边栏目的id
  scrollRightTop.value = oldScrollTop.value
  // 设置右边栏目的滚动条位置
  await nextTick(() => {
    scrollRightTop.value = navItemsHeightList.value[index]
    current.value = index
    leftMenuStatus(index)
  })
}

// 左边菜单的状态
const leftMenuStatus = async (index) => {
  current.value = index
  if (menuHeight.value === 0 || menuItemHeight.value === 0) {
    await getElRect("menu-scroll-view", "menuHeight")
    await getElRect("gui-tab-item", "menuItemHeight")
  }
  await nextTick() // 需要 nextTick的等待

  menuHeight.value = instance.proxy.menuHeight
  menuItemHeight.value = instance.proxy.menuItemHeight

  scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2
}

// 获取一个目标元素的高度
async function getElRect(elClass, dataVal) {
  new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select("." + elClass)
      .fields(
        {
          size: true,
        },
        (res) => {
          // 如果节点尚未生成，res值为null，循环调用执行
          if (!res) {
            setTimeout(() => {
              getElRect(elClass, dataVal)
            }, 10)
            return
          }
          instance.proxy[dataVal] = res.height
          resolve()
        }
      )
      .exec()
  })
}
// 右边栏目的滚动事件
const rightScroll = async (e) => {
  oldScrollTop.value = e.detail.scrollTop
  if (navItemsHeightList.value.length == 0) {
    await getMenuItemTop()
  }
  if (!menuHeight.value) {
    await getElRect("menu-scroll-view", "menuHeight")
  }
  setTimeout(() => {
    let scrollHeight = e.detail.scrollTop + menuHeight.value / 2
    for (let i = 0; i < navItemsHeightList.value.length; i++) {
      let height1 = navItemsHeightList.value[i]
      let height2 = navItemsHeightList.value[i + 1]
      if (!height2 || (scrollHeight >= height1 && scrollHeight < height2)) {
        leftMenuStatus(i)
        return
      }
    }
  }, 10)
}

/* 生命周期 */
onMounted(async () => {
  uni.setNavigationBarTitle({
    title: props.pageTitle || '分类'
  });
  await getCategoryTree() // 获取全部分类信息
  await getMenuItemTop() // 获取每个栏目的高度
  await leftMenuStatus(0) // 初始化左边菜单的状态
})
</script>

<style lang="scss" scoped>
.gui-wrapper {
  height: calc(100vh);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
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
  height: 120rpx;
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
