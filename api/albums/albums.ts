import Service from "../../utils/request"
import {
  AlbumDetailInterface,
  AlbumInfoInterface,
  AlbumInfoListInterface,
  CollectTrackInterface,
  HistoryTrackInterface,
  PageResponseInterface,
  TrackStaVoInterface,
  QueryTrackInterface,
  SubscribeAlbumsInterface,
  TrackInfoInterface,
  TrackInterface,
  WorksInfoPageInterface,
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
   * @description: 获取声音信息
   * @param {number} id 声音id
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html
   */
  getTrackInfo(id: number) {
    return this.get<TrackInfoInterface>({
      url: `/api/album/trackInfo/getTrackInfo/${id}`,
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
  // 获取所有的专辑列表
  /**
   * @description: 获取所有的专辑列表
   * @return {*}
   */
  getAllAlbumList() {
    return this.get<AlbumInfoListInterface[]>({
      url: `/api/album/albumInfo/findUserAllAlbumList`,
    })
  }
  /**
   * @description: 新增声音信息
   * @param {TrackInfoInterface} trackInfo
   * @return {*}
   */
  addTrackInfo(trackInfo: TrackInfoInterface) {
    return this.post({
      url: `/api/album/trackInfo/saveTrackInfo`,
      data: trackInfo,
    })
  }
  /**
   * @description: 修改声音信息
   * @param {TrackInfoInterface} trackInfo
   * @return {*}
   */
  editTrackInfo(trackInfo: TrackInfoInterface) {
    return this.put({
      url: `/api/album/trackInfo/updateTrackInfo/${trackInfo.id}`,
      data: trackInfo,
    })
  }
  /**
   * @description: 获取当前用户声音分页列表
   * @param {WorksInfoPageInterface} trackListInfoPage
   * @return {*}
   */
  getTrackList(trackListInfoPage:WorksInfoPageInterface) {
    return this.get<PageResponseInterface<AlbumInfoListInterface[]>>({
      url: `/api/album/trackInfo/findUserTrackPage/${trackListInfoPage.page}/${trackListInfoPage.limit}`,
      data:trackListInfoPage
    })
  }
  /**
   * @description: 获取专辑详情
   * @param {number | string} albumId
   * @return {*}
   */
  getAlbumDetail(albumId: number | string) {
    return this.get<AlbumDetailInterface>({
      url: `/api/search/albumInfo/${albumId}`,
    })
  }
  /**
   * @description: 获取专辑声音分页列表
   * @param {QueryTrackInterface} trackListInfoPage
   * @return {*}
   */
  getAlbumTrackList(trackListInfoPage:QueryTrackInterface) {
    return this.get<PageResponseInterface<TrackInterface[]>>({
      url: `/api/album/trackInfo/findAlbumTrackPage/${trackListInfoPage.albumId}/${trackListInfoPage.page}/${trackListInfoPage.limit}`,
    })
  }

/**
 * @description: 获取声音统计信息
 * @param {QueryTrackInterface} trackListInfoPage
 * @returns {*}
 */
getTrackStaVo(trackId: number) {
  return this.get<TrackStaVoInterface>({
    url: `/api/album/trackInfo/getTrackStatVo/${trackId}`
  })
}
  /**
   * @description 获取订阅专辑分页列表
   * @param  { page: number, limit: number } pageInfo 分页信息
   */
  getSubscribeAlbums(pageInfo: { page: number, limit: number }) {
    return this.get<PageResponseInterface<SubscribeAlbumsInterface>>({
      url: `/api/user/userInfo/findUserSubscribePage/${pageInfo.page}/${pageInfo.limit}`,
    })
  }
  /**
   * @description 获取订阅专辑分页列表
   * @param  { page: number, limit: number } pageInfo 分页信息
   */
  getCollectTrack(pageInfo: { page: number, limit: number }) {
    return this.get<PageResponseInterface<CollectTrackInterface>>({
      url: `/api/user/userInfo/findUserCollectPage/${pageInfo.page}/${pageInfo.limit}`,
    })
  }
  /**
   * @description 获取历史声音分页列表
   * @param  { page: number, limit: number } pageInfo 分页信息
   */
  getHistoryTrack(pageInfo: { page: number, limit: number }) {
    return this.get<PageResponseInterface<HistoryTrackInterface>>({
      url: `/api/user/userListenProcess/findUserPage/${pageInfo.page}/${pageInfo.limit}`,
    })
  }
  /**
   * @description 是否订阅专辑
   */
  isSubscribeAlbum(albumId: number) {
    console.log('是否订阅专辑', albumId)
    return this.get({
      url: `/api/user/userInfo/isSubscribe/${albumId}`,
    })
  }
  /**
   * @description 是否收藏声音
   */
  isCollectTrack(trackId: number) {
    return this.get({
      url: `/api/user/userInfo/isCollect/${trackId}`,
    })
  }
  // 根据id删除播放历史
  /**
   * @description 根据id删除播放历史
   */
  deleteHistoryTrack(id: number) {
    return this.delete({
      url: `/api/user/userListenProcess/delete/${id}`,
    })
  }
}
export const albumsService = new CateGory()
