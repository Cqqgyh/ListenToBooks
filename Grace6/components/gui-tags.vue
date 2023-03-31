<template>
	<text 
	class="gui-block gui-tags gui-ellipsis gui-border" 
	:class="customClass" 
	:style="{
		width:width == 0 ? '' : width+'rpx',
		paddingLeft:padding+'rpx',
		paddingRight:padding+'rpx',
		lineHeight:(size*lineHeight)+'rpx',
		height:(size*lineHeight)+'rpx', 
		fontSize:size+'rpx', 
		borderRadius:borderRadius+'rpx',
		marginRight:margin+'rpx',
		marginBottom:margin+'rpx',
		borderColor:borderColor+' !important'
	}" 
	@tap="tapme">{{text}}</text>
</template>
<script>
export default{
	name  : "gui-tags",
	props : {
		width        : {type:Number, default:0},
		text         : {type:String, default:''},
		size         : {type:Number, default:26},
		lineHeight   : {type:Number, default:1.8},
		padding      : {type:Number, default:15},
		margin       : {type:Number, default:15},
		customClass      : {type:Array,  default:function(){
			return ['gui-bg-primary', 'gui-color-white'];
		}},
		borderRadius : {type:Number, default:6},
		data         : {type:Array, default:function(){return [];}},
		borderColor  : {type:String, default:'rgba(255,255,255,0)'}
	},
	data() {
		return {
			tapping : false
		}
	},
	methods:{
		tapme : function(){
			this.$emit('tapme', this.data);
		}
	},
	emits : ['tapme']
}
</script>
<style scoped>
.gui-tags{text-align:center;}
.gui-tag-opacity{opacity:0.88;}
</style>