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
// 声音信息接口
export interface TrackInfoInterface extends AnyInterface {
  id?: number | string
  albumId?: number | string
  mediaFileId: string
  mediaUrl: string
  trackTitle: string
  trackIntro: string
  coverUrl: string
  trackRichIntro?: string
  isOpen: number | string
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
  userId?: number | string
}
// 分页查询声音需要专辑信息
export interface TrackInfoQueryInterface {
  trackTitle?: string
  status?: string
  userId?: number | string
}
// 分页接口
export interface WorksInfoPageInterface {
  page: number
  limit: number
  status: string
  [propName: string]: any
}
// 专辑列表信息接口
export interface AlbumInfoListInterface{
  albumId: number
  albumTitle: string
  coverUrl: string
  includeTrackCount: number
  isFinished: string
  status: string
  playStatNum: number
  subscribeStatNum: number
  buyStatNum: number
  commentStatNum: number
  id?: number | string
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
  commentStatNum: number
}
// 分页请求响应接口
export interface PageResponseInterface<T> {
  records: T
  total: number
  size: number
  current: number
  pages: number
}
// 专辑详情接口
export interface AnnouncerInterface {
  id: number;
  wxOpenId: string;
  nickname: string;
  avatarUrl: string;
  isVip: number;
  vipExpireTime: null | string;
}

export interface AlbumInterface {
  id: number;
  createTime: string;
  userId: number;
  albumTitle: string;
  category3Id: number;
  albumIntro: string;
  coverUrl: string;
  includeTrackCount: number;
  isFinished: string;
  estimatedTrackCount: number;
  albumRichIntro: string;
  qualityScore: string;
  payType: string;
  priceType: string;
  price: number;
  discount: number;
  vipDiscount: number;
  tracksForFree: number;
  secondsForFree: number;
  buyNotes: null | string;
  sellingPoint: null | string;
  isOpen: string;
  status: string;
  albumAttributeValueVoList: {
    id: number;
    createTime: string;
    albumId: number;
    attributeId: number;
    valueId: number;
    attributeName: null | string;
    valueName: null | string;
  }[];
}

export interface AlbumStatVoInterface {
  albumId: null | number;
  playStatNum: number;
  subscribeStatNum: null | number;
  buyStatNum: number;
  commentStatNum: null | number;
}

export interface BaseCategoryViewInterface {
  id: number;
  createTime: string;
  category1Id: number;
  category1Name: string;
  category2Id: number;
  category2Name: string;
  category3Id: number;
  category3Name: string;
}

export interface AlbumDetailInterface {
  announcer: AnnouncerInterface;
  albumInfo: AlbumInterface;
  albumStatVo: AlbumStatVoInterface;
  baseCategoryView: BaseCategoryViewInterface;
  isSubscribe: boolean;
  startPlayTrackId: null | number;
}
// 专辑声音接口
export interface TrackInterface {
  trackId: number;
  trackTitle: string;
  mediaDuration: number;
  albumCommentStatNum: number;
  orderNum: number;
  playStatNum: number;
  commentStatNum: number;
  createTime: string;
  isShowPaidMark: boolean;
  isChecked?: boolean;
  isPlaying?: boolean;
}
// 专辑声音列表查询参数
export interface QueryTrackInterface {
  albumId: number | string;
  page: number;
  limit: number;
}


export interface TrackStaVoInterface {
  playStatNum: number;
  collectStatNum: number;
  praiseStatNum: number;
  commentStatNum: number;
}
// 订阅专辑列表接口
export interface SubscribeAlbumsInterface {
  albumId: number;
  createTime: string;
  albumTitle: string;
  coverUrl: string;
  includeTrackCount: number;
  isFinished: string;
}
// 订阅专辑列表接口
export interface CollectTrackInterface {
  trackId?: number;
  createTime?: string;
  trackTitle?: string;
  coverUrl?: string;
}
// 历史声音接口
export interface HistoryTrackInterface {
  albumId?: number;
  albumTitle?: string;
  trackId?: number;
  trackTitle?: string;
  coverUrl?: string;
  mediaDuration?: number;
  breakSecond?: number;
  playRate?: string;
  id?:number | string
}
// 弹出框接口配置
export interface DialogInterface {
  type: string,
  title: string,
  content: string,
  cancelText: string,
  confirmText:string
}


export interface TrackStaVoInterface {
  playStatNum: number;
  collectStatNum: number;
  praiseStatNum: number;
  commentStatNum: number;
}

export interface ProcessParams {
  albumId: number;
  trackId: number;
  breakSecond: number;
}
