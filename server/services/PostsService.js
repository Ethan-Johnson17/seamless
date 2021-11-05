import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async create(newPost) {
    const post = await dbContext.Posts.create(newPost)
    return post
  }
}

export const postsService = new PostsService()
