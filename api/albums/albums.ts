import Service from "../../utils/request"
import {
  AlbumInfoInterface,
  AlbumInfoListInterface,
  PageResponseInterface,
  WorksInfoPageInterface
} from "../albums/interfaces"

class CateGory extends Service {
  /**
   * @description 新增专辑
   * @param {AlbumInfoInterface} albumInfo
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  addAlbum(albumInfo: AlbumInfoInterface) {
    return this.post({
      url: `/api/album/albumInfo/saveAlbumInfo`,
      data: albumInfo,
    })
  }
  /**
   * @description 修改
   * @param {AlbumInfoInterface} albumInfo
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  editAlbum(albumInfo: AlbumInfoInterface) {
    return this.put({
      url: `/api/album/albumInfo/updateAlbumInfo/${albumInfo.id}`,
      data: albumInfo,
    })
  }
  /**
   * @description: 获取专辑信息
   * @param {number} id 专辑id
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  getAlbumInfo(id: number) {
    return this.get<AlbumInfoInterface>({
      url: `/api/album/albumInfo/getAlbumInfo/${id}`,
    })
  }
  /**
   * @description: 删除专辑信息
   * @param {number} id 专辑id
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  deleteAlbumInfo(id: number) {
    return this.delete({
      url: `/api/album/albumInfo/removeAlbumInfo/${id}`,
    })
  }
  /**
   * @description: 删除声音信息
   * @param {number} id 声音id
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  deleteTrackInfo(id: number) {
    return this.delete({
      url: `/api/album/trackInfo/removeTrackInfo/${id}`,
    })
  }
  /**
   * @description: 获取当前用户的分页专辑列表
   * @param {WorksInfoPageInterface} albumInfoPage
   * @return {*}
   */
  getAlbumList(albumInfoPage:WorksInfoPageInterface) {
    return this.get<PageResponseInterface<AlbumInfoListInterface[]>>({
      url: `/api/album/albumInfo/findUserAlbumPage/${albumInfoPage.page}/${albumInfoPage.limit}`,
      data:albumInfoPage
    })
  }
  /**
   * @description: 获取当前用户声音分页列表
   * @param {WorksInfoPageInterface} albumInfoPage
   * @return {*}
   */
  getTrackList(trackListInfoPage:WorksInfoPageInterface) {
    return this.get<PageResponseInterface<AlbumInfoListInterface[]>>({
      url: `/api/album/trackInfo/findUserTrackPage/${trackListInfoPage.page}/${trackListInfoPage.limit}`,
      data:trackListInfoPage
    })
  }
}

export const albumsService = new CateGory()
