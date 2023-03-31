<template>
	<gui-popup 
	ref="guipopupforacsheet" 
	position="bottom" 
	:zIndex="zIndex" 
	:isSwitchPage="true" 
	:canCloseByShade="canCloseByShade">
		<view  
		:style="{
			'margin-bottom':'25rpx',
			'margin-left':((750-width)/2)+'rpx'
		}"
		@tap.stop.prevent="stopfun">
			<view 
			class="gui-bg-white gui-dark-bg-level-3"
			:style="{
				width:width+'rpx', 
				borderRadius:borderRadius
			}">
				<text 
				v-if="title != ''" 
				class="gui-action-sheet-title gui-block-text gui-border-b" 
				:class="titleClass">{{title}}</text>
				<scroll-view 
				scroll-y="true" 
				class="gui-border-box" 
				:style="{
					width:width+'rpx', 
					height:height+'rpx'
				}">
					<text 
					class="gui-text-center gui-block gui-border-b gui-primary-text" 
					:class="listClass" 
					v-for="(item, index) in items" 
					:key="index" 
					@tap.stop="selected" 
					:data-index="index">{{item}}</text>
				</scroll-view>
				<text
				class="gui-text-center gui-block gui-color-gray" 
				:class="listClass" 
				v-if="isCancelBtn" 
				@tap.stop="cancel">{{cancelBtnName}}</text>
			</view>
		</view>
	</gui-popup>
</template>
<script>
export default{
	name  : "gui-action-sheet",
	props : {
		width           : { type : Number,  default : 680},
		height          : { type : Number,  default : 500},
		borderRadius    : { type : String,  default : '10rpx'},
		title           : { type : String,  default : ''},
		titleClass      : { type : Array,   default : function(){return ['gui-color-gray'];}},
		items           : { type : Array,   default : function(){return [];}},
		listClass       : { type : Array,   default : function(){return ['gui-primary-text', 'gui-action-sheet-item'];}},
		isCancelBtn     : { type : Boolean, default : true},
		cancelBtnName   : { type : String,  default : '取消'},
		canCloseByShade : { type : Boolean, default : false},
		zIndex          : { type : Number,  default : 999}
	},
	methods:{
		open  : function(){
			this.$refs.guipopupforacsheet.open();
			this.$emit('open');
		},
		close : function(){
			this.$refs.guipopupforacsheet.close();
			this.$emit('close');
		},
		stopfun : function(e){
			e.stopPropagation();
			return null;
		},
		cancel : function () {
			this.$emit('cancel');
			this.close();
		},
		selected:function (e) {
			this.$emit('selected', e.currentTarget.dataset.index);
			this.close();
		},
	},
	emits : ['open', 'close', 'selected', 'cancel']
}
</script>
<style scoped>
</style>
