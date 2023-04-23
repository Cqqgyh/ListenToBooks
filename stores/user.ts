import { defineStore } from "pinia"
import { TOKEN_KEY, USER_KEY } from "../utils/constant"
import { user } from "../api"
import { UpdateUserInfoInterface, UserInfoInterface, WechatUserInfoInterface } from "../api/user/interfaces"
import { clearRedirectUrl, getRedirectUrl } from "../utils/utils"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: JSON.parse(uni.getStorageSync(USER_KEY) || "{}") as UserInfoInterface,
      token: uni.getStorageSync(TOKEN_KEY) || "c2362386c59745c7bd4b9c43bb659f2a"
    }
  },
  actions: {
    // 微信登陆
    loginWithWechat() {
      uni.login({
        provider: "weixin",
        success: async (loginRes:{code:string}) => {
          await this.getToken(loginRes.code)
          // 登录成功，获取用户信息
          await this.getUserInfo()
          const redirectUrl = getRedirectUrl()
          console.log('redirectUrl',redirectUrl)
          uni.redirectTo({
            url: redirectUrl ? redirectUrl : "/pages/index/index"
          })
          // 清空重定向url
          clearRedirectUrl()
        },
        fail: (err:any) => {
          console.log(err)
        }
      })
    },
    // 获取token
    async getToken(code: string) {
      try {
        const res = await user.getLogin(code)
        if (res.data.token) {
          // 本地保存token
          uni.setStorageSync(TOKEN_KEY, res.data.token)
          this.token = res.data.token
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await user.getUserInfo()
        // 如果用户信息不存在的,从微信获取用户信息
        if (!res.data.nickname || !res.data.avatarUrl){
          uni.getUserInfo({
            provider: 'weixin',
            success: async (infoRes: { userInfo: WechatUserInfoInterface }) => {
              console.log()
              const params={
                avatarUrl: infoRes.userInfo.avatarUrl,
                nickname: infoRes.userInfo.nickName
              }
              // 在这里可以将用户信息传递给后端进行登录验证等操作
              // 更新用户信息
              await this.updateUserInfo(params)
              // 重新请求当前用户信息
              await this.getUserInfo()
            }
          })
        }else{
          this.user = res.data
          uni.setStorageSync(USER_KEY, JSON.stringify(res.data))
        }

      }
      catch (error) {
        console.log(error)
      }
    },
    // 更新用户信息
    async updateUserInfo(userInfo: UpdateUserInfoInterface) {
      try {
        const res = await user.updateUserInfo(userInfo)
      }
      catch (error) {
        console.log(error)
      }
    },
    // 退出登陆
    logout() {
      uni.removeStorageSync(TOKEN_KEY)
      uni.removeStorageSync(USER_KEY)
      this.user = {}
      this.token = ""
    }
  }
})
