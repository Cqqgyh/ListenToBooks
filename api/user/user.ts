import Service from '../../utils/request'
import { LoginResponseInterface, UpdateUserInfoInterface, UserInfoInterface } from "./interfaces"
class CateGory extends Service {
  /**
   * @description 小程序登录
   * @param  {string} code
   */
    getLogin(code: string) {
      return this.get<LoginResponseInterface>({
        url: `/api/user/wxLogin/wxLogin/${code}`,
      })
    }
  /**
   * @description 获取用户登陆信息
   */
    getUserInfo() {
      return this.get<UserInfoInterface>({
        url: `/api/user/wxLogin/getUserInfo`,
      })
    }
  /**
   * @description 更新用户信息
   */
    updateUserInfo(userInfo: UpdateUserInfoInterface) {
      return this.post({
        url: `/api/user/wxLogin/updateUser`,
        data: userInfo,
      })
    }



}

export const user = new CateGory()
