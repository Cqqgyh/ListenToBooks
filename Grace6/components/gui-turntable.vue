<template>
	<view 
	class="gui-turntable" 
	:animation="animationData">
		<view 
		class="gui-turntable-item" 
		v-for="(item, index) in rewardNames" 
		:key="index" 
		:style="{
			transform : 'rotate('+(inital - averageRotate * index)+'deg)'
		}">
			<view 
			class="gui-turntable-inner" 
			:style="{
			transform  : 'translateX(-300rpx) rotate(' + averageRotate + 'deg)',
			background : rewardBGColors[index]
			}">
				<text 
				class="gui-turntable-text" 
				:style="{
					transform : 'translateY(120rpx) translateX('+textTrX+') rotate('+textRotate+')',
					fontSize  : fontSize,
					color     : rewardColors[index]
				}">{{item}}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-turntable",
	props : {
		// 奖品名称
		rewardNames : {
			type : Array,
			default : function(){
				return ["", "", "", "", "", ""];
			}
		},
		// 奖品展示区背景颜色
		rewardBGColors : {
			type : Array,
			default : function(){
				return [];
			}
		},
		// 奖品展示区文本颜色
		rewardColors : {
			type : Array,
			default : function(){
				return [];
			}
		},
		// 文本尺寸
		fontSize : {
			type : String,
			default : '32rpx'
		}
	},
	data() {
		return {
			// 是否正在抽奖
			luckyStatus     : 0,
			// 动画对象
			animationData   : {},
			tpmimgtimmer    : null,
			// 中奖奖品 index
			RewardIndex     : -1,
			// 角度
			averageRotate   : 0,
			inital          : 0,
			textTrX         : '43rpx',
			textRotate      : '-30deg'
		}
	},
	created:function(){
		this.init();
	},
	watch:{
		rewardNames:function(){
			this.init();
		}
	},
	methods:{
		init : function(){
			var length          = this.rewardNames.length;
			this.averageRotate  = 360 / length ;
			this.inital         = (360 / length / 2) * -1;
			switch(length){
				case 4:
					this.textTrX    = '0rpx';
					this.textRotate = '-45deg';
					break
				case 6:
					this.textTrX    = '43rpx';
					this.textRotate = '55deg';
					break
				case 8:
					this.textTrX    = '72rpx';
					this.textRotate = '65deg';
					break
			}
			var animation      = null;
			animation = uni.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			animation.rotateZ(this.averageRotate/2).step();
			this.animationData = animation.export();
		},
		goto : function(index){
			if(this.luckyStatus != 0){
				return ;
			}
			this.RewardIndex = index;
			this.animationData = {};
			this.luckyStatus   = 1;
			
			// 轮盘归零
			var animation      = null;
			animation = uni.createAnimation({
				duration: 0,
				timingFunction: 'ease',
			});
			animation.rotateZ(this.averageRotate/2).step();
			this.animationData = animation.export();
			
			// 计算奖品角度
			var rewardRadiu     = (360 / this.rewardNames.length);
			var rewardRadiuNeed = 360*6 + rewardRadiu * this.RewardIndex;
			setTimeout(()=>{
				animation = uni.createAnimation({
					duration:5000,
					timingFunction: 'ease',
				});
				animation.rotateZ(rewardRadiuNeed).step();
				this.animationData = animation.export();
			},100);
			setTimeout(()=>{
				// 停止动画
				this.luckyStatus = 0;
				this.$emit('end', index);
				this.RewardIndex = -1;
			},5000);
		}
	},
	emits : ['end']
}
</script>
<style scoped>
.gui-turntable{
  position : relative;
  transform-origin: center;
  width    : 600rpx;
  height   : 600rpx;
}
.gui-turntable-item {
  position : absolute;
  left     : 50%;
  width    : 300rpx;
  height   : 600rpx;
  border-radius:0px 300rpx 300rpx 0;
  overflow : hidden;
  transform-origin : left center;
}

.gui-turntable-inner {
  text-align: center;
  width  : 300rpx;
  height : 600rpx;
  transform-origin : right center;
  border-radius : 300rpx 0 0 300rpx;
}

.gui-turntable-text {
  display: block;
  transform-origin:center;
}
</style>