import { defineStore } from "pinia"
import { order, user } from "../api"
import {useUpdateUserInfo} from "../hooks/useUpdateUserInfo"
import { OrderInterface, OrderRequestInterface } from "../api/order/interfaces"
import { PAYMENT_ITEM_TYPE_MAP, PAY_WAY_MAP, } from "../utils/constant"

export const useOrderStore = defineStore("order", {
  state: () => {
    return {
      // 确认订单所需信息
      confirmOrderInfo: {} as OrderRequestInterface,
      // 提交订单所需信息
      submitOrderInfo: {} as OrderInterface,
    }
  },
  actions: {
    // 设置订单所需信息
    setConfirmOrderInfo(params: OrderRequestInterface) {
      this.confirmOrderInfo = params
      // 获取提交订单所需信息
      this.getSubmitOrderInfo()
    },
    // 设置提交订单所需信息
    setSubmitOrderInfo(params: OrderInterface) {
      this.submitOrderInfo = params
    },
    // 提交订单所需信息
    async getSubmitOrderInfo() {
      try {
        const res = await order.getSubmitOrderInfo(this.confirmOrderInfo)
        // 如果是声音类型，写死余额支付
        if(res.data.itemType === PAYMENT_ITEM_TYPE_MAP.Track){
          res.data.payWay = PAY_WAY_MAP.Balance
        }
        this.setSubmitOrderInfo(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    // 设置订单支付方式
    setOrderPayWay(payWay: PAY_WAY_MAP) {
      this.submitOrderInfo.payWay = payWay
    },
    // 支付成功
    paySuccess() {
      uni.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
        // 清空相关订单信息
        this.clearOrderInfo()
        // 更新用户信息
        const {updateUserInfo} = useUpdateUserInfo()
        updateUserInfo()

    },
    // 清空相关订单信息
    clearOrderInfo() {
      this.confirmOrderInfo = {} as OrderRequestInterface
      this.submitOrderInfo = {} as OrderInterface
    }

  }

})
