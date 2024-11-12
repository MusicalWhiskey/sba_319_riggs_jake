import { Schema, model } from 'mongoose'

const artistSchema = new Schema({
    _id:{
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    bestAlbum: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    }
  })



export default model('Artist', artistSchema)