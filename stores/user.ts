import { defineStore } from 'pinia'
import { TOKEN_KEY, USER_KEY } from '../utils/constant'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: JSON.parse(uni.getStorageSync(USER_KEY) || '{}'),
      token: uni.getStorageSync(TOKEN_KEY) || 'c2362386c59745c7bd4b9c43bb659f2a',
    }
  },
  actions: {
  },
})
