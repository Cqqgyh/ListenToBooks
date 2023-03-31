<template>
	<view>
		<view 
		hover-class="gui-tap" 
		@tap="toggle">
			<slot name="title"></slot>
		</view>
		<view 
		class="gui-fade-in gui-accordion-card-body" 
		v-if="show">
			<slot name="body"></slot>
		</view>
	</view>
</template>
<script>
export default{
	name  : 'gui-accordion-card',
	props : {
		status      : {
			type    : Boolean,
			default : false
		}
	},
	data() {
		return {
			show : false
		}
	},
	mounted    : function(){
		this.show = this.status;
	},
	watch      : {
		status : function(val){
			this.show = val;
		}
	},
	methods    : {
		toggle : function(){
			if(this.show){
				this.close();
			}else{
				this.open();
			}
		},
		open   : function(){
			this.show = true;
			this.$emit('open');
		},
		close  : function () {
			this.show = false;
			this.$emit('close');
		}
	},
	emits : ['open', 'close']
}
</script>
<style scoped>
.gui-accordion-card-body{padding-bottom:10rpx;}
</style>
