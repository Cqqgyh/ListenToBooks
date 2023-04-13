<template>
	<image class="image" :src="imgSrc" mode="aspectFill" :disabled="false" :controls='false' @error="imgerror"></image>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			cloudType: {
				type: String,
				default: 'oss'
			},
		},
		data() {
			return {
				imgSrc: ''
			};
		},
		mounted() {
			this.setCloudFunction()
		},
		methods: {
			imgerror(even) {
				this.imgSrc =  `https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/887c60f0-27f8-46d1-8769-2c45be0f3d7d.png`
			},
			setCloudFunction() {
				switch (this.cloudType){
					case 'oss':
						this.imgSrc = this.src + '?x-oss-process=video/snapshot,t_0,f_jpg'
						break;
					case 'process':
						this.imgSrc = this.src + '?ci-process=snapshot&time=0.01'
						break;
					case 'vframe':
						this.imgSrc = this.src + '?vframe/jpg/offset/0'
						break;
					default:
						this.imgSrc = this.src
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 100%;
		height: 100%;
	}
</style>
