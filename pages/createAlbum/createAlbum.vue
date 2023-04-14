<template>
  <gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view class="gui-padding">
        <form @submit="submit">

          <view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
            <!--          专辑名称-->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑名称</text>
              <view class="gui-form-body">
                <input type="text" v-model="formData.albumTitle" class="gui-form-input"
                       placeholder="请输入专辑名称（必填）" />
              </view>
            </view>
            <!--          专辑封面-->

            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑封面</text>
              <view class="gui-form-body">
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
                  action="http://139.198.163.91:8500/api/album/fileUpload"
                  @onSuccess="uploadImgSuccess"></cl-upload>
              </view>
            </view>
            <!--           专辑分类 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑分类</text>
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
            </view>
            <!--           专辑标签 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑标签</text>
              <!--      标签数据弹出框 -->
              <view class="gui-form-body" @click="openAttributePopup">这里应该使用popup选择</view>
            </view>
            <!--           专辑简介 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑简介</text>
              <view class="gui-form-body" style="padding:10rpx 0;">
                <textarea
                  v-model="formData.albumRichIntro"
                  style="padding:15rpx;"
                  class="gui-textarea gui-bg-gray gui-dark-bg-level-1"
                  placeholder="请输入专辑简介" />

              </view>
            </view>
            <!--           设为私密 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">设为私密</text>
              <view class="gui-form-body">
                <switch
                  @change="secretChangeSwitch"
                  :checked="formData.isOpen === 0"
                  style="transform:scale(0.8)"
                  color="#008AFF" />
              </view>
            </view>
            <!--           付费类型 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">付费类型</text>
              <view class="gui-form-body">
                <radio-group @change="payTypeRadioChange" class="payment-type-radio">
                  <label class="payment-type-radio-label" v-for="(item, index) in payTypeList" :key="item.value">
                    <view class="payment-type-radio-label-radio" style="transform:scale(0.8)">
                      <radio :value="item.value" :checked="item.value === formData.payType"/>
                    </view>
                    <view class="gui-text-small gui-color-gray">{{ item.name }}</view>
                  </label>
                </radio-group>
            </view>
            </view>
            <!--           付费填写项 -->
            <view v-show="formData.payType !== payTypeList[0].value">
              <!--           价格类型 -->
              <view class="gui-form-item gui-border-b">
                <text class="gui-form-label">价格类型</text>
                <view class="gui-form-body">
                  <radio-group @change="priceTypeRadioChange" class="payment-type-radio">
                    <label class="payment-type-radio-label" v-for="(item, index) in priceTypeList" :key="item.value">
                      <view class="payment-type-radio-label-radio" style="transform:scale(0.8)">
                        <radio :value="item.value" :checked="item.value === formData.priceType" />
                      </view>
                      <view class="gui-text-small gui-color-gray">{{ item.name }}</view>
                    </label>
                  </radio-group>
                </view>
              </view>
              <!--          原价-->
              <view class="gui-form-item gui-border-b">
                <text class="gui-form-label">原价</text>
                <view class="gui-form-body">
                  <input type="digit" v-model="formData.price" class="gui-form-input"
                         placeholder="请输入原价（必填）" />
                </view>
              </view>
              <!--          折扣-->
              <view class="gui-form-item gui-border-b">
                <text class="gui-form-label">折扣</text>
                <view class="gui-form-body">
                  <input type="digit" v-model="formData.discount" class="gui-form-input"
                         placeholder="请输入折扣（必填）" />
                </view>
              </view>
              <!--          会员折扣-->
              <view class="gui-form-item gui-border-b">
                <text class="gui-form-label">会员折扣</text>
                <view class="gui-form-body">
                  <input type="digit" v-model="formData.vipDiscount" class="gui-form-input"
                         placeholder="请输入会员折扣（必填）" />
                </view>
              </view>
            </view>

      </view>
      <view class="gui-margin-top gui-flex gui-row gui-nowrap gui-justify-content-end gui-padding-x">
        <button
          type="default"
          class="gui-button gui-bg-primary gui-noborder"
          style="width: 168rpx"
          formType="submit"
        >
          <text class="gui-color-white gui-button-text">提交</text>
        </button>
      </view>
      <view style="height: 60rpx"></view>
      </form>
      </view>
      <AttributePopup ref="attributePopupRef" :attributeList="attributeList as AttributeListInterface[]"></AttributePopup>

    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { getAllParentArr, recursionTree } from "../../utils/utils"
import { ref, reactive, watch,ComponentPublicInstance } from "vue"
import { onLoad } from '@dcloudio/uni-app'
import {
  AlbumAttributeValueVoListInterface,
  AlbumInfoInterface, AttributeInterface,
  AttributeListInterface,
  CategoryListInterface
} from "./interfaces"
import { courseService } from '../../api'
import AttributePopup from "../../components/AttributePopup/AttributePopup.vue"

/* 响应式数据 */
const attributePopupRef =ref<InstanceType<typeof AttributePopup>>()
const categoryPopupPickerRef = ref<ComponentPublicInstance>()
// 表单收集
const formData = reactive<AlbumInfoInterface>({
  albumTitle: "",
  category3Id: '',
  albumIntro: "",
  coverUrl: "",
  albumRichIntro: "",
  // 付费必填
  payType: "0101",
  priceType: "0201",
  price: '',
  discount: '',
  vipDiscount: '',
  tracksForFree: 0,
  isOpen: 1,
  albumAttributeValueVoList: <AlbumAttributeValueVoListInterface[]>[],
})
// 上传图片列表
const coverUrlList = reactive<string[]>([])
// 监视上传图片列表
watch(coverUrlList, (val:string[],old:string[]) => {
  formData.coverUrl = val[0] || ''
},{immediate:true})
// 监视已经选中的三级分类
watch(() => formData.category3Id, (val:string|number,old:string|number) => {
  // 请求属性列表
  if (val) {
    getAttributeList(val)
  }
},{immediate:true})
// 付费类型
const payTypeList = ref([
  // 付费类型: 0101-免费、0102-vip免费、0103-付费
  { name: "免费", value: "0101" },
  { name: "VIP免费", value: "0102" },
  { name: "付费", value: "0103" }])
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
// 计算选中的三级分类的一级分类是多少

/* 方法 */
// 获取所有分类
const getCategoryList = async () => {
  try {
    const res = await courseService.findAllCategory()
    recursionTree(res.data,'text','categoryName','categoryChild')
    recursionTree(res.data,'value','categoryId','categoryChild')
    recursionTree(res.data,'children','categoryChild')
    categoryList.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// 通过一级分类获取属性列表
const getAttributeList = async (categoryId: string | number) => {
  try {
    // 根据id获取所有父级分类
    const category123List = getAllParentArr(categoryList.value,categoryId,'value','children')
    console.log('category123List[category123List.length - 1].value',category123List[category123List.length - 1].value)
    const res = await courseService.getAttrList(category123List[category123List.length - 1].value)
    res.data.forEach((item:AttributeListInterface,index:number) => {
      item.checkedId = ''
      item.attributeValueList.forEach((item2:AttributeInterface,index2) => {
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
// 表单提交
const submit = () => {
  console.log("submit")
}
// 私密开关方法
const secretChangeSwitch = (e: any) => {
  formData.isOpen = e.detail.value ? 0 : 1
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
  attributePopupRef.value.openPopup();
};

const closeAttributePopup = () => {
  attributePopupRef.value.closePopup();
};
/* 声明周期 */
onLoad(() => {
  getCategoryList()
})
</script>
<style lang="scss" scoped>
.payment-type-radio{
    display:flex;
    align-items: center;
    .payment-type-radio-label{
        display:flex;
        flex-direction: column;
        align-items:center;
      margin-right: 50rpx;
      .payment-type-radio-label-radio{
        display:flex;
        justify-content:center;
        align-items:center;
      }
    }
}

</style>
