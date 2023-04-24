import Service from '../../utils/request'
import { OrderInterface, OrderRequestInterface, TrackSettingInterface, VipSettingInterface } from "./interfaces"

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
  // 请求订单信息
  getSubmitOrderInfo(params: OrderRequestInterface) {
    return this.post<OrderInterface>({
      url: '/api/order/orderInfo/trade',
      data: params
    })
  }

}

export const order = new CateGory()
