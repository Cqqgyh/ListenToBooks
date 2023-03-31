<template>
	<view class="gui-player">
		<view class="gui-player-title" 
		:style="{color:color}">{{list[index].title}}</view>
		<view class="gui-player-poster">
			<image 
			class="gui-player-poster-img" 
			:class="[playStatus == 1 ? 'gui-playing' : '']" 
			:src="list[index].coverImgUrl" 
			mode="aspectFill"></image>
		</view>
		<!-- 播放进度 -->
		<view style="padding:25rpx;">
			<gui-single-slider 
			ref="graceSingleSlider" 
			@change="progressChange" 
			:barWidth="100" 
			:barClass="['gui-bg-gray', 'gui-primary-text']" 
			:bglineClass="['gui-bg-gray']" 
			:bglineAClass="['gui-bg-green']" 
			:barText="playTime"></gui-single-slider>
		</view>
		<!-- 播放控制 -->
		<view class="gui-player-console">
			<!-- 循环模式 -->
			<view class="gui-player-tool" 
			@tap="changeType">
				<text class="gui-player-tool gui-icons" 
				v-if="dotype == 1">&#xe677;</text>
				<text class="gui-player-tool gui-icons" 
				v-if="dotype == 2" style="font-size:40rpx;">&#xe64a;</text>
			</view>
			<view class="gui-player-console-c">
				<text class="gui-player-tool gui-icons" @tap="prev">&#xe659;</text>
				<text class="gui-player-tool gui-icons" style="font-size:66rpx;" 
				@tap="pause" v-if="playStatus == 1">&#xe64b;</text>
				<text class="gui-player-tool gui-icons" style="font-size:66rpx;" 
				@tap="playi" v-if="playStatus == 2">&#xe649;</text>
				<text class="gui-player-tool gui-icons" @tap="next">&#xe65a;</text>
			</view>
			<text class="gui-player-tool gui-icons" @tap="openList">&#xe648;</text>
		</view>
		<!-- 歌曲列表 -->
		<view class="gui-shade" :style="{left:listShow?'0':'-2000px'}" 
		@tap.stop.parent="hideList" @touchmove.stop.parent="">
			<scroll-view 
			scroll-y="true" 
			class="graceplayer-list" 
			:style="{background:listBg, height:listHeight}">
				<view class="graceplayer-list-item">歌曲列表</view>
				<view class="graceplayer-list-item" 
				:class="[index == idx ? 'graceplayer-list-item-this' : '']" 
				v-for="(item, idx) in list" 
				:key="idx" 
				@tap="playList" 
				:data-index="idx">{{item.title}}<text class="graceplayer-list-item-singer"> - {{item.singer}}</text></view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-audio-player",
	props : {
		color      : {type:String, default:'#FFFFFF'},
		list       : {type:Array , default:function(){return [];}},
		listBg     : {type:String, default:'#292E35'},
		listHeight : {type:String, default:'880rpx'},
		autoplay   : {type:Boolean, default:true}
	},
	data(){
		return {
			playStatus  : 1,
			player      : null,
			playTime    : '00:00',
			timer       : null,
			dotype      : 1,
			index       : 0,
			listShow    : false,
			audioLength : 1
		}
	},
	mounted:function(){
		if(this.autoplay){
			this.play();
		}
	},
	created:function(){
		// #ifdef H5
		return ;
		// #endif
		this.player = uni.getBackgroundAudioManager();
		this.player.onTimeUpdate(()=>{
			try{
				if(this.playStatus != 1){return ;}
				this.audioLength = this.player.duration;
				// 调整进度
				var progress = this.player.currentTime / this.audioLength;
				progress     = Math.round(progress * 100);
				var ref      = this.$refs.graceSingleSlider;
				if(ref){
					ref.setProgress(progress);
				}
				this.playTime = this.timeFormat(this.player.currentTime);
			}catch(e){};
		});
		this.player.onPlay(()=>{
			this.playStatus  = 1;
			this.audioLength = this.player.duration;
		});
		this.player.onPause(()=>{
			this.playStatus = 2;
		});
		this.player.onEnded(()=>{
			switch(this.dotype){
				case 1 :
				this.index++;
				if(this.index + 1 > this.list.length){this.index = 0;}
				this.play();
				break;
				case 2 :
				this.player.seek(0);
				this.play();
				break;
			}
		});
		if(this.player.currentTime < 1){
			this.play();
		}
	},
	methods:{
		play:function () {
			var audio               = this.list[this.index];
			this.player.title       = audio.title;
			this.player.singer      = audio.singer;
			this.player.coverImgUrl = audio.coverImgUrl;
			this.player.src         = audio.src;
			this.player.play();
		},
		progressChange : function(e){
			if(this.timer != null){ clearTimeout(this.timer); }
			this.player.pause();
			var needTime  = this.audioLength * e / 100;
			needTime      = Math.round(needTime);
			this.playTime = this.timeFormat(needTime);
			this.timer = setTimeout(()=>{
				this.player.seek(needTime);
				this.player.play();
			}, 800);
		},
		timeFormat : function (s){
			s = Math.round(s);
			if(s < 60){
				if(s < 10){return '00:0'+s;}
				return '00:'+s;
			}else{
				var second = s % 60;
				s = s - second;
				var minute = s / 60;
				if(minute < 10){minute = '0'+minute;}
				if(second < 10){second = '0'+second;}
				return minute+':'+second;
			}
			
		},
		changeType : function () {
			switch(this.dotype){
				case 1 :
				this.dotype = 2;
				break;
				case 2 :
				this.dotype = 1;
				break;
			}
		},
		pause :function () {this.player.pause();},
		playi :function () {this.player.play();},
		next : function () {
			if(this.index + 1 >= this.list.length){uni.showToast({title:"已经到底了 (:", icon:"none"}); return ;}
			this.index++;
			this.play();
		},
		prev : function () {
			if(this.index -1 < 0){uni.showToast({title:"已经到头了 (:", icon:"none"}); return ;}
			this.index--;
			this.play();
		},
		openList : function () { this.listShow = true; },
		hideList : function () { this.listShow = false; },
		playList : function (e) {
			var idx = e.currentTarget.dataset.index;
			this.index = idx;
			this.play();
		},
		setIndex : function (idx) { this.index = idx; }
	}
}
</script>
<style scoped>
.gui-player{padding:30rpx;}
.gui-player-title{text-align:center; line-height:50rpx; font-size:30rpx; font-weight:bold;}
.gui-player-poster{padding:30px; line-height:0; text-align:center;}
.gui-player-poster-img{width:380rpx; height:380rpx; border-radius:300rpx; box-shadow:0rpx 2rpx 2rpx #323232;}
@keyframes gui-rotate360{0%{transform:rotate(0deg);} 50%{transform:rotate(180deg);} 100%{transform:rotate(360deg);}}
.gui-playing{animation:gui-rotate360 6000ms infinite linear;}
.gui-player-console{padding:20rpx 10rpx; display:flex; flex-direction:row; align-items:center; justify-content:space-between;}
.gui-player-tool{width:100rpx; line-height:100rpx; text-align:center; font-size:50rpx; display:block; flex-shrink:0; color:#FFFFFF;}
.gui-player-console-c{width:400rpx; display:flex; flex-direction:row; justify-content:space-between;}
.graceplayer-list{width:100%; height:1000rpx; background-color:#FFFFFF; position:absolute; left:0; bottom:0; z-index:9999;}
.gui-shade{position:fixed; width:100%; height:100%; left:0; top:0; background-color:rgba(0,0,0,0.5); bottom:0; overflow:hidden; z-index:9998; display:flex; justify-content:center; align-items:center;}
.graceplayer-list-item{padding:25rpx 0rpx; margin:5rpx 30rpx; border-bottom:1px solid #373A3F; line-height:50rpx; font-size:30rpx; color:#FFFFFF;}
.graceplayer-list-item-singer{color:#888888; font-size:26rpx; margin-left:50rpx;}
.graceplayer-list-item-this{color:#64CDA5 !important; font-weight:bold;}
</style>