import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoListItemSchema = new Schema({
  done: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true;
})

const todoListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  todoListItems: [todoListItemSchema]
}, {
  timestamps: true;
})

const TodoList = mongoose.model('TodoList', todoListSchema)

export {
  TodoList
}