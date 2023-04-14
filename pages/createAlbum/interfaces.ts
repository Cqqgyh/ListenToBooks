// 专辑属性值接口
export interface AlbumAttributeValueVoListInterface {
  attributeId: number
  valueId: number
}
export interface AttributeInterface {
  attributeId: number | string
  id: number | string
  valueName: string
  [propName: string]: any
}
export interface AttributeListInterface {
  id: number | string
  attributeName: number | string
  attributeValueList: AttributeInterface[]
  [propName: string]: any
}
// 专辑信息接口
export interface AlbumInfoInterface {
  albumTitle: string
  category3Id: number | string
  albumIntro: string
  coverUrl: string
  albumRichIntro: string
  // 付费必填
  payType: string
  priceType: string
  price: number | string
  discount: number | string
  vipDiscount: number | string
  tracksForFree: number | string
  isOpen: number | string
  albumAttributeValueVoList: AlbumAttributeValueVoListInterface[]
}
// 分类列表接口
export interface CategoryListInterface {
  categoryName: string
  categoryId: string | number
}
