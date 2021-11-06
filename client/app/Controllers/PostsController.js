import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let lgRow = ''
  let mdRow = ''
  let smRow = ''
  ProxyState.posts.forEach(p => {
    if (p.size() === '1') {
      smRow += p.Template
    } else if (p.size() === '2') {
      mdRow += p.Template
    } else {
      lgRow += p.Template
    }
  })
  document.getElementById('lg').innerHTML = lgRow
  document.getElementById('md').innerHTML = mdRow
  document.getElementById('sm').innerHTML = smRow
}

function _drawModal(post) {
  document.getElementById('postStuff').innerHTML = post.ModalTemplate
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    this.getPosts()
    _drawPosts()
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      logger.error('[get posts]', error.message)
    }
  }

  async getPostData(postId) {
    try {
      const post = await postsService.getPostById(postId)
      await commentsService.getCommentsByPostId(postId)
      _drawModal(post)
    } catch (error) {
      logger.error(error)
    }
  }

  async createPost() {
    window.event.preventDefault()
    try {
      const form = window.event.target
      const newPost = {
        image: form.image.value,
        body: form.body.value,
        tag: form.flexRadioDefault.value
      }
      logger.log(newPost)
      await postsService.createPost(newPost)
      form.reset()
    } catch (error) {
      logger.log(error.message)
    } finally {
      bootstrap.Modal.getOrCreateInstance('#exampleModal').hide()
    }
  }
}
