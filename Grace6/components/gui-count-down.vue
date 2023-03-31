<template>
	<view 
	class="gui-flex gui-row gui-nowrap gui-align-items-center" 
	v-if="show && timer != ''">
		<text 
		:class="customClass" 
		class="gui-countdown-numbers gui-border gui-block" 
		:style="{
			borderColor:borderColor+' !important', 
			width:size*lineHeight+'rpx', 
			marginRight:spacing, 
			height:size*lineHeight+'rpx', 
			lineHeight:size*lineHeight+'rpx', 
			fontSize:size+'rpx', 
		}" 
		v-if="d > 0">{{d}}</text>
		
		<text 
		class="gui-countdown-splitor gui-block" 
		:class="splitorClass" 
		:style="{
			height:size*lineHeight+'rpx',
			lineHeight:size*lineHeight+'rpx', 
			fontSize:size+'rpx', 
			marginRight:spacing}" 
		v-if="d > 0">{{splitorText[0]}}</text>
		
		<text 
		:class="customClass" 
		class="gui-countdown-numbers gui-border gui-block" 
		:style="{
			borderColor:borderColor+' !important', 
			width:size*lineHeight+'rpx', 
			marginRight:spacing, 
			height:size*lineHeight+'rpx', 
			lineHeight:size*lineHeight+'rpx', 
			fontSize:size+'rpx'
		}" 
		v-if="(h != '00' || zeroShow)">{{h}}</text>
		
		<text 
		:class="splitorClass" 
		class="gui-countdown-splitor gui-block" 
		:style="{
			fontSize:size+'rpx', 
			height:size*lineHeight+'rpx',
			lineHeight:size*lineHeight+'rpx', 
			marginRight:spacing
		}" 
		v-if="(h != '00' || zeroShow)">{{splitorText[1]}}</text>
		
		<text 
		:class="customClass" 
		class="gui-countdown-numbers gui-border gui-block" 
		:style="{
			borderColor:borderColor+' !important', 
			width:size*lineHeight+'rpx', 
			marginRight:spacing, 
			height:size*lineHeight+'rpx', 
			lineHeight:size*lineHeight+'rpx', 
			fontSize:size+'rpx'
		}">{{i}}</text>
		
		<text 
		:class="splitorClass" 
		class="gui-countdown-splitor gui-block" 
		:style="{
			fontSize:size+'rpx', 
			marginRight:spacing,
			height:size*lineHeight+'rpx',
			lineHeight:size*lineHeight+'rpx', 
		}">{{splitorText[2]}}</text>
		
		<text 
		:class="customClass" 
		class="gui-countdown-numbers gui-border gui-block" 
		:style="{
			borderColor:borderColor+' !important', 
			width:size*lineHeight+'rpx', 
			marginRight:spacing, 
			height:size*lineHeight+'rpx', 
			lineHeight:size*lineHeight+'rpx', 
			fontSize:size+'rpx'
		}">{{s}}</text>
		
		<text 
		:class="splitorClass" 
		class="gui-countdown-splitor gui-block" 
		:style="{
			fontSize:size+'rpx',
			height:size*lineHeight+'rpx',
			lineHeight:size*lineHeight+'rpx', 
		}">{{splitorText[3]}}</text>
	</view>
</template>
<script>
export default {
	name  : "gui-count-down",
	props : {
		size          : { type: Number, default : 26},
		lineHeight    : { type: Number, default : 1.8},
		timer         : { type:String,  default : "" },
		splitorText   : { type : Array,
			default : function () {
				return ['天', '时', '分', '秒']
			}
		},
		show          : {type:Boolean, default:true},
		zeroShow      : {type:Boolean, default:true},
		spacing       : {type:String,  default:'0rpx'},
		customClass   : {type:Array,   default:function(){
			return ['gui-primary-text'];
		}},
		splitorClass   : {type:Array,   default:function(){
			return ['gui-primary-text'];
		}},
		borderColor   : {type:String,  default:'rgba(255,255,255,0)'}
	},
	data() {
		return {
			d           : 0,
			h           : "",
			i           : "",
			s           : "",
			leftTime    : 0,
			outTimer    : null,
			timerIn     : '',
			leftTimeNum : 0
		}
	},
	created : function(){
		this.timerIn = this.timer;
		this.runbase();
	},
	watch   : {
		timer : function(){
			this.timerIn = this.timer;
			this.runbase();
		}
	},
	methods : {
		runbase : function(){
			var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res = this.timerIn.match(reg);
			if (res == null){ return false;}
			var year = parseInt(res[1]);
			if (year < 1000) { return false; }
			var month = parseInt(res[2]);
			var day = parseInt(res[3]);
			var h = parseInt(res[4]);
			if (h < 0 || h > 24) { return false; }
			var i = parseInt(res[5]);
			if (i < 0 || i > 60) { return false; }
			var s = parseInt(res[6]);
			if (s < 0 || s > 60) { return false; }
			var leftTime = new Date(year, month - 1, day, h, i, s);
			this.leftTime = leftTime;
			clearTimeout(this.outTimer);
			this.countDown();
		},
		countDown: function (){
			var leftTime     = this.leftTime - new Date();
			this.leftTimeNum = leftTime;
			if (leftTime > 0) {
				var day     = parseInt(leftTime  / (1000 * 60 * 60 * 24));
				var hours   = parseInt((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = parseInt((leftTime % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = parseInt((leftTime % (1000 * 60)) / 1000);
				if (hours   < 10) { hours   = '0' + hours;}
				if (minutes < 10) { minutes = '0' + minutes; }
				if (seconds < 10) { seconds = '0' + seconds; }
				this.h = hours; 
				this.i = minutes; 
				this.s = seconds; 
				this.d = day;
				this.outTimer = setTimeout(()=>{this.countDown();}, 1000);
			}else{
				clearTimeout(this.outTimer);
				this.h = '00'; 
				this.i = '00'; 
				this.s = '00'; 
				this.d = 0;
				this.$emit('endDo');
			}
		},
		reSetTimer : function(timer){
			clearTimeout(this.outTimer);
			this.timerIn = timer;
			this.runbase();
		},
		getTimeRemaining : function(){
			if(this.leftTimeNum < 0){return 0;}
			return parseInt(this.leftTimeNum / 1000);
		}
	},
	emits : ['endDo']
}
</script>
<style scoped>
.gui-countdown-splitor{padding:0 5rpx;}
.gui-countdown-numbers{border-radius:8rpx; text-align:center;}
</style>