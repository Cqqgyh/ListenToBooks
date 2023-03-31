<template>
	<view class="gui-flex gui-row gui-wrap">
		<view 
		class="gui-add-list-items" 
		:style="{borderRadius:borderRadius}" 
		v-for="(item, index) in imgLists" 
		:key="index">
			<image 
			:src="item.url" 
			:data-imgurl="item.url" 
			:style="{borderRadius:borderRadius}" 
			@tap="showImgs" 
			class="gui-add-list-img" 
			:mode="imgMode"></image>
			<text 
			class="gui-add-list-remove gui-icons" 
			:style="{color:removeBtnColor}" 
			@tap="removeImg" 
			:id="'gui-items-img-'+index">&#xe632;</text>
		</view>
		<view 
		class="gui-add-list-items gui-flex gui-columns gui-justify-content-center gui-align-items-center gui-bg-gray gui-dark-bg-level-5" 
		@tap="addImg" 
		v-if="imgLists.length < maxFileNumber" 
		:style="{borderRadius:borderRadius}">
			<text class="gui-add-list-btn-icon gui-block-text gui-color-gray">+</text>
			<text class="gui-add-list-btn-text gui-block-text gui-color-gray">{{btnName}}</text>
		</view>
	</view>
</template>
<script>
export default {
	name  : "gui-choose-images",
	props : {
		maxFileNumber  : { type : Number, default : 9 },
		btnName        : { type : String, default : "添加照片" },
		items          : { type : Array,  default : function () {return []; }},
		removeBtnColor : { type : String, default : "rgba(0, 0, 0, 0.8)" },
		imgMode        : { type : String, default : 'widthFix' },
		sourceType     : { type : Array,  default : function () {return ['album', 'camera'];}},
		borderRadius   : { type : String, default : "10rpx" }
	},
	data() {
		return {
			imgLists : []
		}
	},
	created:function () {
		this.initImgs();
	},
	watch:{
		items:function(){ this.initImgs(); }
	},
    methods:{
		initImgs : function(){
			var imgs = [];
			for(let i = 0; i < this.items.length; i++){
				imgs.push({url:this.items[i],  progress : 100});
			}
			this.imgLists = imgs;
		},
        addImg : function(){
            var num = this.maxFileNumber - this.imgLists.length;
            if(num < 1){return false;}
            uni.chooseImage({
                count      : num,
                sizeType   : ['compressed'],
				sourceType : this.sourceType,
                success    : (res) => {
					if(this.imgLists.length >= this.maxFileNumber){return ;}
					for(let i = 0; i < res.tempFilePaths.length; i++){
						if(this.imgLists.length >= this.maxFileNumber){break;}
						this.imgLists.push({url:res.tempFilePaths[i], progress:0});
					}
                    this.$emit('change', this.imgLists);
                },
				complete   : function(){}
            });
        },
        removeImg : function(e){
            var index     = e.currentTarget.id.replace('gui-items-img-', '');
			var removeImg =  this.imgLists.splice(index, 1);
			this.$emit('removeImg', removeImg[0]);
			this.$emit('change'   , this.imgLists);
        },
        showImgs : function(e){
            var currentImg = e.currentTarget.dataset.imgurl;
			var imgs = [];
			for(let i = 0; i < this.imgLists.length; i++){
				imgs.push(this.imgLists[i].url);
			}
            uni.previewImage({
              urls: imgs,
              current : currentImg
            })
        },
		setItems : function(items){
			this.imgLists = [];
			for(let i = 0; i < items.length; i++){
				this.imgLists.push({url : items[i], progress : 100});
			}
			this.$emit('change', this.imgLists);
		}
    },
	emits : ['change', 'removeImg']
}
</script>
<style scoped>
.gui-add-list-btn-text{font-size:26rpx; line-height:36rpx; text-align:center;}
.gui-add-list-btn-icon{font-size:80rpx; height:80rpx; line-height:80rpx; margin-bottom:20rpx;}
.gui-add-list-items{width:210rpx; height:210rpx; overflow:hidden; margin:10rpx; font-size:0; position:relative;}
.gui-add-list-remove{width:60rpx; height:60rpx; line-height:60rpx; text-align:center; font-size:44rpx; position:absolute; z-index:1; right:0; bottom:0;}
.gui-add-list-img{width:210rpx;}
</style>