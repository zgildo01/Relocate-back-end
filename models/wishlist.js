import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistItemSchema = new Schema({
  purchased: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  linkToItem: {
    type: String,
    required: true,
  },
  photo: String,
})

const wishlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  wishlistItems: [wishlistItemSchema]
}, {
  timestamps: true,
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export {
  Wishlist
}