<template>
	<text 
	:class="customClass">{{numAnimate}}</text>
</template>
<script>
export default{
	name  : "gui-number-animate",
	props : {
		num         : { type : Number,  default : 0},
		stepNumber  : { type : Number,  default : 50 },
		timer       : { type : Number,  default : 1000 },
		keepInt     : { type : Boolean, default : false },
		customClass : { type : Array,  default : function(){
				return ['gui-primary-text', 'gui-text'];
			}
		}
	},
	data() {
		return {
			numAnimate : 0,
			intervalId : null
		}
	},
	created:function(){
		if(this.num != 0){this.run();}
	},
	watch:{
		num : function(val){
			if(this.intervalId != null){clearInterval(this.intervalId);}
			this.run();
		}
	},
	methods:{
		run : function(){
			let timer = this.timer / this.stepNumber;
			let step  = Math.floor((this.num / this.stepNumber) * 100) / 100;
			this.intervalId = setInterval(() => {
				// 正值 
				if(this.num >= 0){
					if(this.numAnimate >= this.num){
						this.numAnimate = this.num;
						clearInterval(this.intervalId);
						this.$emit('done');
						return;
					}
				}else{
					if(this.numAnimate <= this.num){
						this.numAnimate = this.num;
						clearInterval(this.intervalId);
						this.$emit('done');
						return;
					}
				}
				let  res = this.numAnimate + step;
				this.numAnimate = this.keepInt ? parseInt(res) : Math.floor(res * 100) / 100;
			}, timer);
		}
	},
	emits : ['done']
}
</script>
<style scoped>
</style>