<template>
	<view 
	class="gui-editor-show gui-border-box" 
	:style="{
		paddingLeft:padding+'rpx', 
		paddingRight:padding+'rpx', 
		width:'750rpx'
	}">
		<view 
		v-for="(item, index) in article" 
		:key="index">
		
			<!-- 文本 -->
			<text 
			class="gui-block" 
			:decode="true" 
			:selectable="true" 
			:user-select="true" 
			:class="textClass" 
			v-if="item.type == 'txt'">{{item.content}}</text>
			
			<!-- 居中 -->
			<text 
			class="gui-block gui-text-center" 
			:class="centerClass" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-if="item.type == 'center'">{{item.content}}</text>
			
			<!-- 图片 -->
			<view 
			class="gui-img-in" 
			v-else-if="item.type == 'img'" 
			:data-url="item.content" 
			@tap="showImgs">
				<gui-image 
				:src="item.content" 
				:height="0" 
				:borderRadius="imgRadius"
				:width="(750-padding*2)"></gui-image>
			</view>
			
			<!-- 引用 源码 -->
			<text 
			class="gui-block" 
			:class="quoteClass" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="
			item.type == 'quote' || item.type == 'pre'
			">{{item.content}}</text>
			
			<!-- 加粗 -->
			<text 
			class="gui-block gui-bold" 
			:class="strongClass" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'strong'">{{item.content}}</text>
			
			<!-- 链接 -->
			<view 
			v-else-if="item.type == 'link'">
				<gui-link 
				:url="item.content" 
				:title="item.content"></gui-link>
			</view>
			
			<!-- 分割符 -->
			<text 
			class="gui-block gui-text-center" 
			:class="splineClass" 
			:selectable="true" 
			:user-select="true" 
			v-else-if="item.type == 'spline'">● ● ●</text>
			
			<!-- h1 -->
			<text 
			class="gui-block gui-h1 gui-primary-text" 
			:decode="true" 
			:selectable="true" 
			:user-select="true" 
			v-else-if="item.type == 'h1'">{{item.content}}</text>
			
			<!-- h2 -->
			<text 
			class="gui-block gui-h2 gui-primary-text" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'h2'">{{item.content}}</text>
			
			<!-- h3 -->
			<text 
			class="gui-block gui-h3 gui-primary-text" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'h3'">{{item.content}}</text>
			
			<!-- h4 -->
			<text 
			class="gui-block gui-h4 gui-primary-text" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'h4'">{{item.content}}</text>
			
			<!-- h5 -->
			<text 
			class="gui-block gui-h5 gui-primary-text" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'h5'">{{item.content}}</text>
			
			<!-- h6 -->
			<text 
			class="gui-block gui-h6 gui-primary-text" 
			:selectable="true" 
			:user-select="true" 
			:decode="true" 
			v-else-if="item.type == 'h6'">{{item.content}}</text>
			
			<!-- 视频 -->
			<view 
			v-if="item.type == 'video'">
				<video 
				:style="{width:(750-padding*2)+'rpx'}"
				:src="item.content" 
				controls></video>
			</view>
			
			<!-- 间距 -->
			<view :style="{height:itemMargin}"></view>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-article-info",
	props : {
		article      : {
			type     : Array,  
			default  : function(){return new Array();}
		},
		itemMargin   : {
			type     : String, 
			default  : '20rpx',
		},
		padding      : {
			type     : Number, 
			default  : 30,
		},
		textClass    : {
			type     : Array, 
			default  : function(){
				return ['gui-article-text', 'gui-primary-text']
			}
		},
		centerClass    : {
			type     : Array, 
			default  : function(){
				return ['gui-article-center', 'gui-primary-text']
			}
		},
		imgRadius    : {
			type     : String, 
			default  : '6rpx',
		},
		quoteClass    : {
			type     : Array, 
			default  : function(){
				return ['gui-article-quote', 'gui-primary-text', 'gui-bg-gray', 'gui-dark-bg-level-2']
			}
		},
		strongClass  : {
			type     : Array, 
			default  : function(){
				return ['gui-article-strong', 'gui-primary-text']
			}
		},
		splineClass  : {
			type     : Array, 
			default  : function(){
				return ['gui-article-spline', 'gui-color-gray']
			}
		}
	},
	methods: {
		showImgs:function(e){
			var currentUrl = e.currentTarget.dataset.url;
			var imgs       = [];
			var items      = this.article;
			for(let i = 0; i < items.length; i++){
				if(items[i].type ==  'img'){
					imgs.push(items[i].content);
				}
			}
			uni.previewImage({
				urls:imgs,
				current:currentUrl
			})
		}
	}
}
</script>
<style scoped>
/* #ifndef APP-NVUE */
.gui-block{word-break: break-all;}
/* #endif */
</style>