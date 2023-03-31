<template>
	<view class="gui-im gui-im-bg gui-dark-bg-level-3">
		<block 
		v-for="(item, index) in msgs" 
		:key="index">
			<block 
			v-if="item.group == group">
				<!-- 系统消息 -->
				<view 
				class="gui-im-msg gui-flex gui-row gui-justify-content-center" 
				v-if="item.contentType == 'system'">
					<view 
					class="gui-im-system-msg gui-bg-black gui-dark-bg-level-1">{{item.msg}}</view>
				</view>
				<!-- 用户消息 -->
				<view v-else>
					<view 
					class="gui-im-msg" 
					:class="[userid == item.uindex ? 'gui-im-msg-right' : 'gui-im-msg-left']">
						<view class="gui-im-face">
							<image 
							class="gui-im-face-image" 
							:src="item.uface" 
							mode="widthFix"></image>
						</view>
						<view class="gui-im-content-spacing"></view>
						<view class="gui-im-content-in">
							<view 
							class="gui-im-name" 
							v-if="userid != item.uindex">
								<text 
								class="gui-text-small gui-secondary-text">{{item.uname}}</text>
							</view>
							<!-- 文本消息 -->
							<view 
							v-if="item.contentType == 'txt'" 
							:class="[userid == item.uindex ? 'gui-im-flex-end' : '']">
								<view 
								class="gui-im-content-txt" 
								:class="[userid == item.uindex ? 'gui-bg-green' : '']">
									<text 
									:style="txtContentStyle" 
									:class="[userid == item.uindex ? 'gui-color-white' : '']">{{item.content}}</text>
								</view>
							</view>
							<!-- 图片消息 -->
							<view v-if="item.contentType == 'img'" 
							:class="[userid == item.uindex ? 'gui-im-flex-end' : '']">
								<view class="gui-img-in gui-im-img">									<image class="gui-im-img" 									:src="item.content" :data-img="item.content" 									@tap="showImgs" mode="widthFix"></image>								</view>
							</view>
							<!-- 语言消息 -->
							<view v-if="item.contentType == 'voice'" 
							:class="[userid == item.uindex ? 'gui-im-flex-end' : '']">
								<view 
								class="gui-flex gui-row gui-nowrap gui-align-items-center" 
								:class="[
								'gui-im-voice-msg', 
								index == playIndex ? 'gui-bg-green' : '', 
								userid != item.uindex ? 'gui-im-flex-end' : '' 
								]" 
									:data-voice="item.content" 
									:data-index="index" 
									@tap="playVoice" 
									:style="{'width':(item.length*3)+'px'}">
									<text 
									class="gui-icons" 
									:class="[index == playIndex ? 'gui-color-white' : '']">&#xe800;</text>
									<text 
									class="gui-im-voice-msg-text" 
									:class="[index == playIndex ? 'gui-color-white' : '']">{{item.length}} ”</text> 
								</view>
							</view>
							<view 
							:class="[userid == item.uindex ? 'gui-text-right' : '']">
								<text 
								class="gui-im-timer gui-block-text">{{item.date}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</block>
		<view style="height:100px;"></view>
	</view>
</template>
<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
	name   : "gui-im-messages",
	props  : {
		msgs             : { type : Array,  default : function(){ return []; }},
		userid           : { type : String, default:''},
		group            : { type : String, default : "" },
		txtContentStyle  : { type : String, default : 'line-height:38rpx; font-size:30rpx; color:#2B2E3D;'}
	},
	data() {
		return {
			player    : null,
			playIndex : -1
		}
	},
	created: function(){
		innerAudioContext.onPlay(() => {console.log('play');});
		innerAudioContext.onEnded(() => {
			var cIndex     = Number(this.playIndex);
			this.playIndex = -1;
			for(let i = cIndex + 1; i < this.msgs.length; i++) {
				if (this.msgs[i].contentType == 'voice') {
					this.playNow(this.msgs[i].content, i);
					break;
					return;
				}
			}
		});
		innerAudioContext.onError((E)=>{console.log(E);});
  },
  methods: {
		// 播放语音
		playVoice: function (e) {
			var voicelUrl = e.currentTarget.dataset.voice;
			var index     = e.currentTarget.dataset.index;
			console.log(voicelUrl);
			if (this.playIndex == -1){
				return this.playNow(voicelUrl, index);
			}
			if (this.playIndex == index) {
				innerAudioContext.stop();
				this.playIndex = -1;
			} else {
				innerAudioContext.stop();
				this.playIndex = -1;
				this.playNow(voicelUrl, index);
			}
		},
		// 语音播放基础函数
		playNow: function (voicelUrl, index){
			this.playIndex  = index;
			innerAudioContext.src = voicelUrl;
			innerAudioContext.play();
			return true;
		},
		// 图片预览
		showImgs : function(e){
			var imgs        = [];
			var imgsCurrent = e.currentTarget.dataset.img;
			for (var i = 0; i < this.msgs.length; i++) {
				if (this.msgs[i].contentType == 'img') {
					imgs.push(this.msgs[i].content);
				}
			}
			uni.previewImage({urls : imgs, current : imgsCurrent});
		}
	}
}
</script>
<style scoped>
.gui-im{padding:30rpx;}
/* #ifndef APP-NVUE */
.gui-im{min-height:100vh;}
/* #endif */
.gui-im-system-msg{color:#FFFFFF; font-size:26rpx; line-height:38rpx; padding:5px 10px; display:block; border-radius:6rpx;}
.gui-im-msg{margin-bottom:28px; display:flex; flex-direction:row; flex-wrap:nowrap;}
.gui-im-face{width:88rpx; height:88rpx; overflow:hidden; flex-shrink:0; border-radius:6rpx; overflow:hidden; font-size:0;}
.gui-im-face-image{width:88rpx;}
.gui-im-name{padding-bottom:10rpx; margin-top:-5rpx; }
.gui-im-content-spacing{width:25rpx; height:50rpx; flex-shrink:0;}
.gui-im-content-in{width:600rpx; overflow:hidden;}
.gui-im-content-txt{background-color:#E7F0F3; padding:15rpx 20rpx; border-radius:6rpx; min-width:100rpx; word-break:break-all;}
.gui-im-msg-right{flex-direction:row-reverse;}
.gui-im-timer{margin-top:5px; line-height:30rpx; font-size:22rpx; color:#8788A3;}
.gui-im-img{width:358rpx; border-radius:6rpx;}
.gui-im-flex-end{display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:flex-end;}
.gui-im-voice-msg{height:80rpx; padding:0 20rpx; background-color:#E7F0F3; border-radius:6rpx; color:#2B2E3D; min-width:100rpx; max-width:400rpx;}
.gui-im-voice-msg-text{font-size:22rpx; margin:0 5rpx;}
@font-face {
font-family: "guiimfont"; 
src:url('data:font/ttf;charset=utf-8;base64,d09GRgABAAAAAARIAAsAAAAABpAOfljMqxyszBwQAGoSFheJxjYGRgYADih0telMfz23xl4GZhAIEblhYmCPr/ZxYGZl4gl4OBCSQKAC7VCZ8AeJxjYGRgYG7438AQw8IAAkCSkQEVMAEARGInC9nJQTHaVXQA5E0DC9B6B5D1CO4UPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgImRiZGZgTWxNCUzn4EBAAzjAi0AAA==');
}
.graceIMFont{font-family:"graceIMFont"; font-size:30rpx; color:#2B2E3D;}
</style>