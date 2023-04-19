<template>
	<view class="picker-view">
		<scroll-view 
			v-for="(num,index) in colNum" 
			:key="index"
			:style="{
				width:`${1/colNum*100}%`,
				height:'100%',
				backgroundColor:index===0?'#F6F6F6':'#FFFFFF'
			}" 
			scroll-y>
			<view 
				:class="['picker-view-item',modelValue[index]==item.value&&'picker-view-item-active']" 
				v-for="(item,indexs) in colList[index]" 
				:key="indexs"
				@click="onSelect(index,item,indexs)"
			>
				{{item.label}}
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";
	const props = defineProps({
		// 双向绑定
		modelValue: {
			type: Array,
			default: []
		},
		// 展示的列数
		colNum: {
			type: Number,
			default: 1
		},
		// options 数据
		options: {
			type: Array,
			default: []
		},
		// 自定义节点 label、value、children 的字段
		fieldNames: {
			type: Object,
			default: ()=>{
				return {
					label: 'label',
					value: 'value',
					children: 'children',
				}
			}
		},
	})
	const emits = defineEmits(["update:modelValue"])
	const colList = computed(() => {
		const arr = [];
		let option = props.options; 
		for(let i=0;i<props.colNum;i++){
			if (props.modelValue[i] != undefined&&option) {
				arr.push(funOptions(option))
				const index = option?.findIndex(item=>item[props.fieldNames.value]==props.modelValue[i])
				option = option[index]&&option[index][props.fieldNames.children];
			}
		}
		return arr;
	})
	const funOptions = (data) => {
		return data.map((item) => {
			return {
				label: item[props.fieldNames.label],
				value: item[props.fieldNames.value],
				children:item[props.fieldNames.children]
			}
		})
	}
	const onSelect = (index,item,indexs) => {
		const modelValue = JSON.parse(JSON.stringify(props.modelValue))
		if(modelValue[index]!=item.value){
			modelValue[index] = item.value;
			let option = item[props.fieldNames.children]
			for(let i=index+1;i<props.colNum;i++){
				if(option[0]){
					modelValue[i] = option[0][props.fieldNames.value]
					option = option[0][props.fieldNames.children]
				}else if(modelValue[i]){
					modelValue.splice(i,modelValue.length)
				}
			}
		}
		emits("update:modelValue",modelValue)
	}
</script>

<style lang="scss" scoped>
	.picker-view {
		width: 100%;
		height: 600rpx;
		display: flex;
		.picker-view-item{
			padding: 30rpx 0;
			text-align: center;
			font-size:24rpx;
			color:#333333;
		}
		.picker-view-item-active{
			color:var(--dropdownThemeColor);
		}
	}
</style>