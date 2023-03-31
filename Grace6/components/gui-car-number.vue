<template>
	<gui-popup 
	ref="guipopupforcarnumber" 
	width="750rpx" 
	position="bottom" 
	:isSwitchPage="isSwitchPage" 
	@close="close" 
	:canCloseByShade="true">
		<view 
		@tap.stop.prevent="stopfun" 
		class="gui-bg-white gui-dark-bg-level-3">
			<view 
			class="gui-flex gui-rows gui-space-between gui-align-items-center"
			style="padding:20rpx;">
				<!-- 类型 -->
				<view style="width:320rpx;">
					<gui-segmented-control 
					:items="['普通车牌','新能源牌']" 
					:current="carType" 
					@change="changeType"></gui-segmented-control>
				</view>
				<text 
				class="gui-car-number-submit gui-block gui-primary-color" 
				@tap="confirm">确定</text>
			</view>
			<!-- 车牌展示 -->
			<view 
			class="gui-flex gui-rows gui-nowrap gui-justify-content-center" 
			style="padding-top:20rpx; padding-bottom:20rpx;">
				<text 
				class="gui-car-number-item gui-block gui-border" 
				:class="[
					idx == inputIndex ? 'gui-bg-gray' : '',
					idx == inputIndex ? 'gui-a-shade' : ''
				]" 
				v-for="(item, idx) in carNumberArray" 
				:key="idx" 
				@tap="numberTap(idx)">{{item}}</text>
			</view>
			<!-- 错误信息 -->
			<view 
			v-if="errorshow" 
			style="padding:20rpx; margin-bottom:10rpx;">
				<text 
				class="gui-text gui-block gui-color-red gui-text-center">请输入完整车牌号码</text>
			</view>
			<view 
			style="padding:15rpx;">
				<!-- 省份前缀键盘 -->
				<view 
				class="gui-flex gui-rows gui-wrap gui-overflow-hidden" 
				:style="{height: inputIndex == 0 ? '' : '0px'}">
					<view 
					class="gui-car-number-key gui-border" 
					hover-class="gui-tap" 
					:hover-stay-time="50" 
					v-for="(item, idx) in provinces" 
					:key="idx" 
					@tap="provinceTap(item)">
						<text class="gui-car-number-key-txt gui-block-text">{{item}}</text>
					</view>
				</view>
				<!-- 号码键盘 -->
				<view 
				class="gui-flex gui-rows gui-wrap gui-space-between gui-overflow-hidden" 
				:style="{height: inputIndex > 0 ? '' : '0px'}">
					<view 
					class="gui-car-number-key gui-border" 
					hover-class="gui-tap" 
					:hover-stay-time="50" 
					v-for="(item, idx) in keyWords" 
					:key="idx" 
					@tap="keyTap(item)">
						<text 
						class="gui-car-number-key-txt gui-block gui-primary-text">{{item}}</text>
					</view>
					<view 
					class="gui-car-number-key"
					hover-class="gui-tap" 
					@tap="deleteNumber">
						<text 
						class="gui-car-number-key-txt gui-block gui-primary-text gui-icons">&#xe623;</text>
					</view>
				</view>
			</view>
			<gui-iphone-bottom v-if="!isSwitchPage"></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "gui-car-number",
	props : {
		isSwitchPage    : { type : Boolean, default : false}
	},
	data() {
		return {
			carNumber      : '',
			carNumberArray : [],
			carType        : 0,
			inputIndex     : 0,
			provinces      : ['京','津','沪','渝','冀','豫','云',
							  '辽','黑','湘','皖','鲁','新','苏',
							  '浙','赣','鄂','桂','甘','晋','蒙',
							  '陕','吉','闽','贵','粤','青','藏',
							  '川','宁','琼','使','领','新'
							],
			keyWords       : ['1','2','3','4','5','6','7','8','9','0',
							  'A','B','C','D','E','F','G','H',
							  'J','K','L','M','N','P','Q','R',
							  'S','T','U','V','W','X','Y','Z',
							  '港','澳','学','领','警'],
			errorshow      : false
		}
	},
	mounted:function(){
		this.showNumber();
	},
	methods:{
		showError  : function () {
			this.errorshow = true;
			setTimeout(()=>{this.errorshow = false},2000)
		},
		confirm    : function () {
			let carNumberLength = this.carType == 0 ? 7 : 8;
			if(this.carNumber.length < carNumberLength){
				this.showError();
				return ;
			}
			this.$emit('confirm', this.carNumber);
			this.$refs.guipopupforcarnumber.close();
		},
		numberTap  : function (idx) {
			this.inputIndex = idx
		},
		provinceTap : function(key){
			this.carNumberArray[0] = key;
			this.carNumber = this.carNumberArray.join('');
			this.showNumber();
		},
		keyTap     : function(key){
			let carNumberLength = this.carType == 0 ? 7 : 8;
			if(this.inputIndex >= carNumberLength){return ;}
			this.carNumberArray[this.inputIndex] = key;
			this.carNumber = this.carNumberArray.join('');
			this.showNumber();
		},
		showNumber : function(){
			let carNumberArray     = this.carNumber.split('');
			let carNumberLength    = this.carType == 0 ? 7 : 8;
			let carNumberArrLength = carNumberArray.length;
			this.carNumberArray    = [];
			var inputIndex        = 0;
			for(let i = 0; i < carNumberLength; i++){
				if(carNumberArrLength > i){
					this.carNumberArray[i] = carNumberArray[i];
					inputIndex++;
				}else{
					this.carNumberArray[i] = '';
				}
			}
			this.carNumber  = this.carNumberArray.join('');
			this.inputIndex = inputIndex;
		},
		changeType : function(e){
			this.carType = e;
			this.showNumber();
		},
		setType : function(carType){
			this.carType   = carType;
			this.showNumber();
		},
		setVal  : function(carNumber){
			this.carNumber = carNumber;
			this.showNumber();
		},
		deleteNumber : function(){
			if(this.inputIndex < 0){return ;}
			this.carNumberArray.splice((this.inputIndex -1), 1, '');
			this.carNumber = this.carNumberArray.join('');
			this.showNumber();
		},
		open : function(){
			this.$refs.guipopupforcarnumber.open();
			this.$emit('open');
		},
		stopfun : function(e){
			e.stopPropagation();
			return ;
		},
		close : function(){
			this.$emit('close');
		}
	},
	emits : ['confirm', 'open', 'close']
}
</script>
<style scoped>
</style>
