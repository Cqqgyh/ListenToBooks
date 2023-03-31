<template>
	<view 
	class="grace-box-banner gui-flex gui-rows gui-nowrap" 
	:class="customClass" 
	:style="{
	paddingTop:padding, 
	paddingBottom:padding, 
	borderRadius:borderRadius
	}">
	    <view 
		class="grace-box-items gui-flex gui-rows gui-nowrap gui-align-items-center" 
		hover-class="gui-tap" 
		v-for="(item, index) in items" 
		:key="index" 
		@tap.stop="taped(index)">
			<view 
			class="gui-flex1">
				<view
				class="gui-flex gui-rows gui-nowrap gui-justify-content-center gui-align-items-center">
					<text 
					class="gui-block" 
					:class="colors[0]" 
					:style="{
						lineHeight:lineHeight, 
						fontSize:fontSize[0]
					}">{{item[0]}}</text>
					<text 
					class="gui-block" 
					:class="colors[1]" 
					:style="{
						fontSize:fontSize[1], 
						marginLeft:'5rpx'
					}">{{item[1]}}</text>
				</view>
				<text 
				class="gui-block gui-text-center" 
				:class="colors[2]" 
				:style="{
					fontSize:fontSize[2]
				}">{{item[2]}}</text>
			</view>
			<view 
			class="grace-box-line" 
			:style="{
				'height'            : borderHeight,
				'border-right-width': borderWidth,
				'border-right-style': borderStyle,
				'border-right-color': borderColor 
			}"
			v-if="index < items.length - 1"></view>
	    </view>
	</view>
</template>
<script>
export default {
	name  : "gui-box-banner",
	props : {
		items:{
			type : Array,
			default : function () {
				return []
			}
		},
		colors:{
			type : Array,
			default : function () {
				return [
					['gui-primary-text'], 
					['gui-color-gray'], 
					['gui-color-gray'],
				]
			}
		},
		fontSize:{
			type : Array,
			default : function () {
				return ['36rpx', '24rpx', '24rpx']
			}
		},
		customClass : {
			type : Array,
			default : function(){
				return ['gui-bg-white', 'gui-dark-bg-level-3'];
			}
		},
		padding:{
			type : String,
			default : '20rpx'
		},
		borderRadius:{
			type : String,
			default : '10rpx'
		},
		lineHeight:{
			type : String,
			default : '60rpx'
		},
		borderColor : {type:String, default:'#F1F1F1'},
		borderWidth : {type:String, default:'1px'},
		borderStyle : {type:String, default:'solid'},
		borderHeight: {type:String, default:'60rpx'}
	},
	methods:{
		taped:function (index) {
			this.$emit('taped', index);
		}
	},
	emits : ['taped']
}
</script>
<style scoped>
.grace-box-banner{overflow:hidden;}
.grace-box-items{width:100rpx; flex:1;}
.grace-box-line{width:1px; height:50rpx;}
</style>