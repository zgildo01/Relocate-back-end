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

export {
  create,
}