import Service from '../../utils/request'
import {
  OrderInterface,
  OrderRequestInterface,
  SubmitOrderInterface,
  TrackSettingInterface,
  VipSettingInterface, WechatPayInterface, WechatPayNeededInterface
} from "./interfaces"
import { WX_ORDER_TYPE_MAP } from "../../utils/constant"

class CateGory extends Service {
  /**
   * @description: 获取会员收费信息列表
   * @return {*}
   */
  getVipSettingList() {
    return this.get<VipSettingInterface[]>({
      url: '/api/user/vipServiceConfig/findAll'
    })
  }
  /**
   * @description: 获取用户声音分集购买支付列表
   * @return {*}
   */
  getTrackSettingList(trackId:number | string) {
    return this.get<TrackSettingInterface[]>({
      url: `/api/album/trackInfo/findUserTrackPiadList/${trackId}`
    })
  }
  /**
   * @description: 获取账户可用余额
   * @return {*}
   */
  getAccountBalance() {
    return this.get<number>({
      url: '/api/account/userAccount/getAvailableAmount'
    })
  }
  /**
   * @description: 获请求订单信息
   * @return {*}
   */
  getSubmitOrderInfo(params: OrderRequestInterface) {
    return this.post<OrderInterface>({
      url: '/api/order/orderInfo/trade',
      data: params
    })
  }
  /**
   * @description: 提交订单
   * @param {OrderInterface} params
   */
  submitOrder(params: OrderInterface) {
    return this.post<SubmitOrderInterface>({
      url: '/api/order/orderInfo/submitOrder',
      data: params
    })
  }
  /**
   * @description: 微信下单接口
   * @param orderNo 订单号
   * @param paymentType 微信下单类型 支付类型：1301-订单 1302-充值
   */
  wechatPay(orderNo: string | number, paymentType: string = WX_ORDER_TYPE_MAP.Order ) {
    return this.post<WechatPayInterface>({
      url: `/api/payment/wxPay/createJsapi/${paymentType}/${orderNo}`,
    })
  }
  // 查询订单支付状态
  queryOrderPayStatus(orderNo: string | number) {
    return this.get({
      url: `/api/payment/wxPay/queryPayStatus/${orderNo}`,
      loading:false
    })
  }


}

export const order = new CateGory()
