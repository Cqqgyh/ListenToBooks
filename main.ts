import App from "./App";
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
import { useUpdateUserInfo } from "./hooks/useUpdateUserInfo"
// 引入全局事件总线mitt
import  "./utils/mitt"
const pinia = createPinia();
pinia.use(piniaPersist);
/* 全局挂载请求库 */
import GraceRequest from "@/Grace6/js/request.js";
uni.gRequest = GraceRequest;

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  // 进入页面自动触发请求的数据
  let { updateUserInfo } = useUpdateUserInfo()
  updateUserInfo()
  return {
    app,
  };
}
