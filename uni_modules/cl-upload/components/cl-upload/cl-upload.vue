<template>
	<view class="cl-updata">
		<view class="file-list" :style="[listRowStyle]">
			
			<view 
				v-for="(item, index) in FileList" 
				@tap="onClickRow(item, index)" 
				class="file-list-row"
				:style="[rowStyle]" 
				:key="index">

				<image 
					v-if="fileUrlType(item) === 'image'" 
					:src="item.url || item" 
					:style="[imgStyle]"
					mode="aspectFill"></image>
					
				<view
					v-else 
					class="_video" 
					:style="[imgStyle]" >
					
					<!-- #ifdef MP-WEIXIN || MP-ALIPAY -->
					<video
						v-if="!autoUpload || cloudType === 'other'"
						class="_video" 
						:style="[imgStyle]" 
						:src="item.url || item"
						:show-center-play-btn="false" 
						:show-fullscreen-btn="false"
						:show-play-btn="false"
						:show-loading="false"
						:enable-progress-gesture="false"
						:controls="false">
						<cover-view class="play" @tap="onPlay(item, index)">
							<slot name="playImg">
								<image style="width: 100%;" :src="playImg" mode="widthFix"></image>
							</slot>
						</cover-view>
					</video>
					
					<cl-image
						v-else
						class="pay"
						:style="[imgStyle]" 
						:cloudType="cloudType"
						:src="(item.url || item)"></cl-image>
					<!-- #endif -->

					<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
					<video
						v-if="cloudType === 'other'"
						class="_video" 
						:style="[imgStyle]" 
						:src="item.url || item"
						:show-center-play-btn="false" 
						:show-fullscreen-btn="false"
						:show-play-btn="false"
						:show-loading="false"
						:enable-progress-gesture="false"
						:controls="false">
						<cover-view class="play" @tap="onPlay(item, index)">
							<slot name="playImg">
								<image style="width: 100%;" :src="playImg" mode="widthFix"></image>
							</slot>
						</cover-view>
					</video>
					
					<cl-image
						v-else
						class="pay"
						:style="[imgStyle]" 
						:cloudType="cloudType"
						:src="(item.url || item)"></cl-image>
					<!-- #endif -->
						
					<view class="play" @tap="onPlay(item, index)">
						<slot name="playImg">
							<image class="play-img" :src="playImg" mode="widthFix"></image>
						</slot>
					</view>
						
				</view>

				<view v-if="remove" @tap.stop="onRemove(item, index)">
					<slot name="delete">
						<view class="remove">
							<image :src="deleteImg" mode="widthFix"></image>
						</view>
					</slot>
				</view>
			</view>
			
			<view 
				v-if="add && FileList.length < max" 
				@tap="onClickAdd" 
				:style="[rowStyle]"
				class="file-list-row add-image">

				<slot name="addImg">
					<image :src="addImg" mode="widthFix"></image>
				</slot>
			</view>
		</view>


		<view v-if="tempVideoUrl" class="mask">
			<image @tap="tempVideoUrl=''" class="_root" :src="closeImg" mode="widthFix"></image>

			<view class="block" @tap.stop>
				<video autoplay :src="tempVideoUrl"></video>
			</view>
		</view>
	</view>
</template>

<script>
	import ClImage from '../cl-image/cl-image.vue'
	export default {
		name: "cl-upload",
		emit:['onImage', 'onImageSize', 'onError', 'onVideoMax', 'onVideoSize', 'onProgress', 'onSuccess', 'onVideo', 'onImage'],
		props: {
			//受控图片列表
			// #ifdef VUE2
			value: {
				type: Array,
				default: () => [],
			},
			// #endif
			
			// #ifdef VUE3
			modelValue: { 
				type: Array,
				default: () => [],
			},
			// #endif
			
			// 存储云类型 oss阿里云  vframe七牛云   process腾讯云  other其他
			cloudType: {
				type: String,
				default: 'oss'
			},
			// 标识符,即后端接口参数名
			fileName: {
				type: String,
				default: 'file'
			},
			// 文件类型 'image', 'video', 'all'
			fileType: {
				type: String,
				default: 'all'
			},
			// 上传图片参数
			imageFormData: {
				type: Object,
				default: () => {}
			},
			// 上传视频参数
			videoFromData: {
				type: Object,
				default: () => {}
			},

			// 必选参数，上传的地址
			action: {
				type: String,
				default: ''
			},

			// 设置上传的请求头部
			headers: {
				type: Object,
				default: () => {}
			},

			// 上传时附带的额外参数
			data: {
				type: Object,
				default: () => {}
			},

			// 是否开启预览图片
			isPreviewImage: {
				type: Boolean,
				default: true
			},

			// 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
			indicator: {
				type: String,
				default: 'none'
			},
			// 是否在选取文件后立即进行上传	
			autoUpload: {
				type: Boolean,
				default: true
			},
			// 是否显示删除按钮
			remove: {
				type: Boolean,
				default: true
			},
			// 是否添加按钮
			add: {
				type: Boolean,
				default: true
			},
			// 最多显示数量
			max: {
				type: Number,
				default: 9
			},
			// 视频最大上传数量
			maxVideo: {
				type: Number,
				default: 0
			},
			// 列表样式
			listStyle: {
				type: Object,
				default: () => {}
			},
			// 删除提示弹窗标题
			deleteTitle: {
				type: String,
				default: '提示'
			},
			// 删除提示弹窗文案
			deleteText: {
				type: String,
				default: '您确认要删除吗？'
			},

		},
		components: {ClImage},
		data() {
			return {
				// 渲染列表
				FileList: [],

				// 预览视频地址
				tempVideoUrl: '',

				// 临时文件列表
				tempFile_paths: [],
				
				// 错误的图片index数组
				errorList: [],
				
				// 图片资源
				addImg: 'https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/bb1550b3-e0a8-4a90-a86f-00f8c6afa9fb.png',
				playImg: 'https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/ae40402f-aa53-4344-b553-2322799bebd6.png',
				closeImg: 'https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/cde4362d-7ec7-4cac-a692-12e1f576be1e.png',
				deleteImg: 'https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/d20177a5-417e-4c5d-a266-1988361c543d.png',
				
			};
		},
		watch: {
			// #ifdef VUE2
			'value': {
				handler: function(newVal, oldVal) {
					this.FileList = newVal;
				},
				deep: true,
				immediate: true
			},
			// #endif
			
			// #ifdef VUE3
			'modelValue': {
				handler: function(newVal, oldVal) {
					this.FileList = newVal;
				},
				deep: true,
				immediate: true
			},
			// #endif
		},
		computed: {
			listRowStyle() {
				const style = {
					'grid-template-columns': `repeat(${this.listStyle?.columns || 4}, 1fr)`, // 每行数量	
					'grid-column-gap': this.listStyle?.columnGap || '40rpx', // 行间距	
					'grid-row-gap': this.listStyle?.rowGap || '40rpx', // 列间距
					'padding': this.listStyle?.padding || '0rpx' // 列表内边距
				}
				
				return style;
			},
			rowStyle() {
				const style = {
					'aspect-ratio': this.listStyle?.height ? '' : this.listStyle?.ratio || '1/1', // 图片比例	
					'height': this.listStyle?.height || '140rpx',
				}
				
				return style;
			},
			imgStyle() {
				const style = {
					'border-radius': this.listStyle?.radius || '6rpx', // 图片圆角
				}
				
				return style;
			}
		},
		methods: {
			 imgerror(e,item,index) {
				if(this.errorList.indexOf(index) === -1) {
					this.errorList.push(index)
				}
			},

			/**
			 * 删除已选择文件
			 * @param {object} item 文件信息
			 * @param {number} index 文件索引
			 * */
			onRemove(item, index) {
				uni.showModal({
					title: this.deleteTitle,
					content: this.deleteText,
					success: (res) => {
						if (res.confirm) {
							const tempFileIndex = this.tempFile_paths.indexOf(item.url || item);

							if (tempFileIndex > -1) {
								this.tempFile_paths.splice(tempFileIndex, 1)
							}

							this.FileList.splice(index, 1)
							
							// #ifdef VUE2
							this.$emit('input', this.FileList)
							// #endif
							
							// #ifdef VUE3
							this.$emit("update:modelValue", this.FileList);
							// #endif
						}
					}
				});
			},

			/**
			 * 点击已选择文件
			 * @param {object} item 文件信息
			 * @param {number} index 文件索引 
			 * */
			onClickRow(item, index) {
				this.previewImage(item?.url ?? item, index);
				this.$emit('onImage', {
					item,
					index
				})
			},

			/**
			 * 点击选择图片按钮
			 * */
			onClickAdd() {

				switch (this.fileType) {
					case 'image':
						this.onChooseFile(1);
						break;
					case 'video':
						this.onChooseFile(2);
						break;
					case 'all':
						uni.showActionSheet({
							itemList: ['相册', '视频'],
							success: (res) => {
								const tapIndex = res.tapIndex;
								if (tapIndex === 0) {
									this.onChooseFile(1);
								} else {
									this.onChooseFile(2);
								}
							},
							fail: (res) => {
								console.error(res.errMsg);
							}
						});
						break;
					default:
						this.onChooseFile(1);
						break;
				}
			},


			/**
			 * 从本地选择文件。
			 * @param { number } updataType 选择类型 1:图片 2视频
			 * */
			async onChooseFile(updataType) {
				const that = this;
				if (updataType === 1) {

					const data = Object.assign({}, {
						// 最多可以选择的图片张数，默认9
						count: 9,
						// 仅对 mediaType 为 image 时有效，是否压缩所选文件
						// #ifndef MP-TOUTIAO
						sizeType: ['original', 'compressed'],
						// #endif
						// album 从相册选图，camera 使用相机，默认二者都有。
						sourceType: ['camera', 'album'],

						compress: false
					}, this.imageFormData)
					
					data['count'] = this.max - this.FileList.length
					
					uni.chooseImage({
						...data,
						success: async (res) => {
							const tempFilePaths = res.tempFiles;
							const compress = that.imageFormData?.compress || false;
							
							// 限制图片上传尺寸
							if(that.imageFormData?.size ?? false) {
								tempFilePaths.map((imgInfo, index)=>{
									const maxSize = that.imageFormData.size * 1024 * 1024
									if(imgInfo.size > maxSize) {
										tempFilePaths.splice(index, 1)
										that.$emit('onImageSize', imgInfo)
										uni.showToast({
											title: `图片最大上传${that.imageFormData.size}MB`,
											duration: 2000,
											icon:'none'
										});
									}
								})
							}

							if (compress && tempFilePaths.length > 0) {
								const compressImage = await that.compressImage(tempFilePaths);
								upload(compressImage);

							} else {
								upload(tempFilePaths.map(item=> item.path));
							}

							function upload(imagesTemp) {
								if (that.autoUpload) {
									imagesTemp.map(item => {
										that.updataFile(item, 'image')
									})
								} else {
									that.FileList = [...that.FileList, ...imagesTemp]
									that.tempFile_paths = [...that.tempFile_paths, ...imagesTemp]
								}
							}

						},
						fail(err) {
							that.$emit('onError', err)
							console.error('选择图片失败', err)
						}

					})
				}

				if (updataType === 2) {
					
					// 限制视频最大上传数量
					const VIDEO_REGEXP = /\.(mp4|flv|avi)/i
					const videoList = await that.FileList.filter(item=> {
						const fileUrl = item?.url ?? item
						return VIDEO_REGEXP.test(fileUrl)
					})
					
					if(that.maxVideo > 0 && videoList.length >= that.maxVideo) {
						that.$emit('onVideoMax', that.maxVideo, videoList.length)
						return uni.showToast({
							title: '视频数量已超出',
							duration: 2000,
							icon:'none'
						});
					}

					const data = Object.assign({}, {
						// 	拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
						maxDuration: 60,
						// #ifndef MP-TOUTIAO
						// 'front'、'back'，默认'back'
						camera: "back",
						// #endif
						
						// album 从相册选视频，camera 使用相机拍摄，默认二者都有。
						sourceType: ['camera', 'album'],
						// 是否压缩所选的视频源文件，默认值为 true，需要压缩。
						compressed: true,
						// 'front'、'back'，默认'back'
					}, this.videoFromData)

					uni.chooseVideo({
						...data,
						success:  (res)=> {
							let tempFilePath = res.tempFilePath;
							// 限制视频上传尺寸
							if(that.videoFromData?.size ?? false) {
								const maxSize = that.videoFromData.size * 1024 * 1024
								if(res.size > maxSize) {
									tempFilePath = null
									that.$emit('onVideoSize', res)
									uni.showToast({
										title: `视频最大上传${that.videoFromData.size}MB`,
										duration: 2000,
										icon:'none'
									});
								}
							}
							
							if(tempFilePath == null) {
								return false
							}
							if (that.autoUpload) {
								that.updataFile(tempFilePath, 'video')
							} else {
								that.FileList.push({
									url: tempFilePath,
									type: 'video'
								})
								that.tempFile_paths.push(tempFilePath)
							}
						},
						fail(err) {
							console.error('选择视频失败', err)
						}

					})
				}

				// 拍摄或从手机相册中选择图片或视频。
				if (this.fileType === 3) {

					const data = Object.assign({}, this.imageFormData, this.this.videoFromData, {
						// 最多可以选择的图片张数，默认9
						count: 9,
						
						// #ifdef MP-WEIXIN
						sizeType: ['original', 'compressed'],
						// #endif
						
						// album 从相册选图，camera 使用相机，默认二者都有。
						sourceType: ['camera', 'album'],
					})

					uni.chooseMedia({
						count: 9,
						mediaType: ['image', 'video'],
						sourceType: ['album', 'camera'],
						maxDuration: 30,
						camera: 'back',
						success(res) {
						}
					})
				}
			},

			/**
			 * 上传文件到服务器
			 * @param { tempFile } 文件临时地址
			 * @param { filetype } 文件类型
			 * */
			updataFile(tempFile, filetype) {
				const that = this;
				
				that.$emit('afterUpload', tempFile, filetype)
				
				uni.showLoading({
					title: '正在上传中...',
					icon: 'loading',
				})
				return new Promise(async (resolve) => {
					
					// uniCloud上传
					if(that.action === 'uniCloud') {
						await uniCloud.uploadFile({
							cloudPath: Date.now() + ( filetype==='image'? '.png' : '.mp4' ),
							filePath: tempFile,
							// #ifdef MP-ALIPAY 
							fileType: filetype,
							// #endif
							onUploadProgress: (progressEvent)=>{
								const percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
								that.$emit('onProgress', percentCompleted)
							},
							success(result) {
								that.FileList.push(result.fileID)
								
								uni.hideLoading();
								that.$emit('onProgress', {
									...result
								})
							},
							fail: (error) => {
								uni.hideLoading();
								console.error('error', error);
								that.$emit('onError', error)
							}
						})
						return false;
					}
					
					// 接口服务上传
					const uploadTask = uni.uploadFile({
						url: that.action,
						filePath: tempFile,
						name: that.fileName,
						formData: that.data,
						header: that.headers,
						// #ifdef MP-ALIPAY
						fileType: filetype,
						// #endif
						success: (uploadFileRes) => {
							const data = JSON.parse(uploadFileRes.data)
							uni.hideLoading();
							that.success(data)
							resolve(data)
						},
						fail: (error) => {
							uni.hideLoading();
							console.error('error', error);
							that.$emit('onError', error)
						}
					});

					uploadTask.onProgressUpdate((res) => {
						that.$emit('onProgress', {
							...res,
							...tempFile
						})
					});
				});
			},

			/**
			 * 手动上传
			 * */
			submit() {
				return new Promise((resolve) => {
					if (this.tempFile_paths.length <= 0) {
						this.success([])
						return console.error('没有可上传文件');
					}

					const promises = this.tempFile_paths.map(item => {
						return this.updataFile(item)
					})

					Promise.all(promises).then(reslut => {
						this.tempFile_paths = [];
						this.success(reslut)
						resolve(reslut)
					})
				})
			},

			/**
			 * 返回数据
			 * */
			success(data) {

				this.$emit('onSuccess', data);

				// 自定义数据结构-选择性开启
				// const list = data.map(item=> {
				// 	return JSON.parse(item).data.link;
				// })
				// this.$emit('input', [...this.FileList, ...list]);
			},
			/**
			 * 压缩图片
			 * @param {array} tempFilePaths 临时路径数组
			 * @return {array} 被压缩过的路径数组
			 * */
			async compressImage(tempFilePaths) {
				const that = this;

				return new Promise(resolve => {

					if (tempFilePaths.length <= 0) {
						console.error('压缩数组不能为空')
						resolve([])
					}

					const promiseImages = (item) => {
						return new Promise(resol => {
							// #ifdef H5
							this.canvasDataURL(item.path, {
								quality: that.imageFormData.quality / 100
							}, (base64Codes) => {
								resol(base64Codes);
							})
							// #endif

							// #ifndef H5
							uni.compressImage({
								src: item.path,
								quality: that.imageFormData.quality || 80,
								success: res => {
									console.log(res);
									resol(res.tempFilePath);
								},
								fail(err) {
									console.log('压缩失败', err);
									resol(err);
								}
							})
							// #endif
						})
					}
					const compressImages = tempFilePaths.map(item => {
						return promiseImages(item)
					})

					uni.showLoading({
						title: '压缩中...',
						icon: 'loading',
					})

					Promise.all(compressImages).then(res => {
						console.log(res);
						uni.hideLoading();
						resolve(res)
					}).catch(err => {
						uni.hideLoading();
						resolve(err)
					})
				})
			},

			/**
			 * H5压缩图片质量
			 * */
			canvasDataURL(path, obj, callback) {
				var img = new Image();
				img.src = path;
				img.onload = function() {
					var that = this;
					// 默认按比例压缩
					var w = that.width,
						h = that.height,
						scale = w / h;
					w = obj.width || w;
					h = obj.height || (w / scale);
					var quality = 0.8; // 默认图片质量为0.8
					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					// 创建属性节点
					var anw = document.createAttribute("width");
					anw.nodeValue = w;
					var anh = document.createAttribute("height");
					anh.nodeValue = h;
					canvas.setAttributeNode(anw);
					canvas.setAttributeNode(anh);
					ctx.drawImage(that, 0, 0, w, h);
					// 图像质量
					if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
						quality = obj.quality;
					}
					// quality值越小，所绘制出的图像越模糊
					var base64 = canvas.toDataURL('image/jpeg', quality);
					// 回调函数返回base64的值
					callback(base64);
				}
			},

			/**
			 * 预览图片
			 * @param {string, object} item 文件信息
			 * */
			previewImage(item) {
				const that = this;

				if (that.fileUrlType(item) === 'video' || item.type === 'video') return false;
				if (!that.isPreviewImage) return false;

				const imgs = that.FileList.filter(item => {
					return that.fileUrlType(item) !== 'video' && item.type !== 'video'
				}).map(item=> item?.url ?? item)
				const current = imgs.indexOf(item || item.url);
				console.log('预览1', imgs, current);
				uni.previewImage({
					current: current,
					urls: imgs,
					success() {
						console.log('预览');
					},
					fail(err) {
						console.log(err);
					}
				})
			},

			/**
			 * 预览视频
			 * @param {string, object} item 文件信息
			 * */
			onPlay(item, index) {
				this.$emit('onVideo', {
					item,
					index
				})
				this.tempVideoUrl = item.url || item;
			},

			/**
			 * 是否img类型
			 * @param {string, object} item 文件信息
			 * */
			fileUrlType(item) {
				if (!item) {
					console.error('列表文件尾缀或地址错误')
					return false;
				}

				const url = item.url || item.path || item || false
				const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i
				
				if (IMAGE_REGEXP.test(url) || this.isBase64(url)) {
					return 'image';
				} else {
					return 'video';
				}
			},
			isBase64(str) {
				return str.includes('data:image/jpeg;base64,') || str.includes('blob:')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cl-updata {

		.file-list {
			display: grid;

			&-row {
				display: inline-flex;
				align-items: center;
				position: relative;

				image {
					height: 100%;
					width: 100%;
				}

				._video {
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					
					.video-fixed {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
						z-index: 5;
					}

					.play {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 30%;
						z-index: 9;
					}
				}

				.remove {
					position: absolute;
					top: 0;
					right: 0;
					background-color: #373737;
					height: 50rpx;
					width: 50rpx;
					border-bottom-left-radius: 200rpx;
					z-index: 11;

					image {
						width: 20rpx;
						height: 20rpx;
						position: absolute;
						right: 12rpx;
						top: 12rpx;
					}
				}
			}

			.add-image {
				display: flex;
				align-items: center;
				justify-content: center;
				border: 2rpx dashed #ccc;

				&:active {
					opacity: 0.8;
				}

				image {
					width: 40%;
				}
			}
		}

		.mask {
			background-color: #000;
			position: fixed;
			top: 0%;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 99;

			.block {
				padding: 0 30rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 100%;

				video {
					width: 100%;
					height: 78vh;
				}
			}

			._root {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				left: 40rpx;
				top: 5vh
			}
		}
	}
</style>
