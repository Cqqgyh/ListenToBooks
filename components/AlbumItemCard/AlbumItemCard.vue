<template>
  <uni-card>
    <view class="gui-margin-top">
      <view class="gui-card-body gui-border-b gui-flex gui-rows gui-nowrap">
        <image
          mode="aspectFill"
          :src="data.coverUrl"
          class="gui-card-img"></image>
        <view class="gui-card-desc">
          <view class="gui-flex gui-rows gui-nowrap gui-align-items-center">
            <text
              class="gui-card-name gui-primary-text gui-ellipsis">{{ data.albumTitle }}
            </text>
          </view>
          <view class="gui-flex gui-rows gui-nowrap gui-align-items-center gui-m-t-30">
            <view class="gui-m-r-20">
              <uni-icons custom-prefix="iconfont" type="shengyin_o" class="gui-m-r-10"></uni-icons>
              <text>{{ data.includeTrackCount}}</text>
            </view>
            <view class="gui-m-r-20">
              <uni-icons custom-prefix="iconfont" type="erji" class="gui-m-r-10"></uni-icons>
              <text>{{ data.playStatNum}}</text>
            </view>
            <view class="gui-m-r-20">
              <uni-icons custom-prefix="iconfont" type="gouwuche3" class="gui-m-r-10"></uni-icons>
              <text>{{ data.buyStatNum}}</text>
            </view>
            <view class="gui-m-r-20">
              <uni-icons custom-prefix="iconfont" type="pinglun" class="gui-m-r-10"></uni-icons>
              <text>{{ data.commentStatNum}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="gui-card-footer gui-flex gui-rows gui-nowrap gui-space-between gui-align-items-center">
        <text
          @click="shareHandler()"
          class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe615; 分享
        </text>
        <text
          @click="() => goToDetailsHandler(data.albumId)"
          class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe614;详情
        </text>
        <text
          @click="() => editItemHandler(data.albumId)"
          class="gui-icons gui-color-gray gui-card-footer-item gui-border-r">&#xe69e; 编辑
        </text>
        <text
          @click="deletePopUpRef.open()"
          class="gui-icons gui-color-gray gui-card-footer-item">&#xe794; 删除
        </text>
      </view>
    </view>
  </uni-card>
<!--  分享弹窗-->
  <uni-popup ref="shareRef" type="share" safeArea backgroundColor="#fff">
    <uni-popup-share></uni-popup-share>
  </uni-popup>
<!--  删除弹窗-->
  <!-- 提示窗示例 -->
  <uni-popup ref="deletePopUpRef" type="dialog">
    <uni-popup-dialog
      type="error"
      cancelText="取消"
      confirmText="确认"
      title="注意"
      content="你确定要删除吗？"
      @confirm="() => deleteAlbumInfo(data.albumId)"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script setup lang="ts">
import { PropType, ref } from "vue"
import { AlbumInfoInterface } from "../../api/albums/interfaces"
import { albumsService } from "../../api"
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue"
/* 响应式数据 */
const shareRef = ref<InstanceType<typeof UniPopup>>(null)
const deletePopUpRef = ref<InstanceType<typeof UniPopup>>(null)
const props = defineProps({
  data: {
    type: Object as PropType<AlbumInfoInterface>,
    required: true,
    default: () => {}
  },
  editItemHandler: {
    type: Function,
    required: true,
    default: () => {}
  },
  deleteItemHandler: {
    type: Function,
    required: true,
    default: () => {}
  }
})
// 分类导航

/* 方法 */
// 删除专辑信息请求
const deleteAlbumInfo = async (id: number) => {
  try {
    const res = await albumsService.deleteAlbumInfo(id)
    console.log(res)
    // 删除成功 通知父组件父组件在数据列表中删除此项
    props.deleteItemHandler(id)
  } catch (error) {
    console.log(error)
  }
}
// 去往详情页
const goToDetailsHandler = (id: number) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${id}`,
  })
}
// 分享
const shareHandler = () => {
  shareRef.value.open()
}
/* 声明周期 */
</script>

<style lang="scss">
/* 卡片视图 */
.gui-card-body{
  padding-bottom:10rpx;
}
.gui-card-img{
  width:120rpx;
  height:120rpx;
  border-radius:80rpx;
}
.gui-card-desc{
  width:400rpx;
   margin-left:25rpx;
    flex:1;
  }
.gui-card-name{
  font-size:28rpx;
  line-height:40rpx;
   margin-right:20rpx;
  }
.gui-card-text{
  line-height:40rpx;
   font-size:24rpx;
  }
.gui-card-footer{
  margin-top:20rpx;
}
.gui-card-footer-item{
  width:100rpx;
  text-align:center;
   flex:1;
    line-height:38rpx;
     font-size:26rpx;
    }

</style>
