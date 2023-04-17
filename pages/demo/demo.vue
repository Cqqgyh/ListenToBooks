<template>
	<view class="content">
		<z-paging
			ref="zPagingRef"
			v-model="pageData[pageData.currentPageNav].list"
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
							@change="(index)=>navChange(index,navItems[index].id)"
						></gui-switch-navigation>
					</view>
					<!-- 下拉选择-->
					<view class="select-container">
						<gui-select-menu :items="selectItemNames" @select="select"></gui-select-menu>
						<view class="gui-text-small select-add">
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
				:key="item.albumId"></AlbumItemCard>
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import { albumsService } from "../../api"
/* 响应式数据 */
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
// 分类导航
const navItems = ref([
	{ name: "专辑", id: 'albumListInfo' },
	{ name: "声音", id: 'trackInfoListInfo' },
	{ name: "视频", id: '2' },
	{ name: "有声PPT", id: '3' },
	{ name: "咔嚓笔记", id: '4' }
])
// 下拉选择
const selectItems = ref([
	{ name: "全部", id: 0 },
	{ name: "进行中", id: 1 },
	{ name: "已通过", id: 2 },
	{ name: "未通过", id: 3 }
])
// 计算下拉选择的名字数组集合
const selectItemNames = ref(selectItems.value.map((item) => item.name))
// 定义页面数据
const pageData = reactive({
	currentPageNav:'albumListInfo',
	// 专辑列表
	albumListInfo: {
		// 状态
		status: 0,
		// 专辑列表
		list: [],
		query: { albumTitle: "", status: "", userId: 0 },
		// 专辑列表分页
		page: {
			page: 1, // 当前页
			limit: 10, // 每页条数
			total: 0, // 总页数
			query: { albumTitle: "", status: "", userId: 0 }
		}
	},
	// 声音列表
	trackInfoListInfo: {
		// 状态
		status: 0,
		// 专辑列表
		list: [],
		// 专辑列表分页
		page: {
			page: 1,
			limit: 10,
			query: { trackTitle: "", status: "", userId: 0 }
		}
	}
})

/* 方法 */
// 导航切换
const navChange = (item: number | string,navItemId:string) => {
	pageData.currentPageNav = navItemId
	// 当切换tab或搜索时请调用组件的reload方法
	zPagingRef.value.reload()
	console.log('navChange',item,navItemId)
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
		if (pageData.currentPageNav === 'albumListInfo') {
			// 专辑列表
			const res = await albumsService.getAlbumList({ ...params,albumInfoQuery:pageData.albumListInfo.query })
			//将请求的结果数组传递给z-paging
			zPagingRef.value.complete(res.data.records);
		} else if (pageData.currentPageNav === 'trackInfoListInfo') {
			// 声音列表
			const res = await albumsService.getAlbumList({ ...params,albumInfoQuery:pageData.albumListInfo.query })
			//将请求的结果数组传递给z-paging
			zPagingRef.value.complete(res.data.records);
		}
	} catch (error) {
		console.log(error)
		zPagingRef.value.complete(false);
	}
}
// 下拉选择切换
const select = (item: number | string) => {
	console.log(item)
}
// 滑动中
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

