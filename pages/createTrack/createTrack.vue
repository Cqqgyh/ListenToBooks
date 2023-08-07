<template>
  <gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view class="gui-padding gui-padding-x gui-bg-white">
        <uni-forms label-width="100" ref="formDataRef" :rules="formDataRule" v-model="formData">
          <!--          上传声音-->
          <uni-forms-item label="上传声音" required name="mediaUrl" validate-trigger="bind">
            <cl-upload
              class="gui-flex gui-space-between"
              :class="[mediaFileList.length ?'audio-upload-success': '']"
              v-model="mediaFileList"
              fileType="video"
              :imageFormData="{
                    count:1,
                    sizeType:['original', 'compressed'],
                  }"
              :listStyle="{
                    columns:2,
                  }"
              :add="mediaFileList.length < 1"
              :action="UPLOAD_URL.TRACK"
              @onSuccess="uploadAudioSuccess"></cl-upload>
          </uni-forms-item>
          <!--          标题-->
          <uni-forms-item label="声音标题" required name="trackTitle" validate-trigger="bind">
            <uni-easyinput type="text" v-model="formData.trackTitle"
                           placeholder="请输入专辑名称（必填）" />
          </uni-forms-item>
          <!--          声音封面-->
          <uni-forms-item label="声音封面" name="coverUrl">
            <cl-upload
              class="gui-flex gui-space-between"
              v-model="coverUrlList"
              fileType="image"
              :imageFormData="{
                    count:1,
                    sizeType:['original', 'compressed'],
                  }"
              :listStyle="{
                    columns:2,
                  }"
              :add="coverUrlList.length < 1"
              :action="UPLOAD_URL.IMAGE"
              @onSuccess="uploadImgSuccess"></cl-upload>
          </uni-forms-item>
          <!--          专辑列表选择-->
          <uni-forms-item label="专辑分类" required name="albumId">
            <!--      专辑列表选择 -->
            <uni-data-select
              :disabled="!!props.id"
              v-model="formData.albumId"
              :localdata="albumList"
              clear
            ></uni-data-select>
          </uni-forms-item>

          <!--          专辑简介-->
          <uni-forms-item label="声音简介" name="trackIntro">
            <uni-easyinput
              type="textarea"
              v-model="formData.trackIntro"
              class="gui-textarea gui-bg-gray gui-dark-bg-level-1"
              placeholder="请输入专辑简介" />
          </uni-forms-item>
          <!--          设为私密-->
          <uni-forms-item label="设为私密" required name="isOpen">
            <switch
              @change="secretChangeSwitch"
              :checked="formData.isOpen === 0"
              style="transform:scale(0.8)"
              color="#008AFF" />
          </uni-forms-item>

        </uni-forms>
        <button type="primary" @click="submit">提交</button>
        <view style="height: 60rpx"></view>
      </view>
    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { onReady, onLoad } from "@dcloudio/uni-app"
import {
  AlbumInfoListInterface,
  TrackInfoInterface
} from "../../api/albums/interfaces"
import { albumsService } from "../../api"
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue"
import { emitter } from "../../utils/mitt"
import { UPLOAD_URL } from "../../utils/constant"
const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})
/* 响应式数据 */
// 表单收集
const formDataRef = ref<InstanceType<typeof UniForms>>()
const formData = reactive<TrackInfoInterface>({
  mediaFileId: '', //媒体文件的唯一标识
  mediaUrl: '', //媒体文件的路径
  trackTitle: '', // 声音标题
  coverUrl: '', // 声音封面
  albumId: '', // 专辑id
  trackIntro: '', // 声音简介
  isOpen: 1, // 是否公开：0-否 1-是
  // id: '', // 专辑id
})
// 所有专辑列表
const albumList = ref<(AlbumInfoListInterface & {text?:string,value?:string | number})[]>([]);
// 表单校验
const formDataRule = {
  mediaUrl: {
    rules: [
      {
        required: true,
        errorMessage: "请上传声音"
      }
    ]
  },
  trackTitle: {
    rules: [
      {
        required: true,
        errorMessage: "请填写标题"
      }
    ]
  },
  // coverUrl: {
  //   rules: [
  //     {
  //       required: true,
  //       errorMessage: "请上传封面"
  //     }
  //   ]
  // },
  albumId: {
    rules: [
      {
        required: true,
        errorMessage: "请选择所属专辑"
      }
    ]
  },
}
// 上传图片列表
const coverUrlList = reactive<string[]>([])
// 监视图片列表
watch(coverUrlList, (val: string[]) => {
  console.log('coverUrlList', val)
  formData.coverUrl = val[0]
})

// 上传声音对象信息列表
const mediaFileList = reactive<string[]>([])
// 监视声音列表
watch(mediaFileList, (val: string[]) => {
  formData.mediaUrl = val[0]
})
/* 方法 */



// 获取所有专辑列表
const getAllAlbumList = async () => {
  try {
    const res = await albumsService.getAllAlbumList()
    albumList.value = res.data
    albumList.value.forEach((item) => {
      item.text = item.albumTitle.length > 15 ? item.albumTitle.slice(0, 15) + '...' : item.albumTitle
      item.value = item.id
    })

    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
// 获取声音信息
const getTrackInfo = async (id:number) => {
  try {
    const res = await albumsService.getTrackInfo(id)
    // 遍历res.data数据赋值给formData
    for (const key in res.data) {
      if (Object.prototype.hasOwnProperty.call(res.data, key)) {
        formData[key] = res.data[key]
      }
    }
    res.data.coverUrl && coverUrlList.push(res.data.coverUrl)
    mediaFileList.push(res.data.mediaUrl)
    console.log('mediaFileList.push',mediaFileList)
  } catch (error) {
    console.log(error)
  }
}
// 图片上传成功
const uploadImgSuccess = (res: any) => {
  console.log('uploadImgSuccess',res)
  coverUrlList.push(res.data)
}
// 声音上传成功
const uploadAudioSuccess = (res: any) => {
  // 判断文件类型是否为音频文件
  console.log('uploadAudioSuccess',res.data)
  mediaFileList.push(res.data.mediaUrl)
  formData.mediaFileId = res.data.mediaFileId
}
// 新增专辑
const addAlbum = async () => {
  try {
    const res = await albumsService.addTrackInfo(formData)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
// 修改专辑
const editAlbum = async () => {
  try {
    const res = await albumsService.editTrackInfo(formData)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
// 表单提交
const submit = () => {
  formDataRef.value.validate().then(async (res: object) => {
    console.log('formData', formData)
    formData.id ? await editAlbum() : await addAlbum()
    // 返回上一页
    uni.navigateBack()
    emitter.emit('reloadMyWork')
  }).catch((err:object) => {
    console.log(err)
  })
}

// 私密开关方法
const secretChangeSwitch = (e: any) => {
  formData.isOpen = e.detail.value ? 0 : 1
}



/* 声明周期 */
onReady(() => {
  /*
  * 为了解决uni的表单验证问题
  * 需要注意，如果需要使用 validateFunction 自定义校验规则,则不能采用 uni-forms 的 rules 属性来配置校验规则
  * 这时候需要通过ref，在onReady生命周期调用组件的setRules方法绑定验证规则
  * @doc：https://uniapp.dcloud.net.cn/component/uniui/uni-forms.html#validatefunction-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E
  * */
  formDataRef.value.setRules(formDataRule)
})
onLoad((option: { id:number }) => {
  getAllAlbumList()
  // // 存在Id，根据Id请求专辑信息，页面逻辑进入修改逻辑
  option.id && getTrackInfo(option.id)
})
</script>
<style lang="scss" scoped>
.payment-type-radio {
  display: flex;
  align-items: center;

  .payment-type-radio-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 50rpx;

    .payment-type-radio-label-radio {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.attr-tags-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .click-tags-text {
    display: flex;
    align-items: center;
    width: 100%;
    height: 72rpx;
    color: rgba(0, 0, 0, 0.5) !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 0 20rpx;
    font-size: 24rpx;
  }
}
.audio-upload-success{
  ::v-deep ._video{
    background-color: rgba(0, 0, 0, 0.1);
  }
  ::v-deep .pay image{
    display:none;
  }
  //#ifdef H5
  ::v-deep .pay div{
    display:none;
  }
  //#endif
}
</style>
