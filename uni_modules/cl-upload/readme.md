### cl-upload 上传组件

> 支持手动自动上传，样式调整，参数配置，预览，删除等功能


> `注意：每次上传都需要回调函数接收参数并且添加到与组件绑定的数组中以保持数据一致,这样做是因为组件不知道服务端返回的数据格式，也可以在组件中修改promise格式 一劳永逸`

### 注意事项
1. ratio 图片比例属性部分手机不支持，可选用height属性代替
2. 自定义播放按钮部分平台有兼容性问题，可选择性关闭
3. 开启压缩图片返回的临时路径没有尾缀，官方api的问题。真机上没问题，也可以在上传的时候手动添加尾缀
4. **视频地址必须`https`, http可能导致无法显示封面图**

### H5体验地址
![image](https://mp-61599c79-d7ee-4a75-a24b-e5a288da6dd3.cdn.bspapp.com/cloudstorage/8c78b7b3-0d70-487c-a6d2-23eb7736d87b.png)

#### 基础使用


```
<cl-upload v-model="list" action="请求地址" @onSuccess="onSuccess"></cl-upload>

methods: {
    /**
	 * 自动上传返回的是一张图片信息
	 * 手动上传返回的是已选中所有图片或者视频信息
	 * */ 
	onSuccess(reslut) {
		// 把服务端返回的图片地址添加到list中与组件数据同步
		this.list.push(reslut.url)
	},
}
```
### uniCloud上传使用

```
/**
* 一句代码实现上传,就是这么简单
**/
<cl-upload v-model="list" action="uniCloud"></cl-upload>
```

### 自定义样式
`通过 listStyle 控制每行数量、比例、行间距、列间距等常用样式`

```
<cl-upload v-model="list" :listStyle="{
	columns: 2,
	columnGap: '20rpx',
	rowGap:'20rpx',
	padding:'10rpx',
	height:'300rpx',
	radius:'20rpx'
}"></cl-upload>
```

### 手动上传
`通过 autoUpload 关闭掉自动上传，提交的时候通过 refs 主动调用组件上传方法，onSuccess 返回接口数据或者 .then`

> 上传视频兼容：微信小程序、支付宝小程序
> 上传图片兼容：h5、微信小程序、支付宝小程序，其他平台没单独测试应该没多大问题

```
<cl-upload 
	ref="upload2" 
	v-model="list2" 
	:autoUpload="false"></cl-upload>
	
<button @tap="submit">手动提交</button>

methods: {
    submit() {
    	/**
    	 * 主动调用组件上传方法
    	 * 手动上传返回的是已选中所有图片或者视频信息
    	 * */ 
    	this.$refs.upload2.submit().then(reslut=>{
    		console.log(reslut);
    		
    		// 把服务端返回的图片地址添加到list中与组件数据同步
    		const imgUrls = reslut.list.map(imgInfo=> imgInfo.url);
    		this.list2 = [...this.list2, ...imgUrls]
    	})
    },
}
```

## API 

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| action | 上传地址 | String |-| uniCloud |
| cloudType `1.2.7` | 存储云类型(各个云服务截取封面方式不同。 other选项是video保底手段,部分平台有兼容性问题) | String |oss| 阿里云:oss  七牛云:vframe   腾讯云:process  其他:other |
| headers | 设置上传的请求头部 | Object | - |-  |
| data | 上传时附带的额外参数 | Object | - | - |
| fileName| 标识符,即后端接口参数名 | String | file | - |
| fileType | 文件类型 | String | all | 'image', 'video', 'all' |
| imageFormData | 上传图片参数 | Object | - | - |
| videoFromData | 上传视频参数 | Object  | - | - |
| listStyle | 列表样式 |Object  | - | - |
| isPreviewImage | 是否开启预览图片 | Boolean | true |false  |
| remove | 是否显示删除按钮 | Boolean | true |false  |
| showPlayBbtn`1.2.4 移除` | 是否使用自定义播放按钮 | Boolean | true |false  |
| add | 是否添加按钮 | Boolean | true |false  |
| max | 最多显示数量 | Number | 9 |   |
| maxVideo | 视频最大上传数量 | Number | 不限制 |  - |
| deleteTitle| 删除提示弹窗标题 | String | 提示 |
| deleteText| 删除提示弹窗文案 | String | 您确认要删除吗？ |
| loading| 是否显示加载 | Boolean | true |
| loadingText| 加载文案 | String | 正在上传中... |

#### imageFormData

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| count | 最多可以选择的图片张数 | number |9| - |
| sizeType | original 原图，compressed 压缩图 | array | 默认二者都有 |-  |
| sourceType | 相册或者相机 | array |  ['camera ', 'album'] | ['camera ', 'album']  |
| compress | 是否开启图片压缩 | Boolean | false | true  |
| quality | 压缩质量 | number | 80 | -  |
| size | 图片大小 | number | - | 单位MB |

#### videoFromData

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| maxDuration | 拍摄视频最长拍摄时间 | number |60| 最多60秒 |
| camera | 前摄像头后摄像头 | array | - |-  |
| compressed | 是否压缩所选的视频源文件。 | Boolean | true |-  |
| sourceType | 相册或者相机 | array |  ['camera ', 'album'] | ['camera ', 'album']  |
| size | 视频大小 | number | - | 单位MB |

#### listStyle

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| columns | 每行数量 | number |4| - |
| columnGap | 行间距 | string | '40rpx' |-  |
| rowGap | 列间距 | string | '40rpx' |-  |
| padding | 列表内边距 | string | '0 0rpx' |-  |
| ratio | 图片比例 | string | '1/1' | 低版本手机不支持,可以选择height属性  |
| height | 图片高度 | string | '140rpx' |-  |
| radius | 图片圆角 | string | '6rpx' |-  |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onSuccess | 上传成功 | data: 服务器返回数据 |
| onError | 上传失败 | error:错误信息 |
| onImage | 点击图片 | item: 图片信息 index: 列表索引 |
| onVideo | 点击视频 | item: 视频信息 index: 列表索引 |
| onProgress | 上传进程 | onProgress参数说明|
| onVideoMax | 触发视频最大数量限制 | maxVideo, fileLength|
| onImageSize | 触发图片最大尺寸限制 | 图片信息 |
| onVideoSize | 触发视频最大尺寸限制 | 视频信息 |
| afterUpload `1.2.6` | 预上传拦截 | 临时路径, 文件类型 |

#### onProgress参数说明
| 事件名 | 说明 |
| --- | --- |
| progress | 上传进度百分比 |
| totalBytesSent | 已经上传的数据长度 |
| totalBytesExpectedToSend | 预期需要上传的数据总长度 |


### [遇到问题或者讨论 uniapp 加入QQ群  553291781](https://jq.qq.com/?_wv=1027&k=5UkMN1QX)