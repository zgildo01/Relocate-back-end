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
    const profile = await Profile.findById(req.user.profile).populate('todoLists')
    let todolists = profile.todoLists
    res.status(200).json(todolists)
  } catch (error) {
    console.log(error)
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
    const profile = await Profile.findById(req.user.profile)
    profile.todoLists.remove({_id: req.params.id })
    await profile.save()
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
    const newItem = todolist.todoListItems.at(-1)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteItem = async (req, res) => {
  try {
    const todolist = await TodoList.findById(req.params.todolistId)
    todolist.todoListItems.remove({ _id: req.params.itemId })
    await todolist.save()
    res.status(200).json(todolist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const updateItem = async (req, res) => {
  try {
    const todolist = await TodoList.findById(req.params.todolistId)
    const item = todolist.todoListItems.id(req.params.itemId)
    item.done = !item.done
    todolist.save()
    res.status(200).json(todolist)
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
  deleteTodolist as delete,
  createItem,
  deleteItem,
  updateItem,
}