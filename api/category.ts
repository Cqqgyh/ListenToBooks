import Service from '../utils/request'
import { RequestResponse } from "../utils/interface"
import { AttributeListInterface, CategoryListInterface } from "../pages/createAlbum/interfaces"

class CateGory extends Service {
  findAllCategory1() {
    return this.get({
      url: '/api/album/category/findAllCategory1'
    })
  }
  // 获取所有分类信息
  findAllCategory() {
    return this.get<CategoryListInterface[]>({
      url: '/api/album/category/getBaseCategoryList'
    })
  }
  // 根据一级分类Id 查询分类属性数据
  getAttrList(category1Id: string | number) {
    return this.get<AttributeListInterface[]>({
      url: `/api/album/category/findAttribute/${category1Id}`
    })
  }
}

export const courseService = new CateGory()
