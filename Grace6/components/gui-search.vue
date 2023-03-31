<template>
	<view 
	class="gui-flex gui-row gui-nowrap gui-align-items-center gui-flex1" 
	:class="customClass" 
	:style="{
		height:height, 
		borderRadius:borderRadius
		}">
		<text 
		class="gui-icons gui-block gui-text-center gui-color-gray" 
		@tap.stop="tapme" 
		:style="{
			fontSize:iconFontSize, 
			lineHeight:height, 
			width:iconWidth,
			marginLeft:'12rpx'
		}">&#xe604;</text>
		<!-- #ifdef APP-NVUE -->
		<input
		type="text" 
		class="gui-search-input gui-flex1 gui-primary-text" 
		:placeholder="placeholder" 
		v-model="inputVal" 
		v-if="!disabled" 
		:style="{
			height:inputHeight, 
			lineHeight:inputHeight, 
			fontSize:inputFontSize, 
		}" 
		@input="inputting" 
		@confirm="confirm" />
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<input
		type="text" 
		:placeholder-class="placeholderClass" 
		class="gui-search-input gui-flex1 gui-primary-text" 
		:placeholder="placeholder" 
		v-model="inputVal" 
		v-if="!disabled" 
		:focus="focus" 
		:style="{
			height:inputHeight, 
			lineHeight:inputHeight, 
			fontSize:inputFontSize, 
		}" 
		@input="inputting" 
		@confirm="confirm" />
		<!-- #endif -->
		<text 
		class="gui-search-input gui-flex1 gui-block gui-color-gray" 
		v-if="disabled" 
		@tap.stop="tapme" 
		:style="{
			height:inputHeight, 
			lineHeight:inputHeight, 
			fontSize:inputFontSize
		}">{{placeholder}}</text>
		<text 
		class="gui-search-icon gui-icons gui-block gui-text-center gui-color-gray" 
		v-if="inputVal.length > 0 && clearBtn" 
		@tap.stop="clearKwd" 
		:style="{
			fontSize:iconFontSize, 
			lineHeight:height, 
			width:iconWidth,
			marginRight:'5rpx'
		}">&#xe78a;</text>
	</view>
</template>
<script>
export default{
	name  : "gui-search", 
	props : {
		height:{type:String, default:'66rpx'},
		customClass:{type:Array, default:function(){
			return ['gui-bg-gray', 'gui-dark-bg-level-3'];
		}},
		fontSize:{type:String, default:'28rpx'},
		iconWidth:{type:String, default:'70rpx'},
		iconFontSize:{type:String, default:'30rpx'},
		inputHeight:{type:String, default:'30rpx'},
		inputFontSize:{type:String, default:'26rpx'},
		placeholder:{type:String, default:'关键字'},
		placeholderClass:{type:String, default:''},
		kwd:{type:String, default:''},
		borderRadius:{type:String, default:'66rpx'},
		disabled:{type:Boolean, default:false},
		focus:{type:Boolean, default:false},
		clearBtn:{type:Boolean, default:true}
	},
	data() {
		return {
			inputVal : ''
		}
	},
	created: function (){
		this.inputVal = this.kwd;
	},
	watch:{
		kwd : function(val, vo){
			this.inputVal = val;
		}
	},
	methods:{
		clearKwd : function () {
			this.inputVal = '';
			this.$emit('clear', '');
		},
		inputting : function(e){
			this.$emit('inputting', e.detail.value);
		},
		confirm : function (e) {
			this.$emit('confirm', e.detail.value);
			uni.hideKeyboard();
		},
		tapme : function () {
			this.$emit('tapme')
		}
	},
	emits : ['clear', 'confirm', 'tapme', 'inputting']
}
</script>
<style scoped>
.gui-search-input{width:100rpx; border-width:0rpx; padding:0; background-color:rgba(255,255,255,0);}
</style>