import { Profile } from '../models/profile.js'
import { Wishlist } from '../models/wishlist.js'

const create = async (req,res) => {
  try {
    const wishlist = await Wishlist.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { wishlists: wishlist } },
      { new: true }
    )
      res.status(201).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile).populate('wishlists')
    let wishlists = profile.wishlists
    res.status(200).json(wishlists)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req,res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req,res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(wishlist)
  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteWishlist = async (req ,res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.wishlists.remove({_id: req.params.id })
    await profile.save()
    res.status(200).json(wishlist)
  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
}

const createItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id)
    wishlist.wishlistItems.push(req.body)
    await wishlist.save()
    const newItem = wishlist.wishlistItems.at(-1)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlistId)
    wishlist.wishlistItems.remove({ _id: req.params.itemId })
    await wishlist.save()
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlistId)
    console.log(wishlist)
    const item = wishlist.wishlistItems.id(req.params.itemId)
    console.log(item)
    item.purchased = req.body.purchased
    item.price = req.body.price
    item.name = req.body.name
    item.height = req.body.height
    item.width = req.body.width
    item.length = req.body.length
    item.linkToItem = req.body.linkToItem
    item.photo = req.body.photo
    await wishlist.save()
    res.status(200).json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteWishlist as delete,
  createItem,
  deleteItem,
  updateItem,
}