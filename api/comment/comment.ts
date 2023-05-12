import Service from '../../utils/request'

import { ICommentParams } from './interfaces'
class Comment extends Service {

  /**
   * @description 专辑评论列表
   * @param  {SearchParamsInterface} params 二级分类Id
   */
  getCommentList(params: ICommentParams) {
    return this.get({
      url: `/api/comment/findCommentPage/${params.albumId}/${params.page}/${params.limit}`,
    })
  }

}

export const commentService = new Comment()
