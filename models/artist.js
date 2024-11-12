import { Schema, model } from "mongoose";


const artistSchema = new Schema({
  artistName: {
    type: String,
    required: true
  },
  yearFounded: {
    type: Number
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

  //Defining Indexes
  artistSchema.index({artistName: "text", yearFounded: Number, bestAlbum: "text", genre: "text"}) 


  //Defining Static Model Method
  artistSchema.statics.findByName = function(name) {
    return this.find({artistName: name})
  }

  export default model('Artist', artistSchema)