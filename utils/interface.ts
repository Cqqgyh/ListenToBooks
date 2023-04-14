type RequestOptionsMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
export interface RequestOptions {
  method?: RequestOptionsMethod
  data?: object
  url?: string
}

export interface UserInfo {
  nickName: string
  avatarUrl: string
}

export interface AnyType {
  data: any
}

export interface RequestResponse<T = any> {
  code: number
  message: string
  success: boolean
  data?: T
}

export interface AxiosResponse<T = RequestResponse> {
  data: T;
  statusCode: number;
  statusText?: string;
}