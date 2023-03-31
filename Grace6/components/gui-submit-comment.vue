<template>
	<gui-popup 
	ref="guipopupforsubcomment" 
	position="bottom" 
	:canCloseByShade="true" 
	@close="closePop" 
	:zIndex="zIndex">
		<view 
		class="gui-comments gui-bg-white gui-dark-bg-level-1" 
		@tap.stop.prevent="stopfun">
			<text 
			class="gui-comments-at gui-block gui-primary-color" 
			v-if="comment.at != ''">@ {{comment.at}}</text>
			<view 
			style="height:20rpx;" 
			v-if="comment.at == ''"></view>
			<view 
			class="gui-flex gui-row gui-nowrap gui-space-between">
				<view 
				class="gui-comments-img gui-relative" 
				v-if="comment.img != ''">
					<image 
					:src="comment.img" 
					class="gui-comments-img-in" 
					mode="widthFix"></image>
					<text 
					class="gui-comments-img-remove gui-icons" 
					@tap="removeImg" 
					:style="{color:removeBtnColor}">&#xe78a;</text>
				</view>
				<textarea 
				:show-confirm-bar="false" 
				cursor-spacing="200" 
				v-model="comment.content" 
				class="gui-comments-textarea gui-border-box gui-bg-gray gui-dark-bg-level-2" 
				:placeholder="placeholder" />
			</view>
			<view class="gui-flex gui-row gui-space-between gui-align-items-center">
				<text 
				class="gui-comments-btns gui-icons gui-color-gray" 
				@tap="selectImg" 
				v-if="isImg">&#xe63d;</text>
				<text class="gui-comments-btns" 
				v-if="!isImg"></text>
				<view class="gui-comments-submit" 
				hover-class="gui-tap">
					<text 
					class="gui-comments-btns gui-comments-submit gui-icons gui-primary-color" 
					@tap="submit">提交</text>
				</view>
			</view>
			<gui-iphone-bottom v-if="!isSwitchPage"></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "gui-submit-comment",
	props : {
		placeholder    : { type : String,  default : "说点什么吧"},
		isImg          : { type : Boolean, default : true},
		removeBtnColor : { type : String,  default : '#FF0036'},
		zIndex         : { type : Number,  default : 999},
		isSwitchPage   : { type : Boolean, default : false},
	},
	data() {
		return {
			comment : {img:'', content:'',at:''}
		}
	},
	methods:{
		open       : function(){
			this.$refs.guipopupforsubcomment.open();
		},
		close      : function(){
			this.$refs.guipopupforsubcomment.close();
			this.$emit('close'); 
		},
		closePop   : function(){
			this.$emit('close'); 
		},
		stopfun    : function(e){
			e.stopPropagation();
			return null;
		},
		submit     : function () {
			this.$emit('submit', this.comment); 
			this.close();
			this.comment = {img:'', content:'',at:''}
		},
		selectImg  : function(){
			uni.chooseImage({
				count:1,
				success:(res)=>{this.comment.img = res.tempFilePaths[0];}
			});
		},
		removeImg  : function () {
			this.comment.img = '';
		},
		setAt      : function(name){
			this.comment.at = name;
		},
		setContent : function (content) {
			this.comment.content = content;
		}
	},
	emits : ['close', 'submit']
}
</script>
<style scoped>
.gui-comments{padding:10rpx 30rpx;}
.gui-comments-at{line-height:80rpx; height:80rpx; font-size:28rpx; font-weight:bold;}
.gui-comments-textarea{width:200rpx; border-radius:8rpx; padding:15rpx; font-size:26rpx; line-height:36rpx; height:160rpx; flex:1;}
.gui-comments-img{width:160rpx; height:160rpx; margin-right:25rpx; font-size:0; overflow:hidden; border-radius:8rpx;}
.gui-comments-img-in{width:160rpx;}
.gui-comments-img-remove{width:60rpx; height:60rpx; line-height:60rpx; position:absolute; right:0; top:0; text-align:center; font-size:50rpx; color:#FF0036;}
.gui-comments-btns{width:96rpx; height:80rpx; line-height:80rpx; font-size:44rpx;}
.gui-comments-submit{width:180rpx; text-align:right; font-size:28rpx;}
</style>