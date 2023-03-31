<template name="gui-im-input">
	<view>
		<view class="gui-im-footer gui-bg-gray gui-dark-bg-level-2">
			<view 
			class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
				<view
				class="gui-im-menus gui-icons gui-secondary-text" 
				hover-class="gui-tap" 
				v-if="voiceBtnShow" 
				@tap="showRec">&#xe617;</view>
				<view 
				class="gui-im-menus gui-icons gui-secondary-text" 
				 hover-class="gui-tap" 
				@tap="chooseImg">&#xe63d;</view>
				<view 
				class="gui-im-input gui-bg-white gui-dark-bg-level-3">
					<textarea 
					type="text" 
					v-model="inputMsg" 
					:fixed="true" 
					:maxlength="-1" 
					@confirm="sendTextMsg" 
					:cursor-spacing="35"></textarea>
				</view>
				<view 
				class="gui-items gui-primary-text" 
				style="padding:0 20rpx; margin-right:10rpx;" 
				hover-class="gui-tap" 
				@tap="sendTextMsg">发送</view>
			</view>
			<view>
				<gui-iphone-bottom></gui-iphone-bottom>
			</view>
		</view>
		<!-- 语音输入 -->
		<view 
		class="gui-im-record gui-bg-gray gui-dark-bg-level-2" 
		v-if="recShow">
			<view class="gui-im-record-txt">
				{{recTxt}}<text v-if="recing">已录音 : {{recLength}} s</text>
			</view>
			<view class="gui-im-record-btn" 
			@tap="rec" :class="[recing ? 'gui-im-recording' : '']"></view>
			<view class="gui-im-send-voice" 
			v-if="tmpVoice != ''">
				<text @tap="sendVoiceMsg">发送语音</text>
			</view>
			<view 
			class="gui-im-record-close gui-icons" 
			@tap="closeRec" 
			v-if="!recing">&#xe78a;</view>
		</view>
	</view>
</template>
<script>
var bgAudioMannager = uni.createInnerAudioContext();
export default {
	name  : "gui-im-input",
	props : { },
	data() {
		return {
			paddingB        : '0',
			uploading       : false,
			recShow         : false,
			recTxt          : "请点击绿色按钮开始录音",
			inputMsg        : "",
			recorderManager : null,
			recing          : false,
			recLength       : 1,
			recTimer        : null,
			tmpVoice        : '',
			voiceLen        : 0,
			voiceBtnShow    : false,
			// 播放相关
			player          : null,
			playTxt         : "试听语音"
		}
	},
	created : function(){
		// #ifndef H5
		this.voiceBtnShow    = true;
		this.recorderManager = uni.getRecorderManager();
		this.recorderManager.onStop((res) => {
			this.tmpVoice    = res.tempFilePath;
			this.recing      = false;
			this.recTxt       =  "... 已录音 "+this.recLength+
			"s, 点击绿色按钮重新录音 ...";
			clearInterval(this.recTimer);
		});
		this.recorderManager.onError(() => {
			uni.showToast({ title: '录音失败', icon: 'none' });
			this.recing = false;
			this.recTxt   = "请点击绿色按钮开始录音",
			clearInterval(this.recTimer);
		});
		// #endif
	},
	methods:{
		// 录音
		rec : function(){
			if (this.recing){
				this.recorderManager.stop();
				this.recing = false;
				this.recTxt   =  "... 已录音 "+this.recLength
				+"s, 点击绿色按钮重新录音 ...";
				clearInterval(this.recTimer);
			} else {
				this.recorderManager.start({duration:60000, format:'mp3' });
				this.recing     = true;
				this.recTxt     =  "... 正在录音 ...";
				this.recLength  = 1;
				this.recTimer   = setInterval(()=>{this.recLength++;}, 1000);
			}
		},
		// 发送录音
		sendVoiceMsg : function(){
			if (this.tmpVoice == '') {
				uni.showToast({ title: "请先录制一段语音", icon: "none" });
				return;
			}
			// 关闭界面
			this.recShow = false;
			this.$emit('sendVoice', this.tmpVoice, this.recLength);
			this.tmpVoice  = '';
			this.recLength = 0;
			this.recTxt    = "请点击绿色按钮开始录音";
		},
		// 展示录音界面
		showRec : function(){this.recShow  = true;},
		// 关闭录音界面
		closeRec: function (){this.recShow = false;},
		// 发送文本消息
		sendTextMsg: function () {
			if (this.inputMsg < 1) {return false;}
			this.$emit('sendText', this.inputMsg);
			this.inputMsg = '';
		},
		// 选择图片
		chooseImg : function(){
			uni.chooseImage({
				count      : 1,
				sizeType   : ['compressed'],
				sourceType : ['album', 'camera'],
				success    : (res)=>{
					const tempFilePaths = res.tempFilePaths;
					this.$emit('chooseImage', tempFilePaths[0]);
				}
			});
		}
	},
	emits : ['sendVoice', 'sendText', 'chooseImage']
}
</script>
<style scoped>
.gui-im-footer{width:100%; position:fixed; left:0; bottom:0;}
.gui-im-footer .gui-items{width:auto; line-height:88rpx; flex-shrink:0; font-size:28rpx;}
.gui-im-menus{width:80rpx; height:80rpx; flex-shrink:0; line-height:80rpx; text-align:center;}
.gui-im-input{width:600rpx; margin:10rpx; padding:12rpx 16rpx; border-radius:6rpx;}
.gui-im-input textarea{width:100%; height:40rpx; line-height:40rpx; font-size:28rpx; margin-top:10rpx;}
.gui-im-record{width:100%; position:fixed; left:0; bottom:0; padding:30px 0; padding-bottom:100rpx; z-index:11;}
.gui-im-record-close{width:100rpx; height:100rpx; position:absolute; top:0px; right:0px; z-index:100; text-align:center; line-height:100rpx; font-size:38rpx !important;}
.gui-im-record-txt{text-align:center; font-size:26rpx; line-height:30px; padding-bottom:10px;}
.gui-im-record-btn{width:60px; height:60px; margin:0 auto; border:5px solid #F1F2F3; border-radius:100%; background:#00B26A;}
.gui-im-recording{background:#FF0000; animation:fade linear 2s infinite;}
@keyframes fade{from{opacity:0.1;} 50%{opacity:1;} to{opacity:0.1;}}
.gui-im-record-txt text{color:#00B26A; padding:0 12px;}
.gui-im-send-voice{margin-top:12px; font-size:28rpx; color:#00BA62; text-align:center;}
.gui-im-send-voice text{margin:0 15px; color:#00BA62;}

.gui-icons{font-size:50rpx;}
</style>