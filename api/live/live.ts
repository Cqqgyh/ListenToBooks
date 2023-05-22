import Service from '../../utils/request'
import { CreateLiveInterfaceRes, LiveInterfaceRes, LiveTagInterfaceRes } from "./interfaces"


class CateGory extends Service {

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
  /**
   * @description 获取当前用户的直播间
   */
  getCurrentLiveRoom() {
    return this.get<LiveInterfaceRes>({
      url: `/api/live/liveRoom/getCurrentLive`
    })
  }
  /**
   * @description 创建直播间
   */
  createLiveRoom(data: CreateLiveInterfaceRes) {
    return this.post<LiveInterfaceRes>({
      url: `/api/live/liveRoom/saveLiveRoom`,
      data
    })
  }


}

export const liveService = new CateGory()
