const todoModel = require("../model/todo.model");
const userModel = require("../model/user.model");


exports.deleteTodo = (_id) => todoModel.deleteOne({ _id });