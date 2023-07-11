import Service from '../../utils/request'
import {
  ConsumeRecordInterface,
  InvestRecordInterface,
  OrderInterface,
  OrderRequestInterface,
  SubmitOrderInterface,
  TrackSettingInterface,
  VipSettingInterface, WechatPayInterface, WechatPayNeededInterface
} from "./interfaces"
import { PAY_WAY_MAP, WX_ORDER_TYPE_MAP } from "../../utils/constant"
import { PageResponseInterface } from "../albums/interfaces"

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
      url: `/api/album/trackInfo/findUserTrackPaidList/${trackId}`
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
  /**
   * @description: 查询订单支付状态
   * @param orderNo 订单号
   */
  queryOrderPayStatus(orderNo: string | number) {
    return this.get({
      url: `/api/payment/wxPay/queryPayStatus/${orderNo}`,
      loading:false
    })
  }
  /**
   * @description: 充值接口
   * @param amount 充值金额
   * @param payWay 支付方式
   */
  investAmount(amount: number, payWay: '1101' | '1102' = PAY_WAY_MAP.WeChat) {
    return this.post<SubmitOrderInterface>({
      url: '/api/account/rechargeInfo/submitRecharge',
      data: {amount, payWay}
    })
  }

  /**
   * @description: 消费记录
   * @return {*}
   * @param params
   */
  getConsumeRecordList(params:{ page: number, limit: number }) {
    return this.get<PageResponseInterface<ConsumeRecordInterface[]>>({
      url: `/api/account/userAccount/findUserConsumePage/${params.page}/${params.limit}`,
    })
  }
  /**
   * @description: 充值记录
   * @return {*}
   * @param params
   */
  getInvestRecordList(params:{ page: number, limit: number }) {
    return this.get<PageResponseInterface<InvestRecordInterface[]>>({
      url: `/api/account/userAccount/findUserRechargePage/${params.page}/${params.limit}`,
    })
  }
  /**
   * @description: 查询订单列表
   * @param
   */
  queryOrdeList(params:{ page: number, limit: number }) {
    return this.get({
      url: `/api/order/orderInfo/findUserPage/${params.page}/${params.limit}`,
      loading:true
    })
  }
  /**
   * @description: 查询订单列表
   * @param
   */
  queryOrderInfo(orderNo: string) {
    return this.get({
      url: `/api/order/orderInfo/getOrderInfo/${orderNo}`,
      loading:true
    })
  }
}

export const order = new CateGory()
