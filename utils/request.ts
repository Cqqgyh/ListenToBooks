import { useUserStore } from '../stores/user'
import type { RequestOptions } from './interface'
import { RequestResponse } from "./interface"
import { setRedirectUrl } from "./utils"
import { BASE_URL } from "../config/confjg"
const BASEURL = BASE_URL
class Service {
  api<T>(opts: RequestOptions): Promise<RequestResponse<T>> {
    // 定义参数对象
    if (!opts.method) opts.method = 'GET'
    opts.loading = opts.loading !== false;

    // 鉴权
    const token = useUserStore().token
    const header = {
      token,
      'Content-type': 'application/json; charset=UTF-8',
    }

    return new Promise((resolve, reject) => {
      if (opts.loading)
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      uni.request({
        url: BASEURL + opts.url,
        data: opts.data,
        method: opts.method,
        header,
        success: (res: any) => {
          uni.hideLoading()
          if (res.statusCode === 200) {
            if (res.data.code == 200) {
              resolve(res.data)
            } else if (res.data.code == 208) {
              uni.showModal({
                title: '提示',
                content: '登录过期，请重新登录',
                success: function (res) {
                  if (res.confirm) {
                    // 清空缓存
                    uni.clearStorageSync()
                    uni.redirectTo({
                      url: `/pages/login/login`,
                    })
                    // 设置重定向url
                    setRedirectUrl()
                  } else if (res.cancel) {
                    console.log('用户不想登陆')
                  }
                },
              })
              resolve(res.data)
            } else {
              uni.showToast({
                title: res.data.message,
                icon: 'error',
                duration: 1500,
              })
              reject(res.data)
            }
          }
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: 'net error!',
            icon: 'none',
            duration: 2000,
          })
        },
      })
    })
  }

  get<T>(options: RequestOptions):Promise<RequestResponse<T>>{
    options.method = 'GET'
    return this.api(options)
  }

  post<T>(options: RequestOptions):Promise<RequestResponse<T>> {
    options.method = 'POST'
    return this.api(options)
  }

  put<T>(options: RequestOptions):Promise<RequestResponse<T>> {
    options.method = 'PUT'
    return this.api(options)
  }

  delete<T>(options: RequestOptions):Promise<RequestResponse<T>> {
    options.method = 'DELETE'
    return this.api(options)
  }
}

export default Service
