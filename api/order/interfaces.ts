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
