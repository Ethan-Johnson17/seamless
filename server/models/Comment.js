import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema({
  body: { type: String, required: true },
  likes: { type: Number, required: true, default: 1 },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  creatorId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

CommentSchema.virtual('post', {
  localField: 'postId',
  ref: 'Post',
  foreignField: '_id',
  justOne: true
})
