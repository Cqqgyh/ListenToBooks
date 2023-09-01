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
      // 订单号
      orderNo: "" as string | number,
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
    // 设置订单号
    setOrderNo(orderNo: string | number) {
      this.orderNo = orderNo
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
        // 保存订单号
        this.orderNo = res.data.orderNo
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
    // 纯订单号提交订单
    async submitOrderForOrderNumber(orderNo?: string | number ) {
      try {
        if (this.submitOrderInfo.payWay === PAY_WAY_MAP.WeChat) {
          // 微信支付
          await this.wechatPay(orderNo || this.orderNo)
          // 查询支付状态
          await this.queryOrderPayStatus(orderNo || this.orderNo)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 微信支付逻辑
    async wechatPay(orderNo: string | number, paymentType: string = WX_ORDER_TYPE_MAP.Order ) {
      // 调用后端微信下单接口
      try {
        console.log('调用后端微信下单接口---start')
        const res = await order.wechatPay(orderNo,paymentType)
        console.log('调用后端微信下单接口---end')
        // 调用微信官方支付接口，同步调用，不要加awit，因为后面微信支付逻辑后有轮询，加了await会阻碍轮询的执行
        this.wechatOfficialPay(res.data)
      }catch (error) {
        console.log(error)
      }

    },
    // 微信官方支付接口
    async wechatOfficialPay(params: WechatPayInterface) {
      try {
        console.log('微信官方支付接口---start')
        const res = await wx.requestPayment(Object.assign({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: 'MD5',
          paySign: '',
        }, params));
        console.log('微信官方支付接口---end')
        console.log('支付成功');
      } catch (err) {
        // 支付失败
        console.log('err',err);
      }
    },
    // 查询订单支付状态
    async queryOrderPayStatus(orderNo: string | number,times:number = 10,interval:number = 2000,callback = ()=>this.paySuccess()) {
      // 轮询查询订单支付状态
      try {
        console.log('轮询查询订单支付状态---start')
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
        await this.queryOrderPayStatus(res.data.orderNo,10,2000,()=>this.investSuccess())
      } catch (error) {
        console.log(error)
      }

    },
    // 支付成功
    paySuccess() {
      setTimeout(() => {
        uni.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      },200)
      // 去往支付成功页面
        console.log('去往支付成功页面')
      //
      uni.redirectTo({
        url: `/pages/paySuccess/paySuccess?orderNo=${this.orderNo}`
      })
      // 清空相关订单信息
      this.clearOrderInfo()
      // 更新用户信息
      this.updateUserInfo()

    },
    // 充值成功
    investSuccess() {
      // 清空相关订单信息
      this.clearOrderInfo()
      // 更新用户信息
      this.updateUserInfo()
      // 避免因全局封装的request中，设置的hideLoading而导致的请求后不出现提示的问题
      setTimeout(() => {
        uni.showToast({
          title: '充值成功',
          icon: 'success',
          duration: 2000
        })
      },200)
      console.log('充值成功')
    },
    // 清空相关订单信息
    clearOrderInfo() {
      this.confirmOrderInfo = {} as OrderRequestInterface
      this.submitOrderInfo = {} as OrderInterface
      this.orderNo = "" as string | number
    },
    //   更新用户信息
    updateUserInfo() {
      // 更新用户信息
      const {updateUserInfo} = useUpdateUserInfo()
      // 延时调用，后台充值成功，支付成功后用户信息变更需要一定时间
      setTimeout(() => {
        updateUserInfo()
      }, 1500);
    }


  }

})
