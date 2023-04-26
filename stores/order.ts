import { defineStore } from "pinia"
import { order, user } from "../api"
import {useUpdateUserInfo} from "../hooks/useUpdateUserInfo"
import { OrderInterface, OrderRequestInterface, WechatPayInterface } from "../api/order/interfaces"
import { PAYMENT_ITEM_TYPE_MAP, PAY_WAY_MAP, WX_ORDER_TYPE_MAP } from "../utils/constant"

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
    // 提交订单
    async submitOrder() {
      try {
        const res = await order.submitOrder(this.submitOrderInfo)
        // 如果是余额支付，直接支付成功
        if (this.submitOrderInfo.payWay === PAY_WAY_MAP.Balance) {
          this.paySuccess()
        } else if (this.submitOrderInfo.payWay === PAY_WAY_MAP.WeChat) {
          // 微信支付
          await this.wechatPay(res.data.orderNo)
          // 查询支付状态
          await this.queryOrderPayStatus(res.data.orderNo)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 微信支付逻辑
    async wechatPay(orderNo: string | number, paymentType: string = WX_ORDER_TYPE_MAP.Order ) {
      // 调用后端微信下单接口
      try {
        const res = await order.wechatPay(orderNo,paymentType)
        // 调用微信官方支付接口
        await this.wechatOfficialPay(res.data)
      }catch (error) {
        console.log(error)
      }


    },
    // 微信官方支付接口
    async wechatOfficialPay(params: WechatPayInterface) {
      try {
        const res = await wx.requestPayment(Object.assign({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
        }, params));
        console.log('支付成功');
      } catch (err) {
        // 支付失败
        console.log(err);
      }
    },
    // 查询订单支付状态
    async queryOrderPayStatus(orderNo: string | number,times:number = 10,interval:number = 2000,callback = ()=>this.paySuccess) {
      // 轮询查询订单支付状态
      try {
        const res = await order.queryOrderPayStatus(orderNo);
        if (res.data) {
          // 查询支付成功
          callback();
        } else {
          // 查询支付失败
          if (times > 1) {
            console.log('查询支付信息失败，继续查询-----------',times)
            setTimeout(() => {
              this.queryOrderPayStatus(orderNo, times - 1, interval);
            }, interval);
          } else {
            uni.showToast({
              title: '查询支付信息失败',
              icon: 'error',
              duration: 2000
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 充值金额
    async investAmount(amount: number) {
      try {
        const res = await order.investAmount(amount)
        // 微信支付
        await this.wechatPay(res.data.orderNo,WX_ORDER_TYPE_MAP.Recharge)
        // 查询支付状态
        await this.queryOrderPayStatus(res.data.orderNo,10,2000,()=>this.investSuccess)
      } catch (error) {
        console.log(error)
      }

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
      // 去往支付成功页面
        console.log('去往支付成功页面')
        //
      uni.redirectTo({
        url: '/pages/paySuccess/paySuccess'
      })


    },
    // 充值成功
    investSuccess() {
      uni.showToast({
        title: '充值成功',
        icon: 'success',
        duration: 2000
      })
      // 清空相关订单信息
      this.clearOrderInfo()
      // 更新用户信息
      const {updateUserInfo} = useUpdateUserInfo()
      updateUserInfo()
      console.log('充值成功')
    },
    // 清空相关订单信息
    clearOrderInfo() {
      this.confirmOrderInfo = {} as OrderRequestInterface
      this.submitOrderInfo = {} as OrderInterface
    }

  }

})
