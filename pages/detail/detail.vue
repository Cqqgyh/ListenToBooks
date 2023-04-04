<template>
	<gui-page :customHeader="true" :isHeaderSized="false" :headerClass="['gui-bg-brown-linear-gradient']">
		<!-- 自定义头部导航 -->
		<template v-slot:gHeader>
			<view style="height: 44px" class="gui-flex gui-nowrap gui-rows gui-align-items-center">
				<gui-header-leading :home="false" :backButtonClass="['gui-color-white']"></gui-header-leading>
				<view class="gui-flex1">
					<view
						class="gui-bg-black-opacity2 gui-flex gui-justify-content-center gui-align-items-center"
						style="border-radius: 20rpx; width: 180rpx; height: 60rpx; line-height: 60rpx"
					>
						<text class="gui-icons gui-block gui-color-white iconfont gui-m-r-10">&#xe610;</text>
						<text class="gui-color-white gui-text gui-button-text">投月票</text>
						<text class="gui-icons gui-block gui-color-white gui-m-l-10">&#xe601;</text>
					</view>
				</view>

				<view class="gui-flex">
					<text class="iconfont gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity2 gui-m-r-10 gui-color-white">&#xe685;</text>
					<text class="gui-icons gui-block gui-color-drak gui-p-10 gui-b-50 gui-bg-black-opacity2 gui-m-r-10 gui-color-white">&#xe615;</text>
				</view>
				<view style="width: 180rpx"></view>
			</view>
		</template>
		<!-- 页面主体 -->
		<template v-slot:gBody>
			<scroll-view
				class="gui-bg-white gui-dark-bg-level-3 gui-border-box mianImgBg gui-bg-brown-linear-gradient gui-m-t-100 gui-p-30"
				:style="{
					height: 600 + 'px'
				}"
				:scroll-y="true"
				:show-scrollbar="false"
			>
				<view class="gui-margin-top gui-flex gui-row gui-space-between">
					<view class="gui-dark-bg-level-3 gui-color-gray">
						<image
							class="gui-album-img"
							mode="aspectFill"
							src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
						></image>
					</view>
					<view class="gui-flex gui-column gui-flex1 gui-m-l-20" style="width: 388rpx">
						<text class="gui-color-white" style="font-size: 38rpx">寻龙天师</text>
						<view class="gui-m-t-10 gui-flex gui-row gui-wrap">
							<gui-tags
								text="小标签"
								:size="22"
								:customClass="['gui-bg-black-opacity2', 'gui-color-white', 'gui-m-r-5', 'gui-m-b-5']"
								v-for="n in 10"
								:key="n"
							></gui-tags>
						</view>
					</view>
				</view>

				<view class="gui-flex gui-row gui-space-between gui-color-white gui-text-center gui-m-t-30">
					<view class="gui-flex gui-column">
						<text class="gui-text-brown-light">
							<text class="iconfont">&#xe651;</text>
							NO.6
							<text class="iconfont">&#xe650;</text>
						</text>
						<text class="gui-text-small gui-text-brown">小说</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							9.5
							<text class="gui-text-small gui-text-brown">分</text>
						</text>
						<text class="gui-text-small gui-text-brown">1.6万条评价</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							3.5
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">月票</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							8.3
							<text class="gui-text-small gui-text-brown">亿</text>
						</text>
						<text class="gui-text-small gui-text-brown">播放量</text>
					</view>
					<view class="gui-flex gui-column">
						<text>
							83.5
							<text class="gui-text-small gui-text-brown">万</text>
						</text>
						<text class="gui-text-small gui-text-brown">订阅量</text>
					</view>
				</view>

				<view class="gui-m-t-30"><text class="gui-text-brown">点击超60亿有声作品《摸金天师》作者，盗墓新作!</text></view>

				<view class="gui-m-t-20 gui-border-box gui-flex gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx" @click="toggleScroll">
					<view class="gui-flex gui-column gui-flex1 gui-color-white">
						<text>剧集与更新</text>
						<text class="gui-m-t-20 gui-text-brown gui-text-small">专辑限时免费中·连载至第2257集</text>
					</view>
					<view><text class="gui-icons gui-block gui-color-white">&#xe601;</text></view>
				</view>

				<view class="gui-m-t-20 gui-border-box gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx">
					<view class="gui-flex gui-column gui-flex1 gui-color-white"><text>主播介绍</text></view>
					<view class="gui-flex gui-m-t-20">
						<view class="gui-flex1">
							<view class="gui-flex">
								<image
									mode="aspectFill"
									src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
									class="gui-album-avatar"
								></image>
								<view class="gui-flex gui-column gui-m-l-20">
									<text class="gui-color-white">有声的紫襟</text>
									<text class="gui-text-brown gui-text-small gui-m-t-20">已被2331.4万人关注</text>
								</view>
							</view>
						</view>
						<view class="gui-bg-black-opacity1 gui-text-center" style="width: 150rpx; height: 60rpx; line-height: 60rpx; border-radius: 20rpx">
							<text class="gui-icons gui-color-white gui-text-small">&#xe6c7; 关注</text>
						</view>
					</view>
					<view class="gui-m-t-20 gui-text-brown gui-text-small"><text>喜马人肉故事机!来呀，等你关注。微博求关注呀: 有声的紫襟。更多的内容点击查看</text></view>
				</view>

				<view class="gui-m-t-30">
					<view class="gui-text-center"><text class="gui-color-white gui-h3">简介</text></view>
					<view class="gui-bg-white gui-dark-bg-level-3 gui-m-t-20">
						<gui-spread class="guiSpread" height="600rpx" :isShrink="true"><gui-article-info :article="article"></gui-article-info></gui-spread>
					</view>
				</view>

				<view class="gui-m-t-30">
					<text class="gui-h3 gui-color-white gui-m-b-20 gui-block">创作团队</text>
					<scroll-view :scroll-x="true" class="create-team-scroll">
						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">有声的</text>
							<text class="gui-text-small gui-text-brown">主播</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">风尘散人本尊</text>
							<text class="gui-text-small gui-text-brown">作者</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">冬菱扇</text>
							<text class="gui-text-small gui-text-brown">所有女角色呀</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">赵露思</text>
							<text class="gui-text-small gui-text-brown">所有女角色呀</text>
						</view>

						<view class="create-team-item gui-bg-black-opacity1 gui-flex gui-column gui-align-items-center gui-text-center gui-p-50 gui-m-r-20">
							<image
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663524789648-90fbdf8c8b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=100&q=90"
								class="create-team-avatar"
							></image>
							<text class="gui-color-white">吴磊</text>
							<text class="gui-text-small gui-text-brown">所有男角色呀</text>
						</view>
					</scroll-view>
				</view>

				<view class="gui-m-t-20 gui-border-box gui-bg-black-opacity2 gui-p-20" style="border-radius: 20rpx">
					<view class="gui-flex gui-row gui-space-between">
						<view class="gui-text-brown">本月月票贡献榜</view>
						<text class="gui-icons gui-block gui-color-white">&#xe601;</text>
					</view>
					<view class="gui-flex gui-row gui-space-between">
						<view class="gui-flex gui-column gui-align-items-center gui-m-r-100 gui-m-t-30">
							<text class="gui-h2 gui-color-white">915</text>
							<text class="gui-text-brown gui-text-small">本月月票总数</text>
						</view>
						<view class="gui-flex1 gui-flex">
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10 gui-bg-black-opacity6">
								<text class="gui-text-small gui-text-brown">TOP 1</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: goldenrod !important">&#xe6b1;</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10">
								<text class="gui-text-small gui-text-brown">TOP 2</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: silver !important">&#xe6b1;</text>
							</view>
							<view class="gui-flex gui-column gui-align-items-center gui-p-10 gui-m-10">
								<text class="gui-text-small gui-text-brown">TOP 3</text>
								<text class="iconfont gui-block gui-color-white gui-h1" style="color: coral !important">&#xe6b1;</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 滚动区域 -->

			<view class="mainScrollView" :style="getMainScrollViewStyle" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
				<view class="gui-text-center" @touchstart="dragStart" @touchmove="dragMove" @touchend="dragEnd"><text class="iconfont gui-color-white gui-h3">&#xeb2e;</text></view>
				<view class="gui-bg-white gui-dark-bg-level-3 gui-border-box popupView">
					<view class="gui-flex gui-space-between gui-align-items-center gui-m-20" @click="openAccountPopup">
						<view class="gui-h4" style="font-weight: bold">6元开会员 免费听</view>
						<button type="default" class="gui-button gui-bg-red gui-noborder gui-m-t-20">
							<text class="gui-color-white gui-button-text gui-p-l-20 gui-p-r-20 gui-border-radius">立即开通</text>
						</button>
					</view>

					<view class="gui-flex gui-space-between gui-justify-content-center gui-align-items-center">
						<view
							type="default"
							class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20 gui-flex gui-justify-content-center"
							@click="openBuyPopup"
						>
							<text class="gui-icons gui-block gui-m-r-10 gui-text-brown-light">&#xe649;</text>
							<text class="gui-icons gui-button-text gui-text-brown-light">开始播放</text>
						</view>
						<view
							type="default"
							class="gui-button gui-bg-black-opacity6 gui-noborder gui-flex1 gui-m-l-20 gui-m-r-20 gui-flex gui-justify-content-center"
							@click="openSeriesPopup"
						>
							<text class="gui-icons gui-color-white gui-block gui-m-r-10">&#xe625;</text>
							<text class="gui-icons gui-color-white gui-button-text">免费订阅</text>
						</view>
					</view>

					<view class="gui-m-20">
						<gui-switch-navigation :items="tabs" :size="100" :currentIndex="currentIndex" @change="navchange"></gui-switch-navigation>
						<swiper :style="{ height: scrollHeight + 20 + 'px' }" :current="currentIndex" @change="swiperChange">
							<swiper-item>
								<view class="gui-flex gui-space-around">
									<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center">
										<text class="iconfont gui-block gui-m-r-5">&#xe60d;</text>
										<text>从旧到新</text>
									</view>
									<view class="gui-flex gui-flex1 gui-justify-content-end">
										<view class="gui-flex gui-align-items-center gui-m-r-20">
											<text class="iconfont gui-block gui-m-r-5">&#xe631;</text>
											<text>下载</text>
										</view>
										<text>共2257集</text>
									</view>
								</view>

								<scroll-view
									class="popupSVContainer gui-dark-bg-level-3 gui-border-box"
									:scroll-y="scrollY"
									:show-scrollbar="false"
									:style="{ height: scrollHeight + 'px' }"
								>
									<navigator class="gui-list-items" v-for="n in 10" :key="n">
										<view class="gui-relative">
											<text class="gui-color-black gui-h6">{{ n }}</text>
										</view>
										<view class="gui-list-body gui-border-b">
											<view class="gui-list-title">
												<text class="gui-list-title-text gui-primary-text gui-ellipsis">第001章 纸人 (搜:我的治愈系游戏，每天抽188现金红包)</text>
											</view>
											<view class="gui-color-gray gui-flex gui-text-small gui-flex gui-align-items-center gui-m-t-20">
												<text class="gui-icons gui-block gui-m-r-10">&#xe649;</text>
												<text class="gui-block gui-m-r-20">686.6万</text>
												<text class="gui-icons gui-block gui-m-r-10">&#xe6b8;</text>
												<text class="gui-block gui-m-r-20">9960</text>
												<text class="gui-icons gui-block gui-m-r-10">&#xe607;</text>
												<text class="gui-block">19:44</text>
											</view>
										</view>
										<view class="gui-flex gui-column gui-color-gray gui-text-center gui-m-l-20 gui-m-r-20">
											<text class="gui-color-gray gui-text-small gui-block gui-m-b-20">2020-01</text>
											<text class="iconfont gui-color-gray gui-block">&#xe631;</text>
										</view>
									</navigator>
								</scroll-view>
							</swiper-item>
							<swiper-item class="tab-card-item">
								<view class="gui-flex gui-space-around">
									<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center">
										<text class="gui-icons gui-block gui-m-r-5">&#xe6b8;</text>
										<text>我要评价</text>
									</view>
									<view class="gui-flex gui-flex1 gui-justify-content-end"><gui-star></gui-star></view>
								</view>
								<scroll-view
									class="popupSVContainer gui-dark-bg-level-3 gui-border-box"
									:scroll-y="scrollY"
									:show-scrollbar="false"
									:style="{ height: scrollHeight + 'px' }"
								>
									<view class="gui-flex gui-space-around gui-m-t-20 gui-m-b-20">
										<view class="gui-flex gui-flex1 gui-justify-content-start gui-align-items-center"><text style="font-weight: bold">评论区 1.6万</text></view>
										<view class="gui-flex gui-flex1 gui-justify-content-end">
											<text class="gui-block gui-m-r-20">热门</text>
											<text class="gui-block gui-m-r-20">|</text>
											<text>最新</text>
										</view>
									</view>

									<view class="gui-flex gui-row gui-wrap">
										<gui-tags text="更新慢(25)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="代入感强(137)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="音色好美(13)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="表白主播(37)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="情节设计好(111)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="幽默好笑(40)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
										<gui-tags text="情节进展慢(22)" :size="22" :customClass="['gui-bg-gray', 'gui-color-black']"></gui-tags>
									</view>

									<view class="gui-m-t-30">
										<view
											style="margin-top: 30rpx"
											class="gui-comments-items gui-flex gui-row gui-nowrap gui-space-between gui-bg-white gui-dark-bg-level-3"
											v-for="(item, index) in commentContents"
											:key="index"
										>
											<image :src="item.face" class="gui-comments-face"></image>
											<view class="gui-comments-body">
												<view class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
													<text class="gui-comments-header-text gui-text gui-primary-color">{{ item.name }}</text>
													<text
														class="gui-comments-header-text gui-icons gui-color-gray gui-text-small"
														:class="[item.isPraise ? 'gui-primary-color' : '']"
													>
														&#xe6ea; {{ item.praise }}
													</text>
												</view>
												<text class="gui-comments-content gui-block">{{ item.content }}</text>
												<view class="gui-comments-imgs gui-flex gui-rows gui-wrap" v-if="item.imgs">
													<view class="gui-comments-image" v-for="(img, indexImg) in item.imgs" :key="indexImg" @click.stop="showImgs(index, indexImg)">
														<gui-image :src="img" :width="180" :height="180" mode="aspectFill"></gui-image>
													</view>
												</view>
												<view v-if="item.Reply">
													<text
														v-for="(itemRe, indexRe) in item.Reply"
														:key="indexRe"
														class="gui-comments-replay gui-block gui-bg-gray gui-dark-bg-level-2"
													>
														{{ itemRe.name }} : {{ itemRe.content }}
													</text>
												</view>
												<view class="gui-comments-info gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
													<text class="gui-comments-replay-btn gui-block gui-bg-gray gui-dark-bg-level-2 gui-primary-text">回复</text>
													<text class="gui-comments-info-text gui-color-gray">{{ item.date }}</text>
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>

			<!-- 弹出层，开通会员 -->
			<gui-popup ref="accountPopup" position="bottom">
				<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
					<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeAccountPopup">&#xe610;</text>
					<text class="gui-h3 gui-block gui-p-t-20 gui-p-b-20 gui-text-center">开通会员，可免费畅听本专辑</text>
					<view class="gui-flex gui-space-between gui-m-20">
						<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>6个月</text>
							<text>
								￥
								<text class="gui-h2">138</text>
							</text>
							<text class="gui-text-small gui-text-brown">每日仅需￥0.74</text>
						</view>

						<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>3个月</text>
							<text>
								￥
								<text class="gui-h2">73</text>
							</text>
							<text class="gui-text-small gui-text-brown">每日仅需￥0.78</text>
						</view>

						<view class="gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>1个月</text>
							<text>
								￥
								<text class="gui-h2">25</text>
							</text>
							<text class="gui-text-small gui-text-brown">每日仅需￥0.8</text>
						</view>
					</view>

					<view class="gui-flex gui-rows gui-nowrap gui-align-items-center" style="margin-top: 80rpx">
						<view class="gui-title-line"></view>
						<text class="gui-h6" style="padding-left: 50rpx; padding-right: 50rpx">开通会员，将享有</text>
						<view class="gui-title-line"></view>
					</view>

					<view class="gui-flex gui-space-between gui-m-50">
						<view class="gui-flex gui-column">
							<view class="gui-bg-orange-opacity1 gui-border-radius">
								<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe641;</text>
							</view>
							<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员免费听</text>
						</view>

						<view class="gui-flex gui-column">
							<view class="gui-bg-orange-opacity1 gui-border-radius">
								<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe8a6;</text>
							</view>
							<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员专享</text>
						</view>

						<view class="gui-flex gui-column">
							<view class="gui-bg-orange-opacity1 gui-border-radius">
								<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe65d;</text>
							</view>
							<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">免音贴广告</text>
						</view>

						<view class="gui-flex gui-column">
							<view class="gui-bg-orange-opacity1 gui-border-radius">
								<text class="iconfont gui-block gui-h3 gui-text-center gui-p-20 gui-text-orange-opacity9">&#xe605;</text>
							</view>
							<text class="gui-m-t-10 gui-block gui-text-small gui-text-orange-opacity9">会员音效</text>
						</view>
					</view>

					<view class="gui-flex gui-space-between gui-m-30 gui-border gui-p-20">
						<text class="gui-text-black-opacity5" style="font-weight: bold">更多会员套餐</text>
						<text class="gui-icons gui-block gui-h3 gui-text-black-opacity3">&#xe601;</text>
					</view>

					<view class="gui-flex gui-m-30 gui-column">
						<view class="gui-h4 gui-color-white gui-flex1 gui-text-center gui-bg-orange-opacity9 gui-p-30 gui-border-radius">首月6元</view>
						<text class="gui-text-small gui-block gui-text-center gui-m-t-20 gui-m-b-20">购买即视为同意《会员服务协议》和《自动续费服务规则》</text>
					</view>
				</view>
			</gui-popup>

			<!-- 弹出层，全集购买 -->
			<gui-popup ref="buyPopup" position="bottom">
				<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
					<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeBuyPopup">&#xe610;</text>
					<text class="gui-h3 gui-block gui-p-t-20 gui-p-b-20 gui-text-center">全集购买</text>
					<view class="gui-flex gui-m-20 gui-wrap gui-row">
						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>全集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10 gui-h4">VIP免费</text>
						</view>

						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>本集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">0.30 喜点</text>
						</view>

						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>后10集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">3.00 喜点</text>
						</view>

						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>后20集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">6.00 喜点</text>
						</view>

						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>后50集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">15.00 喜点</text>
						</view>

						<view class="buy-card gui-text-small gui-flex gui-column gui-align-items-center gui-p-20 gui-border-radius gui-border">
							<text>已更未购281集</text>
							<text class="gui-text-orange-opacity9 gui-block gui-m-t-10">84.30 喜点</text>
						</view>
					</view>

					<view class="gui-flex gui-column gui-m-40">
						<text class="gui-text-small gui-block gui-m-b-10 gui-text-black-opacity3">喜马拉雅VIP会员享多项特权</text>
						<text class="gui-text-small gui-block gui-m-b-20 gui-text-black-opacity3">有声书免费听|去声音广告|喜马讲书畅听等9项权益</text>
					</view>

					<view class="gui-h4 gui-color-white gui-flex1 gui-text-center gui-bg-orange-opacity9 gui-p-30 gui-border-radius">会员免费听</view>
				</view>
			</gui-popup>

			<!-- 弹出层，畅听 -->
			<gui-popup ref="seriesPopup" position="bottom">
				<view class="gui-relative gui-box-shadow gui-bg-white gui-dark-bg-level-1">
					<text class="gui-icons gui-block gui-absolute-rt gui-h3 gui-p-20" @click="closeSeriesPopup">&#xe610;</text>
					<navigator class="gui-list-items gui-m-40">
						<view class="gui-list-image gui-relative">
							<image
								class="gui-list-image"
								mode="aspectFill"
								src="https://images.unsplash.com/photo-1663603802898-798d83877992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=90"
							></image>
						</view>
						<view class="gui-list-body gui-border-b">
							<view class="gui-list-title"><text class="gui-list-title-text gui-primary-text">以下方式开启畅听</text></view>
							<text class="gui-list-body-desc gui-color-gray">司南[全4册]《警中录》侧侧轻寒古风.</text>
						</view>
					</navigator>

					<view class="gui-flex gui-row gui-space-between gui-m-40 gui-align-items-center">
						<view class="gui-flex gui-flex1 gui-column">
							<text class="gui-block">6元开会员 免费听</text>
							<text class="gui-block gui-text-small gui-text-brown-light">可收听所有会员内容</text>
						</view>
						<view class="gui-bg-orange-opacity9 gui-color-white gui-p-20">立即开通</view>
					</view>

					<navigator class="gui-m-40 gui-flex gui-space-between gui-bg-black-opacity2 gui-p-20">
						<text class="gui-ellipsis gui-flex1" >0.3喜点/集购买本专辑</text>
						<text class="gui-list-arrow-right gui-icons">&#xe601;</text>
					</navigator>

					<view style="height:100rpx"></view>
				</view>
			</gui-popup>
		</template>
	</gui-page>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';

const face =
	'https://images.unsplash.com/photo-1663717249250-804cb861ed74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5M3x8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80';
const img = 'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw5N3x8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60';

let popupViewTopMin = 0;
let popupViewTopMax = 0;
let systemHeight = 0;
const popupViewTop = ref(0);
const scrollY = ref(false);
const coverTransform = ref(0);

let dragStartPos = { x: 0, y: 0 };
let dragEndPos = { x: 0, y: 0 };
let isDragging = false;

const article = ref([]);

const commentContents = ref([
	{
		content: '故国三千里，深宫二十年。一声何满子，双泪落君前。',
		name: '回复昵称',
		face: face,
		date: '08/10 08:00',
		praise: 188,
		isPraise: false,
		Reply: [{ name: '张晓曦', content: '不错不错' }, { name: '王大陆', content: '赞了~' }]
	},
	{
		content: '而今渐行渐远，渐觉虽悔难追。漫寄消寄息，终久奚为。也拟重论缱绻，争奈翻覆思维。纵再会，只恐恩情，难似当时。',
		name: '路过繁华',
		face: face,
		date: '02/10 18:00',
		praise: 288
	},
	{
		content: '图片回复，点击图片可以预览......',
		name: '林夕阳',
		imgs: [img, img, img],
		face: face,
		date: '08/12 09:00',
		praise: 955,
		isPraise: true
	}
]);

const showImgs = (commentsIndex, imgIndex) => {
	uni.previewImage({
		urls: commentContents.value[commentsIndex].imgs,
		current: commentContents.value[commentsIndex].imgs[imgIndex]
	});
};

const accountPopup = ref(null);
const buyPopup = ref(null);
const seriesPopup = ref(null);

const openAccountPopup = () => {
	accountPopup.value.open();
};

const closeAccountPopup = () => {
	accountPopup.value.close();
};

const openBuyPopup = () => {
	buyPopup.value.open();
};

const closeBuyPopup = () => {
	buyPopup.value.close();
};

const openSeriesPopup = () => {
	seriesPopup.value.open();
};

const closeSeriesPopup = () => {
	seriesPopup.value.close();
};

// 弹出层导航切换
const tabs = ref([{ id: 0, name: '节目' }, { id: 1, name: '评论', tips: '128' }]);
const currentIndex = ref(0);
const navchange = index => {
	currentIndex.value = index;
};
const swiperChange = e => {
	const index = e.detail.current;
	currentIndex.value = index;
};

const scrollHeight = computed(() => {
	return systemHeight - popupViewTop.value - 200;
});

onMounted(() => {
	const system = uni.getSystemInfoSync();
	popupViewTopMin = 200;
	popupViewTop.value = popupViewTopMax = system.windowHeight - 100;
	coverTransform.value = popupViewTop.value;
	systemHeight = system.windowHeight;
	uni.request({
		url: 'https://www.graceui.com/api/html2array',
		success: res => {
			article.value = res.data.data;
		}
	});
});

const getMainScrollViewStyle = computed(() => {
	return {
		background: 'black',
		transform: `translateY(${popupViewTop.value}px)`
	};
});

const toggleScroll = () => {
	// 如果当前正在拖动，则不执行 toggle 操作
	if (isDragging.value) {
		return;
	}

	const startTop = popupViewTop.value;
	const endTop = scrollY.value ? popupViewTopMax : popupViewTopMin;
	const interval = endTop > startTop ? 10 : -10;
	const timer = setInterval(() => {
		popupViewTop.value += interval;
		if ((interval > 0 && popupViewTop.value >= endTop) || (interval < 0 && popupViewTop.value <= endTop)) {
			clearInterval(timer);
			scrollY.value = !scrollY.value;
		}
	}, 10);
};

const dragStart = e => {
	isDragging = true;
	dragStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

const dragMove = e => {
	if (isDragging) {
		const { clientX, clientY } = e.touches[0];
		const dy = clientY - dragStartPos.y;
		popupViewTop.value += dy;
		if (popupViewTop.value <= popupViewTopMin) {
			popupViewTop.value = popupViewTopMin;
		}
		if (popupViewTop.value >= popupViewTopMax) {
			popupViewTop.value = popupViewTopMax;
		}
		dragStartPos = { x: clientX, y: clientY };
	}
};

const dragEnd = () => {
	isDragging = false;
	scrollY.value = true;
};
</script>
<style scoped lang="scss">
.mianImgBg {
	left: 0;
	top: 0;
	z-index: 1;
}
.mainScrollView {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	width: 750rpx;
	border-radius: 8rpx;
}

.popupScrollView {
	height: calc(100vh - var(--window-top) - 250px);
}

.popupView {
	height: calc(100vh - var(--window-top) - 200px);
}

.gui-album-img {
	width: 150rpx;
	height: 150rpx;
	border: 2rpx solid gold;
	border-radius: 10rpx;
}

.gui-album-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.gui-text-brown {
	color: #b3a598;
}

.gui-text-brown-light {
	color: #e2bb92;
}

/*  深度样式 */
.guiSpread :deep(.gui-editor-show) {
	width: 690rpx !important;
}

.create-team-scroll {
	white-space: nowrap; // 滚动必须加的属性
	width: 100%;
	padding: 20rpx 20rpx 20rpx 0rpx;
}
.create-team-item {
	display: inline-flex; // item的外层定义成行内元素才可进行滚动 inline-block / inline-flex 均可
	flex-direction: column;
	align-items: center;
	border-radius: 20rpx;
}

.create-team-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.buy-card {
	width: 160rpx;
	text-align: center;
	margin: 10rpx;
}
</style>
