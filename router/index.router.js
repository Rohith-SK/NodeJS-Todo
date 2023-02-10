const express = require("express");
const {
  registerController,
  loginController,
  getUserController,
} = require("../controller/authorization.controller");
const { introController } = require("../controller/intro.controller");
const {
  todoController,
  getTodoController,
  getAllTodoController,
  deleteTodoController,
  todoUpdateController,
  userUpdateController,
  otpController,
  otpVerifyController,
} = require("../controller/todo.controller");
const {
  introValidator,
  userRegValidator,
  userLoginValidator,
  otpVerifyValidator,
  otpValidator,
} = require("../services/requestValidator.services");
const { tokenAuthorization } = require("../services/token.service");
const app = express();

app.get("/intro", introValidator, introController);
app.post("/userRegister", userRegValidator, registerController);
app.post("/userLogin", userLoginValidator, loginController);
app.get("/userDetails", tokenAuthorization, getUserController);
app.put("/userUpdation", tokenAuthorization, userUpdateController);

app.post("/todoCreation", tokenAuthorization, todoController);
app.get("/getTodo", tokenAuthorization, getTodoController);
app.get("/getAllTodo", tokenAuthorization, getAllTodoController);
app.put("/todoUpdation", tokenAuthorization, todoUpdateController);
app.delete("/deleteTodo", tokenAuthorization, deleteTodoController);

app.post("/sendOtp", otpValidator, otpController);
app.get("/verifyOtp", otpVerifyValidator, otpVerifyController);

module.exports = app;
