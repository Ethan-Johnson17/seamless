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

  async edit(body) {
    const post = await this.getById(body.id)
    if (post.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Access Denied')
    }
    const update = dbContext.Posts.findByIdAndUpdate(body.id, body, { new: true })
    return update
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
