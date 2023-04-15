// 专辑属性值接口
export interface AlbumAttributeValueVoListInterface {
  attributeId: number
  valueId: number
  valueName: string
}
export interface AttributeInterface {
  attributeId: number
  id: number
  valueName: string
  [propName: string]: any
}
export interface AttributeListInterface {
  id: number
  attributeName: string
  attributeValueList: AttributeInterface[]
  checkedId?: number | string
  [propName: string]: any
}
// 专辑信息接口
export interface AlbumInfoInterface extends AnyInterface {
  albumTitle: string
  category3Id: number | string
  albumIntro: string
  coverUrl: string
  albumRichIntro?: string
  isOpen: number | string
  albumAttributeValueVoList: AlbumAttributeValueVoListInterface[]
  payType: string
  // 付费必填
  priceType?: string
  price?: number | string
  discount?: number | string
  vipDiscount?: number | string
  tracksForFree?: number | string
  // 专辑id
  id?: number | string
}
// 分类列表接口
export interface CategoryListInterface {
  categoryName: string
  categoryId: string | number
}
// 任意属性接口
export interface AnyInterface {
  [propName: string]: any
}
// 分页查询专辑需要专辑信息
export interface AlbumInfoQueryInterface {
  albumTitle?: string
  status?: string
  userId?: string
}
// 分页查询声音需要专辑信息
export interface TrackInfoQueryInterface {
  trackTitle?: string
  status?: string
  userId?: string
}
// 分页接口
export interface WorksInfoPageInterface {
  page: number
  limit: number
  // 专辑信息
  albumInfoQuery?: AlbumInfoQueryInterface
  // 声音信息
  trackInfoQuery?: TrackInfoQueryInterface
}
// 专辑列表信息接口
export interface AlbumInfoListInterface {
  albumId: number
  albumTitle: string
  coverUrl: string
  includeTrackCount: number
  isFinished: string
  status: string
  playStatNum: number
  subscribeStatNum: number
  buyStatNum: number
  albumCommentStatNum: number
}
// 声音信息列表接口
export interface TrackInfoListInterface {
  albumId: number
  albumTitle: string
  trackId: number
  trackTitle: string
  coverUrl: string
  mediaDuration: number
  status: string
  playStatNum: number
  collectStatNum: number
  praiseStatNum: number
  albumCommentStatNum: number
}
