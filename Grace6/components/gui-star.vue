<template>
	<view 
	class="gui-flex gui-row gui-nowrap">
	  <view 
	  v-for="(item, index) in totalstars" 
	  :style="{padding:padding}" 
	  :key="index" 
	  @tap="changnum" 
	  :data-val="index">
			<text 
			class="gui-icons gui-block" 
			:style="{
				'color': activecolor, 
				'font-size' : fontSize
			}" 
			v-if="valueIn > index">&#xe634;</text>
			<text 
			class="gui-icons gui-block" 
			:style="{
				'color': color, 
				'font-size' : fontSize
			}" 
			v-else>&#xe634;</text>
		</view>
	</view>
</template>
<script>
export default {
	name: "gui-star",
	props:{
		fontSize     : { type : String,  default : '50rpx' },
		totalstars   : { type : Number,  default : 5 },
		starnum      : { type : Number,  default : 1 },
		color        : { type : String,  default : '#E1E1E1' },
		activecolor  : { type : String,  default : '#F5C359' },
		cantap       : { type : Boolean, default : true },
		padding      : { type : String,  default : '5rpx'}
	},
	data() {
		return {
			valueIn : 0
		}
	},
	created:function(){
		this.valueIn = this.starnum;	
	},
	watch:{
		starnum : function (val) {
			this.valueIn = this.starnum;
		}
	},
	methods: {
		changnum : function(e){
			if (!this.cantap){return null;}
			this.valueIn = Number(e.currentTarget.dataset.val) + 1;
			this.$emit("change", Number(this.valueIn));
		}
	},
	emits : ['change']
}
</script>
<style scoped>
</style>