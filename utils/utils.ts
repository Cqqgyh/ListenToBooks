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
 * 根据节点id,获取其所有父节点
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

