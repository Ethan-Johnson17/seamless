import { ProxyState } from '../AppState.js'
import { logger } from '../Utils/Logger.js'
import { api } from '../Services/AxiosService.js'
import { Post } from '../Models/Post.js'

class PostsService {
  constructor() {
    logger.log('service is here')
  }

  async getPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    const posts = res.data.map(p => new Post(p))
    ProxyState.posts = posts
  }
}

export const postsService = new PostsService()
