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
export function getAllParentArr(list:any[],id:string | number,idName:string = 'id',childName:string = "children"){
  for(let i in list){
    if(list[i][idName] == id){
      return [list[i]]
    }
    if (list[i][childName]) {
      let node:any = getAllParentArr(list[i][childName],id,idName,childName)
      if(!!node){
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
  let seconds: number;

  if (typeof durationSeconds === 'string') {
    seconds = Math.round(Number(durationSeconds));
  } else {
    seconds = Math.round(durationSeconds);
  }

  if (isNaN(seconds)) {
    return '00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${remSeconds.toString().padStart(2, '0')}`;
  }
}
/**
 * @description: uniapp中获取当前页面信息
 * @return {*}
 */
export function getCurrentPageInfo(): { route: string; pageInfo: any } {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return {
    route: `/${currentPage.route}`,
    pageInfo: currentPage,
  };
}
