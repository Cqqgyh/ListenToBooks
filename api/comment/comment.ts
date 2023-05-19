import Service from "../../utils/request"

import { CommentInterface, ICommentParams, PageResponseInterface } from "./interfaces"

class Comment extends Service {

  /**
   * @description 专辑评论列表
   * @param  {SearchParamsInterface} params 二级分类Id
   */
  getCommentList(params: ICommentParams) {
    return this.get<PageResponseInterface<CommentInterface[]>>({
      url: `/api/comment/findCommentPage/${params.albumId}/${params.trackId}/${params.page}/${params.limit}`
    })
  }

  /**
   * @description 点赞与取消点赞评论
   * @param albumId
   * @param commentId
   */
  praiseComment(albumId: number, commentId: string) {
    return this.get({
      url: `/api/comment/praise/${albumId}/${commentId}`,
      loading:false,
    })
  }
  /**
   * @description 新增评论接口
   * @param albumId
   * @param replyCommentId
   * @param content
   * @param albumCommentScore
   * @param trackId
   */
  addComment(albumId: number | string,trackId: string, replyCommentId: string, content: string,albumCommentScore: number = 10) {
    return this.post({
      url: `/api/comment/save`,
      data: {
        albumId,
        replyCommentId,
        content,
        albumCommentScore,
        trackId
      }
    })
  }
  /**
   * @description 删除评论
   * @param albumId
   * @param commentId
   */
  deleteComment(albumId: number, commentId: string) {
    return this.get({
      url: `/api/comment/remove/${albumId}/${commentId}`,
    })
  }

}



export const commentService = new Comment()
