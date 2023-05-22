<template>
  <gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view class="gui-padding gui-padding-x gui-bg-white">
        <uni-forms label-width="100" ref="formDataRef" :rules="formDataRule" v-model="formData">
          <!--          标题-->
          <uni-forms-item label="标题" required name="liveTitle" validate-trigger="bind">
            <uni-easyinput type="text" v-model="formData.liveTitle"
                           placeholder="请输入专辑名称（必填）" />
          </uni-forms-item>
          <!--          封面-->
          <uni-forms-item label="封面" required name="coverUrl">
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
          <!--          标签-->
          <uni-forms-item label="标签" required name="tagId">
            <uni-data-select
              v-model="formData.tagId"
              :localdata="liveTagList"
            ></uni-data-select>
          </uni-forms-item>
          <!--          过期时间-->
          <uni-forms-item label="过期时间" required name="expireTime">
            <!--      分类数据弹出框 -->
            <uni-datetime-picker v-model="formData.expireTime" type="datetime" placeholder="请选择过期时间" />
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
import { liveService } from "../../api"
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue"
import { UPLOAD_URL } from "../../utils/constant"
import { CreateLiveInterfaceRes, LiveTagInterfaceRes } from "../../api/live/interfaces"

/* 响应式数据 */
// 表单收集
const formDataRef = ref<InstanceType<typeof UniForms>>()
const formData = reactive<CreateLiveInterfaceRes>({
  liveTitle: "",
  coverUrl: "",
  tagId: "",
  expireTime: "",
  longitude: "104.07275",
  latitude: "30.57899",
  location: "北京市立水桥"
})
const liveTagList = ref([] as LiveTagInterfaceRes[])
// 表单校验
const formDataRule = {
  liveTitle: {
    rules: [
      {
        required: true,
        errorMessage: "请填写标题"
      }
    ]
  },
  coverUrl: {
    rules: [
      {
        required: true,
        errorMessage: "请上传封面"
      }
    ]
  },
  tagId: {
    rules: [
      {
        required: true,
        errorMessage: "请选择标签"
      }
    ]
  },
  expireTime: {
    rules: [
      {
        required: true,
        errorMessage: "请选择国企时间"
      }
    ]
  }
}
// 上传图片列表
const coverUrlList = reactive<string[]>([])
// 监视图片列表
watch(coverUrlList, (val: string[]) => {
  console.log("coverUrlList", val)
  formData.coverUrl = val[0]
})
/* 方法 */
// 获取直播标签列表
const getLiveTagList = async () => {
  try {
    const res = await liveService.getLiveTagList()
    res.data.forEach((item: LiveTagInterfaceRes) => {
      item.text = item.name
      item.value = item.id
    })
    liveTagList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 图片上传成功
const uploadImgSuccess = (res: any) => {
  console.log(res)
  coverUrlList.push(res.data)
}
// 创建直播间
const createLiveRoom = async () => {
  try {
    const res = await liveService.createLiveRoom(formData)
    console.log(res)
    return res.data
  } catch (error) {
    console.log("error", error)
  }
}
// 表单提交
const submit = () => {
  formDataRef.value.validate().then(async (res: object) => {
    console.log(res)
    const result = await createLiveRoom()
    console.log("result", result)
    if (result?.id) {
      // 去往直播间
      uni.navigateTo({
        url: `/pages/livePush/livePush?id=${result?.id}`
      })
    }

  }).catch((error: object) => {
    console.log("error", error)
  })
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
onLoad(async () => {
  await getLiveTagList()
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
    margin-right: 50 rpx;

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
    height: 72 rpx;
    color: rgba(0, 0, 0, 0.5) !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10 rpx;
    padding: 0 20 rpx;
    font-size: 24 rpx;
  }
}
</style>
