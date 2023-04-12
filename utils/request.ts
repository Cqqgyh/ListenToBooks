import { useUserStore } from '../stores/user'
import type { RequestOptions } from './interface'
const BASEURL = 'http://139.198.163.91:8500'
class Service {
  api(opts: RequestOptions) {
    // 定义参数对象
    if (!opts.method) opts.method = 'GET'

    // 鉴权
    const token = useUserStore().token
    const header = {
      token,
      'Content-type': 'application/json; charset=UTF-8',
    }

    return new Promise((resolve, reject) => {
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
            } else if (res.data.code == 28004) {
              uni.showModal({
                title: '提示',
                content: '登录过期，请重新登录',
                success: function (res) {
                  if (res.confirm) {
                    uni.redirectTo({
                      url: '/pages/login/index',
                    })
                    uni.clearStorageSync()
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

  get(options: RequestOptions) {
    options.method = 'GET'
    return this.api(options)
  }

  post(options: RequestOptions) {
    options.method = 'POST'
    return this.api(options)
  }

  pus(options: RequestOptions) {
    options.method = 'PUT'
    return this.api(options)
  }

  delete(options: RequestOptions) {
    options.method = 'DELETE'
    return this.api(options)
  }
}

export default Service
