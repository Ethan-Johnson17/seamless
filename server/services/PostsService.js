import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query)
      .populate('creator', 'name picture')
    return posts
  }

  async create(newPost) {
    const post = await dbContext.Posts.create(newPost)
    return post
  }
}

export const postsService = new PostsService()
