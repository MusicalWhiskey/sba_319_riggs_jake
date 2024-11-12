import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  artistRecommendation: {
    type: String,
    required: true
  },
  yourFavoriteSong: {
    type: String,
    required: true
  },
  likes: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model('Post', postSchema)