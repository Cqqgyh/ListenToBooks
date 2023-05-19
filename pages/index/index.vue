<template>
	<gui-page :customHeader="true" :customFooter="true">
		<template v-slot:gHeader>
			<view style="height: 44px;background-color: #fff" class="gui-flex">
				<view class="gui-dark-bg-level-1 gui-p-15 gui-flex1" @click="handleSearchOnClick">
					<gui-search :customClass="['gui-bg-black-opacity1']"></gui-search>
				</view>
<!--				<view class="gui-flex gui-row gui-wrap gui-align-items-center">-->
<!--					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black4 gui-m-r-10">&#xe69e;</text>-->
<!--					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black4">&#xe6c7;</text>-->
<!--				</view>-->
				<view style="width: 200rpx"></view>
			</view>
		</template>

		<template v-slot:gFixedTop>
			<!--			一级导航-->
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
			<!--			吸顶间隔-->
			<view style="height:88rpx;"></view>
			<!--			轮播图-->
			<gui-swiper :swiperItems="swiperItems" :size="0" :width="750" :height="330" :indicatorActiveWidth="38"></gui-swiper>
			<!--			二级导航-->
			<SecondaryClassificationNav
				v-if="navItems.length"
				:navData="category3NavItems"
				:category1Name="navItems[category1NavIndex].name"
				:category1Id="navItems[category1NavIndex].id"></SecondaryClassificationNav>
			<!--			商品模块-->
			<GoodsCard
				v-for="(item,index) in category1IdData"
				:goodsData="item"
				:key="index">
			</GoodsCard>
		</template>

		<template v-slot:gFooter>
			<BottomNav></BottomNav>
		</template>
	</gui-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch,watchEffect } from "vue"
import { courseService } from "../../api"
import { recursionTree } from "../../utils/utils"
import { CategoryTreeInterface, CategoryTreePropsInterface, ChannelInterface } from "../../api/category/interfaces"
const swiperItems = ref([
	{
		img: '../../static/carousel/a.png',
		url: '',
		title: '测试标题 001',
		opentype: 'navigate'
	},
	{
		img: '../../static/carousel/b.png',
		url: '',
		title: '测试标题 002',
		opentype: 'navigate'
	},
	{
		img: '../../static/carousel/c.png',
		url: '',
		title: '测试标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
		opentype: 'navigate'
	}
]);
// 当前一级分类导航索引
const category1NavIndex = ref(0);
// 一级分类下商品数据
const category1IdData = ref<ChannelInterface[]>([]);
// 分类导航数据
const navItems = ref<CategoryTreePropsInterface[]>([]);
const category3NavItems = ref<CategoryTreePropsInterface[]>([]);

// 监视一级分类索引变化
watchEffect(() => {
	if(navItems.value.length){
		// 一级索引变化时，获取一级分类下商品数据
		getCategory1IdDataInfo(navItems.value[category1NavIndex.value].id)
		// 通过监视当前当行索引来动态请求三级导航
		getCategory3NavItems(navItems.value[category1NavIndex.value].id)
	}
})

/* 方法 */
// 搜索组件被点击
const handleSearchOnClick = () => {
	console.log('handleSearchOnClick')
	uni.navigateTo({
		url: `/pages/search/search`
	})
}
// 获取导航数据
const getCategoryList = async () => {
	try {
		const res = await courseService.getAllCategory()
		recursionTree(res.data, "name", "categoryName", "categoryChild")
		recursionTree(res.data, "id", "categoryId", "categoryChild")
		recursionTree(res.data, "children", "categoryChild")
		navItems.value =  (res.data as unknown) as CategoryTreePropsInterface[]
	} catch (error) {
		console.log(error)
	}
}
// 获取频道页数据
const getCategory1IdDataInfo = async (id:number | string) => {
	try {
		const res = await courseService.getCategory1IdData(id)
		category1IdData.value = res.data
	} catch (error) {
		console.log(error)
	}
}
// 获取一级分类下置顶到频道页的三级分类列表
async function getCategory3NavItems (id:number | string){
	try {
		const res = await courseService.getCategory1IdTopList(id)
		category3NavItems.value = res.data
	} catch (error) {
		console.log(error)
	}
}
// 一级分类导航切换
const category1NavChange = (index: number) => {
	category1NavIndex.value = index
}


/* 生命周期 */
onMounted(() => {
	getCategoryList()
});
</script>
<style scoped>

</style>
