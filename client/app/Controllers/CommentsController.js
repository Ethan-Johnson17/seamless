import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

function _draw() {
  let template = ''
  const comments = ProxyState.comments
  setTimeout(() => {
    comments.forEach(c => {
      template += `
    <div class="col-md-12">
        <div class="d-flex">
        <img src="${c.creator.picture}" alt="">
        <small>${c.creator.name}</small>
      </div>
      <p>${c.body}</p>
      </div>
      </div>
    `
    })
    document.getElementById('comments').innerHTML = template
  }, 100)
}

export class CommentsController {
  constructor() {
    logger.log('comments controller is working')
    // this.getComments()
    ProxyState.on('comments', _draw)
  }

  async getComments(postId) {
    try {
      await commentsService.getComments(postId)
    } catch (error) {
      logger.error('[get comments]', error.message)
    }
  }

  async makeComment(postId) {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const commentData = {
        // @ts-ignore
        body: form.body.value
      }
      await commentsService.makeComment(commentData, postId)
    } catch (error) {
      console.error(error)
    }
  }
}
