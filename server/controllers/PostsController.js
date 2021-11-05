import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const posts = await postsService.getAll(query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // cannot modify creatorId with body
      req.body.creatorId = req.userInfo.id
      // cannot initially send fake likes
      req.body.likes = 1
      const post = await postsService.create(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
