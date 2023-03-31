<template>
	<view 
	class="gui-flex gui-row gui-nowrap gui-justify-content-center gui-segmented-control" 
	:class="customClass" 
	:style="customStyle">
		<text 
		v-for="(item, index) in items" 
		:key="index" 
		:class="initClass(index)" 
		class="gui-block" 
		:style="{borderRadius:borderRadius}" 
		@tap.stop="changeSC" 
		:data-index="index">{{item}}</text>
	</view>
</template>
<script>
export default{
	name   : "gui-segmented-control", 
	props  : {
		// 自定义行内样式
		customStyle  : {
			type     : String,
			default  : ''
		},
		// 自定义样式
		customClass  : {
			type     : Array,
			default  : function(){
				return ['gui-bg-white', 'gui-dark-bg-level-2', 'gui-padding-small'];
			}
		},
		items        : {
			type     : Array,
			default  : function () { return new Array();}
		},
		itemClass    : {
			type     : Array,
			default  : function () { return ['gui-text'];}
		},
		activeClass  : {
			type     : Array,
			default  : function () { return ['gui-bg-primary', 'gui-color-white'];}
		},
		current      : { 
			type     : Number, 
			default  : 0
		},
		borderRadius : {
			type     : String, 
			default  : '6rpx'
		}
	},
	data(){
		return {
			currentIn: 0,
			classIn : [],
		}
	},
	created : function(){
		this.currentIn = this.current;
		this.initClass();
	},
	watch   : {
		current : function (val) {
			this.currentIn = val;
			this.initClass()
		}
	},
	methods : {
		changeSC  : function (e) {
			var index      = Number(e.currentTarget.dataset.index);
			this.currentIn = index;
			this.$emit('change', index);
		},
		initClass : function (idx) {
			var classReturn = ['gui-segmented-control-item', 'gui-border-box'];
			classReturn = classReturn.concat(this.itemClass);
			if(this.currentIn == idx){
				classReturn = classReturn.concat(this.activeClass);
				classReturn.push('gui-fade-in');
			}
			return classReturn;
		}
	},
	emits : ['change']
}
</script>
<style scoped>
</style>