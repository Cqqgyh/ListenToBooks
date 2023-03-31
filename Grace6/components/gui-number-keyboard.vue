<template>
	<gui-popup 
	ref="guipopupfornk" 
	position="bottom" 
	:canCloseByShade="canCloseByShade">
		<view 
		class="gui-bg-gray gui-dark-bg-level-3" 
		@tap.stop.prevent="stopfun">
			<text 
			class="gui-keyboard-res gui-block gui-primary-text" 
			v-if="showInputRes" 
			:style="{fontSize:resultSize}">{{resVal}}</text>
			<view 
			class="gui-keyboard gui-flex gui-row gui-space-between">
				<view 
				class="gui-keyboard-left gui-flex gui-row gui-wrap gui-space-between">
					<view 
					v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" 
					:key="index" 
					class="gui-keyboard-keys gui-bg-white gui-dark-bg-level-1" 
					:data-keynumber="item" 
					hover-class="gui-tap" 
					@tap.stop="inputNow">
						<text 
						class="gui-block gui-keyboard-keys-text gui-primary-text">{{item}}</text>
					</view>
					<view 
					class="gui-keyboard-keys gui-bg-white gui-dark-bg-level-1" 
					:style="{width: isPoint ? '259rpx':'538rpx'}" 
					data-keynumber="0"
					@tap.stop="inputNow">
						<text
						class="gui-keyboard-keys-text gui-block gui-primary-text" 
						:style="{width: isPoint ? '259rpx':'538rpx'}">0</text>
					</view>
					<view 
					v-if="isPoint" 
					class="gui-keyboard-keys gui-bg-white gui-dark-bg-level-1" 
					:style="{width:'259rpx'}" 
					data-keynumber="." 
					@tap.stop="inputNow">
						<text
						class="gui-keyboard-keys-text gui-block gui-primary-text" 
						:style="{ width:'259rpx' }">.</text>
					</view>
				</view>
				<view 
				class="gui-keyboard-right gui-flex gui-columns gui-align-items-center">
					<view 
					class="gui-keyboard-keys gui-bg-white gui-dark-bg-level-1" 
					hover-class="gui-tap" 
					:data-keynumber="-3"
					@tap.stop="deleteNow">
						<text 
						class="gui-keyboard-keys-text gui-icons gui-block gui-primary-text">&#xe623;</text>
					</view>
					<view 
					class="gui-keyboard-keys gui-keyboard-done gui-bg-primary" 
					hover-class="gui-tap" 
					@tap.stop="done">
						<text 
						class="gui-keyboard-done gui-block gui-color-white">{{doneBtnName}}</text>
					</view>
				</view>
			</view>
			<!-- iphone 底部适配 -->
			<gui-iphone-bottom v-if="!isSwitchPage"></gui-iphone-bottom>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "gui-number-keyboard",
	props : {
		canCloseByShade : { type : Boolean, default : false},
		doneBtnName     : { type : String,  default : "完成" },
		isPoint         : { type : Boolean, default : true },
		value           : { type : String,  default : ''},
		showInputRes    : { type : Boolean, default : true},
		resultSize      : { type : String,  default : '32rpx'},
		isSwitchPage    : { type : Boolean, default : false}
	},
	methods:{
		open  : function(){
			this.$refs.guipopupfornk.open();
		},
		close : function(){
			this.$refs.guipopupfornk.close();
		},
		stopfun : function(e){
			e.stopPropagation();
			return ;
		},
		inputNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.resVal += k+'';
			this.tapIndex = k;
			this.$emit('keyboardInput', k);
			this.removeClass();
		},
		deleteNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.tapIndex = k;
			this.resVal = this.resVal.substring(0, this.resVal.length - 1);
			this.$emit('keyboardDelete');
			this.removeClass();
		},
		done : function(){
			this.$emit('keyboardDone');
		},
		setVal : function (val) {
			this.resVal = val;
		},
		removeClass : function () {
			setTimeout(()=>{this.tapIndex = -1;}, 100);
		},
	},
	data() {
		return {
			resVal   : '',
			tapIndex : -1
		}
	},
	created:function(){
		this.resVal = this.value+'';
	},
	watch:{
		value : function (val) {
			this.resVal = val+'';
		}
	},
	emits:['keyboardInput', 'keyboardDelete', 'keyboardDone']
}
</script>
<style scoped>
</style>
