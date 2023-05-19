
export interface ICommentParams {
  page: number
  limit: number
  albumId: number | string
  trackId: number | string
}
// 专辑评论接口
export interface CommentInterface  {
  id: string;
  albumId: number;
  userId: number;
  nickname: string;
  avatarUrl: string;
  content: string;
  replyCommentId: string;
  praiseCount: number;
  albumCommentScore: number;
  deleteMark:string;
  createTime: string;
  isPraise: boolean;
  replyCommentList: CommentInterface[] | null;
  parent: CommentInterface;
  replyRelevantInformation:{
    replyPlaceholder: string;
    replyCommentId: string;
    replyContent: string;
  }
}
// 分页请求响应接口
export interface PageResponseInterface<T> {
  records: T
  total: number
  size: number
  current: number
  pages: number
}
