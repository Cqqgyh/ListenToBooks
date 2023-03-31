<template>
	<scroll-view 
	class="gui-slide-list gui-absolute-full" 
	:scroll-y="scY" 
	:show-scrollbar="false" 
	:style="{width:width+'rpx'}" 
	@scrolltolower="scrolltolower">
		<view 
		class="gui-slide-list-item gui-border-b" 
		v-for="(item, index) in msgsIn" 
		:key="index" 
		:style="{width:width+'rpx'}">
			<view 
			class="gui-flex gui-row gui-nowrap gui-align-items-center" 
			:style="{
				width:(width + btnWidth)+'rpx', 
				overflow:'hidden',
				transform:'translateX('+(moveIndex != index ? 0 : x)+'px)' 
			}">
				<view 
				class="gui-slide-list-img-wrap" 
				hover-class="gui-tap" 
				@tap.stop.prevnet="itemTap(index)">
					<image 
					:src="item.img" 
					class="gui-slide-list-img" 
					mode="aspectFill"></image>
					<text 
					class="gui-slide-list-point gui-block gui-bg-red gui-color-white" 
					v-if="item.msgnumber > 0">{{item.msgnumber}}</text>
				</view>
				<view 
				class="gui-slide-list-content" 
				hover-class="gui-tap">
					<gui-touch 
					@thStart="thStart" 
					@thMove="thMove" 
					@thEnd="thEnd" 
					@tapme="itemTap(index)" 
					:datas="[index]">
						<view class="gui-flex gui-row gui-nowrap gui-space-between">
							<text 
							class="gui-slide-list-title-text gui-primary-text gui-block">{{item.title}}</text>
							<text 
							class="gui-slide-list-desc gui-block gui-color-gray">{{item.time}}</text>
						</view>
						<text 
						class="gui-slide-list-desc gui-third-text gui-block gui-ellipsis">{{item.content}}</text>
					</gui-touch>
				</view>
				<view 
				class="gui-slide-btns gui-flex gui-row gui-nowrap"
				:style="{width:(btnWidth-2) +'rpx'}">
					<text 
					class="gui-slide-btn gui-block gui-text-center" 
					v-for="(btn, btnIndex) in item.btns" 
					:key="btnIndex" 
					:style="{backgroundColor:btn.bgColor}" 
					@tap.stop.prevnet="btnTap(index, btnIndex)">{{btn.name}}</text>
				</view>
			</view>
		</view>
		<!-- 加载组件 -->
		<view style="padding:20rpx;">
			<gui-loadmore 
			ref="loadmoreinslidelist"></gui-loadmore>
		</view>
	</scroll-view>
</template>
<script>
export default{
	name  : "gui-slide-list",
	props : {
		width       : { type : Number, default : 750},
		msgs        : { type : Array,  default : function(){return [];}},
		btnWidth    : { type : Number, default : 320}
	},
	data() {
		return {
			msgsIn    : [],
			damping   : 0.29,
			moveIndex : -1,
			x         : 0,
			oX        : 0,
			scY       : true,
			btnWidthpx:160,
			touchStart:false
		}
	},
	created:function(){
		this.init(this.msgs);
		this.btnWidthpx = (uni.upx2px(this.btnWidth) * -1) + 2;
	},
	watch:{
		msgs : function(nv){
			this.init(nv);
		}
	},
	methods:{
		init     : function(msgs){
			this.moveIndex = -1;
			this.msgsIn    = msgs; 
		},
		thStart  : function(e, index){
			this.x         = 0;
			this.moveIndex = index[0];
			this.damping   = 0.25;
		},
		thMove   : function (e, index){
			var x          = e[0][0];
			var y          = e[0][1];
			if(Math.abs(x) < Math.abs(y)){
				this.scY   = true;
				return ;
			}else{
				this.scY   = false;
			}
			if(x < 0){
				this.x += x * this.damping;
				if(this.x < this.btnWidthpx){this.x = this.btnWidthpx;}
				this.damping *= 1.02;
			}else{
				this.scY   = true;
			}
		},
		thEnd    : function(e, index){
			if(this.x > this.btnWidthpx / 8){
				this.x = 0;
			}else{
				this.x = this.btnWidthpx;
			}
			this.scY   = true;
			this.oX    = this.x;
		},
		btnTap  : function (index, indexBtn) {
			this.$emit('btnTap',index, indexBtn);
		},
		itemTap : function (index) {
			if(this.oX < 0){
				this.oX = 0;
				this.moveIndex = -1;
				return ;
			}
			this.$emit('itemTap',index);
			this.moveIndex = -1;
			this.oX = 0;
		},
		scrolltolower : function () {
			var laodStatus = this.$refs.loadmoreinslidelist.loadMoreStatus;
			if(laodStatus == 0){
				this.$emit('scrolltolower');
			}
		},
		startLoadig : function(){
			this.$refs.loadmoreinslidelist.loading();
		},
		nomore : function () {
			this.$refs.loadmoreinslidelist.nomore();
		},
		endLoading : function(){
			this.$refs.loadmoreinslidelist.stoploadmore();
		}
	},
	emits:['btnTap', 'scrolltolower']
}
</script>
<style scoped>
</style>