import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async getByPostId(body) {
    const comments = await dbContext.Comments.find(body).populate('creator', 'name picture')
    return comments
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }

  async remove(id, userId) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('This comment does not exist')
    }
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('You do not have access')
    }
    return comment.remove()
  }
}

export const commentsService = new CommentsService()
