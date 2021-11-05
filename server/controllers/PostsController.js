import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
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

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      return res.send(post)
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

  async edit(req, res, next) {
    req.body.creatorId = req.userInfo.id
    req.body.id = req.params.id
    const post = await postsService.edit(req.body)
    return res.send(post)
  }

  async remove(req, res, next) {
    try {
      await postsService.remove(req.params.id, req.userInfo.id)
      return res.send('post removed')
    } catch (error) {
      next(error)
    }
  }
}
