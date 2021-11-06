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

  async getPostById(postId) {
    const foundPost = ProxyState.posts.find(p => p.id === postId)
    logger.log('found Post', foundPost)
    ProxyState.foundPost = new Post(foundPost)
    return foundPost
  }

  // async query(str){
  //   const
  // }
}

export const postsService = new PostsService()
