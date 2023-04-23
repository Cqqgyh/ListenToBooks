import { MapItem } from "./interface"
import { REDIRECT_URL_KEY } from "./constant"

/**
 * 递归树结构，修改树结构的属性的key
 * @param data 树结构数据
 * @param key 要修改的key
 * @param value 要修改的key的值
 * @param childrenName 子节点的key名称
 * @param joinPropName 要拼接的key的名称
 */
export function recursionTree(data: any[], key: string, value: string, childrenName: string = "children", joinPropName?: string) {
  data.forEach(item => {
    if (item[value]) {
      item[key] = item[value]
      delete item[value]
    }
    if (joinPropName) {
      item[key] = item[key] + "|" + item[joinPropName]
    }
    if (item[childrenName]) {
      recursionTree(item[childrenName], key, value, childrenName, joinPropName)
    }
  })
}

/**
 * @description 根据节点id,获取其所有父节点
 * @param list 完整的树结构数组
 * @param  id 当前点击的id
 * @param  idName 需要对比的idName 的属性节点
 * @param  childName 子节点名称
 * @returns
 */
export function getAllParentArr(list: any[], id: string | number, idName: string = "id", childName: string = "children") {
  for (let i in list) {
    if (list[i][idName] == id) {
      return [list[i]]
    }
    if (list[i][childName]) {
      let node: any = getAllParentArr(list[i][childName], id, idName, childName)
      if (!!node) {
        return node.concat(list[i])
      }
    }
  }
}

/**
 * @description 简单对象的拷贝
 * @param {object}target 目标对象
 * @returns
 */
export function simpleDeepCopy(target: object) {
  return JSON.parse(JSON.stringify(target))
}

/**
 * @description: 将秒数转换为分时格式
 * @param {number | string} durationSeconds 持续时长 单位秒
 * @return {*}
 */
export function formatTime(durationSeconds: number | string): string {
  let seconds: number

  if (typeof durationSeconds === "string") {
    seconds = Math.round(Number(durationSeconds))
  } else {
    seconds = Math.round(durationSeconds)
  }

  if (isNaN(seconds)) {
    return "00:00"
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remSeconds = seconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remSeconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes.toString().padStart(2, "0")}:${remSeconds.toString().padStart(2, "0")}`
  }
}

/**
 * @description: uniapp中获取当前页面信息
 * @return {*}
 */
export function getCurrentPageInfo(): { route: string; pageInfo: any, fullPath: string } {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  let returnObj = {
    route: `/${currentPage.route}`,
    pageInfo: currentPage,
    fullPath: ''
  }
  // uniapp+vue3中存在bug，小程序不能实时获取到fullPath，需要延迟获取
  setTimeout(() => {
    returnObj.fullPath = currentPage.$page.fullPath
  },0)
  return returnObj
}

/**
 * @description: 从指定数组数组中获取value值
 * @param {MapItem} arr
 * @param {T} value
 * @return {*}
 */
export function getNameByValue<T>(arr: MapItem<T>[], value: T): string | null {
  const item = arr.find((item) => item.value === value)
  return item ? item.name : null
}

// 节流函数

/**
 * @description: 节流函数
 * @return {*}
 * @param fn 需要进行节流的函数。
 * @param delay 时间间隔，单位为毫秒。表示在这个时间内不能重复执行函数。
 * @param options options（可选）：配置项对象。包含两个属性：
 * leading：是否允许首次立即执行函数，
 * trailing：是否允许在时间间隔结束后执行函数，
 */
export function myThrottle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options?: { leading?: boolean; trailing?: boolean }
): T & { cancel(): void } {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const resultFn = function (this: unknown, ...args: Parameters<T>) {
    const currentTime = Date.now();

    if (!lastTime && options?.leading === false) {
      lastTime = currentTime;
    }

    const remainingTime = delay - (currentTime - lastTime);

    if (remainingTime <= 0 || remainingTime > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }

      lastTime = currentTime;
      fn.apply(this, args);
    } else if (!timer && options?.trailing !== false) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = undefined;
        fn.apply(this, args);
      }, remainingTime);
    }
  };

  resultFn.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
      lastTime = 0;
    }
  };

  return resultFn as T & { cancel(): void };
}

/**
 * @description: 存储重定向url
 */
export function setRedirectUrl() {
  // 获取当前页面对象
  const pageInfo = getCurrentPageInfo()
  console.log('pageInfo', pageInfo)
  // uniapp+vue3中存在bug，小程序不能实时获取到fullPath，需要延迟获取，确保已经获取到fullPath
  setTimeout(()=>{
    uni.setStorageSync(REDIRECT_URL_KEY, encodeURIComponent(pageInfo.fullPath))
  },0)
}
/**
 * @description: 获取重定向url
 */
export function getRedirectUrl() {
  return decodeURIComponent(uni.getStorageSync(REDIRECT_URL_KEY) || '')
}
/**
 * @description: 清空重定向url
 */
export function clearRedirectUrl() {
  uni.removeStorageSync(REDIRECT_URL_KEY)
}

