// 会员收费列表
export interface VipSettingInterface {
  id: number;
  createTime: string;
  name: string;
  price: number;
  discountPrice: number;
  intro: string;
  richIntro: string | null;
  serviceMonth: number;
  imageUrl: string;
}
// 专辑声音购买设置
export interface TrackSettingInterface {
  price: number;
  name: string;
  trackCount: number;
  trackId?:number;
}
// 请求订单信息类型
export interface OrderRequestInterface {
  itemType: string,
  itemId: number,
  trackCount?: number
}
// 订单信息
export interface OrderInterface {
  tradeNo: string;
  payWay: string;
  itemType: string;
  originalAmount: number;
  derateAmount: number;
  orderAmount: number;
  orderDetailVoList: OrderDetailInterface[];
  orderDerateVoList: OrderDerateInterface[];
  timestamp: number;
  sign: string;
}

export interface OrderDetailInterface {
  itemId: number;
  itemName: string;
  itemUrl: string;
  itemPrice: number;
}

export interface OrderDerateInterface {
  derateType: string;
  derateAmount: number;
  remarks: string;
}
// 提交订单响应接口
export interface SubmitOrderInterface {
  orderNo:string | number;
}
// 微信下单需要的数据接口
export interface WechatPayNeededInterface {
  paymentType: '1301' | '1302'; //支付类型：1301-订单 1302-充值
  orderNo:string | number;
}

// 微信支付需要的数据接口
export interface WechatPayInterface {
  timeStamp: string;
  package: string;
  paySign: string;
  signType: string;
  nonceStr: string;
}
// 充值接口
export interface investInterface {
  amount: number;
  payWay: '1101' | '1102'; // 支付方式：1101-微信 1102-支付宝
}
// 消费记录
export interface ConsumeRecordInterface {
  id: number;
  createTime: string;
  userId: number;
  title: string;
  tradeType: string;
  amount: number;
  orderNo: string;
}
// 充值记录
export interface InvestRecordInterface {
  id: number;
  createTime: string;
  userId: number;
  title: string;
  tradeType: string;
  amount: number;
  orderNo?: string | null;
}
