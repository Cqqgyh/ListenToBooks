<template>
  <div id="id_local_video" style="width:100vw;display:flex;align-items:center;justify-content:center;"></div>
</template>

<script setup lang="ts">
// #ifdef H5
import  "./TXLivePusher.js"
// #endif
import { onMounted, ref } from "vue"
import { LiveInterfaceRes } from "../../api/live/interfaces"
import { liveService } from "../../api"
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: ''
  }
})
const liveInfo = ref({} as LiveInterfaceRes)
// 根据ID获取直播间的信息
const getLiveInfo = async () => {
  try {
    const res = await liveService.getLiveInfo(props.id)
    console.log("res", res)
    liveInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}
// #ifdef H5
function initPush(pushUrl:string) {
  console.log('加载完成',TXLivePusher)
  // 这里是成功加载并执行完成后的代码
  TXLivePusher.checkSupport().then(function(data:any) {
    // 是否支持WebRTC
    if (data.isWebRTCSupported) {
      console.log('WebRTC Support');
    } else {
      console.log('WebRTC Not Support');
    }
    // 是否支持H264编码
    if (data.isH264EncodeSupported) {
      console.log('H264 Encode Support');
    } else {
      console.log('H264 Encode Not Support');
    }
  });


  var livePusher = new TXLivePusher();
  livePusher.setRenderView('id_local_video');
  document.getElementById('id_local_video')!.getElementsByTagName('video')![0].muted = true

  // 设置视频质量
  livePusher.setVideoQuality('720p');
  // 设置音频质量
  livePusher.setAudioQuality('standard');
  // 自定义设置帧率
  livePusher.setProperty('setVideoFPS', 25);

  // 打开摄像头
  livePusher.startCamera();
  // 打开麦克风
  livePusher.startMicrophone();

  //livePusher.startPush('pushUrl.value');

  // 采集完摄像头画面后自动推流
  livePusher.startCamera()
    .then(function () {
      livePusher.startPush(pushUrl);
    })
    .catch(function (error:any) {
      console.log('打开摄像头失败: '+ error.toString());
    });


  // 采集完摄像头和麦克风之后自动推流
  Promise.all([livePusher.startCamera(),livePusher.startMicrophone()])
    .then(function() {
      livePusher.startPush(pushUrl);
    });
}
// #endif
onMounted(async () => {
  // #ifdef H5
  await getLiveInfo()
  initPush(liveInfo.value.pushUrl)
  uni.setNavigationBarTitle({
    title: liveInfo.value.liveTitle + '的直播间'
  })
  // #endif
})
</script>

<style scoped>

</style>
