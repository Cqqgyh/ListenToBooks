
import {useUserStore} from "../stores/user"

// 按照惯例，组合式函数名以“use”开头
export function useUpdateUserInfo() {
  const userStore = useUserStore()
  const updateUserInfo = () => {
    // 用于更新用户信息
    if (userStore.token) {
      userStore.getUserInfo();
      userStore.getAccountBalance();
    }
  }
 return { updateUserInfo }

}

