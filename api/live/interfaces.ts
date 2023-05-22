// 分类
import { ChatMessageType } from "../../utils/constant"

export interface  LiveInterfaceRes {
  id: number;
  createTime: string;
  userId: number;
  coverUrl: string;
  liveTitle: string;
  viewCount: number;
  status: string;
  tagId: string;
  appName: string;
  streamName: string;
  expireTime: string;
  pushUrl: string;
  playUrl: string;
  longitude: string;
  latitude: string;
  location: string;
}

// websocket返回信息
export interface LiveMessageInterfaceRes {
  fromUser: {
    avatarUrl: string;
    nickname: string;
    userId: number;
  };
  liveRoomId: number;
  msgContent: string;
  msgType: ChatMessageType;
  time: number;
}
// 聊天组件
export interface ChatItemInterface {
  time: string,
  icon: string,
  name: string,
  content: string,
  isMe: boolean,
  messageType: ChatMessageType,
}
// 直播标签
export interface LiveTagInterfaceRes {
  id: number,
  createTime: string,
  name: string,
  iconUrl: string,
  orderNum: null,
  value?: number,
  text?: string,
}
// 创建直播间
export interface CreateLiveInterfaceRes {
  coverUrl: string,
  liveTitle: string,
  tagId: number | string,
  expireTime: string,
  longitude: string,
  latitude: string,
  location: string
}
