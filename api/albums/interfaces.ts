// 专辑属性值接口
export interface AlbumAttributeValueVoListInterface {
  attributeId: number
  valueId: number
  valueName:string
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
export interface AlbumInfoInterface extends AnyInterface{
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
