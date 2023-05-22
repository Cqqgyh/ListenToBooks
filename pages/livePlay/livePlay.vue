<template>
  <view class="content">
    <z-paging ref="zPagingRef" v-model="dataList" use-page-scroll use-chat-record-mode ::auto="false">
      <!--      #ifdef H5-->
      <template #top>
        <view id="videoContain">
          <!--          <video id="player-container-id" width="100vw" height="270" preload="auto" playsinline webkit-playsinline>-->
          <!--          </video>-->
        </view>
      </template>
      <!-- #endif -->
      <!-- 聊天item -->
      <!--      #ifdef H5-->
      <view style="height: 320rpx;"></view>
      <!-- #endif -->
      <view :id="`z-paging-${index}`" v-for="(item,index) in dataList" :key="index">
        <chatItem :item="item"></chatItem>
      </view>

      <!-- 底部聊天输入框 -->
      <template #bottom>
        <chatInputBar @send="doSend" />
      </template>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app"
import { onMounted, ref } from "vue"
import dayjs from 'dayjs'
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import ChatInputBar from "../../components/chatInputBar/chatInputBar.vue"
import { ChatItemInterface, LiveInterfaceRes, LiveMessageInterfaceRes } from "../../api/live/interfaces"
import { liveService } from "../../api"
import useUniWebSocket from "../../hooks/useUniWebsocket"
import { useUserStore } from "../../stores/user"
import { ChatMessageType } from "../../utils/constant"
import { WebSocket_BASE_URL } from "../../config/confjg"

const zPagingRef = ref<InstanceType<typeof ZPaging>>()
const userStore = useUserStore()
const props = defineProps({
  id: {
    type: String,
    default: "1"
  }
})
const { socketTask, connect, disconnect,sendMessage } = useUniWebSocket(`${WebSocket_BASE_URL}/${props.id}/${userStore.token}`, onMessageCallBack);
const liveInfo = ref({} as LiveInterfaceRes)
//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
let dataList = ref([] as ChatItemInterface[])
// 接受到服务器消息的回调
function onMessageCallBack(data:LiveMessageInterfaceRes){
  console.log('接受到服务器消息的回调',data)
  let params = {
    time: data.time,
    icon: data.fromUser.avatarUrl,
    name: data.fromUser.nickname,
    content: data.msgContent,
    isMe: data.fromUser.userId === userStore.user.id,
    messageType: data.msgType
  }
  zPagingRef.value.addChatRecordData(params)

}
// 向服务器发送消息
const doSend = (msg: string) => {
  let params = {
    fromUser: {
      avatarUrl: userStore.user.avatarUrl,
      nickname: userStore.user.nickname,
      userId: userStore.user.id
    },
    liveRoomId: props.id,
    msgContent: msg,
    msgType: ChatMessageType.PUBLIC_MSG
  }
  sendMessage(params)
}
// 根据ID获取直播间信息
const getLiveInfo = async () => {
  try {
    const res = await liveService.getLiveInfo(props.id)
    console.log("res", res)
    liveInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}

// cdn 引入
function loadResources() {
  return new Promise(function(resolve: any, reject: any) {
    // 创建 link 元素
    var linkTag = document.createElement("link")
    linkTag.href = "https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.min.css"
    linkTag.rel = "stylesheet"

    // 创建 script 元素
    var scriptTag = document.createElement("script")
    scriptTag.src = "https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.v4.8.0.min.js"

    // 监听 link 标签和 script 标签的 onload 和 onerror 事件
    var loadedCount = 0
    var checkLoaded = function() {
      if (++loadedCount === 2) {
        resolve()
      }
    }
    linkTag.onload = checkLoaded
    linkTag.onerror = reject
    scriptTag.onload = checkLoaded
    scriptTag.onerror = reject

    // 插入 link 元素到 head 标签中
    document.head.appendChild(linkTag)

    // 插入 script 元素到 body 标签底部
    document.body.appendChild(scriptTag)
  })
}


const tcpalyerInit = () => {
  const video = document.createElement("video")
  video.setAttribute("id", "player-container-id")
  // video.style.width = "300px !important"
  // video.style.height = "150px !important"
  // video.setAttribute('playsinline',true)
  // video.setAttribute('webkit-playsinline',true)
  // video.setAttribute('autoplay',true)
  document.getElementById("videoContain")?.appendChild(video)
  var player = TCPlayer("player-container-id", {
    playsinline: true,
    autoplay: true,
    "webkit-playsinline": true,
    width: 300,
    height: 150
  }) // player-container-id 为播放器容器 ID，必须与 html 中一致
  player.src(liveInfo.value.playUrl || "webrtc://txplay.atguigu.cn/live/atguigu05") // url 播放地址

}
/** 生命周期 **/
onMounted(() => {
  // 在资源加载完成后执行一些操作
  // #ifdef H5
  loadResources().then(async () => {
    console.log("All resources are loaded!")
    // 编写您需要的函数，此时所有资源已被加载并准备好使用
    await getLiveInfo()
    tcpalyerInit()
    connect()
    uni.setNavigationBarTitle({
      title: liveInfo.value.liveTitle + '的直播间'
    })
  }).catch(function(error) {
    console.error("Failed to load resources:", error)
  })
  // #endif
  // #ifdef MP-WEIXIN
  getLiveInfo()
  // #endif

})
onPageScroll(async (e: any) => {
  //如果滚动到顶部，触发加载更多聊天记录
  if (e.scrollTop < 10) {
    zPagingRef.value.doChatRecordLoadMore()
  }
})
</script>

<style>
#videoContain {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
}
</style>

