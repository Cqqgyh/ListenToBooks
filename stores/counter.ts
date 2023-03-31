import { defineStore } from "pinia";

const uniStorage: Storage = {
  setItem(key, state) {
    console.log(key, state);
    return uni.setStorageSync(key, state);
  },
  getItem(key) {
    return uni.getStorageSync(key);
  },
  removeItem(key) {
    return uni.removeStorageSync(key);
  },
};

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: uniStorage,
      },
    ],
  },
});
