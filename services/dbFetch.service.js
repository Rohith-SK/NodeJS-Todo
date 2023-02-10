const otpModel = require("../model/otp.model");
const todoModel = require("../model/todo.model");
const userModel = require("../model/user.model");

exports.getUserData_Email = (email) => userModel.findOne({ email });
exports.getUserData_MobileNo = (mobileNo) => userModel.findOne({ mobileNo });
exports.getUserData_UserName = (userName) => userModel.findOne({ userName });
exports.getUserData_Id = (_id) => userModel.findOne({ _id });

exports.getTodo = (_id) => todoModel.findOne({ _id });
exports.getAllTodo = () => todoModel.find();

exports.getOtp = (otp) => otpModel.findOne({ otp });
