import { logger } from '../Utils/Logger.js'
import { api } from '../Services/AxiosService.js'
import { Comment } from '../Models/Comment.js'
import { ProxyState } from '../AppState.js'

class CommentsService {
  async getComments(postId) {
    const res = await api.get(`api/posts/${postId}/comments`)
    logger.log(res.data)
  }

  async makeComment(commentData, postId) {
    const res = await api.post(`api/posts/${postId}`, commentData)
    const comment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, comment]
  }

  async getCommentsByPostId(postId) {
    const res = await api.get(`api/posts/${postId}/comments`)
    ProxyState.comments = res.data
  }
}

export const commentsService = new CommentsService()
