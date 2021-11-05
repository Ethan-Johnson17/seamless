import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const PostSchema = new Schema({
  tag: { type: String, enum: ['NATURE', 'SPORTS', 'VIDEO-GAMES', 'TECH', 'NEWS', 'WRITING', 'OTHER'], required: true, default: 'OTHER' },
  body: { type: String, required: true, default: '' },
  image: { type: String, required: true, default: 'https://assets.unenvironment.org/styles/article_billboard_image/s3/2021-05/alberta-2297204_1920.jpg?h=1483c54f&amp;itok=GdjA9GRu' },
  likes: { type: Number, required: true, default: 1 },
  creatorId: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
