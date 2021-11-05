import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query)
      .populate('creator', 'name picture')
    return posts
  }

  async getById(id) {
    const found = await dbContext.Posts.findById(id)
      .populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('NOTHING FOUND')
    }
    return found
  }

  async create(newPost) {
    const post = await dbContext.Posts.create(newPost)
    return post
  }

  async remove(id, userId) {
    const found = await this.getById(id)
    if (found.creatorId.toString() !== userId) {
      throw new Forbidden('Access Denied')
    }
    await dbContext.Posts.findByIdAndDelete(id)
  }
}

export const postsService = new PostsService()
