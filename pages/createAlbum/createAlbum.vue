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
                <gui-upload-images
                  @change="changeUploadedImg"
                  @uploaded="uploadedImg"
                  ref="uploadImgRef"
                  uploadServerUrl="http://139.198.163.91:8500/api/album/fileUpload"
                  :maxFileNumber="1"
                ></gui-upload-images>
              </view>
            </view>
            <!--           专辑分类 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑分类</text>
              <!--      分类数据弹出框 -->
              <uni-data-picker
                ref="categoryPopupPickerRef"
                placeholder="请选择分类"
                popup-title="请选择分类"
                :localdata="categoryList"
                v-model="formData.category3Id"
                @change="onchange"
              >
              </uni-data-picker>
            </view>
            <!--           专辑分类 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑分类</text>
              <view class="gui-form-body gui-color-gray" @click="openCategoryPopup">这里应该使用popup选择（必填）</view>
            </view>

            <!--           专辑标签 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑标签</text>
              <view class="gui-form-body">（必填）</view>
            </view>
            <!--           专辑简介 -->
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">专辑简介</text>
              <view class="gui-form-body">
                <gui-editor ref="guieditor"></gui-editor>
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
    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { recursionTree } from "../../utils/utils"
import { ref, reactive } from "vue"
import { AlbumAttributeValueVoListInterface, AlbumInfoInterface } from "./interfaces"
/* 响应式数据 */
const categoryPopup = ref(null) as any
const categoryPopupPickerRef = ref(null) as any
const uploadImgRef = ref(null) as any
// 表单收集
const formData = reactive<AlbumInfoInterface>({
  albumTitle: "",
  category3Id: '2|放松音乐',
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
  coverUrlList: [] as any[]
})
// 付费类型
const payTypeList = ref([
  // 付费类型: 0101-免费、0102-vip免费、0103-付费
  { name: "免费", value: "0101" },
  { name: "VIP免费", value: "0102" },
  { name: "付费", value: "0103" }]
)
// 付费类型
const priceTypeList = ref([
  // 	价格类型： 0201-单集 0202-整专辑
  { name: "单集", value: "0201" },
  { name: "整专辑", value: "0202" }
  ]
)
// 分类数据
const categoryList = reactive([
  {
    categoryChild: [
      {
        categoryChild: [
          {
            categoryName: "催眠音乐",
            categoryId: 1
          },
          {
            categoryName: "放松音乐",
            categoryId: 2
          },
          {
            categoryName: "提神音乐",
            categoryId: 3
          },
          {
            categoryName: "胎教音乐",
            categoryId: 4
          },
          {
            categoryName: "运动音乐",
            categoryId: 5
          },
          {
            categoryName: "休闲音乐",
            categoryId: 6
          }
        ],
        categoryName: "音乐音效",
        categoryId: 1
      },
      {
        categoryChild: [
          {
            categoryName: "助眠引导",
            categoryId: 7
          },
          {
            categoryName: "放松引导",
            categoryId: 8
          },
          {
            categoryName: "专注引导",
            categoryId: 9
          },
          {
            categoryName: "儿童入睡引导",
            categoryId: 10
          },
          {
            categoryName: "其他",
            categoryId: 11
          }
        ],
        categoryName: "课程引导",
        categoryId: 2
      },
      {
        categoryChild: [
          {
            categoryName: "经典音乐推荐",
            categoryId: 12
          },
          {
            categoryName: "热歌盘点",
            categoryId: 13
          },
          {
            categoryName: "歌曲翻唱",
            categoryId: 14
          },
          {
            categoryName: "音乐教学",
            categoryId: 15
          },
          {
            categoryName: "音乐故事",
            categoryId: 16
          },
          {
            categoryName: "其他",
            categoryId: 17
          }
        ],
        categoryName: "主播音乐节目",
        categoryId: 3
      }
    ],
    categoryName: "音乐",
    categoryId: 1
  }
])
recursionTree(categoryList,'text','categoryName','categoryChild')
recursionTree(categoryList,'value','categoryId','categoryChild','text')
recursionTree(categoryList,'children','categoryChild')

/* 方法 */
// 分类弹出
const showCategory = () => {
  console.log('categoryPopupPickerRef', categoryPopupPickerRef)
  categoryPopupPickerRef.value.show()
}
// 表单提交
const submit = () => {
  // 提交前先上传图片
  uploadImgRef.value.upload()
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
// 记录选择图片时的待提交数据
const changeUploadedImg = (e: any) => {
  console.log(e)
  formData.coverUrlList = e
}
// 上传图片
const uploadedImg = (res: any) => {
  console.log(res)
  formData.coverUrl = res[0].url
}
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
