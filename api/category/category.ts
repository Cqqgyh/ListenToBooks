import Service from '../../utils/request'
import { AttributeListInterface, CategoryListInterface } from "../albums/interfaces"

class CateGory extends Service {
  /**
 * @description 新增用户
 * @param  {string} username
 * @param {string} nickName
 * @param {string} password
 * @returns {<PageRes<any>>}
 * @docs https://
 */
  findAllCategory1() {
    return this.get({
      url: '/api/album/category/findAllCategory1'
    })
  }
  /**
   * @description 获取全部分类信息
   * @docs http://139.198.163.91:8501/doc.html#/-v3-api-docs/%E5%88%86%E7%B1%BB%E7%AE%A1%E7%90%86/getBaseCategoryList
   */
  findAllCategory() {
    return this.get<CategoryListInterface[]>({
      url: '/api/album/category/getBaseCategoryList'
    })
  }
  /**
   * @description 根据一级分类Id 查询分类属性数据
   * @param  {string | number} category1Id 一级分类ID
   * @docs http://139.198.163.91:8501/doc.html#/-v3-api-docs/%E5%88%86%E7%B1%BB%E7%AE%A1%E7%90%86/findAttribute
   */
  getAttrList(category1Id: string | number) {
    return this.get<AttributeListInterface[]>({
      url: `/api/album/category/findAttribute/${category1Id}`
    })
  }

}

export const courseService = new CateGory()
