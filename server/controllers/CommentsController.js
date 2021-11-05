import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('/:id/comments', this.getByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:id/comments', this.create)
      .delete('/:id/comments', this.remove)
  }

  async getByPostId(req, res, next) {
    try {
      req.body.postId = req.params.id
      const comments = await commentsService.getByPostId(req.body)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.postId = req.params.id
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      req.body.postId = req.params.id
      const comment = await commentsService.remove(req.body.id, userId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
