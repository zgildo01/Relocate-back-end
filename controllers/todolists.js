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

const deleteTodolist = async (req, res) => {
  try {
    const todolist = await TodoList.findByIdAndUpdate(req.params.id)
    res.status(200).json(todolist)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createItem = async (req, res) => {
  try {
    const todolist = await TodoList.findById(req.params.id)
    todolist.todoListItems.push(req.body)
    await todolist.save()
    const newItem = [todolist.todoListItems.length - 1]
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const todolist = await TodoList.findById(req.url.todolistId)
    todolist.todoListItems.filter((item) => {
      return item._id !== req.url.itemId
    })
    await todolist.save()
    res.status(201).json(todolist)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteTodolist as delete,
  createItem,
  deleteItem,
}