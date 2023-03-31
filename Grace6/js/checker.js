
import idCardChecker from './checkIdCard.js';
export default {
	error : '',
	check : function (dataBeCheck, rule){
		dataBeCheck = JSON.stringify(dataBeCheck);
		var data = JSON.parse(dataBeCheck);
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){ return true;}
			if (!rule[i].name){return true;}
			if (!rule[i].errorMsg) {return true;}
			if (
				typeof(data[rule[i].name]) == 'undefined'
				 || 
				 data[rule[i].name] === ''
			){
				this.error = rule[i].errorMsg; 
				return false;
			}
			// 检查前去除内容的空格及换行
			if(typeof(data[rule[i].name]) == 'string'){
				data[rule[i].name] = data[rule[i].name].replace(/\s/g,"");
			}
			switch (rule[i].checkType){
				case 'string':
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'contain':
					var cData = data[rule[i].name]+'';
					if(cData.indexOf(rule[i].checkRule) == -1){
						this.error = rule[i].errorMsg;
						return false;
					} 
				break;
				case 'notContain':
					var cData = data[rule[i].name]+'';
					if(cData.indexOf(rule[i].checkRule) != -1){
						this.error = rule[i].errorMsg;
						return false;
					} 
				break;
				case 'inArray':
					if(typeof(rule[i].checkRule) != 'object'){
						this.error = rule[i].errorMsg;
						return false;
					}
					var resInArray = rule[i].checkRule.find(
						(val)=>{
							if(val == data[rule[i].name]){
								return true;
							}
						}
					);
					if(!resInArray){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'notInArray':
					if(typeof(rule[i].checkRule) != 'object'){
						this.error = rule[i].errorMsg;
						return false;
					}
					var resInArray = rule[i].checkRule.find(
						(val)=>{
							if(val == data[rule[i].name]){
								return true;
							}
						}
					);
					if(resInArray){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				
				case 'int':
					var ruleArr = rule[i].checkRule.split(',');
					if(rule.length < 2){
						ruleArr[0] = Number(ruleArr[0]) - 1;
						ruleArr[1] = '';
					}else{
						ruleArr[0] = Number(ruleArr[0]) - 1;
						ruleArr[1] = Number(ruleArr[1]) - 1;
					}
					var reg = new RegExp('^-?\\d{' + ruleArr[0] + ',' + ruleArr[1] + '}$');
					if(!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg; 
						return false;
					}
					break;
				break;
				case 'between':
					if (!this.isNumber(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (
					data[rule[i].name] > minMax[1]
					 || 
					data[rule[i].name] < minMax[0])
					{
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'intBetween':
				var reg = /^-?\d+$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg; 
						return false; 
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (
					data[rule[i].name] > minMax[1]
					 || 
					data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenD':
					var reg = /^-?\d+$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false; 
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (
					data[rule[i].name] > minMax[1]
					 || 
					data[rule[i].name] < minMax[0]){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'doubleBetween':
					var reg = /^-?\d?.+\d+$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (
					data[rule[i].name] > minMax[1]
					 || 
					data[rule[i].name] < minMax[0]){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'betweenF': 
					var reg = /^-?\d?.+\d+$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (
					data[rule[i].name] > minMax[1]
					 || 
					data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'doubleLength' : 
					var reg = new RegExp('^-?\\d+.\\d{' + rule[i].checkRule + '}$');
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false;
					}
				break;
				case 'gt':
					if(data[rule[i].name] <= rule[i].checkRule){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'gtAndSame':
					if(data[rule[i].name] < rule[i].checkRule){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'lt':
					if(data[rule[i].name] >= rule[i].checkRule){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'ltAndSame':
					if(data[rule[i].name] > rule[i].checkRule){
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case 'same':
					if(data[rule[i].name] != rule[i].checkRule){
						this.error = rule[i].errorMsg; 
						return false;
					}
				break;
				case 'notSame':
					if(data[rule[i].name] == rule[i].checkRule){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'notsame':
					if(data[rule[i].name] == rule[i].checkRule){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false; 
					}
				break;
				case 'phoneno':
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false; 
					}
				break;
				case 'phone':
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false; 
					}
				break;
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false;
					}
				break;
				case 'reg':
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg; 
						return false; 
					}
				break;
				case 'in': 
					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case 'notnull':
					if(
					data[rule[i].name] == null || data[rule[i].name].length < 1
					){this.error = rule[i].errorMsg; return false;}
				break;
				case 'samewith': 
					if(data[rule[i].name] != data[rule[i].checkRule]){
						this.error = rule[i].errorMsg; 
						return false;
					}
				break;
				case 'numbers':
					var reg = new RegExp('^[0-9]{' + rule[i].checkRule + '}$');
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; return false; 
					}
				break;
				case 'url':
					var reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
					if (!reg.test(data[rule[i].name])){
						this.error = rule[i].errorMsg; 
						return false; 
					}
				break;
				case 'idCard' :
					var idCardRes = idCardChecker.checkIdcard(data[rule[i].name]);
					if(idCardRes != 'ok'){
						this.error = idCardRes;
						return false; 
					} 
				break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		checkVal = Number(checkVal);
		if(isNaN(checkVal)){return false;}
		return true;
	}
}