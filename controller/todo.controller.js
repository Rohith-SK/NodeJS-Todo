const generateOTP = require("../helper/otp");
const otpModel = require("../model/otp.model");
const userModel = require("../model/user.model");
const { deleteTodo } = require("../services/dbDelete.services");
const {
  getTodo,
  getAllTodo,
  getUserData_Id,
  getOtp,
  getUserData_Email,
} = require("../services/dbFetch.service");
const {
  todoCreation,
  todoUpdation,
  userUpdation,
  otpSave,
  otpUpdation,
} = require("../services/dbWrite.service");
const { statusResponse } = require("../util/static.util");
const {
  responseError,
  responseSuccess,
  dateFormat,
} = require("../util/tools.util");

exports.todoController = async (req, res) => {
  try {
    const {
      body: { name, status },
      user,
    } = req;
    const data = await todoCreation({
      name,
      createdBy: user._id,
      status,
    });
    if (!data) throw new Error(`error occured while on creation`);
    return responseSuccess(res, statusResponse.SUCCESS_MSG);
  } catch (error) {
    responseError(res, error);
  }
};

exports.getTodoController = async (req, res) => {
  try {
    const {
      user,
      query: { todoId },
    } = req;
    console.log(todoId);
    const data = await getTodo(todoId);
    if (!data) throw statusResponse.NODATA;
    if (data.createdBy != user._id) throw statusResponse.NOT_AUTHORIZED;

    responseSuccess(res, {
      todo: {
        todoId: data._id,
        name: data.name || "",
        status: data.status || "",
        createdDate: dateFormat(data?.createdAt || null),
      },
    });
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

exports.getAllTodoController = async (req, res) => {
  try {
    const data = await getAllTodo();
    if (!data) throw statusResponse.NODATA;

    const todo = {
      todoId: data._id,
      name: data.name || "",
      status: data.status || "",
      createdDate: dateFormat(data?.createdAt || null),
    };
    return responseSuccess(res, todo);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

exports.deleteTodoController = async (req, res) => {
  // user isOwner ?delete:error message
  try {
    const {
      user,
      query: { todoId },
    } = req;

    const todoData = await getTodo(todoId);
    if (!todoData) throw statusResponse.NODATA;
    if (todoData.createdBy != user._id) throw statusResponse.NOT_AUTHORIZED;
    const data = await deleteTodo(todoId);
    if (data.deletedCount === 1) {
      return { ...statusResponse.SUCCESS_MSG, message: "Deleted Successfully" };
    } else {
      return {
        ...statusResponse.BAD_RQST,
        message: "Not Deleted Successfully",
      };
    }
  } catch (error) {
    responseError(res, error);
  }
};
exports.todoUpdateController = async (req, res) => {
  // user isOwner ?delete:error message
  try {
    const {
      user,
      query: { todoId },
      body: { status, name },
    } = req;
    // console.log(status);
    // const todoData = await getTodo(todoId);
    // if (!todoData) throw statusResponse.NODATA;
    // if (todoData.createdBy != user._id) throw statusResponse.NOT_AUTHORIZED;
    const updatedData = {
      updatedBy: user._id,
    };
    if (name) updatedData.name = name;
    if (status) updatedData.status = status;

    const data = await todoUpdation(
      {
        _id: todoId,
        createdBy: user._id,
      },
      {
        $set: updatedData,
      }
    );
    // if (data.deletedCount === 1) {
    //   return { ...statusResponse.SUCCESS_MSG, message: "Deleted Successfully" };
    // }
    return res.send(data);
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

exports.userUpdateController = async (req, res) => {
  try {
    const {
      user,
      body: { password, userName },
    } = req;
    const email = user.email;
    const userData = await getUserData_Id(user._id);
    if (!userData) throw statusResponse.NODATA;
    userName ? userName : userData.userName;
    password ? password : userData.password;

    const updatedData = {
      updatedBy: "user",
      password,
      userName,
    };

    const data = await userUpdation(
      {
        email,
      },
      {
        $set: updatedData,
      }
    );
    if (data.acknowledged) {
      responseSuccess(res, { message: "Updated Successfully" });
    } else {
      responseError(res, { message: "Update failed" });
    }
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

exports.otpController = async (req, res) => {
  try {
    const {
      body: { field, type },
    } = req;
    const userData = await getUserData_Email(field);
    if (type !== "email" && type !== "phoneNumber")
      throw { ...statusResponse.BAD_RQST, message: "Invalid Field" };
    const otp = generateOTP();
    const data = await otpSave({
      otp,
      field,
      type,
      createdBy: userData._id,
    });
    if (!data) throw new Error(`error occured while on creation`);
    return responseSuccess(res, {
      ...statusResponse.SUCCESS_MSG,
      message: `Otp is ${otp}`,
    });
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

exports.otpVerifyController = async (req, res) => {
  try {
    const {
      body: { otp, field, type },
    } = req;

    const otpData = await getOtp(otp);
    const userotp = otpData.otp;
    const userData = await getUserData_Email(field);

    if (otpData.createdBy != userData._id) throw statusResponse.NOT_AUTHORIZED;
    if (otpData.type != type)
      throw {
        ...statusResponse.INVALID_ENTITY,
        message: `Enter otp for ${otpData.type}`,
      };

    const { isVerified } = userData;

    isVerified[type] = true;
    console.log(isVerified);

    if (userotp === otp) {
      const data = await userModel.updateOne(
        { _id: userData._id },
        { $set: { isVerified } }
      );

      console.log(data);
      if (data.modifiedCount == 1) {
        throw { ...statusResponse.SUCCESS_MSG, message: `Otp verified` };
      } else {
        throw statusResponse.BAD_RQST;
      }
    } else {
      throw {
        ...statusResponse.INVALID_ENTITY,
        message: `Invalid otp`,
      };
    }
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};
