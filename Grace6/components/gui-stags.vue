<template>
	<view 
	class="gui-flex gui-wrap gui-row">
		<text 
		v-if="type != 'remove'" 
		v-for="(tag, idx) in tagsIn" 
		:key="idx" 
		class="gui-block gui-ellipsis" 
		:class="tag.checked ? checkedClass : defaultClass" 
		:style="{
			width:width == 0 ? '' : width+'rpx',
			paddingLeft:padding+'rpx',
			paddingRight:padding+'rpx',
			lineHeight:(size*lineHeight)+'rpx',
			height:(size*lineHeight)+'rpx', 
			fontSize:size+'rpx',
			borderRadius:borderRadius+'rpx',
			marginRight:margin+'rpx',
			marginBottom:margin+'rpx'
		}" 
		@tap="tapme(idx)">{{tag.text}}</text>
		
		<view
		class="gui-flex gui-row gui-space-between gui-align-items-center" 
		:class="defaultClass" 
		v-for="(tag, idx) in tagsIn" 
		:key="idx" 
		:style="{
			width:width == 0 ? '' : width+'rpx',
			paddingLeft:padding+'rpx',
			paddingRight:padding+'rpx',
			borderRadius:borderRadius+'rpx',
			marginRight:margin+'rpx',
			marginBottom:margin+'rpx'
		}" 
		v-if="type == 'remove'" 
		@tap="tapme(idx)">
			<text 
			class="gui-block gui-ellipsis" 
			:style="{
				lineHeight:(size*lineHeight)+'rpx',
				height:(size*lineHeight)+'rpx', 
				fontSize:size+'rpx'
			}">{{tag.text}}</text>
			<text 
			class="gui-block gui-icons gui-tags-remove-btn"
			:style="{
				lineHeight:(size*lineHeight)+'rpx',
				height:(size*lineHeight)+'rpx', 
				fontSize:size+'rpx'
			}">&#xe7a5;</text>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-stags", 
	props : {
		width        : {type:Number, default: 0},
		size         : {type:Number, default: 26},
		lineHeight   : {type:Number, default: 2},
		padding      : {type:Number, default: 15},
		margin       : {type:Number, default: 15},
		defaultClass : {
			type:Array,  default:function(){
				return ['gui-bg-gray', 'gui-dark-bg-level-1', 'gui-primary-text','gui-dark-text-level-5']
			}
		},
		checkedClass : {
			type:Array,  default:function(){
				return ['gui-bg-primary', 'gui-dark-bg', 'gui-color-white']
			}
		},
		borderRadius : {type:Number, default: 6},
		data         : {type:Array,  default: function(){return [];}},
		tags         : {type:Array,  default: function(){return [];}},
		type         : {type:String, default: 'radio'},
	},
	data() {
		return {
			tagsIn: []
		}
	},
	created:function () {
		this.tagsIn = this.tags;
	},
	watch:{
		tags : function (val) {
			this.tagsIn = val;
		}
	},
	methods:{
		tapme : function(idx){
			if(this.type == "radio"){
				if(this.tagsIn[idx].checked){
					this.tagsIn[idx].checked  = false;
					this.tagsIn.splice(idx,1, this.tagsIn[idx]);
					this.$emit('change', -1, this.tagsIn);
				}else{
					for(let i = 0; i < this.tagsIn.length; i++){
						this.tagsIn[i].checked  = false;
						this.tagsIn.splice(i,1, this.tagsIn[i]);
					}
					this.tagsIn[idx].checked  = true;
					this.tagsIn.splice(idx,1, this.tagsIn[idx]);
					this.$emit('change', this.tagsIn[idx], this.tagsIn);
				}
				
			}else if(this.type == 'checkbox'){
				this.tagsIn[idx].checked  = !this.tagsIn[idx].checked;
				this.tagsIn.splice(idx, 1, this.tagsIn[idx]);
				// 记录选中的索引
				var sedArr = [];
				for(let i = 0; i < this.tagsIn.length; i++){
					if(this.tagsIn[i].checked){
						sedArr.push(i);
					}
				}
				this.$emit('change', sedArr, this.tagsIn);
			}else{
				this.tagsIn.splice(idx, 1);
				this.$emit('change', this.tagsIn);
			}
		}
	},
	emits : ['change']
}
</script>
<style scoped>
.gui-tags-remove-btn{margin-left:8rpx;}
</style>