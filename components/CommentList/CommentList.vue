<template>
  <view class="content">
    <z-paging ref="zPagingRef" v-model="commentList" @query="getComment" :default-page-size="30"
      show-refresher-update-time auto-show-back-to-top>
      <template #top>
        <view
          class="gui-flex gui-columns gui-justify-content-center gui-align-items-center gui-m-t-30 gui-bg-white"
          style="height: 200rpx;">
          <view class="gui-flex-reply-container">
            <uni-easyinput
              type="textarea"
              trim
              v-model="commentEmptyInfo.replyRelevantInformation.replyContent"
              :placeholder="commentEmptyInfo.replyRelevantInformation.replyPlaceholder">
            </uni-easyinput>
            <text @click.stop="handleReplyComment(commentEmptyInfo as CommentInterface)"
                  class="gui-comments-replay-btn gui-block gui-bg-gray gui-dark-bg-level-2 gui-primary-text">提交
            </text>
          </view>
        </view>
      </template>
      <view>
        <view
          class="gui-comments-items gui-flex gui-row gui-nowrap gui-space-between gui-bg-white gui-dark-bg-level-3"
          v-for="(item, index) in commentList" :key="index">
          <image :src="item.avatarUrl" class="gui-comments-face"></image>
          <view class="gui-comments-body">
            <view class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
              <text class="gui-comments-header-text gui-text gui-primary-color">{{ item.nickname }}</text>
              <text @click="handlePraise(item)" class="gui-comments-header-text gui-icons gui-color-gray gui-text-small"
                :class="[item.isPraise ? 'gui-color-orange' : '']">
                &#xe6ea; {{ item.praiseCount }}
              </text>
            </view>
            <view @click="handleOnClickItemReply(item, item)" class="gui-comments-content gui-block gui-relative padding-r">
              {{ item.content }}
              <uni-icons @click="handleDeleteComment(item,index)" v-if="item.deleteMark === '1'" custom-prefix="iconfont" type="shanchu" class="gui-absolute-rt" size="10"></uni-icons>
            </view>
            <view v-if="item.replyCommentList">
              <view v-for="(itemRe, indexRe) in item.replyCommentList" :key="itemRe.id"
                class="gui-comments-replay gui-block gui-bg-gray gui-dark-bg-level-2">
                <view v-if="!itemRe.parent" @click="handleOnClickItemReply(item, itemRe)" class="gui-relative padding-r">
                  {{ itemRe.nickname }} : {{ itemRe.content }}
                  <uni-icons @click="handleDeleteComment(itemRe,index,indexRe)" v-if="itemRe.deleteMark === '1'" custom-prefix="iconfont" type="shanchu" class="gui-absolute-rt" size="10"></uni-icons>
                </view>
                <view v-else @click.stop="handleOnClickItemReply(item, itemRe.parent)" class="gui-relative padding-r">
                  <text>{{ itemRe.parent?.nickname }}</text>
                  <text class="gui-color-gray gui-text-small" style="margin:0 6rpx">回复</text>
                  <text>{{ itemRe.nickname }}</text>
                  <text>: {{ itemRe.content }}</text>
                  <uni-icons @click="handleDeleteComment(itemRe,index,indexRe)" v-if="itemRe.deleteMark === '1'" custom-prefix="iconfont" type="shanchu" class="gui-absolute-rt" size="10"></uni-icons>
                </view>
              </view>
            </view>
            <view class="gui-comments-info gui-flex gui-rows gui-nowrap gui-align-items-center">
              <view class="gui-flex-reply-container">
                <uni-easyinput trim v-model="item.replyRelevantInformation.replyContent"
                  :placeholder="item.replyRelevantInformation.replyPlaceholder"></uni-easyinput>
                <text @click.stop="handleReplyComment(item)"
                  class="gui-comments-replay-btn gui-block gui-bg-gray gui-dark-bg-level-2 gui-primary-text">回复
                </text>
              </view>
            </view>
            <view class="gui-comments-info-text gui-color-gray">{{ item.createTime }}</view>
          </view>
        </view>

      </view>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CommentInterface } from "../../api/comment/interfaces"
import { commentService } from "../../api"
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"


const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const props = defineProps({
  albumId: {
    type: String,
    required: true
  },
  trackId: {
    type: String,
    required: true
  }
})
// 专辑评论列表
const commentList = ref([] as CommentInterface[])
// 列表评论为空时候的构造回复内容对象
const commentEmptyInfo = ref({
  replyRelevantInformation: {
    replyPlaceholder: "请输入回复内容",
    replyCommentId: '0',
    replyContent: ""
  }
})
/**
 * @description: 获取评论列表
 * @returns {*}
 */
const getComment = async (pageNo: number, pageSize: number) => {
  const params = {
    page: pageNo,
    limit: pageSize,
    albumId: props.albumId,
    trackId: props.trackId
  }
  try { // 获取评论列表
    const res = await commentService.getCommentList(params)
    res.data.records.forEach((item) => {
      item.replyRelevantInformation = {
        replyPlaceholder: "请输入回复内容",
        replyCommentId: "",
        replyContent: ""
      }
    })
    zPagingRef.value.complete(res.data.records)
    console.log(res)
  } catch (error) {
    console.log(error)
    zPagingRef.value.complete(false)
  }

}
// 点赞
const handlePraise = async (item: CommentInterface) => {
  const params = {
    albumId: item.albumId,
    commentId: item.id
  }
  const res = await commentService.praiseComment(params.albumId, params.commentId)
  item.isPraise = !item.isPraise
  if (item.isPraise) {
    item.praiseCount++
  } else {
    item.praiseCount--
  }
  console.log(res)
}
// 点击评论，准备回复评论
const handleOnClickItemReply = (item: CommentInterface, clickItem: CommentInterface) => {
  console.log(item)
  item.replyRelevantInformation.replyCommentId = clickItem.id
  item.replyRelevantInformation.replyPlaceholder = `回复${clickItem.nickname}`
}
// 回复评论
const handleReplyComment = async (item: CommentInterface) => {
  if (!item.replyRelevantInformation.replyContent) {
    uni.showToast({
      title: "请输入回复内容",
      icon: "none",
      duration: 1500
    })
    return
  }
  console.log("item", item)
  const params = {
    albumId: item.albumId || props.albumId,
    trackId: props.trackId,
    commentId: item.replyRelevantInformation.replyCommentId || item.id,
    content: item.replyRelevantInformation.replyContent
  }
  const res = await commentService.addComment(params.albumId,params.trackId, params.commentId, params.content)
  console.log(res)
  item.replyRelevantInformation.replyContent = ""
  item.replyRelevantInformation.replyCommentId = "0"
  item.replyRelevantInformation.replyPlaceholder = "请输入回复内容"
  zPagingRef.value.reload()
}
// 删除评论
const handleDeleteComment = async (item: CommentInterface,index:number,replyIndex:number = -1) => {
  const params = {
    albumId: item.albumId,
    commentId: item.id
  }
  const res = await commentService.deleteComment(params.albumId, params.commentId)
  if (replyIndex === -1){
    commentList.value.splice(index,1)
  }else {
    commentList.value[index].replyCommentList?.splice(replyIndex,1)
  }
}
</script>

<style lang="scss">
.gui-flex-reply-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.padding-r{
  padding-right:20rpx;
}
</style>
