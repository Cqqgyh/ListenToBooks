<template>
	<view 
	class="gui-flex gui-row gui-nowrap gui-align-items-center">
		<view>
			<slot name="icon"></slot>
		</view>
		<view class="gui-flex1">
			<swiper 
			:vertical="vertical" 
			@change="change" 
			autoplay="true" 
			:circular="true" 
			:interval="interval" 
			:current="current" 
			:style="{height:height+'rpx'}">
				<swiper-item  
				v-for="(item, index) in items" 
				:key="index">
					<navigator 
					:url="item.url" 
					:open-type="item.opentype">
						<text 
						:style="{height:height+'rpx', lineHeight:height+'rpx'}" 
						class="gui-block gui-ellipsis itemsIn" 
						:class="itemClass">{{item.title}}</text>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-speaker",
	props : {
		items     : {type:Array,   default:function () {return [];}},
		current   : {type:Number,  default:0},
		vertical  : {type:Boolean, default:false},
		interval  : {type:Number,  default:5000},
		itemClass : {type:Array,   default:function(){
			return ['gui-text', 'gui-primary-text']
		}},
		height    : {type:Number,  default : 66} 
	},
	data() {
		return {
		}
	},
	methods:{
		change:function (index) {
			this.$emit('change', index.detail.current);
		}
	},
	emits : ['change']
}
</script>
<style scoped>
.itemsIn{line-height:66rpx; height:66rpx; overflow:hidden;}
</style>