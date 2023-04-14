import Service from "../../utils/request"
import { AlbumInfoInterface } from "../albums/interfaces"

class CateGory extends Service {
  /**
   * @description 新增专辑
   * @param {AlbumInfoInterface} albumInfo
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html#/-v3-api-docs/%E4%B8%93%E8%BE%91%E7%AE%A1%E7%90%86/save
   */
  addAlbum(albumInfo: AlbumInfoInterface) {
    return this.post({
      url: `/api/album/albumInfo/saveAlbumInfo`,
      data: albumInfo,
    })
  }
  /**
   * @description: 获取专辑信息
   * @param {number} id 专辑id
   * @return {*}
   * @docs http://139.198.163.91:8501/doc.html#/-v3-api-docs/%E4%B8%93%E8%BE%91%E7%AE%A1%E7%90%86/getAlbumInfo
   */
  getAlbumInfo(id: number) {
    return this.get<AlbumInfoInterface>({
      url: `/api/album/albumInfo/getAlbumInfo/${id}`,
    })
  }
}

export const albumsService = new CateGory()
