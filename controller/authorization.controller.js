const {
  isEmailExist,
  userRegister,
  isMobExist,
  isuserNameExist,
} = require("../helper/authorization.helper");
const userModel = require("../model/user.model");
const { getUserData_Email } = require("../services/dbFetch.service");

const { statusResponse } = require("../util/static.util");
const {
  getUserData_UserName,
  getUserData_Id,
} = require("../services/dbFetch.service");
const {
  responseError,
  encryptPassword,
  decryptPassword,
  responseSuccess,
} = require("../util/tools.util");
const { tokenGenerator } = require("../services/token.service");

exports.registerController = async (req, res) => {
  try {
    const { email, mobileNo, userName, password } = req.body;
    const [emailExist, mobileNoExist, userNameExist] = await Promise.all([
      isEmailExist(email),
      isMobExist(mobileNo),
      isuserNameExist(userName),
    ]);

    if (emailExist)
      throw { ...statusResponse.DATA_EXIST, message: `Email Already exist` };
    if (mobileNoExist)
      throw { ...statusResponse.DATA_EXIST, message: `mobileNo Already exist` };
    if (userNameExist)
      throw { ...statusResponse.DATA_EXIST, message: `userName Already exist` };

    const [reg_err, reg_succ] = await userRegister({
      ...req.body,
      password: encryptPassword(password),
    });

    if (reg_err) throw statusResponse.CREATION_FAILED;

    return responseSuccess(res, statusResponse.SUCCESS_MSG);
  } catch (error) {
    responseError(res, error);
  }
};

exports.loginController = async (req, res) => {
  const {
    body: { userName, password },
  } = req;
  const user = await getUserData_UserName(userName);

  if (!user)
    throw { ...statusResponse.INVALID_ENTITY, msg: `Invalid UserName` };

  try {
    const {
      body: { userName, password },
    } = req;
    const user = await getUserData_UserName(userName);

    if (!user)

      responseSuccess(res, {
        message: `Login Successfully`,
        token: token,
      });
  } catch (error) {
    responseError(res, error);
  };
};

exports.getUserController = async (req, res) => {
  try {
    const { user } = req;

    const userData = await getUserData_Id(user._id);
    responseSuccess(res, {
      userData,
    });
  } catch (error) {
    responseError(res, error);
  }
};

/*
1. otp generate 
2. otp send & store in db : 
3. db - isMobile,isEmail verifed,
4.otp check - otp receive vs otp in db

*/
