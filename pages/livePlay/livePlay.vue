<template>
  <view class="content">
    <z-paging ref="zPagingRef" v-model="dataList" use-page-scroll use-chat-record-mode @query="queryList">
      <template #top>
        <view id="videoContain">
          <!--          <video id="player-container-id" width="100vw" height="270" preload="auto" playsinline webkit-playsinline>-->
          <!--          </video>-->
        </view>
      </template>
      <!-- 聊天item -->
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
import ZPaging from "../../uni_modules/z-paging/components/z-paging/z-paging.vue"
import ChatInputBar from "../../components/chatInputBar/chatInputBar.vue"
import { LiveInterfaceRes } from "../../api/live/interfaces"
import { liveService } from "../../api"
const zPagingRef = ref<InstanceType<typeof ZPaging>>()

const props = defineProps({
  id: {
    type: String,
    default: "1",
  },
})
const liveInfo = ref({} as LiveInterfaceRes)
//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
let dataList = ref([
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "话剧《简·爱》经典再启 朱杰濮存昕携手演绎",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "年初北京冬奥会，中国男冰首次参赛，虽没能拿到一场胜利，但小伙子们打出了可贵的精神。两周前，以征战冬奥会为班底的中国男冰在意大利集结，备战世锦赛乙级A组比赛。今年的乙级A组比赛在克罗地亚萨格勒布进行，与中国男冰同组的有以色列、荷兰、克罗地亚和西班牙队。从乙级A组这几支队伍水平来看，世界排名第27位的中国队实力占优。前两轮比赛，中国队先是14比1大胜以色列队，随后5比1战胜同组实力最强的荷兰队。连胜两场后，叶劲光、郑恩来、福帅等中国队员均表示，要再接再厉提前完成升组任务。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "德国化工巨头巴斯夫官网4月29日消息，2022年一季度，公司实现销售额230.83亿欧元（折合人民币1602.58亿元，下同），同比增长19%；不计特殊项目的息税前收益达28.18亿欧元（195.65亿元），同比增长21.4%；净收益12.21亿欧元（84.77亿元），同比下滑28.9%。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "北京时间2022年4月30日11时30分，我国在东海海域使用长征十一号海射遥三火箭发射吉林一号高分03D（04~07）/04A卫星，卫星顺利进入预定轨道，发射任务获得圆满成功。该卫星主要为国土资源普查、城市规划、灾害监测等行业领域提供商业遥感服务。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "德国化工巨头巴斯夫官网4月29日消息，2022年一季度，公司实现销售额230.83亿欧元（折合人民币1602.58亿元，下同），同比增长19%；不计特殊项目的息税前收益达28.18亿欧元（195.65亿元），同比增长21.4%；净收益12.21亿欧元（84.77亿元），同比下滑28.9%。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "人民日报写在“五一”国际劳动节：团结奋斗，在新征程上创造新的历史伟业",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "差不多3个小时的等待后，终于等来了警察。一辆警车，闪着警灯，在前头开道。高音喇叭响着，“大车司机不许下车，跟我走。”4月19日，烟台港。43岁的卡车司机张广忠和他的卡车，都要在这坐轮渡去大连。见到穿防护服的工作人员，他立马戴上口罩，抓起购票时给的封条，跳下驾驶室。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "差不多3个小时的等待后，终于等来了警察。一辆警车，闪着警灯，在前头开道。高音喇叭响着，“大车司机不许下车，跟我走。”4月19日，烟台港。43岁的卡车司机张广忠和他的卡车，都要在这坐轮渡去大连。见到穿防护服的工作人员，他立马戴上口罩，抓起购票时给的封条，跳下驾驶室。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "神舟十三凯旋归来，神舟十四号正在进行紧锣密鼓地组装和测试。",
    "isMe": false
  },
  {
    "name": "哆啦A梦",
    "icon": "/static/duola.jpg",
    "content": "年初北京冬奥会，中国男冰首次参赛，虽没能拿到一场胜利，但小伙子们打出了可贵的精神。两周前，以征战冬奥会为班底的中国男冰在意大利集结，备战世锦赛乙级A组比赛。今年的乙级A组比赛在克罗地亚萨格勒布进行，与中国男冰同组的有以色列、荷兰、克罗地亚和西班牙队。从乙级A组这几支队伍水平来看，世界排名第27位的中国队实力占优。前两轮比赛，中国队先是14比1大胜以色列队，随后5比1战胜同组实力最强的荷兰队。连胜两场后，叶劲光、郑恩来、福帅等中国队员均表示，要再接再厉提前完成升组任务。",
    "isMe": false
  }
] as any)

const queryList = (pageNo: number, pageSize: number) => {
  //组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
  //这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  //模拟请求服务器获取分页数据，请替换成自己的网络请求
  const params = {
    pageNo: pageNo,
    pageSize: pageSize
  }
  zPagingRef.value.complete([
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "话剧《简·爱》经典再启 朱杰濮存昕携手演绎",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "年初北京冬奥会，中国男冰首次参赛，虽没能拿到一场胜利，但小伙子们打出了可贵的精神。两周前，以征战冬奥会为班底的中国男冰在意大利集结，备战世锦赛乙级A组比赛。今年的乙级A组比赛在克罗地亚萨格勒布进行，与中国男冰同组的有以色列、荷兰、克罗地亚和西班牙队。从乙级A组这几支队伍水平来看，世界排名第27位的中国队实力占优。前两轮比赛，中国队先是14比1大胜以色列队，随后5比1战胜同组实力最强的荷兰队。连胜两场后，叶劲光、郑恩来、福帅等中国队员均表示，要再接再厉提前完成升组任务。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "德国化工巨头巴斯夫官网4月29日消息，2022年一季度，公司实现销售额230.83亿欧元（折合人民币1602.58亿元，下同），同比增长19%；不计特殊项目的息税前收益达28.18亿欧元（195.65亿元），同比增长21.4%；净收益12.21亿欧元（84.77亿元），同比下滑28.9%。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "北京时间2022年4月30日11时30分，我国在东海海域使用长征十一号海射遥三火箭发射吉林一号高分03D（04~07）/04A卫星，卫星顺利进入预定轨道，发射任务获得圆满成功。该卫星主要为国土资源普查、城市规划、灾害监测等行业领域提供商业遥感服务。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "德国化工巨头巴斯夫官网4月29日消息，2022年一季度，公司实现销售额230.83亿欧元（折合人民币1602.58亿元，下同），同比增长19%；不计特殊项目的息税前收益达28.18亿欧元（195.65亿元），同比增长21.4%；净收益12.21亿欧元（84.77亿元），同比下滑28.9%。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "人民日报写在“五一”国际劳动节：团结奋斗，在新征程上创造新的历史伟业",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "差不多3个小时的等待后，终于等来了警察。一辆警车，闪着警灯，在前头开道。高音喇叭响着，“大车司机不许下车，跟我走。”4月19日，烟台港。43岁的卡车司机张广忠和他的卡车，都要在这坐轮渡去大连。见到穿防护服的工作人员，他立马戴上口罩，抓起购票时给的封条，跳下驾驶室。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "差不多3个小时的等待后，终于等来了警察。一辆警车，闪着警灯，在前头开道。高音喇叭响着，“大车司机不许下车，跟我走。”4月19日，烟台港。43岁的卡车司机张广忠和他的卡车，都要在这坐轮渡去大连。见到穿防护服的工作人员，他立马戴上口罩，抓起购票时给的封条，跳下驾驶室。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "神舟十三凯旋归来，神舟十四号正在进行紧锣密鼓地组装和测试。",
      "isMe": false
    },
    {
      "name": "哆啦A梦",
      "icon": "/static/duola.jpg",
      "content": "年初北京冬奥会，中国男冰首次参赛，虽没能拿到一场胜利，但小伙子们打出了可贵的精神。两周前，以征战冬奥会为班底的中国男冰在意大利集结，备战世锦赛乙级A组比赛。今年的乙级A组比赛在克罗地亚萨格勒布进行，与中国男冰同组的有以色列、荷兰、克罗地亚和西班牙队。从乙级A组这几支队伍水平来看，世界排名第27位的中国队实力占优。前两轮比赛，中国队先是14比1大胜以色列队，随后5比1战胜同组实力最强的荷兰队。连胜两场后，叶劲光、郑恩来、福帅等中国队员均表示，要再接再厉提前完成升组任务。",
      "isMe": false
    }
  ])
  // this.$request.queryChatList(params).then(res => {
  //   //将请求的结果数组传递给z-paging
  //   console.log(res.data.list)
  //   zPagingRef.value.complete(res.data.list);
  // }).catch(res => {
  //   //如果请求失败写this.$refs.paging.complete(false);
  //   //注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
  //   //在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
  //   zPagingRef.value.complete(false);
  // })
}

const doSend = (msg: string) => {
  uni.showLoading({
    title: "发送中..."
  })
  setTimeout(() => {
    uni.hideLoading()
    zPagingRef.value.addChatRecordData({
      time: "",
      icon: "/static/daxiong.jpg",
      name: "大雄",
      content: msg,
      isMe: true
    })
  }, 500)
}
// 根据ID获取直播间信息
const getLiveInfo = async () => {
  try {
    const res = await liveService.getLiveInfo(props.id)
    console.log('res', res)
    liveInfo.value = res.data
  } catch (error) {
    console.log(error)
  }
}

// cdn 引入
function loadResources() {
  return new Promise(function(resolve:any, reject:any) {
    // 创建 link 元素
    var linkTag = document.createElement('link');
    linkTag.href = 'https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.min.css';
    linkTag.rel = 'stylesheet';

    // 创建 script 元素
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.v4.8.0.min.js';

    // 监听 link 标签和 script 标签的 onload 和 onerror 事件
    var loadedCount = 0;
    var checkLoaded = function () {
      if (++loadedCount === 2) {
        resolve();
      }
    };
    linkTag.onload = checkLoaded;
    linkTag.onerror = reject;
    scriptTag.onload = checkLoaded;
    scriptTag.onerror = reject;

    // 插入 link 元素到 head 标签中
    document.head.appendChild(linkTag);

    // 插入 script 元素到 body 标签底部
    document.body.appendChild(scriptTag);
  });
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
    height: 150,
  }) // player-container-id 为播放器容器 ID，必须与 html 中一致
  player.src(liveInfo.value.playUrl || "webrtc://txplay.atguigu.cn/live/atguigu05") // url 播放地址

}
/** 生命周期 **/
onMounted(() => {
  // 在资源加载完成后执行一些操作
  loadResources().then(async ()=> {
    console.log('All resources are loaded!');
    // 编写您需要的函数，此时所有资源已被加载并准备好使用
   await getLiveInfo()
    tcpalyerInit()
  }).catch(function(error) {
    console.error('Failed to load resources:', error);
  });

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
    //overflow: hidden;
}
</style>

