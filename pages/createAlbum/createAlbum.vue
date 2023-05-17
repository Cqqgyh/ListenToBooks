<template>
  <gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view class="gui-padding gui-padding-x gui-bg-white">
        <uni-forms label-width="100" ref="formDataRef" :rules="formDataRule" v-model="formData">
          <!--          专辑名称-->
          <uni-forms-item label="专辑名称" required name="albumTitle" validate-trigger="bind">
            <uni-easyinput type="text" v-model="formData.albumTitle"
                           placeholder="请输入专辑名称（必填）" />
          </uni-forms-item>
          <!--          专辑封面-->
          <uni-forms-item label="专辑封面" required name="coverUrl">
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
          <!--          专辑分类-->
          <uni-forms-item label="专辑分类" required name="category3Id">
            <!--      分类数据弹出框 -->
            <uni-data-picker
              ref="categoryPopupPickerRef"
              class="gui-flex1"
              placeholder="请选择分类"
              popup-title="请选择分类"
              :localdata="categoryList"
              v-model="formData.category3Id"
            >
            </uni-data-picker>
          </uni-forms-item>
          <!--          专辑标签-->
          <uni-forms-item v-if="attributeList.length" label="专辑标签" required name="albumAttributeValueVoList">
            <!--      标签数据弹出框 -->
            <view class="gui-color-grey2 attr-tags-container" @click="openAttributePopup">
              <view v-if="!selectedAttributeList.length" class="click-tags-text">
                <text>点击选择标签</text>
              </view>
              <view v-else class="gui-flex gui-wrap gui-m-t-5 gui-m-b-5">
                <uni-tag
                  class="gui-m-r-10 gui-m-t-10 gui-m-b-10"
                  type="primary"
                  v-for="(item,index) in formData.albumAttributeValueVoList"
                  :key="item.valueId"
                  :text="item.valueName">
                </uni-tag>
              </view>
            </view>
          </uni-forms-item>
          <!--          专辑简介-->
          <uni-forms-item label="专辑简介" required name="albumIntro">
            <uni-easyinput
              type="textarea"
              v-model="formData.albumIntro"
              class="gui-textarea gui-bg-gray gui-dark-bg-level-1"
              placeholder="请输入专辑简介" />
          </uni-forms-item>
          <!--          设为私密-->
          <uni-forms-item label="设为私密" required name="isOpen">
            <switch
              @change="secretChangeSwitch"
              :checked="formData.isOpen === '0'"
              style="transform:scale(0.8)"
              color="#008AFF" />
          </uni-forms-item>
          <!--          设为私密-->
          <uni-forms-item label="付费类型" required name="albumIntro">
            <radio-group @change="payTypeRadioChange" class="payment-type-radio">
              <label class="payment-type-radio-label" v-for="(item, index) in payTypeList" :key="item.value">
                <view class="payment-type-radio-label-radio" style="transform:scale(0.8)">
                  <radio :value="item.value" :checked="item.value === formData.payType" />
                </view>
                <view class="gui-text-small gui-color-gray">{{ item.name }}</view>
              </label>
            </radio-group>
          </uni-forms-item>
          <!--           付费填写项 -->
          <view v-show="formData.payType !== payTypeList[0].value">
            <uni-forms
              ref="payTypeFormDataRef"
              :rules="payTypeFormDataRule"
              v-model="formData"
              label-width="100">
              <!--           价格类型 -->
              <uni-forms-item label="价格类型" required name="priceType">
                <radio-group @change="priceTypeRadioChange" class="payment-type-radio">
                  <label class="payment-type-radio-label" v-for="(item, index) in priceTypeList" :key="item.value">
                    <view class="payment-type-radio-label-radio" style="transform:scale(0.8)">
                      <radio :value="item.value" :checked="item.value === formData.priceType" />
                    </view>
                    <view class="gui-text-small gui-color-gray">{{ item.name }}</view>
                  </label>
                </radio-group>
              </uni-forms-item>
              <!--          原价-->
              <uni-forms-item label="专辑原价" required name="price">
                <uni-easyinput type="digit" trim v-model="formData.price"
                               placeholder="请输入原价（必填）" />
              </uni-forms-item>
              <!--          折扣-->
              <uni-forms-item label="专辑折扣" required name="discount">
                <uni-easyinput type="digit" trim v-model="formData.discount"
                               placeholder="取值:0.1至9.9, -1:不打折(必填)" />
              </uni-forms-item>
              <!--          优惠价-->
              <uni-forms-item label="会员折扣" required name="vipDiscount">
                <uni-easyinput type="digit" trim v-model="formData.vipDiscount"
                               placeholder="取值:0.1至9.9, -1:不打折(必填)" />
              </uni-forms-item>

            </uni-forms>

          </view>
        </uni-forms>
        <button type="primary" @click="submit">提交</button>
        <view style="height: 60rpx"></view>
      </view>
      <AttributePopup ref="attributePopupRef" :attributeList="attributeList"></AttributePopup>

    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { getAllParentArr, recursionTree } from "../../utils/utils"
import { ComponentPublicInstance, computed, reactive, ref, watch } from "vue"
import { onReady, onLoad } from "@dcloudio/uni-app"
import {
  AlbumAttributeValueVoListInterface,
  AlbumInfoInterface,
  AttributeInterface,
  AttributeListInterface,
  CategoryListInterface
} from "../../api/albums/interfaces"
import { courseService } from "../../api"
import { albumsService } from "../../api"
import AttributePopup from "../../components/AttributePopup/AttributePopup.vue"
import UniForms from "../../uni_modules/uni-forms/components/uni-forms/uni-forms.vue"
import { emitter } from "../../utils/mitt"
import { PAY_TYPE, UPLOAD_URL } from "../../utils/constant"

/* 响应式数据 */
const attributePopupRef = ref<InstanceType<typeof AttributePopup>>()
const categoryPopupPickerRef = ref<ComponentPublicInstance>()
// 表单收集
const formDataRef = ref<InstanceType<typeof UniForms>>()
const payTypeFormDataRef = ref<InstanceType<typeof UniForms>>()
const formData = reactive<AlbumInfoInterface>({
  albumTitle: "",
  category3Id: "",
  albumIntro: "",
  coverUrl: "",
  // 付费必填
  payType: "0101",
  priceType: "0201",
  price: "",
  discount: "",
  vipDiscount: "",
  isOpen: '1',
  albumAttributeValueVoList: <AlbumAttributeValueVoListInterface[]>[]
})
// 表单校验
const formDataRule = {
  albumTitle: {
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
  category3Id: {
    rules: [{
      required: true,
      errorMessage: "请选择专辑分类"
    }]
  },
  albumIntro: {
    rules: [
      {
        required: true,
        errorMessage: "请填写专辑简介"
      }
    ]
  },
  albumAttributeValueVoList: {
    rules: [
      {
        required: true,
        errorMessage: "请填写专辑简介"
      },{
        validateFunction:function(rule:object,value:[],data:object,callback:(err:string)=>void){
          if (attributeList.value.length !== selectedAttributeList.value.length) {
            callback('请将每个属性下标签都进行选择')
          }
          return true
        }
      }
    ]
  },

}
// 付费类型表单校验
const payTypeFormDataRule = {
  price: {
    rules: [
      {
        required: true,
        errorMessage: "请填写专辑原价"
      }
    ]
  },
  discount: {
    rules: [
      {
        required: true,
        errorMessage: "请填写专辑折扣"
      }
    ]
  },
  vipDiscount: {
    rules: [
      {
        required: true,
        errorMessage: "请填写会员折扣"
      }
    ]
  }
}
// 上传图片列表
const coverUrlList = reactive<string[]>([])
// 监视图片列表
watch(coverUrlList, (val: string[]) => {
  console.log('coverUrlList', val)
  formData.coverUrl = val[0]
})
// 监视已经选中的三级分类
watch(() => formData.category3Id, (val: string | number) => {
  // 请求属性列表
  if (val) {
    getAttributeList(val)
  }
}, { immediate: true })
// 计算formdata中已选中的属性列表
const selectedAttributeList = computed(() => {
  return formData.albumAttributeValueVoList.filter(item => item.valueId !== -1)
})
// 付费类型
// const payTypeList = ref([
//   { name: "免费", value: "0101" },
//   { name: "VIP免费", value: "0102" },
//   { name: "付费", value: "0103" }])
// 付费类型: 0101-免费、0102-vip免费、0103-付费
const payTypeList = ref(PAY_TYPE)
// 付费类型
const priceTypeList = ref([
  // 	价格类型： 0201-单集 0202-整专辑
  { name: "单集", value: "0201" },
  { name: "整专辑", value: "0202" }
])
// 分类数据
const categoryList = ref<CategoryListInterface[]>([])
// 分类属性数据
const attributeList = ref<AttributeListInterface[]>([])
// 监视选中属性
watch(attributeList, (val: AttributeListInterface[]) => {
  formData.albumAttributeValueVoList = val.map(item => {
    return {
      attributeId: item.id,
      valueId: item.attributeValueList.find(item2 => item2.id === item.checkedId)?.id || -1,
      valueName: item.attributeValueList.find(item2 => item2.id === item.checkedId)?.valueName || ""
    }
  })
}, { deep: true })

/* 方法 */
// 获取所有分类
const getCategoryList = async () => {
  try {
    const res = await courseService.findAllCategory()
    recursionTree(res.data, "text", "categoryName", "categoryChild")
    recursionTree(res.data, "value", "categoryId", "categoryChild")
    recursionTree(res.data, "children", "categoryChild")
    categoryList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 通过一级分类获取属性列表
const getAttributeList = async (categoryId: string | number) => {
  try {
    // 根据id获取所有父级分类
    const categoryAllParentsList = getAllParentArr(categoryList.value, categoryId, "value", "children")
    console.log('categoryAllParentsList',categoryAllParentsList)
    const res = await courseService.getAttrList(categoryAllParentsList[categoryAllParentsList.length - 1].value)
    res.data.forEach((item: AttributeListInterface, index: number) => {
      // 如果formData中已经有albumAttributeValueList
      if (formData.albumAttributeValueVoList?.length){
        // 如果formData中的albumAttributeValueList中有当前属性
        if (formData.albumAttributeValueVoList.find(item2 => item2.attributeId === item.id)){
          // 选中当前属性
          item.checkedId = formData.albumAttributeValueVoList.find(item2 => item2.attributeId === item.id)?.valueId || -1
        }else{
            // 没有选中当前属性
          item.checkedId = -1
        }
      } else {
        formData.albumAttributeValueVoList = []
        item.checkedId = -1
      }

      item.attributeValueList.forEach((item2: AttributeInterface, index2) => {
        item2.value = item2.id
        item2.text = item2.valueName
      })
    })
    attributeList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 图片上传成功
const uploadImgSuccess = (res: any) => {
  console.log(res)
  coverUrlList.push(res.data)
}
// 新增专辑
const addAlbum = async () => {
  try {
    const res = await albumsService.addAlbum(formData)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
// 修改专辑
const editAlbum = async () => {
  try {
    const res = await albumsService.editAlbum(formData)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
// 表单提交
const submit = () => {
  formDataRef.value.validate().then(async (res: object) => {
    console.log('--------', res)
    // 免费通过字段校验 判断需不需要付费字段校验
    if (formData.payType != "0101") {
      payTypeFormDataRef.value.validate().then(async (res: object) => {
        // 付费字段校验通过
        formData.id ? await editAlbum() : await addAlbum()
        // 返回上一页
        uni.navigateBack()
        emitter.emit('reloadMyWork')
      }).catch((err: object) => {

      })
    } else {
      // 免费通过字段校验
      formData.id ? await editAlbum() : await addAlbum()
      uni.navigateTo({
        url: "/pages/myWork/myWork"
      })
    }
  }).catch((err:object) => {

  })
}
// 获取专辑信息
const getAlbumDataInfo = async (albumId:number = 2) => {
  try {
    const res = await albumsService.getAlbumInfo(albumId)
    console.log(res)
    // 付费类型默认值
    res.data.payType || (res.data.payType = "0101")
    res.data.priceType || (res.data.priceType = "0201")
    // 遍历res.data数据赋值给formData
    for (const key in res.data) {
      if (Object.prototype.hasOwnProperty.call(res.data, key)) {
        formData[key] = res.data[key]
      }
    }
    coverUrlList.push(res.data.coverUrl)
    // 获取分类属性
  } catch (error) {
    console.log(error)
  }
}
// 私密开关方法
const secretChangeSwitch = (e: any) => {
  formData.isOpen = e.detail.value ? '0' : '1'
}
// 付费类型选择
const payTypeRadioChange = (e: any) => {
  formData.payType = e.detail.value
}
// 价格类型选择
const priceTypeRadioChange = (e: any) => {
  formData.priceType = e.detail.value
}
const openAttributePopup = () => {
  attributePopupRef.value.openPopup()
}

const closeAttributePopup = () => {
  attributePopupRef.value.closePopup()
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
  payTypeFormDataRef.value.setRules(payTypeFormDataRule)
})
onLoad(async (option: { id:number }) => {
  await getCategoryList()
  // 存在Id，根据Id请求专辑信息，页面逻辑进入修改逻辑
  option.id && await getAlbumDataInfo(option.id)
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
</style>
