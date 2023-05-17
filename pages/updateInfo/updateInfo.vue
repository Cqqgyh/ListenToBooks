<template>
<gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view class="gui-padding gui-padding-x gui-bg-white">
        <uni-forms label-width="100" ref="formDataRef" :rules="formDataRule" v-model="formData">
          <!--          专辑名称-->
          <uni-forms-item label="昵称" required name="nickname" validate-trigger="bind">
            <uni-easyinput type="text" v-model="formData.nickname"
                           placeholder="请输入昵称（必填）" />
          </uni-forms-item>
          <!--          专辑封面-->
          <uni-forms-item label="头像" required name="avatarUrl">
            <cl-upload
              class="gui-flex gui-space-between"
              v-model="avatarUrlList"
              fileType="image"
              :imageFormData="{
                count:1,
                sizeType:['original', 'compressed'],
              }"
              :listStyle="{
                columns:2,
              }"
              :add="avatarUrlList.length < 1"
              :action="UPLOAD_URL.IMAGE"
              @onSuccess="uploadImgSuccess"></cl-upload>
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit">提交</button>
        <view style="height: 60rpx"></view>
      </view>

    </template>
  </gui-page>
</template>

<script setup lang="ts">
import { onReady, onLoad } from "@dcloudio/uni-app"
import { ref, reactive } from "vue"
import { user } from "../../api"
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue"
import { useUserStore} from "../../stores/user"
import { UPLOAD_URL } from "../../utils/constant"
const userStore = useUserStore()

console.log();

// 表单校验
const formDataRule = {
  nickname: {
    rules: [
      {
        required: true,
        errorMessage: "请填写昵称"
      }
    ]
  },
  avatarUrl: {
    rules: [
      {
        required: true,
        errorMessage: "请上传头像"
      }
    ]
  },

}

const formData = reactive({
  nickname: userStore.user.nickname,
  avatarUrl: userStore.user.avatarUrl
})

// 表单
const formDataRef = ref<InstanceType<typeof UniForms>>()

// 上传图片列表
const avatarUrlList = reactive<string[]>([userStore.user.avatarUrl])

/**
 * @description: 图片上传成功
 * @param {*} res
 * @returns {*}
 */
const uploadImgSuccess = (res: any) => {
  console.log(res)
  avatarUrlList.push(res.data)
  formData.avatarUrl = res.data
}

/**
 * @description: 表单提交
 * @returns {*}
 */
const submit = () => {
  formDataRef.value.validate().then(async (res: object) => {
    console.log('--------', res)
    try {
      const res = await user.updateUserInfo(formData)
      uni.navigateBack({
        success: () => {
          userStore.getUserInfo()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }).catch((err:object) => {})
}

</script>

<style scoped>

</style>
