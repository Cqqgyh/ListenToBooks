/*
 * @Author: 朽木白
 * @Date: 2023-04-12 15:26:13
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-04-12 15:26:20
 * @Description: 常量
 */


// 本地存储token的key

export const TOKEN_KEY = 'token'
// 本地存储用户信息的key
export const USER_KEY = 'user'
// 登陆成功重定向url的key
export const REDIRECT_URL_KEY = 'redirectUrl'
// 收费类型
export const PAY_TYPE = [
  { name: "免费", value: "0101" },
  { name: "VIP免费", value: "0102" },
  { name: "付费", value: "0103" }
]
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
  WeChat = '1101',
  Alipay = '1102',
  Balance = '1103',
}
