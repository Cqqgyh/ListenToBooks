// 分类
export interface CategoryTreeInterface{
  categoryId: number;
  categoryName: string;
  categoryChild?: CategoryTreeInterface[];
}
// 常规树属性
export interface CategoryTreePropsInterface extends Record<string, any>{
  id: number;
  name: string;
  children?: CategoryTreePropsInterface[];
}
// 频道页商品数据类型接口
export interface GoodsInterface {
  id: number;
  albumTitle: string;
  albumIntro: string;
  announcerName: string;
  coverUrl: string;
  includeTrackCount: number;
  isFinished: string;
  payType: string;
  createTime: string;
  category1Id: number;
  category2Id: number;
  category3Id: number;
  playStatNum: number;
  collectStatNum: number;
  buyStatNum: number;
  commentStatNum: number;
  hotScore: number;
  attributeValueIndexList: null;
}
// 获取频道页数据类型接口
export interface ChannelInterface {
  baseCategory3: {
    id: number;
    createTime: string;
    name: string;
    category2Id: number;
    orderNum: number;
    isTop: number;
  };
  list: GoodsInterface[];
}
