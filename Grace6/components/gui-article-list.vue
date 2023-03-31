<template>
	<!-- #ifndef APP-NVUE -->
	<view 
	class="gui-article-list-item" 
	:class="itemClass" 
	hover-class="gui-tap" 
	v-for="(item, index) in articles" 
	:key="index" 
	@tap="newstap(item.id)">
		<view>
			<text 
			class="gui-article-list-title gui-block" 
			:class="titleClass">{{item.title}}</text>
		</view>
		<view 
		class="gui-article-list-img1" 
		v-if="item.imgs.length == 1">
			<gui-image 
			:src="item.imgs[0]" 
			:width="460" 
			:height="280"></gui-image>
		</view>
		<view 
		class="gui-flex gui-row gui-nowrap gui-space-between" 
		v-if="item.imgs.length == 2">
			<view 
			class="gui-article-list-img2-in">
				<gui-image 
				:src="item.imgs[0]" 
				:width="335" 
				:height="200"></gui-image>
			</view>
			<view 
			class="gui-article-list-img2-in">
				<gui-image 
				:src="item.imgs[1]" 
				:width="335" 
				:height="200"></gui-image>
			</view>
		</view>
		<view 
		class="gui-flex gui-row gui-nowrap gui-space-between" 
		v-if="item.imgs.length >= 3">
			<view class="gui-article-list-img3-in">
				<gui-image 
				:src="item.imgs[0]" 
				:width="220" 
				:height="150"></gui-image>
			</view>
			<view 
			class="gui-article-list-img3-in">
				<gui-image 
				:src="item.imgs[1]" 
				:width="220" 
				:height="150"></gui-image>
			</view>
			<view 
			class="gui-article-list-img3-in">
				<gui-image 
				:src="item.imgs[2]" 
				:width="220" 
				:height="150"></gui-image>
			</view>
		</view>
		<view 
		class="gui-article-list-footer gui-flex gui-row gui-space-between gui-align-items-center">
			<text 
			class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons">&#xe69e; {{item.author}}</text>
			<text 
			class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons gui-text-center">&#xe609; {{item.views}}</text>
			<text 
			class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons gui-text-right">&#xe64c; {{item.createTime}}</text>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<cell 
	v-for="(item, index) in articles" 
	:key="index" >
		<view
		class="gui-article-list-item" 
		:class="itemClass" 
		hover-class="gui-tap" 
		@tap="newstap(item.id)">
			<view>
				<text 
				class="gui-article-list-title gui-block" 
				:class="titleClass">{{item.title}}</text>
			</view>
			<view 
			class="gui-article-list-img1" 
			v-if="item.imgs.length == 1">
				<gui-image 
				:src="item.imgs[0]" 
				:width="460" 
				:height="280"></gui-image>
			</view>
			<view 
			class="gui-flex gui-row gui-nowrap gui-space-between" 
			v-if="item.imgs.length == 2">
				<view 
				class="gui-article-list-img2-in">
					<gui-image 
					:src="item.imgs[0]" 
					:width="335" 
					:height="200"></gui-image>
				</view>
				<view 
				class="gui-article-list-img2-in">
					<gui-image 
					:src="item.imgs[1]" 
					:width="335" 
					:height="200"></gui-image>
				</view>
			</view>
			<view 
			class="gui-flex gui-row gui-nowrap gui-space-between" 
			v-if="item.imgs.length >= 3">
				<view class="gui-article-list-img3-in">
					<gui-image 
					:src="item.imgs[0]" 
					:width="220" 
					:height="150"></gui-image>
				</view>
				<view 
				class="gui-article-list-img3-in">
					<gui-image 
					:src="item.imgs[1]" 
					:width="220" 
					:height="150"></gui-image>
				</view>
				<view 
				class="gui-article-list-img3-in">
					<gui-image 
					:src="item.imgs[2]" 
					:width="220" 
					:height="150"></gui-image>
				</view>
			</view>
			<view 
			class="gui-article-list-footer gui-flex gui-row gui-space-between gui-align-items-center">
				<text 
				class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons">&#xe69e; {{item.author}}</text>
				<text 
				class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons gui-text-center">&#xe609; {{item.views}}</text>
				<text 
				class="gui-article-list-footer-items gui-ellipsis gui-color-gray gui-block gui-icons gui-text-right">&#xe64c; {{item.createTime}}</text>
			</view>
		</view>
	</cell>
	<!-- #endif -->
</template>
<script>
export default{
	name  : "gui-article-list",
	props : {
		articles   : { type : Array , default : function(){return [];}},
		itemClass  : { type : Array,  default : function(){
			return ['gui-bg-white', 'gui-dark-bg-level-3'];
		}},
		titleClass : { type : Array , default : function(){
			return ['gui-h6', 'gui-primary-text'];
		}}
	},
	methods : {
		newstap : function(id){
			this.$emit('newstap', id);
		}
	},
	emits : ['newstap']
}
</script>
<style scoped>
.gui-article-list{}
.gui-article-list-item{margin-bottom:30rpx; padding:25rpx 30rpx;}
.gui-article-list-title{overflow:hidden;}
.gui-article-list-img1{margin-top:22rpx;}
.gui-article-list-img2-in{width:335rpx; height:200rpx; margin-top:22rpx;}
.gui-article-list-img3-in{width:220rpx; height:150rpx; margin-top:22rpx;}
.gui-article-list-footer{margin-top:20rpx;}
.gui-article-list-footer-items{width:220rpx; height:50rpx; line-height:50rpx; font-size:26rpx; overflow:hidden;}
</style>