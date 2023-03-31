import App from "./App";
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";

const pinia = createPinia();
pinia.use(piniaPersist);
/* 全局挂载请求库 */
import GraceRequest from "@/Grace6/js/request.js";
uni.gRequest = GraceRequest;

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
