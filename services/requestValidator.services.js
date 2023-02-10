const { statusResponse } = require("../util/static.util");
const {
  responseError,
  isEmptyObj,
  validateEmail,
} = require("../util/tools.util");

exports.introValidator = (req, res, next) => {
  try {
    const {
      body: { userName },
    } = req;

    if (!userName) throw { status: 400, message: "Bad Credentials" };

    next();
  } catch (error) {
    responseError(res, error);
  }
};

exports.userRegValidator = (req, res, next) => {
  try {
    const {
      body: { name, email, mobileNo, userName, password },
    } = req;

    if (isEmptyObj(req.body)) throw statusResponse.BAD_RQST;
    console.log(req.body);
    if (!name || name.length <= 3 || name.length >= 50)
      throw { ...statusResponse.BAD_RQST, message: `Invalid name` };

    if (!userName || userName.length <= 3 || userName.length >= 50)
      throw { ...statusResponse.BAD_RQST, message: `Invalid userName` };

    if (!password || password.length <= 5 || password.length >= 50)
      throw { ...statusResponse.BAD_RQST, message: `Invalid password` };

    if (!email || !validateEmail(email))
      throw { ...statusResponse.BAD_RQST, message: `Invalid email` };

    if (!mobileNo || mobileNo.length != 10)
      throw { ...statusResponse.BAD_RQST, message: `Invalid mobileNo` };

    next();
  } catch (error) {
    responseError(res, error);
  }
};

exports.userLoginValidator = (req, res, next) => {
  try {
    const {
      body: { userName, password },
    } = req;
    if (!userName)
      throw { ...statusResponse.BAD_RQST, message: `Invalid username` };
    if (!password)
      throw { ...statusResponse.BAD_RQST, message: `Invalid password` };
    next();
  } catch (error) {
    responseError(res, error);
  }
};
exports.otpVerifyValidator = async (req, res, next) => {
  try {
    const {
      body: { otp, field, type }
    } = req;
    if (!otp) throw { ...statusResponse.BAD_RQST, message: `otp missing` };

    if (type == "email") {
      if (!field || !validateEmail(field)) {
        throw { ...statusResponse.BAD_RQST, message: `Invalid email` };
      }
    }
    else if (type == "mobileNo") {
      if (!field || field.length != 10)
        throw { ...statusResponse.BAD_RQST, message: `Invalid mobileNo` };
    }
    else {
      throw { ...statusResponse.BAD_RQST, message: `Invalid ${type}` };
    }
    next();
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};


exports.otpValidator = async (req, res, next) => {
  try {
    const {
      body: { field, type }
    } = req;

    if (type == "email") {
      if (!field || !validateEmail(field)) {
        throw { ...statusResponse.BAD_RQST, message: `Invalid email` };
      }
    }
    else if (type == "mobileNo") {
      if (!field || field.length != 10)
        throw { ...statusResponse.BAD_RQST, message: `Invalid mobileNo` };
    }
    else {
      throw { ...statusResponse.BAD_RQST, message: `Invalid ${type}` };
    }
    next();
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};

// exports.userUpdateValidator = (req, res, next) => {
//   try {
//     const {
//       headers: { token },
//     } = req;
//     if (!token) throw { ...statusResponse.BAD_RQST, message: "Token missing" };
//     next();
//   } catch (error) {
//     responseError(res, error);
//   }
// };
