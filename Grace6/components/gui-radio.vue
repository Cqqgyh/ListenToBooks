<template>
	<view 
	class="gui-flex gui-row gui-nowrap gui-align-items-center" 
	@tap.stop="changeStatus">
		<text
		v-if="status" 
		class="gui-icons gui-block gui-text-center" 
		:class="checkedClass" 
		:style="{
			width  : size+'rpx',
			height : size+'rpx',
			lineHeight:size+'rpx', 
			fontSize:(size-15)+'rpx', 
			borderRadius:(size)+'rpx' 
		}">&#xe60f;</text>
		<text v-else 
		class="gui-icons gui-block gui-text-center" 
		:class="defaultClass" 
		:style="{
			width  : size+'rpx',
			height : size+'rpx',
			lineHeight:(size+2)+'rpx', 
			fontSize:(size - 8)+'rpx',
		}">&#xe762;</text>
		<view 
		class="gui-radio-lable gui-flex1">
			<slot></slot>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-radio",
	props : {
		size : {
			type : Number,
			default : 38
		},
		defaultClass : {
			type : Array,
			default : function(){
				return ['gui-color-gray']
			}
		},
		checked : {
			type : Boolean,
			default : false
		},
		checkedClass : {
			type : Array,
			default : function(){
				return ['gui-bg-primary', 'gui-color-white']
			}
		},
		parameter : {
			type : Array,
			default : function () {
				return []
			}
		},
	},
	data() {
		return {
			status : false
		}
	},
	watch: {
		checked : function (val, old) {
			this.status = val;
		}
	},
	created : function(){
		this.status = this.checked;
	},
	methods:{
		changeStatus : function(){
			this.status = !this.status;
			this.$emit('change', [this.status, this.parameter]);
		}
	},
	emits : ['change']
}
</script>
<style scoped>
.gui-radio-lable{margin-left:15rpx; width:100rpx;}
</style>