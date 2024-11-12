import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  artistRecommendation: {
    type: String,
    required: true
  },
  bestAlbum: {
    type: String,
    required: true
  },
  bestSong: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model('Post', postSchema)