import Service from '../../utils/request'
import { LiveInterfaceRes, LiveTagInterfaceRes } from "./interfaces"


class CateGory extends Service {

  /**
   * @description 根据一级分类Id 查询分类属性数据
   * @param  {string | number} category1Id 一级分类ID
   */
  // getAttrList(category1Id: string | number) {
  //   return this.get<AttributeListInterface[]>({
  //     url: `/api/album/category/findAttribute/${category1Id}`
  //   })
  // }
  /**
   * @description 获取直播间列表
   */
  getLiveList() {
    return this.get<LiveInterfaceRes[]>({
      url: `/api/live/liveRoom/findLiveList`
    })
  }
  /**
   * @description 根据id获取直播间信息
   * @param  {string | number} id 直播间id
   */
  getLiveInfo(id: string | number) {
    return this.get<LiveInterfaceRes>({
      url: `/api/live/liveRoom/getById/${id}`
    })
  }
  /**
   * @description 根据直播标签列表
   */
  getLiveTagList() {
    return this.get<LiveTagInterfaceRes[]>({
      url: `/api/live/liveTag/findAllLiveTag`
    })
  }


}

export const liveService = new CateGory()
