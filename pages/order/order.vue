<template>
	<gui-page ref="guiPage" :customHeader="true" :fullPage="true" :isLoading="pageLoading">
		<!-- 自定义头部导航 -->
		<template v-slot:gHeader>
			<view style="height: 44px" class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<gui-header-leading @goHome="goHome"></gui-header-leading>
				<text class="gui-h5 gui-bold gui-flex1 gui-text-center gui-ellipsis gui-primary-text">我的订单</text>
				<view class="gui-flex"><text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity3 gui-m-r-10">&#xe604;</text></view>
				<view style="width: 180rpx"></view>
			</view>
		</template>
		<template v-slot:gBody>
			<view class="gui-flex1 gui-flex gui-column">
				<!-- 分类导航 -->
				<view class="header gui-border-b gui-border-box gui-flex gui-column gui-justify-content-center" id="myheader">
					<gui-switch-navigation :size="130" :currentIndex="currentIndex" :items="tabs" @change="navchange"></gui-switch-navigation>
				</view>
				<swiper :current="currentIndex" :style="{ height: mainHeight + 'px', width: '750rpx' }" @change="swiperChange">
					<!-- 轮播项目数量对应 上面的选项标签 -->
					<swiper-item v-for="(items, orderIndex) in orders" :key="orderIndex">
						<!-- 使用滚动区域来实现主体内容区域 -->
						<scroll-view
							:style="{ height: mainHeight + 'px' }"
							:scroll-y="true"
							@touchstart="touchstart"
							@touchmove="touchmove"
							@touchend="touchend"
							@scrolltolower="loadmorefun"
							@scroll="scroll"
						>
							<!-- 刷新组件 -->
							<gui-refresh @reload="reload" ref="refreshcom"></gui-refresh>
							<gui-empty v-if="items == null">
								<template v-slot:img>
									<view class="gui-flex gui-row gui-justify-content-center"><text class="gui-icons gui-empty-icon gui-color-gray">&#xe644;</text></view>
								</template>
								<template v-slot:text>
									<text class="gui-text-small gui-block gui-text-center gui-margin-top gui-color-gray">暂无数据</text>
								</template>
							</gui-empty>
							<!-- 数据展示区域 -->
							<view class="gui-order gui-bg-white gui-dark-bg-level-3" v-if="items != null" v-for="(order, oIndex) in items" :key="oIndex">
								<view class="gui-flex gui-row gui-space-between gui-align-items-center gui-m-b-20">
									<text class="gui-order-number gui-primary-text">订单号 : {{ order.orderNumber }}</text>
									<text class="gui-icons gui-text-small gui-color-gray" @tap="removeorder(orderIndex, oIndex, order.orderNumber)">&#xe632; 删除订单</text>
								</view>
								<!-- 循环展示订单 -->
								<view v-for="(shop, indexShop) in order.items" :key="indexShop">
									<!-- 循环订单商品 -->
									<view class="gui-order-goods gui-flex" v-for="(goods, indexGoods) in shop.goods" :key="indexGoods">
										<view class="gui-order-goods-img"><gui-image :src="goods.goods_img" :width="100" :height="100"></gui-image></view>
										<text class="gui-order-goods-name gui-secondary-text">{{ goods.goods_name }}</text>
										<text class="gui-order-goods-price">￥{{ goods.goods_price }} x {{ goods.goods_buynum }}</text>
									</view>
								</view>
								<!-- 订单底部 -->
								<view class="gui-order-footer gui-flex gui-row gui-space-between gui-align-items-center">
									<text class="gui-order-number">{{ order.status }} {{ order.orderDate }}</text>
									<text class="gui-text-small gui-color-gray">共1件商品，合计:￥0.20</text>
								</view>
							</view>
							<!-- 加载组件 -->
							<gui-loadmore ref="loadmorecom"></gui-loadmore>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</template>
	</gui-page>
</template>
<script>
import graceJs from '@/Grace6/js/grace.js';
export default {
	data() {
		return {
			// 全屏 loading
			pageLoading: true,
			// 选项卡标签
			tabs: [{ id: 1, name: '' }],
			// 选中选项的 索引
			currentIndex: 0,
			// 核心区域高度
			mainHeight: 200,
			// 订单信息保存数组
			orders: [],
			// 每个选项卡对应的分页
			pages: [],
			// 每个选项卡内部的滚动区域滚动值
			scrollTops: [],
			// 滚动延迟
			scrollTimer: null,
			// 加载更多延迟
			loadMoreTimer: null,
			// api 加载状态记录
			apiLoadStatus: []
		};
	},
	onLoad: function() {
		setTimeout(() => {
			this.loading = false;
			// 01. 获取页面主体高度
			graceJs.getRefs('guiPage', this, 0, ref => {
				ref.getDomSize('guiPageBody', e => {
					this.mainHeight = e.height - uni.upx2px(110);
				});
			});
		}, 300);

		// 模拟 api 加载新闻分类
		// 实际开发时此处改成 api 请求即可
		setTimeout(() => {
			this.tabs = [
				{ id: 0, name: '全部订单' },
				{ id: 1, name: '待付款' },
				{ id: 2, name: '待收货' },
				{ id: 3, name: '已完成' },
				{ id: 4, name: '退款/售后' },
			];
			// 初始化新闻列表数组 元素数量与分类匹配
			for (var i = 0; i < this.tabs.length; i++) {
				this.orders.push([]);
				this.pages.push(1);
				this.scrollTops.push(0);
				this.apiLoadStatus.push(false);
			}
			// 第一次加载数据
			this.getOrders();
		}, 500);
	},
	watch: {
		currentIndex: function(nVal, oldVal) {
			if (this.orders[nVal] == null) {
				return;
			}
			if (this.orders[nVal].length < 1) {
				this.getOrders();
			}
		}
	},
	methods: {
		// 分类切换
		navchange: function(e) {
			this.currentIndex = e;
		},
		// 轮播切换
		swiperChange: function(e) {
			this.currentIndex = e.detail.current;
		},
		// 滚动区域滚动
		scroll: function(e) {
			if (this.scrollTimer != null) {
				clearTimeout(this.scrollTimer);
			}
			this.scrollTimer = setTimeout(() => {
				this.scrollTops.splice(this.currentIndex, 1, e.detail.scrollTop);
			}, 100);
		},
		// 下拉刷新相关事件绑定
		touchstart: function(e) {
			if (this.apiLoadStatus[this.currentIndex]) {
				return;
			}
			if (this.scrollTops[this.currentIndex] > 0) {
				return;
			}
			this.$refs.refreshcom[this.currentIndex].touchstart(e);
		},
		touchmove: function(e) {
			if (this.apiLoadStatus[this.currentIndex]) {
				return;
			}
			if (this.scrollTops[this.currentIndex] > 0) {
				return;
			}
			this.$refs.refreshcom[this.currentIndex].touchmove(e);
		},
		touchend: function(e) {
			if (this.apiLoadStatus[this.currentIndex]) {
				return;
			}
			if (this.scrollTops[this.currentIndex] > 0) {
				return;
			}
			this.$refs.refreshcom[this.currentIndex].touchend(e);
		},
		// 刷新事件
		reload: function() {
			this.pages[this.currentIndex] = 1;
			this.$refs.loadmorecom[this.currentIndex].stoploadmore();
			this.getOrders(1);
		},
		// 加载更多事件
		loadmorefun: function() {
			var currentIndex = this.currentIndex;
			if (this.apiLoadStatus[currentIndex]) {
				return;
			}
			// 获取加载组件状态看一下是否还能继续加载
			if (this.$refs.loadmorecom[currentIndex].loadMoreStatus != 0) {
				return;
			}
			// 保证触底只执行一次加载
			if (this.loadMoreTimer != null) {
				clearTimeout(this.loadMoreTimer);
			}
			this.loadMoreTimer = setTimeout(() => {
				this.$refs.loadmorecom[currentIndex].loading();
				// 此处开启加载动画执行加载数据的函数
				this.getOrders();
			}, 80);
		},
		// 新闻数据读取
		getOrders: function(isReload) {
			// 使用内部变量记录 当前索引，避免加载时用户切换引起的变量变化
			var currentIndex = this.currentIndex;
			console.log(this.pages[currentIndex]);
			// 更新 api 加载状态
			this.apiLoadStatus.splice(currentIndex, 1, true);
			if (this.pages[currentIndex] == 1 && !isReload) {
				this.pageLoading = true;
			}
			// 当前正在展示的 选项index 为 this.currentIndex
			// 那么分类 id 应该为 this.tabs[this.currentIndex].id
			console.log('类型 : ' + this.tabs[currentIndex].name + ' 第' + this.pages[currentIndex] + '页');
			// 组合一个请求地址的 示例
			var url = 'https://www.graceui.com/api/index/orders/' + this.tabs[currentIndex].name + '/' + this.pages[currentIndex];

			// 请求 api 加载数据
			uni.request({
				url: url,
				success: res => {
					res = res.data;
					if (res.status == 'ok') {
						// 第一页
						if (this.pages[currentIndex] == 1) {
							this.orders.splice(currentIndex, 1, res.data);
						}
						// 之后的加载页
						else {
							this.orders[currentIndex] = this.orders[currentIndex].concat(res.data);
							this.$refs.loadmorecom[currentIndex].stoploadmore();
						}
					} else if (res.status == 'empty') {
						console.log('empty');
						this.orders.splice(currentIndex, 1, null);
						this.$refs.loadmorecom[currentIndex].stoploadmore();
					} else if (res.status == 'nomore') {
						console.log('nomore');
						this.$refs.loadmorecom[currentIndex].nomore();
					}
					// 刷新
					if (isReload) {
						this.$refs.refreshcom[currentIndex].endReload();
					}
					this.pages[currentIndex]++;
					// 更新 api 加载状态
					this.apiLoadStatus.splice(currentIndex, 1, false);
					this.pageLoading = false;
				}
			});
		},
		// 删除订单
		// 参数 : orderIndex,   oIndex,  orderNumber
		//       数组第一层索引   订单索引     订单号码
		removeorder: function(orderIndex, oIndex, orderNumber) {
			console.log(orderIndex, oIndex);
			uni.showModal({
				title: '确定要删除吗？',
				complete: e => {
					if (e.confirm) {
						// 此处连接可以后端api 删除订单
						// 删除前端数据
						this.orders[orderIndex].splice(oIndex, 1);
						this.orders.splice(oIndex, 1, this.orders[orderIndex]);
					}
				}
			});
		},
		goHome() {
			uni.redirectTo({
				url: '/pages/index/index'
			});
		}
	}
};
</script>
<style scoped>
.header {
	padding: 15rpx 30rpx;
	height: 100rpx;
}
.gui-order {
	padding: 25rpx;
	margin: 25rpx;
	margin-bottom: 0rpx;
	border-radius: 10rpx;
}
.gui-order-number {
	line-height: 50rpx;
	font-size: 26rpx;
	width: 300rpx;
	flex: 1;
}
.gui-shop {
	line-height: 88rpx;
	font-size: 28rpx;
	font-weight: bold;
}
.gui-order-goods {
	flex-direction: row;
	flex-wrap: nowrap;
	padding-bottom: 20rpx;
	align-items: flex-start;
}
.gui-order-goods-img {
	width: 100rpx;
	height: 100rpx;
}
.gui-order-goods-name {
	line-height: 40rpx;
	width: 200rpx;
	flex: 1;
	overflow: hidden;
	font-size: 26rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.gui-order-goods-price {
	font-size: 24rpx;
	line-height: 50rpx;
	width: 150rpx;
	text-align: right;
}
.gui-order-footer {
	margin-top: 2px;
}

.gui-order-status {
	line-height: 50rpx;
	font-size: 26rpx;
	width: 100rpx;
	text-align: center;
}
.gui-order-btn {
	width: 150rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 22rpx;
	text-align: center;
	border-radius: 60rpx;
	margin-left: 20rpx;
}
.gui-order-btn-red {
	border-color: #ff0036;
	color: #ff0036;
}

.gui-empty-icon {
	font-size: 130rpx;
	line-height: 130rpx;
	margin-top: 200rpx;
}
</style>
