<template>
	<view 
	:style="{opacity : pageStatus ? 1 : 0}" 
	class="gui-sbody gui-flex gui-column" 
	:class="[fullPage || refresh || loadmore ? 'gui-flex1' : '']">
		<!-- 自定义头部 -->
		<view 
		class="gui-header gui-transition-all" 
		:class="headerClass" 
		v-if="customHeader" 
		id="guiPageHeader" 
		ref="guiPageHeader">
			<!-- 状态栏 -->
			<view 
			class="gui-page-status-bar" 
			:class="statusBarClass" 
			:style="{height:statusBarHeight+'px'}">
				<slot name="gStatusBar"></slot>
			</view>
			<!-- 头部插槽 -->
			<view 
			class="gui-flex gui-column gui-justify-content-center" 
			@tap.stop.prevnet="headerTap">
				<slot name="gHeader"></slot>
			</view>
		</view>
		<!-- 自定义头部占位 -->
		<view 
		v-if="customHeader && isHeaderSized"
		:style="{height:headerHeight+'px'}"></view>
		
		
		<!-- 页面主体 -->
		<view 
		class="gui-flex gui-column gui-relative" 
		v-if="!refresh && !loadmore" 
		id="guiPageBody" 
		:class="[fullPage ? 'gui-flex1' : '']" 
		ref="guiPageBody">
			<slot name="gBody"></slot>
		</view>
		
		
		<!-- 刷新加载主体  非 nvue -->
		<!-- #ifndef APP-NVUE -->
		<view 
		class="gui-flex1 gui-relative" 
		v-if="refresh || loadmore" 
		id="guiPageBody" 
		ref="guiPageBody" 
		:style="{marginTop:fixedTopMargin+'px'}">
			<scroll-view 
			class="gui-absolute-full" 
			:scroll-y="true" 
			:show-scrollbar="false" 
			@touchstart="touchstart" 
			@touchmove="touchmove" 
			@touchend="touchend" 
			@scroll="scroll" 
			:scroll-into-view="topTagID" 
			:scroll-with-animation="false" 
			@scrolltolower="loadmorefun">
				<view id="guiPageBodyTopTag">
					<gui-refresh 
					ref="guiPageRefresh" 
					@reload="reload"
					:refreshText="refreshText" 
					:customClass="refreshClasses" 
					:triggerHeight="reFreshTriggerHeight" 
					:refreshFontSize="refreshFontSize"></gui-refresh>
				</view>
				<slot name="gBody"></slot>
				<view v-if="loadmore">
					<gui-loadmore
					ref="guipageloadmore" 
					:status="loadMoreStatus" 
					:loadMoreText="loadMoreText" 
					:customClass="loadMoreClass" 
					:loadMoreFontSize="loadMoreFontSize"></gui-loadmore>
				</view>
			</scroll-view>
		</view>
		<!-- #endif -->
		
		<!-- 刷新加载主体 nvue -->
		<!-- #ifdef APP-NVUE -->
		<view
		class="gui-flex gui-column gui-flex1" 
		v-if="refresh || loadmore" 
		id="guiPageBody" 
		ref="guiPageBody" 
		:style="{marginTop:fixedTopMargin+'px'}">
			<list 
			:show-scrollbar="false" 
			class="gui-flex1" 
			@loadmore="loadmorefun" 
			@scroll="scroll">
				<refresh 
				v-if="refresh" 
				:display="refreshing ? 'show' : 'hide'" 
				@refresh="onrefresh" 
				@pullingdown="onpullingdown"></refresh>
				<cell ref="guiPageBodyTopRef"></cell>
				<cell v-if="refresh">
					<gui-refresh 
					ref="guiPageRefresh" 
					:refreshText="refreshText" 
					:customClass="refreshClasses" 
					:triggerHeight="reFreshTriggerHeight" 
					:refreshFontSize="refreshFontSize"></gui-refresh>
				</cell>
				<slot name="gBody"></slot>
				<cell 
				v-if="loadmore" 
				class="gui-page-loadmore">
					<gui-loadmore 
					ref="guipageloadmore" 
					:status="loadMoreStatus" 
					:loadMoreText="loadMoreText" 
					:customClass="loadMoreClass" 
					:loadMoreFontSize="loadMoreFontSize"></gui-loadmore>
				</cell>
			</list>
		</view>
		<!-- #endif -->
		
		<!-- 页面底部 -->
		<!-- 底部占位 -->
		<view 
		v-if="customFooter" 
		:style="{height:footerHeight+'px'}"></view>
		<view 
		v-if="customFooter" 
		class="gui-page-footer gui-border-box" 
		id="guiPageFooter" 
		ref="guiPageFooter" 
		:class="footerClass">
			<slot name="gFooter"></slot>
			<gui-iphone-bottom 
			:need="!isSwitchPage" 
			:customClass="footerSpaceClass"></gui-iphone-bottom>
		</view>
		
		
		<!-- 右下角悬浮挂件 -->
		<view 
		class="gui-page-pendant" :class="pendantClass">
			<slot name="gPendant"></slot>
		</view>
		
		
		<!-- 吸顶元素 -->
		<view 
		class="gui-page-fixed-top" 
		ref="guiPageFixedTop" 
		id="guiPageFixedTop" 
		:style="{top:fixedTop+'px'}">
			<slot name="gFixedTop"></slot>
		</view>
		
		
		<!-- 全屏 loading -->
		<gui-page-loading ref="guipageloading"></gui-page-loading>
	</view>
</template>
<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
export default{
	name  : 'gui-page',
	props : {
		// #ifndef APP-NVUE
		fullPage           : {type:Boolean, default:false},
		// #endif
		// #ifdef APP-NVUE
		fullPage           : {type:Boolean, default:true},
		// #endif
		
		// 自定义头部
		customHeader       : {type:Boolean, default:false},
		headerClass        : {type:Array ,  default:function(){return [];}},
		isHeaderSized      : {type:Boolean, default:true},
		statusBarClass     : {type:Array ,  default:function(){return [];}},
		
		// 自定义底部
		customFooter       : {type:Boolean, default:false},
		footerClass        : {type:Array ,  default:function(){return [];}},
		footerSpaceClass   : {type:Array,   default:function(){return ['gui-bg-gray', 'gui-dark-bg-level-2'];}},
		
		// 挂件
		pendantClass       : {type:Array , default:function(){return [];}},
		
		// 全屏加载状态
		isLoading          : {type:Boolean, default:false},
		isSwitchPage       : {type:Boolean, default:false},
		
		// 吸顶插槽样式
		fixedTopClass      : {type:Array ,  default:function(){return [];}},
		
		/* 刷新 */
		refresh            : {type:Boolean, default:false},
		refreshText        : {type:Array,   default:function () {
			return ['继续下拉刷新','松开手指开始刷新','数据刷新中','数据已刷新'];
		}},
		refreshClasses     : {type:Array,   default:function () {
			return [
				['gui-color-gray'],
				['gui-color-gray'],
				['gui-primary-text'],
				['gui-color-green']
			];
		}},
		refreshFontSize    : {type:Number, default:26},
		
		/* 加载更多 */
		loadmore           : {type:Boolean, default:false},
		loadMoreText       : {type:Array, default:function () {
			return ['','数据加载中', '已加载全部数据', '暂无数据'];
		}},
		loadMoreClass      : {type:Array,   default:function () {return ['gui-color-gray'];}},
		loadMoreFontSize   : {type:String,  default:'26rpx'},
		loadMoreStatus     : {type:Number,  default: 1},
		apiLoadingStatus   : {type:Boolean, default:false},
		reFreshTriggerHeight   : {type:Number, default:50}
	},
	data() {
		return {
			pageStatus          : false,
			footerHeight        : 50,
			statusBarHeight     : 44,
			// #ifndef H5
			headerHeight        : 72,
			// #endif
			// #ifdef H5
			headerHeight        : 44,
			// #endif
			headerTapNumber     : 0,
			fixedTop            : 0,
			loadMoreTimer       : null,
			fixedTopMargin      : 0,
			scrollTop           : 0,
			srcollTimer         : null,
			refreshing          : false,
			pullingdownVal      : 0,
			topTagID            : 'no'
		}
	},
	watch:{
		isLoading : function (val) {
			if(val){
				this.pageLoadingOpen();
			}else{
				this.pageLoadingClose();
			}
		}
	},
	mounted:function(){
		// 全屏 loading
		if(this.isLoading){
			this.pageLoadingOpen();
		}
		
		// 计算状态栏高度
		try {
			var system   = uni.getSystemInfoSync();
			if(system.model){
				this.statusBarHeight = system.statusBarHeight;
			}
			// #ifdef APP-PLUS
			if(plus.navigator.isFullscreen()){
				this.statusBarHeight = 0;
			}
			// #endif			
		} catch(e){return null;}
		
		// 获取自定义底部高度
		if(this.customFooter){
			setTimeout(()=>{
				this.getDomSize('guiPageFooter', (res)=>{
					this.footerHeight = res.height;
				}, 0);
			}, 200);
		}
		
		// 获取自定义头部高度
		if(this.customHeader){
			setTimeout(()=>{
				this.getDomSize('guiPageHeader', (res)=>{
					this.headerHeight = res.height;
					this.$nextTick(()=>{
						this.pageStatus = true;
					});
				}, 0);
			}, 200);
		}else{
			this.pageStatus = true;
		}
		
		// 吸顶 top
		// #ifdef H5
		if(this.customHeader){
			setTimeout(()=>{
				this.getDomSize('guiPageHeader', (res)=>{
					this.fixedTop = res.height;
				}, 0);
			}, 200);
		}else{
			this.fixedTop = 44;
		}
		// #endif
		// #ifndef H5
		if(this.customHeader){
			setTimeout(()=>{
				this.getDomSize('guiPageHeader', (res)=>{
					this.fixedTop = res.height;
				}, 0);
			}, 200);
		}
		// #endif
		
		// 全屏时适配吸顶插槽
		setTimeout(()=>{
			this.getDomSize('guiPageFixedTop', (res)=>{
				this.fixedTopMargin = res.height;
			}, 0);
		}, 200);
		
	},
	methods:{
		onpullingdown : function(e){
			if(this.apiLoadingStatus){return false;}
			e.changedTouches = [{pageY:e.pullingDistance}];
			this.$refs.guiPageRefresh.touchmove(e);
		},
		onrefresh : function(){
			if(this.apiLoadingStatus){return false;}
			this.refreshing = true;
			this.$refs.guiPageRefresh.refreshStatus = 2;
			setTimeout(()=>{
				this.$refs.guiPageRefresh.rotate360();
			}, 200);
			this.$emit('reload');
		},
		pageLoadingOpen : function(){
			this.getRefs('guipageloading',0,(ref)=>{
				ref.open();
			});
		},
		pageLoadingClose : function(){
			this.getRefs('guipageloading',0,(ref)=>{
				ref.close();
			});
		},
		// 下拉刷新相关
		touchstart : function (e){
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchstart(e);
		},
		touchmove : function(e){
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchmove(e);
		},
		touchend : function (e) {
			if(!this.refresh){return false;}
			if(this.apiLoadingStatus){return false;}
			this.$refs.guiPageRefresh.touchend(e);
		},
		scroll:function(e){
			if(this.srcollTimer != null){
				clearTimeout(this.srcollTimer);
			}
			this.srcollTimer = setTimeout(()=>{
				// #ifndef APP-NVUE
				this.$refs.guiPageRefresh.scroll(e);
				this.$emit('scroll', e);
				this.scrollTop = e.detail.scrollTop;
				// #endif
				
				// #ifdef APP-NVUE
				e.detail = {scrollTop : e.contentOffset.y * -1};
				this.$emit('scroll', e);
				this.scrollTop = e.detail.scrollTop;
				// #endif
			}, 500);
		},
		toTop : function (){
			// #ifndef APP-NVUE
			this.topTagID  = 'guiPageBodyTopTag';
			setTimeout(()=>{
				this.topTagID = 'no';
			}, 500);
			// #endif
			// #ifdef APP-NVUE
			const el = this.$refs.guiPageBodyTopRef;
			dom.scrollToElement(el, {});
			// #endif
		},
		endReload : function(){
			this.$refs.guiPageRefresh.endReload();
			this.refreshing = false; 
		},
		reload : function(){
			if(this.apiLoadingStatus){return false;}
			this.$emit('reload');
			if(this.loadmore){this.$refs.guipageloadmore.stoploadmore();}
		},
		// 获取元素尺寸
		getDomSize : function(domIDOrRef, fun, count){
			if(!count){count = 1;}
			if(count >= 50){
				fun({width:0, height:0});
				return false;
			}
			// #ifndef APP-NVUE
			uni.createSelectorQuery()
			.in(this)
			.select('#'+domIDOrRef)
			.boundingClientRect()
			.exec((res)=>{
				if(res[0] == null){
					count += 1;
					setTimeout(()=>{this.getDomSize(domIDOrRef, fun, count);}, 50);
					return ;
				}else{
					if(res[0].height == undefined){
						count += 1;
						setTimeout(()=>{this.getDomSize(domIDOrRef, fun, count);}, 50);
						return ;
					}
					fun(res[0]);
					return ;
				}
			});
			// #endif
			// #ifdef APP-NVUE
			var el = this.$refs[domIDOrRef];
			dom.getComponentRect(el, (res) => {
				if(res.result == false){
					count += 1;
					setTimeout(()=>{this.getDomSize(domIDOrRef, fun, count);}, 50);
					return ;
				}else{
					if(res.size.height < 1){
						count += 1;
						setTimeout(()=>{this.getDomSize(domIDOrRef, fun, count);}, 50);
						return ;
					}
					fun(res.size);
					return ;
				}
			});
			// #endif
		},
		stopfun   : function(e){e.stopPropagation(); return null;},
		headerTap : function(){
			this.headerTapNumber ++;
			if(this.headerTapNumber >= 2){
				this.$emit('gotoTop');
				this.headerTapNumber = 0;
			}else{
				setTimeout(()=>{this.headerTapNumber = 0;}, 1000);
			}
		},
		getRefs : function(ref, count, fun){
			if(count >= 50){
				fun(this.$refs[ref]);
				return false;
			}
			var refReturn = this.$refs[ref];
			if(refReturn){
				fun(refReturn);
			}else{
				count++;
				setTimeout(()=>{
					this.getRefs(ref, count, fun);
				}, 100);
			}
		},
		loadmorefun : function () {
			if(!this.loadmore){return false;}
			if(this.apiLoadingStatus){return false;}
			// 获取加载组件状态看一下是否还能继续加载
			// 保证触底只执行一次加载
			if(this.loadMoreTimer != null){clearTimeout(this.loadMoreTimer);}
			this.loadMoreTimer =  setTimeout(() => {
				var status = this.$refs.guipageloadmore.loadMoreStatus;
				if(status != 0){return null;}
				this.$refs.guipageloadmore.loading();
				this.$emit('loadmorefun');
			}, 80);
		},
		stopLoadmore : function(){
			this.$refs.guipageloadmore.stoploadmore();
		},
		stoploadmore : function(){
			this.$refs.guipageloadmore.stoploadmore();
		},
		nomore : function () {
			this.$refs.guipageloadmore.nomore();
		},
		toast : function(msg){
			uni.showToast({
				title:msg,
				icon:"none"
			})
		},
		resetFooterHeight : function(){
			if(this.customFooter){
				setTimeout(()=>{
					this.getDomSize('guiPageFooter', (res)=>{
						this.footerHeight = res.height;
					}, 0);
				}, 500);
			}
		}
	},
	emits:['scroll', 'reload', 'loadmorefun', 'gotoTop']
}
</script>
<style scoped>
/* #ifdef APP-VUE */
.gui-sbody{min-height:100vh;}
/* #endif */
/* #ifdef MP-ALIPAY */
.gui-sbody{min-height:100vh;}
/* #endif */
</style>