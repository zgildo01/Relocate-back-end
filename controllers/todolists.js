import { Profile } from "../models/profile.js"
import { TodoList } from "../models/todolist.js"

const create = async (req, res) => {
  try {
    const todolist = await TodoList.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { todoLists: todolist} },
      { new: true }
    )
    res.status(201).json(todolist)
  } catch (error) {
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const todolists = await TodoList.find({})
    .sort({ name: 'desc' })
    res.status(200).json(todolists)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const todolist = await TodoList.findById(req.params.id)
    res.status(200).json(todolist)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const todolist = await TodoList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(todolist)
  } catch (error) {
    
  }
}

export {
  create,
  index,
  show,
  update,
}