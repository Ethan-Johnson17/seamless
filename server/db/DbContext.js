import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PostSchema } from '../models/Post'
import { ValueSchema } from '../models/Value'
import { CommentSchema } from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Posts = mongoose.model('Post', PostSchema)

  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
