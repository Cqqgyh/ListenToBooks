<template>
  <view class="container">
    <z-paging
      ref="zPagingRef"
      v-model="pageInfo.goodsList"
      @query="getSearchAlbumInfo"
      :default-page-size="20"
      show-refresher-update-time
      auto-show-back-to-top
    >
      <!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
      <template #top>
        <SearchTop
          :isNeedSearchInput="!category1Id"
          :category1Id="category1Id"
          :isNeedAttrFilter="true"
          :handleSearch="reloadSearch"
          :queryParam="pageInfo.queryParams"></SearchTop>
      </template>
      <SearchResultsItem
        v-for="(item,index) in pageInfo.goodsList"
        :data="item"
        :key="item.id"></SearchResultsItem>
    </z-paging>
  </view>

</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import SearchTop from "../../components/SearchTop/SearchTop.vue"
import { search } from "../../api"
import { SearchItemInterface } from "../../api/search/interfaces"
import Template from "../template/template.vue"
import SearchResultsItem from "../../components/SearchResultsItem/SearchResultsItem.vue"
/* 响应式数据 */
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const props = defineProps({
  category1Id:{
    type: Number || String,
    default:''
  },
  category2Id:{
    type: Number || String,
    default:''
  },
  category3Id:{
    type: Number || String,
    default:''
  },
  pageTitle:{
    type:String || Number,
    default:'搜索'
  },
})
const pageInfo = reactive({
  // 查询参数
  queryParams: {
    keyword: "",
    category1Id: 0,
    category2Id: 0,
    category3Id: 0,
    attributeList: [],
    order: "",
  },
  // 查询商品列表
  goodsList:[] as SearchItemInterface[]
})
// 分类导航

/* 方法 */
// 重载搜索
const reloadSearch = () => {
  console.log("重载搜索")
  zPagingRef.value.reload();
}
// 搜索方法
const getSearchAlbumInfo = async (pageNo:number,pageSize:number) => {
  // 清洗参数 对查询参数进行过滤
  const params = {
    keyword: pageInfo.queryParams.keyword.trim(),
    category1Id: pageInfo.queryParams.category1Id ? pageInfo.queryParams.category1Id : null,
    category2Id: pageInfo.queryParams.category2Id ? pageInfo.queryParams.category2Id : null,
    category3Id: pageInfo.queryParams.category3Id ? pageInfo.queryParams.category3Id : null,
    attributeList: pageInfo.queryParams.attributeList.length > 0 ? pageInfo.queryParams.attributeList : null,
    order: pageInfo.queryParams.order ? pageInfo.queryParams.order : null,
    pageNo,
    pageSize,
  }

  try {
    // keyword和category3Id有一个存在才进行搜索
    if (params.keyword || params.category3Id){
      const res = await search.getSearchAlbumInfo(params)
      zPagingRef.value.complete(res.data.list);
    }else {
      zPagingRef.value.complete([]);
    }
  } catch (e) {
    console.log(e)
  }
}

/* 生命周期 */
onMounted(() => {
  // 初始修改查询参数
  console.log('props.category1Id',props.category1Id,props.category2Id,props.category3Id)
  pageInfo.queryParams.category1Id = props.category1Id
  pageInfo.queryParams.category2Id = props.category2Id
  pageInfo.queryParams.category3Id = props.category3Id
  uni.setNavigationBarTitle({
    title: props.pageTitle || '搜索'
  });
})
</script>

<style lang="scss" scoped></style>
