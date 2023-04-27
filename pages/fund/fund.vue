<template>
	<z-paging
		ref="zPagingRef"
		v-model="pageData[pageData.currentPageNav].list"
		@query="getListInfo"
		show-refresher-update-time
		auto-show-back-to-top>
		<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
		<template #top>
			<!-- 分类导航 -->
			<view class="gui-padding-x">
				<gui-switch-navigation
					textAlign="center"
					:isCenter="true"
					activeDirection="center"
					:size="0"
					:margin="0"
					padding="30rpx"
					activeLineHeight="4rpx"
					activeLineWidth="40rpx"
					:currentIndex="pageData.currentIndex"
					:items="navItems"
					@change="(index)=>navChange(index,navItems[index].id)"
				></gui-switch-navigation>
			</view>
		</template>
		<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
		<!--			专辑列表Item-->
		<view class="gui-m-b-20 gui-padding-x"
					v-for="(item,index) in pageData[pageData.currentPageNav].list"
					:key="item.id">
			<view class="gui-flex gui-row gui-space-between">
				<view class="gui-flex gui-column gui-flex1">
					<text class="gui-ellipsis custom-title">{{ item.title }}</text>
					<text class="gui-text-small  gui-text-black-opacity3">{{ item.createTime }}</text>
				</view>
				<view class="gui-flex gui-column">
					<text class="gui-color-orange gui-bold">{{ pageData.currentPageNav === navItems[0].id ? `+${item.amount}` : `-${item.amount}`}}元</text>
					<text class="gui-text-small gui-text-black-opacity3">交易完成</text>
				</view>
			</view>
			<view class="gui-border-b gui-m-t-20"></view>
		</view>

	</z-paging>

</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import GuiSelectMenu from "../../Grace6/components/gui-select-menu.vue"
import { order } from "../../api"
/* 响应式数据 */
const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const props = defineProps({
		id: {
			type: String,
			default: "invest"
		}
	}
)

// 分类导航
const navItems = ref([
	{ name: "充值记录", id: 'invest'},
	{ name: "消费记录", id: 'consume'},
])
// 定义页面数据
const pageData = reactive({
	currentPageNav:'invest',
	currentIndex: 0, // 控制索引显示
	// 充值记录
	invest: {
		// 列表
		list: [],
	},
	// 消费记录
	consume: {
		// 列表
		list: []
	}
})
// 分类导航

/* 方法 */
// 导航切换
const navChange = (index: number,navItemId:string) => {
	pageData.currentPageNav = navItemId
	pageData.currentIndex = index
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
		if (pageData.currentPageNav === 'invest') {
			// 充值记录
			const res = await order.getInvestRecordList(params)
			//将请求的结果数组传递给z-paging
			zPagingRef.value.complete(res.data.records);
		} else if (pageData.currentPageNav === 'consume') {
			// 消费记录
			const res = await order.getConsumeRecordList(params)
			//将请求的结果数组传递给z-paging
			zPagingRef.value.complete(res.data.records);
		}
	} catch (error) {
		console.log(error)
		zPagingRef.value.complete(false);
	}
}
/* 生命周期 */
onMounted(() => {
	if (props.id === 'invest') {
		pageData.currentPageNav = 'invest'
		pageData.currentIndex = 0
	} else if (props.id === 'consume') {
		pageData.currentPageNav = 'consume'
		pageData.currentIndex = 1
	}
})
</script>

<style lang="scss">
.custom-title{
	width: 400rpx;
}

</style>
