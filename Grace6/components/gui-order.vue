<template>
	<view 
	@tap="changeOrderBy" 
	class="gui-flex gui-row gui-nowrap gui-align-items-center gui-justify-content-center">
		<view>
			<slot></slot>
		</view>
		<view 
		v-if="orderByIn == 0" 
		class="gui-order gui-flex gui-column">
			<text 
			class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:color}">&#xe647;</text>
			<text 
			class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:color}">&#xe661;</text>
		</view>
		<view 
		v-if="orderByIn == 1" 
		class="gui-order gui-flex gui-columns">
			<text 
			class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:activeColor}">&#xe647;</text>
			<text class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:color}">&#xe661;</text>
		</view>
		<view 
		v-if="orderByIn == 2" 
		class="gui-order gui-flex gui-columns">
			<text 
			class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:color}">&#xe647;</text>
			<text class="gui-block gui-icons gui-order-icon" 
			:style="{width:(size+10)+'rpx', height:(size)+'rpx', 
			lineHeight:(size)+'rpx', fontSize:fontSize+'rpx', color:activeColor}">&#xe661;</text>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-order",
	props : {
		size        : {type:Number, default:18},
		fontSize    : {type:Number, default:36},
		color       : {type:String, default:'rgba(0, 0, 0, 0.5)'},
		activeColor : {type:String, default:'#FF0036'},
		orderBy     : {type:Number, default:0},
		limit       : {type:Array,  default:function(){return [0,2];}}
	},
	data() {
		return {
			orderByIn : 0
		}
	},
	created:function(){
		this.orderByIn = this.orderBy;
		this.init();
	},
	watch:{
		orderBy : function(v){
			this.orderByIn = v;
			this.init();
		}
	},
	methods:{
		changeOrderBy:function(){
			this.orderByIn++;
			if(this.orderByIn > this.limit[1]){this.orderByIn = this.limit[0];}
			this.$emit('change', this.orderByIn);
		},
		init:function(){
			if(this.orderByIn < 0){this.orderByIn = 0;}
			else if(this.orderByIn > 2){this.orderByIn = 2;}
		}
	},
	emits : ['change']
}
</script>
<style scoped>
.gui-order{padding:0 12rpx;}
.gui-order-icon{text-align:center; overflow:hidden;}
</style>