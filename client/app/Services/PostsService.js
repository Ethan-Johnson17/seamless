import { ProxyState } from '../AppState.js'
import { logger } from '../Utils/Logger.js'

class PostsService {
  constructor() {
    logger.log('service is here')
  }
}

export const postsService = new PostsService()
