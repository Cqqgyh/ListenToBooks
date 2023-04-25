// 搜索参数
export interface SearchParamsInterface {
  keyword: string;
  category1Id?: number | null;
  category2Id?: number | null;
  category3Id?: number | null;
  attributeList?: string[] | null;
  order?: string | null;
  pageNo?: number;
  pageSize?: number;
}
// 搜索结果item向接口
export interface SearchItemInterface {
  id: number;
  albumTitle: string;
  albumIntro: string;
  announcerName: string;
  coverUrl: string;
  includeTrackCount: number;
  isFinished: string;
  payType: string
  createTime: string;
  playStatNum: number;
  collectStatNum: number;
  buyStatNum: number;
  commentStatNum: number;
}
// 分页请求响应接口
export interface SearchPageResponseInterface<T> {
  list: T
  total: number
  pageSize: number
  pageNo: number
  totalPages: number
}
export interface MenuInterface extends Record<string, any>{
  title: string;
  type: string;
  children?: FilterItemInterface[];
}
export interface FilterInterface {
  title: string;
  type: string;
  children: FilterItemInterface[];
}

export interface FilterItemInterface {
  title: string;
  type: string;
  value: number | null;
  options: RadioOptionInterface[];
}

export interface RadioOptionInterface {
  label: string;
  value: number | null;
  attributeId?:number |string
}
