import { ref, onMounted, onUnmounted } from 'vue';
import { LiveMessageInterfaceRes } from "../api/live/interfaces"
import { ChatMessageType } from "../utils/constant"
import { getCurrentPageInfo } from "../utils/utils"
// ws://139.198.163.91:8507/api/websocket/{liveRoomId}/{token}
export default function useUniWebSocket(url:string, onMessage:(res:any)=>void,heartbeatInterval = 3000,) {
  const socketTask = ref(null as any);
  const isDisconnect = ref(false);

  const connect = () => {
    if (!socketTask.value || isDisconnect.value) {
      isDisconnect.value = false;
      console.log('WebSocket连接中...',url)
      console.log('socketTask',socketTask)
      socketTask.value = uni.connectSocket({
        url: url,
        complete: () => {
          console.log('WebSocket连接已建立');
          startHeartbeat();
        },
      });

      socketTask.value.onOpen(() => {
        console.log('WebSocket连接已打开');
      });

      socketTask.value.onClose(() => {
        console.log('WebSocket连接已关闭');

        if (!isDisconnect.value) {
          setTimeout(() => {
            console.log('WebSocket重新连接');
            connect();
          }, 1000);
        }
      });

      socketTask.value.onError((error:any) => {
        console.error('WebSocket连接发生错误:', error);
      });

      socketTask.value.onMessage((res:{data:string}) => {
        let data = JSON.parse(res.data) as  LiveMessageInterfaceRes;
        console.log('收到服务器消息:', data)
        if (onMessage) {
          onMessage(data);
        }
      });
    }
  };

  const disconnect = () => {
    if (socketTask.value) {
      isDisconnect.value = true;
      socketTask.value.close({});
      stopHeartbeat();
      socketTask.value = null;
    }
  };

  let heartbeatTimer = null as any;

  const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
      // 判断当前路由是否是直播间路由，如果不是则不发送心跳
      // 获取当前页面对象
      const pageInfo = getCurrentPageInfo()
      if(pageInfo.route !== '/pages/livePlay/livePlay'){
        disconnect()
        return
      }
      if (socketTask.value) {
        console.log('发送心跳')
        socketTask.value.send({
          data: JSON.stringify({
            msgType: ChatMessageType.HEART_BEAT,
          })
        });
      }
    }, heartbeatInterval);
  };

  const stopHeartbeat = () => {
    clearInterval(heartbeatTimer);
  };

  const sendMessage = (message:any) => {
    console.log('发送消息:socketTask.value', socketTask.value)
    if (socketTask.value) {
      socketTask.value.send({
        data: JSON.stringify(message)
      });
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    disconnect();
  });

  return {
    socketTask,
    connect,
    disconnect,
    sendMessage,
  };
}
