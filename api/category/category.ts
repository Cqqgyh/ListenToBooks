import Service from '../../utils/request'
import { AttributeListInterface, CategoryListInterface } from "../albums/interfaces"
import { CategoryTreeInterface, CategoryTreePropsInterface, ChannelInterface } from "./interfaces"

class CateGory extends Service {
  findAllCategory1() {
    return this.get({
      url: '/api/album/category/findAllCategory1'
    })
  }
  /**
   * @description 获取全部分类信息
   */
  findAllCategory() {
    return this.get<CategoryListInterface[]>({
      url: '/api/album/category/getBaseCategoryList'
    })
  }
  /**
   * @description 获取所有分类信息
   */
  getAllCategory() {
    return this.get<CategoryListInterface[]>({
      url: '/api/album/category/getBaseCategoryList'
    })
  }
  /**
   * @description 根据一级分类Id 查询分类属性数据
   * @param  {string | number} category1Id 一级分类ID
   */
  getAttrList(category1Id: string | number) {
    return this.get<AttributeListInterface[]>({
      url: `/api/album/category/findAttribute/${category1Id}`
    })
  }
  /**
   * @description 根据一级分类Id 查询分类下的商品数据
   * @param  {string | number} id 一级分类ID
   */
  getCategory1IdData(id:string | number) {
    return this.get<ChannelInterface[]>({
      url: `/api/search/albumInfo/channel/${id}`
    })
  }
  /**
   * @description 根据二级分类Id,请求二级分类下的树结构数据
   * @param  {string | number} id 二级分类Id
   */
  getCategory2IdTreeList(id:string | number) {
    return this.get<ChannelInterface[]>({
      url: `/api/search/albumInfo/channel2/${id}`
    })
  }
  /**
   * @description 获取一级分类下置顶到频道页的三级分类列表
   * @param  {string | number} category1Id 二级分类Id
   */
  getCategory1IdTopList(category1Id:string | number) {
    return this.get<CategoryTreePropsInterface[]>({
      url: `/api/album/category/findTopBaseCategory3/${category1Id}`
    })
  }
  // 根据一级分类id获取全部分类信息
  getCategory1IdAllInfo(category1Id:string | number) {
    return this.get<CategoryTreeInterface>({
      url: `/api/album/category/getBaseCategoryList/${category1Id}`
    })
  }

}

export const courseService = new CateGory()
