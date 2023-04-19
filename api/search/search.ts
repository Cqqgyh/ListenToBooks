import Service from '../../utils/request'
import { SearchItemInterface, SearchPageResponseInterface, SearchParamsInterface } from "./interfaces"


class CateGory extends Service {

  /**
   * @description 搜索功能
   * @param  {SearchParamsInterface} params 二级分类Id
   */
  // 搜索
  getSearchAlbumInfo(params: SearchParamsInterface) {
    return this.post<SearchPageResponseInterface<SearchItemInterface[]>>({
      url: '/api/search/albumInfo',
      data: params
    })
  }
  /**
   * @description: 获取搜索建议
   * @param {string} keyword 搜索关键字
   * @return {*}
   */
  getSearchSuggestions(keyword: string) {
    return this.get<string[]>({
      url: `/api/search/albumInfo/completeSuggest/${keyword}`,
      loading:false
    })
  }



}

export const search = new CateGory()
