<template>
 <view >
<!--  搜索框-->
  <view class="search-container">
<!--    搜索inut-->
    <view class="search-input-container" v-if="isNeedSearchInput">
      <SearchInput
        ref="searchInputRef"
        class="gui-flex1 search-input"
        placeholder="请输入"
        :kwd="props.queryParam.keyword"
        @handleBlur="handleBlur"
        @clear="handleClear"
        @inputting="handleInputting"
        @confirm="handleConfirm"></SearchInput>
      <button
        @click="handleConfirm"
        type="default"
        class="gui-button gui-button-mini gui-bg-blue gui-noborder"
        style="width:100rpx;">
        <text
          class="gui-color-white gui-button-text-mini gui-icons">搜索
        </text>
      </button>
    </view>
<!--    搜索建议-->
    <view class="search-suggestion-container gui-padding-x" v-if="searchSuggestionsList.length">
      <scroll-view
        :show-scrollbar="false"
        :scroll-y="true"
        style="max-height: 500rpx"
        :scroll-top="0">
        <view
          class="search-suggestions-item"
          v-for="(item,index) in searchSuggestionsList"
          @click="handleSearchSuggestItemOnClick(item)"
          :key="index">
          <view class="search-suggest-text">
            {{item}}
          </view>
        </view>
      </scroll-view>

    </view>
  </view>
   <!--   搜索历史-->
   <view class="search-history-container gui-padding" v-if="!queryParam.keyword.trim() && isNeedSearchInput">
     <view class="search-history-title gui-flex gui-rows gui-nowrap gui-align-items-center">
       <text class="gui-primary-text gui-h6 gui-flex1 gui-bold">搜索历史</text>
       <text @click="handleClearSearchHistory" class="gui-icons  gui-color-gray">&#xe794;</text>
     </view>
     <view class="search-history-item-container gui-flex gui-rows gui-wrap">
       <view
         v-for="(item,index) in searchHistoryList"
         :key="item+index"
         @click="handleSearchSuggestItemOnClick(item)"
         class="search-history-item gui-color-grey1 gui-text-small">
         {{ item }}
       </view>

     </view>
   </view>
<!--  筛选条件-->
<!--   此处之所以条件判断是因为源码中对最初始的菜单做了深拷贝，后续添加进去的东西未作监视-->
   <le-dropdown
     v-if="category1Id && menuList.length > 3 && (queryParam.keyword.trim() || category1Id)"
     v-model:menuList="menuList"
     :themeColor="checkedThemeColor"
     :duration="300"
     @onConfirm="handleConfirm"
     :isClickMutuallyExclude="true"
   ></le-dropdown>
   <le-dropdown
     v-if="category1Id && menuList.length <= 3 && (queryParam.keyword.trim() || category1Id)"
     v-model:menuList="menuList"
     :themeColor="checkedThemeColor"
     :duration="300"
     @onConfirm="handleConfirm"
     :isClickMutuallyExclude="true"
   ></le-dropdown>
  <le-dropdown
    v-if="!category1Id && menuList.length <= 3 && (queryParam.keyword.trim() || category1Id)"
    v-model:menuList="menuList"
    :themeColor="checkedThemeColor"
    :isClickMutuallyExclude="true"
    :duration="300"
    @onConfirm="handleConfirm"
  ></le-dropdown>
 </view>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue"
import { FilterInterface, FilterItemInterface, MenuInterface, SearchParamsInterface } from "../../api/search/interfaces"
import { courseService, search } from "../../api"
import { myThrottle, recursionTree } from "../../utils/utils"
import SearchInput from "../SearchInput/SearchInput.vue"
/* 响应式数据 */
const props = defineProps({
 queryParam: {
  type:Object as PropType<SearchParamsInterface>,
  required: true,
  default: {}
 },
 handleSearch: {
  type: Function as PropType<() => void>,
  required: true,
  default: () => {}
 },
 category1Id: {
  type: Number || String,
  default: 0
 },
  isNeedSearchInput:{
    type:Boolean,
    default:true
  }
})
const checkedThemeColor = ref('#008AFF')
// 排序（综合排序[1:asc、1:desc] 播放量[2:asc、2:desc] 发布时间[3:asc、3:desc]；asc:升序 desc:降序）
const menuList = ref<MenuInterface[]>([
  {
    title: "综合排序",
    type: "click",
    value: "1:desc",
  // 自定义属性，用于满足type = click时候的互斥
    isChecked:false
  },
  {
    title: "播放量",
    type: "click",
    value: "2:desc",
    // 自定义属性，用于满足type = click时候的互斥
    isChecked:false
  },
  {
    title: "发布时间",
    type: "click",
    value: "3:desc",
    // 自定义属性，用于满足type = click时候的互斥
    isChecked:false
  }
])
// 构建筛选选项
const filterInfo = ref<FilterInterface>({
 title: "筛选",
 type: "filter",
 children: []
})
// 监视菜单列表改变，构建搜索参数
watch(menuList, (newVal) => {
  //   "attributeList": [],
  //   "order": "",
  // 得到order
  let order = menuList.value.find(item => item.type === 'click' && item.isChecked)?.value || null
  // 得到attributeList数据存放数组
  let attributeListTarget = menuList.value.find(item => item.type === 'filter' && item.children?.length)?.children || []
  // 过滤掉未选择的
  attributeListTarget = attributeListTarget.filter(item => item.value)
  // 获取最终（属性id:属性值id）数组
  let attributeList = attributeListTarget.map((item) => {
    let targetAttrObj = item.options.find(item2 => item.value === item2.value)
    return `${targetAttrObj?.attributeId}:${targetAttrObj?.value}`
  })
  props.queryParam.order = order
  props.queryParam.attributeList = attributeList

},{deep:true})
// 搜索建议
const searchSuggestionsList = ref<string[]>([])
// 搜索历史
const searchHistoryList = ref<string[]>([])

// 通过一级分类Id获取属性值列表
const getAttrListByCategoryId = async () => {
 try {
  const res = await courseService.getAttrList(props.category1Id)
  // 对数据清洗成筛选需要的格式
  recursionTree(res.data, "label", "valueName", "attributeValueList")
  recursionTree(res.data, "value", "id", "attributeValueList")
  recursionTree(res.data, "title", "attributeName", "attributeValueList")
  recursionTree(res.data, "options", "attributeValueList")
   // 将最外层的value赋值为null 并且给每个option添加一个全部选项
  res.data.forEach((item) => {
    item.value = null
    item.type = "radio"
    item.options.unshift({
      label: "全部",
      value: null
    })
    })
  filterInfo.value.children = res.data as unknown as FilterItemInterface[]
  console.log("filterInfo.value",filterInfo.value)
   if (filterInfo.value.children.length) {
     menuList.value.push(filterInfo.value as unknown as any)
   }
 } catch (error) {
  console.log("error",error)
 }

}
// 分类导航

/* 方法 */
// 增加搜索历史
const handleAddSearchHistoryItem = (item:string) => {
  // 搜索历史中不存在，则添加
  if (!searchHistoryList.value.includes(item)){
    searchHistoryList.value.push(item)
  }
  // 将搜索历史存入
  uni.setStorageSync("searchHistoryList",JSON.stringify(searchHistoryList.value))
}
// 清空搜索历史
const handleClearSearchHistory = () => {
  searchHistoryList.value = []
  uni.setStorageSync("searchHistoryList",JSON.stringify(searchHistoryList.value))
}
// 关闭搜索建议
const handleOffSearchSuggestions = () => {
  searchSuggestionsList.value = []
}
// 搜索建议子项被点击
const handleSearchSuggestItemOnClick = (item:string) => {
  console.log('handleSearchSuggestItemOnClick',item)
  props.queryParam.keyword = item
  // 调用搜索
  handleConfirm()
}
// 调用搜索方法
const handleConfirm = ()=>{
  // 如果keyWord不为空,加入搜索历史
  if (props.queryParam?.keyword.trim()){
    handleAddSearchHistoryItem(props.queryParam?.keyword.trim())
  }
  // 清空搜索建议
  handleOffSearchSuggestions()
  props.handleSearch()
}
// 输入框失去焦点
const handleBlur = () => {
  console.log('handleBlur')
  // 此处是为了handleSearchSuggestItemOnClick 能够先执行完，再执行handleOffSearchSuggestions
  setTimeout(() => {
    handleOffSearchSuggestions()
  },600)
  // 如果为空的话
}
// 获取搜索建议
const getSearchSuggest = myThrottle(async (keyWord: string = props.queryParam.keyword) => {
  // 如果内容为空，关闭建议
  if (!keyWord.trim()) {
    handleOffSearchSuggestions()
    return
  }
  console.log('getSearchSuggest',keyWord)
  try {
    const res = await search.getSearchSuggestions(keyWord)
    searchSuggestionsList.value = res.data || []
  } catch (error) {
    console.log("error", error)
  }
},500)
// 监听输入
const handleInputting = (value: string) => {
 console.log('handleInputting',value)
 props.queryParam.keyword = value
  getSearchSuggest()
}
const handleClear = () => {
 props.queryParam.keyword = ''
  // 调用搜索
  props.handleSearch()
}

/* 生命周期 */
// 挂载
onMounted(() => {
  // 初始化从本地取出搜索历史
  searchHistoryList.value = uni.getStorageSync("searchHistoryList") ? JSON.parse(uni.getStorageSync("searchHistoryList")): []
  // category1Id存在在请求
  props.category1Id && getAttrListByCategoryId()
})

</script>

<style lang="scss">
.search-container{
  position: relative;
}
.search-input-container{
 display: flex;
 justify-content: space-between;
 align-items: center;
 width: 100%;
 padding: 20rpx 0 0 0;
 .search-input{
  margin: 0 20rpx;
 }
}
.search-suggestion-container{
  background-color: #fff;
  width: 100%;
  position: absolute;
  z-index: 999;
  padding: 20rpx 0 10rpx 0;
  .search-suggestions-item{
    padding: 10rpx 30rpx;
    .search-suggest-text{
      padding: 20rpx;
      //background-color: rgba(0,0,0,0.1);
      color: rgba(0,0,0,0.6);
      font-size: 24rpx;
    }
  }
}
.search-history-container{
  min-height:100rpx;
  width: 100%;
  .search-history-item-container{
    margin: 20rpx;
    .search-history-item{
      margin: 10rpx;
      padding: 10rpx 20rpx;
      background-color:rgba(0,0,0,0.1);
      border-radius:40rpx;
    }
  }
}
</style>
