<template>
	<view 
	class="gui-flex gui-rows gui-nowrap gui-align-items-center" 
	:style="{width:width}">
		<view 
		hover-class="gui-tap">
			<text
			class="gui-block gui-text-center" 
			:class="buttonClass" 
			@tap.stop="reduce">-</text>
		</view>
		<input 
		class="gui-form-input gui-text-center gui-flex1" 
		:class="inputClass" 
		:disabled="disabled"
		v-model="inputNumber" 
		type="digit" 
		@blur="inputval" />
		<view hover-class="gui-tap">
			<text 
			class="gui-block gui-text-center" 
			:class="buttonClass" 
			@tap.stop="add">+</text>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-step-box",
	props : {
		width          : { type : String,  default : '200rpx' },
		value          : { type : Number,  default : 0 },
		step           : { type : Number,  default : 1 },
		maxNum         : { type : Number,  default : 9999 },
		minNum         : { type : Number,  default : 0 },
		buttonClass    : { type : Array,   default : function(){return ['gui-step-box-button', 'gui-color-gray'];}},
		inputClass     : { type : Array,   default : function(){return ['gui-step-box-input','gui-border-radius'];}},
		disabled       : { type : Boolean, default : false },
		index          : { type : Number,  default : 0 },
		datas          : { type : Array,   default : function (){return [];}},
		decimal        : { type : Number,  default : 2}
	},
	data() {
		return {
			inputNumber    : 0,
			callbackNumber : 0
		}
	},
	created:function(){
		this.inputNumber = Number(this.value);
	},
	watch:{
		value       : function(val, vo){
			this.inputNumber = Number(val);
		},
		inputNumber :function(val, vo){
			if(val == ''){
				return ;
			}
			val = Number(val);
			if(isNaN(val)){
				setTimeout(()=>{this.inputNumber = Number(vo);}, 200);  return; 
			}
			var newVal = this.decimalVal(val);
			if(newVal != val){
				setTimeout(()=>{this.inputNumber = Number(newVal);}, 200);  
				return;
			}
			if(val > this.maxNum){
				setTimeout(()=>{this.inputNumber = this.maxNum;}, 200);
				return ;
			}
			if(val < this.minNum){
				setTimeout(()=>{this.inputNumber = this.minNum;}, 200);
				return ;
			}
		}
	},
	methods : {
		add      : function(){
			var newVal = Number(this.inputNumber) + Number(this.step);
			newVal = this.decimalVal(newVal);
			if(newVal > this.maxNum){return ;}
			this.inputNumber = Number(newVal);
			setTimeout(()=>{
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		reduce   : function () {
			var newVal = Number(this.inputNumber) - Number(this.step);
			newVal = this.decimalVal(newVal);
			if(newVal < this.minNum){return ;}
			this.inputNumber = newVal;
			setTimeout(()=>{
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		inputval  : function (e) {
			this.inputNumber = e.detail.value;
			setTimeout(()=>{
				this.$emit('change', [this.inputNumber, this.index, this.datas]);
			}, 300);
		},
		decimalVal : function (val) {
			var isDecimal = String(val).indexOf(".");
			if(isDecimal != -1){
				val = val.toFixed(this.decimal);
				var valArr = String(val).split('.');
				if(valArr[1].length > this.decimal){
					valArr[1] = valArr[1].substr(0, this.decimal);
					val = Number(valArr.join('.'));
				} 
			}
			return val ;
		},
	},
	emits:['change']
}
</script>
<style scoped>
</style>
