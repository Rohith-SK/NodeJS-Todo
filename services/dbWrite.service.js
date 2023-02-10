const otpModel = require("../model/otp.model");
const todoModel = require("../model/todo.model");
const userModel = require("../model/user.model");

exports.userCreation = (data) => new userModel(data).save();
exports.userUpdation = (data) => userModel.updateOne(data);

exports.todoCreation = (data) => new todoModel(data).save();
exports.todoUpdation = (data) => todoModel.updateOne(data);

exports.otpSave = (data) => new otpModel(data).save();
exports.otpUpdation = (data) => otpModel.updateOne(data);
