<template>
	<view :style="{width:width+'rpx'}">
		<scroll-view 
		:style="{width:width+'rpx'}"
		:scroll-x="true" 
		class="gui-scroll-x" 
		@scroll="scrolling" 
		@scrolltolower="scrolltolower" 
		@scrolltoupper="scrolltoupper" 
		:show-scrollbar="false">
			<slot></slot>
		</scroll-view>
		<view 
		class="gui-flex gui-rows" 
		:class="['gui-justify-content-'+progressPosition]">
			<view 
			class="gui-psv-progress" 
			:class="progressClass" 
			v-if="progressWidth > 0" 
			:style="{
				width  : progressWidth+'rpx',
				height : progressHeight+'rpx',
				borderRadius : progressRadius+'rpx'
			}">
				<view 
				class="gui-psv-progress-bar" 
				:class="progressBarClass" 
				v-if="progressWidth > 0" 
				:style="{
					width  : progressBarWidth+'rpx',
					height : progressHeight+'rpx',
					borderRadius : progressRadius+'rpx',
					marginLeft      : marginLeft +'rpx'
				}"></view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-progress-scrollview",
	data() {
		return {
			warpWitdh : 350,
			marginLeft : 0
		}
	},
	props : {
		width         : {
			type    : Number,
			default : 700
		},
		progressWidth : {
			type    : Number,
			default : 200
		},
		progressHeight : {
			type    : Number,
			default : 10
		},
		progressRadius : {
			type    : Number,
			default : 10
		},
		progressClass : {
			type    : Array,
			default : function(){
				return ['gui-bg-gray'];
			}
		},
		progressBarWidth : {
			type    : Number,
			default : 60
		},
		progressBarClass : {
			type    : Array,
			default : function(){
				return ['gui-bg-primary'];
			}
		},
		progressPosition : {
			type:String,
			default:'start'
		}
	},
	created:function(){
		this.warpWitdh = uni.upx2px(this.width);
	},
	methods:{
		scrolling : function (event) {
			let scrollLeft  = event.detail.scrollLeft ;
			let scrllWidth  = event.detail.scrollWidth - this.warpWitdh;
			let percentage  = scrollLeft / scrllWidth;
			percentage      *= 100;
			percentage      = parseInt(percentage);
			if(percentage > 90){percentage = 100;}
			if(percentage < 0){percentage  = 0;}
			this.percentage = percentage;
			let marginLeft  = (this.progressWidth - this.progressBarWidth) * this.percentage;
			this.marginLeft = parseInt(marginLeft / 100);
			this.$emit('scrolling', scrllWidth, scrollLeft, percentage);
		},
		scrolltolower : function () {
			setTimeout(()=>{
				this.percentage = 100;
				this.marginLeft = this.progressWidth - this.progressBarWidth;
				this.$emit('scrolltolower');
			},300);
		},
		scrolltoupper : function () {
			setTimeout(()=>{
				this.percentage = 0;
				this.marginLeft = 0;
				this.$emit('scrolltoupper');
			},300);
		}
	},
	emits : ['scrolling', 'scrolltoupper', 'scrolltolower']
}
</script>
<style scoped>
.gui-psv-progress{background-color:#F8F8F8; border-radius:30rpx;}
.gui-psv-progress-bar{}
</style>
