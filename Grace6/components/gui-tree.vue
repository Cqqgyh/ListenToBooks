<template>
	<view>
		<view 
		v-for="(tree,index) in treesIN" 
		:key="index">
			<view 
			class="gui-flex gui-row gui-nowrap gui-align-items-center gui-tree" 
			:data-havsons="tree.children" 
			:data-treeindexs="indexesIn" 
			:data-index="index" 
			:data-id="tree.id" 
			:data-treelevel="level" 
			:data-cancheck="(allCanCheck || !tree.children)" 
			:style="{paddingLeft:(indent*level)+'rpx'}" 
			@tap.stop="taped">
				<view 
				class="gui-tree-icons gui-color-gray" 
				:data-id="tree.id" 
				@tap.stop="fold" 
				v-if="type == 'text' && isIcon">
					<text 
					class="gui-tree-icons-text gui-icons" 
					v-if="tree.children">&#xe62d;</text>
				</view>
				<view 
				class="gui-tree-icons" 
				v-if="type == 'radio' && (allCanCheck || !tree.children)">
					<text 
					:class="checkedClass" 
					class="gui-tree-icons-text gui-icons gui-fade-in" 
					v-if="tree.id == checkedId">&#xe7f8;</text>
					<text class="gui-tree-icons-text gui-icons" 
					v-else>&#xe762;</text>
				</view>
				<view 
				class="gui-tree-icons" 
				v-if="type == 'checkbox' && (allCanCheck || !tree.children)">
					<text 
					:class="checkedClass" 
					class="gui-tree-icons-text gui-icons gui-fade-in" 
					v-if="isChecked(tree.id)">&#xe685;</text>
					<text 
					class="gui-tree-icons-text gui-icons icon-checkbox" v-else>&#xe762;</text>
				</view>
				<text 
				class="gui-block gui-tree-title gui-flex1">{{tree.label}}</text>
			</view>
			<view>
				<gui-tree 
				v-if="arrayIndexOf(notids, tree.id) == -1" 
				:trees="tree.children" 
				:indent="indent" 
				:level="level+1" 
				:allCanCheck="allCanCheck" 
				:isIcon="isIcon" 
				:checkedId="checkedId" 
				:checkedIds="checkedIds" 
				:type="type" 
				:indexes="[indexesIn,index]" 
				:checkedClass="checkedClass" 
				@taped="tapbase"></gui-tree>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	name  : "gui-tree",
	props : {
		trees        : {type:Array,   default:function () {return [];}},
		indent       : {type:Number,  default:28},
		level        : {type:Number,  default:0},
		type         : {type:String,  default:'text'},
		isIcon       : {type:Boolean, default:true},
		indexes      : {type:Array,   default:function () {return ['',0];}},
		checkedId    : {type:[String, Number], default:'-1'},
		checkedIds   : {type:Array,   default:function () {return [];}},
		allCanCheck  : {type:Boolean, default:true},
		isFold       : {type:Boolean, default:true},
		checkedClass : {type:Array,   default:function () {return ['gui-primary-color'];}}
	},
	data() {
		return {
			treesIN   : [],
			indexesIn : [],
			notids    : []
		}
	},
	created:function(){
		this.treesIN = this.trees;
		if(this.indexes[0] != ''){
			var indexes  =  this.indexes[0].split(',');
		}else{
			var indexes = [];
		}
		indexes.push(this.indexes[1]);
		this.indexesIn = indexes.join(',');
	},
	watch:{
		type : function(){
			this.notids = [];
		}
	},
	methods:{
		fold  : function (e) {
			var id            = e.currentTarget.dataset.id;
			if(this.isFold){
				var res = this.arrayIndexOf(this.notids, id);
				if(res == -1){
					this.notids.push(id);
				}else{
					this.notids.splice(res,1);
				}
			}
			e.stopPropagation();
			return ;
		},
		taped : function(e){
			var treeindexs    = e.currentTarget.dataset.treeindexs;
			treeindexs        = treeindexs.split(',');
			var index         = e.currentTarget.dataset.index;
			treeindexs.push(index);
			treeindexs.shift();
			if(this.type == 'text'){
				this.tapbase(treeindexs);
			}else{
				var cancheck = e.currentTarget.dataset.cancheck;
				if(cancheck){this.tapbase(treeindexs);}
			}
			e.stopPropagation();
		},
		tapbase : function(e){
			this.$emit('taped', e);
		},
		setTrees : function (trees) {
			this.treesIN = trees;
		},
		isChecked : function(checkedId){
			for(let i = 0; i < this.checkedIds.length; i++){
				if(this.checkedIds[i] == checkedId){
					return true;
				}
			}
			return false;
		},
		arrayIndexOf : function(arr, needFind){
			var index = -1;
			for(let i = 0; i < arr.length; i++){
				if(arr[i] == needFind){index = i; return i;}
			}
			return index;
		}
	},
	emits : ['taped']
}
</script>
<style scoped>
</style>