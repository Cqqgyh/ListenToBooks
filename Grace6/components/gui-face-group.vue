<template>
	<view 
	class="gui-face-group gui-img-in" 
	:style="{
		height:(size + borderWidth * 2 ) +'rpx'
	}">
		<image 
		v-for="(item, index) in items"
		:key="index" 
		:src="item" 
		mode="widthFix" 
		class="gui-face-items"
		:style="{
			'z-index':startIndex + index,
			left:isAddBtn ? (space * (index)) + 'rpx' : (space * index) + 'rpx', 
			borderWidth:borderWidth + 'rpx', 
			borderStyle :'solid ', 
			borderColor:borderColor, 
			width:size+'rpx', 
			height:size+'rpx'
		}"></image>
		<view 
		class="gui-face-items" 
		v-if="isAddBtn"
		:style="{
			'z-index':zindex, 
			left : isAddBtn ? (space * Number(this.items.length)) + 'rpx' : 0,
		}" 
		@tap.stop="addBtnClick">
			<slot></slot>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-face-group",
	props : {
		items       : { type : Array,   default : function () { return new Array() } },
		size        : { type : Number,  default : 80 },
		space       : { type : Number,  default : 50 },
		borderWidth : { type : Number,  default : 4 },
		borderColor : { type : String,  default : '#F5F5F5' },
		isAddBtn    : { type : Boolean, default : false },
		startIndex  : { type : Number,  default : 100}
	},
	data() {
		return {
			zindex : 100,
		}
	},
	created:function(){
		this.zindex     = this.startIndex + this.items.length + 1;
	},
	watch:{
		items : function (v) {
			this.zindex = this.startIndex + this.items.length + 1;
		}
	},
	methods:{
		addBtnClick : function (){
			this.$emit('addBtnClicked');
		}
	},
	emits : ['addBtnClicked']
}
</script>
<style scoped>
.gui-face-group{position:relative;}
.gui-face-items{position:absolute; overflow:hidden; border-radius:200rpx; font-size:0;}
</style>