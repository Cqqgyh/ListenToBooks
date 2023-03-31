<template>
	<view class="gui-flex gui-rows gui-wrap">
		<view class="gui-add-list-items" 
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
			<!-- 进度条 -->
			<view class="gui-upload-progress">
			   <progress 
			   :percent="item.progress" 
			   :stroke-width="progressSize" 
			   :activeColor="progressColor" 
			   :backgroundColor="progressBGColor" />
			</view>
			<!-- 上传失败 -->
			<view class="gui-add-list-reup gui-flex gui-columns gui-justify-content-center gui-align-items-center" 
			@tap.stop="retry" :data-index="index" v-if="item.error">
				<text class="gui-add-list-reup-icon gui-icons icon-retry gui-color-white">&#xe635;</text>
				<text class="gui-add-list-reup-text gui-color-white">失败重试</text>
			</view>
			<!-- 删除 -->
			<text class="gui-add-list-remove gui-icons" 
			:style="{color:removeBtnColor}" @tap="removeImg" 
			:id="'gui-items-img-'+index">&#xe632;</text>
		</view>
		<view 
		class="gui-add-list-items gui-flex gui-columns gui-justify-content-center gui-align-items-center gui-bg-gray gui-dark-bg-level-6" 
		@tap="addImg" v-if="imgLists.length < maxFileNumber" 
		:style="{borderRadius:borderRadius}">
			<text class="gui-add-list-btn-icon gui-block-text gui-color-gray">+</text>
			<text class="gui-add-list-btn-text gui-block-text gui-primary-text">{{btnName}}</text>
		</view>
	</view>
</template>
<script>
import graceJS from '@/Grace6/js/grace.js';
export default {
	name  : "gui-upload-images",
	props : {
		maxFileNumber   : { type : Number, default : 9 },
		btnName         : { type : String, default : "添加照片" },
		items           : { type : Array,  default : function () {return []; }},
		removeBtnColor  : { type : String, default : "rgba(0, 0, 0, 0.8)" },
		sourceType      : { type : Array,  default : function () {return ['album', 'camera'];}},
		borderRadius    : { type : String, default : "10rpx" },
		uploadServerUrl : { type : String, default : '' },
		progressSize    : { type : Number, default : 2},
		progressColor   : { type : String, default : '#27BD81' },
		progressBGColor : { type : String, default : '#F8F8F8' },
		fileName        : { type : String, default : 'img'},
		formData        : { type : Object, default : function(){return {};}},
		imgMode         : { type : String, default : 'aspectFill'},
		header          : { type : Object, default : function(){return {};}},
		save2uniCloud   : { type : Boolean, default :false }
	},
	data() {
		return {
			imgLists  : [],
			updatting : false
		}
	},
	created : function () {
		this.initImgs();
	},
	watch   : {
		items : function(){ this.initImgs(); }
	},
    methods : {
		initImgs     : function(){
			var imgs = [];
			for(let i = 0; i < this.items.length; i++){
				imgs.push({url:this.items[i],  progress : 100});
			}
			this.imgLists = imgs;
		},
        addImg       : function(){
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
        removeImg    : function(e){
            var index = e.currentTarget.id.replace('gui-items-img-', '');
			var removeImg =  this.imgLists.splice(index, 1);
			this.$emit('removeImg', removeImg[0]);
			this.$emit('change'   , this.imgLists);
        },
        showImgs     : function(e){
            var currentImg = e.currentTarget.dataset.imgurl;
			var imgs       = [];
			for(let i = 0; i < this.imgLists.length; i++){
				imgs.push(this.imgLists[i].url);
			}
            uni.previewImage({urls:imgs, current:currentImg});
        },
		setItems     : function(items){
			this.imgLists = [];
			for(let i = 0; i < items.length; i++){
				this.imgLists.push({url:items[i], progress:100});
			}
			this.$emit('change'   , this.imgLists);
		},
		clearAllImgs : function () { this.imgLists = [];},
		retry        : function (e) {
			var index = e.currentTarget.dataset.index;
			this.upload(index);
		},
		upload       : function(index){
			if(this.updatting){return ;}
			this.updatting   = true;
			if(!index){index = 0;}
			uni.showLoading({title:"图片上传中", mask:true});
			if(this.save2uniCloud){
				this.upload2cloud(index);
			}else{
				this.uploadBase(index);
			}
		},
		uploadBase : function (index) {
			// 全部上传完成
			if(index > (this.imgLists.length - 1)){
				uni.hideLoading();
				this.updatting = false;
				this.$emit('uploaded', this.imgLists);
				return ;
			}
			// 验证后端
			if(this.uploadServerUrl == ''){
				uni.showToast({title:"请设置上传服务器地址", icon:"none"});
				return ;
			}
			// 检查是否是默认值
			if(this.imgLists[index].progress >= 1){
				this.uploadBase(index+1);
				return ;
			}
			this.imgLists[index].error = false;
			// 创建上传对象
			const task = uni.uploadFile({
				url      : this.uploadServerUrl,
				filePath : this.imgLists[index].url,
				name     : this.fileName,
				formData : this.formData,
				header   : this.header,
				success  : (uploadRes) => {
					try{
						uploadRes = JSON.parse(uploadRes.data);
						if(uploadRes.status != 'ok'){
							uni.showToast({title:"上传失败 : "+uploadRes.data, icon:"none"});
							this.error(index);
						}else{
							//上传图片成功
							this.imgLists[index].progress = 100;
							this.imgLists[index].url      = uploadRes.data;
							this.imgLists[index].result   = uploadRes;
							this.uploadBase(index+1);
						}
					}catch(e){
						this.error(index);
					}
				},
				fail    : (e) => {
					uni.showToast({title:"上传失败，请点击图片重试", icon:"none"});
					this.error(index);
					
				}
			});
			task.onProgressUpdate((res) => {
				if(res.progress > 0){
					this.imgLists[index].progress = res.progress;
					this.imgLists.splice(index, 1, this.imgLists[index]);
				}
			});
		},
		// 上传错误
		error : function(index){
			uni.hideLoading();
			this.updatting = false;
			setTimeout(()=>{
				this.imgLists[index].progress = 0;
				this.imgLists[index].error    = true;
				this.imgLists.splice(index, 1, this.imgLists[index]);
				this.$emit('uploaderror');
			}, 500);
		},
		upload2cloud:function (index) {
			// 全部上传完成
			if(index > (this.imgLists.length - 1)){
				uni.hideLoading();
				this.updatting = false;
				this.$emit('uploaded', this.imgLists);
				return ;
			}
			// 检查是否是默认值
			if(this.imgLists[index].progress >= 1){
				this.upload2cloud(index+1);
				return ;
			}
			this.imgLists[index].error = false;
			// 创建上传对象
			uniCloud.uploadFile({
				filePath  : this.imgLists[index].url,
				cloudPath : graceJS.uuid() + '.png',
				onUploadProgress:(progressEvent) => {
					var percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					this.imgLists[index].progress = percentCompleted;
					this.imgLists.splice(index, 1, this.imgLists[index]);
				},
				success : (uploadRes)=>{
					//上传图片成功
					this.imgLists[index].progress = 100;
					this.imgLists[index].url      = uploadRes.fileID;
					this.imgLists[index].result   = uploadRes;
					this.imgLists.splice(index, 1, this.imgLists[index]);
					this.upload2cloud(index+1);
				},
				fail : ()=>{
					uni.showToast({title:"上传失败", icon:"none"});
					this.error(index);
				}
			});
		}
    },
	emits : ['change', 'removeImg', 'uploaded', 'uploaderror']
}
</script>
<style scoped>
.gui-add-list-btn-text{font-size:26rpx; line-height:36rpx; text-align:center;}
.gui-add-list-btn-icon{font-size:80rpx; height:80rpx; line-height:80rpx; margin-bottom:20rpx;}
.gui-add-list-items{width:210rpx; height:210rpx; overflow:hidden; margin:10rpx; font-size:0; position:relative;}
.gui-add-list-remove{width:60rpx; height:60rpx; line-height:60rpx; text-align:center; font-size:44rpx; position:absolute; z-index:5; right:0; top:0;}
.gui-add-list-img{width:210rpx; height:210rpx;}
.gui-upload-progress{position:absolute; z-index:2; left:0; bottom:10rpx; width:180rpx; padding:0 16rpx;}
.gui-add-list-reup{position:absolute; z-index:3; left:0; top:0rpx; width:210rpx; height:210rpx; background-color:rgba(0,0,0,0.3);}
.gui-add-list-reup-icon{text-align:center; font-size:68rpx; line-height:100rpx;}
.gui-add-list-reup-text{text-align:center; font-size:20rpx; line-height:30rpx;}
</style>