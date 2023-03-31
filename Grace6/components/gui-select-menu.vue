<template>
	<view 
	class="gui-select-menu-wrap">
		<!-- #ifndef APP-NVUE -->
		<view 
		class="gui-masker" 
		v-if="show"
		@tap.stop.prevent="close" 
		@touchmove.stop.prevent="stopfun" 
		:style="{zIndex:(zIndex-1)}" ></view>
		<!-- #endif -->
		<view 
		class="gui-select-menu-title gui-flex gui-rows gui-nowrap gui-justify-content-center gui-align-items-center" 
		@click.stop="showMenu" 
		id="menuMain">
			<text 
			class="gui-block gui-ellipsis gui-primary-text" 
			:style="{
				fontSize:fontSize, 
			}">{{itemsIn[currentIndex]}}</text>
			<text 
			:style="{fontSize:fontSize}" 
			class="gui-icons gui-select-menu-title-icon gui-block gui-primary-text" 
			v-if="!show">&#xe603;</text>
			<text 
			:style="{fontSize:fontSize}" 
			class="gui-icons gui-select-menu-title-icon gui-block gui-primary-text" 
			v-if="show">&#xe654;</text>
		</view>
		<view 
		class="gui-select-menu" 
		v-if="show" 
		:style="{
			top : top +'px', 
			zIndex:zIndex 
		}" 
		@tap.stop="close" 
		@touchmove.stop.prevent="stopfun">
			<view style="marginTop:90rpx; height:0px;"></view>
			<view 
			style="padding-bottom:10rpx;"
			@tap.stop="stopfun" 
			class="gui-select-item gui-flex gui-rows gui-nowrap gui-align-items-center gui-bg-white gui-dark-bg-level-3" 
			v-if="isInput">
				<view class="gui-select-input gui-flex1 gui-bg-gray gui-dark-bg-level-1">
					<input
					type="text" 
					v-model="inputVal" 
					style="margin:15rpx;" 
					class="gui-form-input gui-flex1 gui-border-box"
					@confirm="addTag" 
					@input="inputting" 
					:placeholder="placeholder" />
				</view>
				<!-- 添加 -->
				<text 
				class="gui-select-input-btn gui-block gui-primary-text" 
				v-if="inputType == 'add'" 
				@tap.stop="addTag">{{addBtnName}}</text>
				<!--  -->
				<text
				class="gui-select-input-btn gui-block gui-primary-text" 
				v-else-if="inputType == 'search'" 
				@tap.stop="addTag">搜索</text>
			</view>
			<scroll-view 
			:scroll-y="true" 
			:show-scrollbar="false" 
			:style="{height:height, marginTop:'-2px'}" 
			class="gui-select-menus gui-border-box gui-bg-white gui-dark-bg-level-3" 
			:scroll-into-view="itemTo">
				<view 
				class="gui-select-item gui-flex gui-rows gui-nowrap gui-align-items-center" 
				v-for="(item, index) in itemsIn" 
				:key="index" 
				:data-index="index" 
				@tap.stop="select" 
				:style="{height:itemHeight}" 
				:id="'items'+index">
					<text 
					class="gui-selected-icon gui-icons gui-primary-color" 
					:style="{fontSize:fontSize}" 
					v-if="index == currentIndex">&#xe7f8;</text>
					<text 
					class="gui-primary-text" 
					:style="{fontSize:fontSize}">{{item}}</text>
				</view>
				<view 
				style="height:25rpx;" 
				class="gui-bg-white gui-dark-bg-level-3"></view>
			</scroll-view>
		</view>
	</view>
</template>
<script scoped>
export default {
	name  : "gui-select-menu",
	props : {
		items          : { type : Array,   default : function () { return [] } },
		selectIndex    : { type : Number,  default : 0},
		isH5header     : { type : Boolean, default : true },
		fontSize       : { type : String,  default : '28rpx' },
		zIndex         : { type : Number,  default : 299 },
		isInput        : { type : Boolean, default : false},
		placeholder    : { type : String,  default : "请输入自定义条件"},
		addBtnName     : { type : String,  default :"+ 添加"},
		height         : { type : String,  default : '500rpx'},
		itemHeight     : { type : String,  default : '88rpx'},
		inputType      : { type : String,  default : 'add' }
	},
	data() {
		return {
			currentIndex : 0,
			top          : 0,
			showRes      : [],
			inputVal     : '',
			show         : false,
			itemsIn      : [],
			itemTo       : ''
		}
	},
	watch:{
		selectIndex : function () {
			this.currentIndex = this.selectIndex;
		},
		items : function (val) {
			this.itemsIn = val;
		}
	},
	created : function () {
		this.currentIndex = this.selectIndex;
		this.itemsIn      = this.items;
	},
	methods:{
		stopfun  : function (e) {e.stopPropagation(); return ;},
		showMenu : function () {
			uni.createSelectorQuery().in(this).select('#menuMain').fields(
				{rect: true}, (res) => {
					this.top       = res.top - 1;
					// #ifdef H5
					if(this.isH5header){
						this.top      += 44;
					}
					// #endif
					this.show = true;
					this.$emit('showMenu');
				}
			).exec();
		},
		close : function(){
			setTimeout(()=>{
				this.show = false;
			}, 100);
			this.$emit('close');
		},
		select : function(e){
			var index = Number(e.currentTarget.dataset.index);
			this.currentIndex = index;
			this.$emit('select', index, this.items[index]);
			this.close();
		},
		addTag : function () {
			if(this.inputVal == ''){return ;}
			if(this.inputType == 'add'){
				var newArr   = JSON.stringify(this.itemsIn);
				newArr       = JSON.parse(newArr);
				newArr.unshift(this.inputVal);
				this.itemsIn = [];
				this.itemsIn = newArr;
				this.$emit('submit', this.inputVal);
				this.inputVal = '';
				this.currentIndex = 0;
				this.close();
			}else{
				this.search();
			}
		},
		getSize : function(){
			return (this.itemsIn.length - 1);
		},
		setCurrentIndex : function (index) {
			this.currentIndex = index;
		},
		search : function(){
			var searchIndex = -1;
			for(var i = 0; i < this.itemsIn.length; i++){
				if(this.itemsIn[i].indexOf(this.inputVal) != -1){
					searchIndex = i;
					break;
				}
			}
			if(searchIndex != -1){
				this.itemTo = 'items' + searchIndex;
			}
		},
		inputting : function(){
			if(this.inputType == 'search'){
				this.search();
			}
		}
	},
	emits : ['showMenu', 'close', 'select', 'submit']
}
</script>
<style scoped>
.gui-masker{width:750rpx; position:fixed; left:0; top:250rpx; bottom:0; flex:1; background-color:rgba(0,0,0,0.3);}
.gui-select-menu-title{height:100rpx;}
.gui-select-menu-title-icon{margin-left:5px; margin-top:3px;}
.gui-select-menu{position:fixed; width:750rpx; left:0; top:0;}
.gui-select-menus{ height:300px;}
.gui-select-item{padding:0 25rpx; height:88rpx;}
.gui-selected-icon{margin-right:15rpx;}
.gui-select-input{width:200rpx; padding:0 16rpx; border-radius:60rpx;}
.gui-select-input-btn{width:100rpx; line-height:68rpx; height:68rpx; text-align:center; font-size:28rpx; border-radius:6rpx; margin-left:15rpx;}
</style>