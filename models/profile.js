import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  wishlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Wishlist'
  }],
  todoLists: [{
    type: Schema.Types.ObjectId,
    ref: 'TodoList'
  }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
