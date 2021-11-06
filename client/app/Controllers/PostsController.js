import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let lgRow = ''
  let mdRow = ''
  let smRow = ''
  ProxyState.posts.forEach(p => {
    if (p.size() === '2') {
      smRow += p.Template
    } else if (p.size() === '4') {
      mdRow += p.Template
    } else {
      lgRow += p.Template
    }
  })
  document.getElementById('lg').innerHTML = lgRow
  document.getElementById('md').innerHTML = mdRow
  document.getElementById('sm').innerHTML = smRow
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    // this.getPosts()
    _drawPosts()
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      logger.error('[get posts]', error.message)
    }
  }
}
