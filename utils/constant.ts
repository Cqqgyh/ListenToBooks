import { BASE_UPLOAD_URL } from "../config"
// 本地存储token的key
export const TOKEN_KEY = "token"
// 本地存储用户信息的key
export const USER_KEY = "user"
// 登陆成功重定向url的key
export const REDIRECT_URL_KEY = "redirectUrl"
// 收费类型
export const PAY_TYPE = [
  { name: "免费", value: "0101" },
  { name: "VIP免费", value: "0102" },
  { name: "付费", value: "0103" }
]

export enum PAY_TYPE_MAP {
  Free = "0101",
  VipFree = "0102",
  NotFree = "0103",
}

// 完结类型
export const FINISH_TYPE = [
  { name: "未完结", value: "0" },
  { name: "完结", value: "1" }
]

// 付款类型 付款项目类型: 1001-专辑 1002-声音 1003-vip会员
export enum PAYMENT_ITEM_TYPE_MAP {
  Album = "1001",
  Track = "1002",
  Vip = "1003"
}

// 支付方式：1101-微信 1102-支付宝 1103-账户余额
export enum PAY_WAY_MAP {
  WeChat = "1101",
  Alipay = "1102",
  Balance = "1103",
}

// 	价格类型： 0201-单集 0202-整专辑
export enum PRICE_TYPE_MAP {
  Single = "0201",
  Album = "0202",
}

// 微信下单类型 	支付类型：1301-订单 1302-充值
export enum WX_ORDER_TYPE_MAP {
  Order = "1301",
  Recharge = "1302",
}

// 上传地址
export const UPLOAD_URL = {
  IMAGE: `${BASE_UPLOAD_URL}/api/album/fileUpload`,
  TRACK: `${BASE_UPLOAD_URL}/api/album/trackInfo/uploadTrack`
} as const;
