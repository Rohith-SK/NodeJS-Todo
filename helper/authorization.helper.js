const {
  getUserData_Email,
  getUserData_MobileNo,
  getUserData_UserName,
} = require("../services/dbFetch.service");
const { userCreation } = require("../services/dbWrite.service");

exports.isEmailExist = async (email) => {
  const data = await getUserData_Email(email);
  return data ? true : false;
};

exports.isMobExist = async (mobileNo) => {
  const data = await getUserData_MobileNo(mobileNo);
  return data ? true : false;
};
exports.isuserNameExist = async (userName) => {
  const data = await getUserData_UserName(userName);
  return data ? true : false;
};

exports.userRegister = async ({
  name,
  email,
  mobileNo,
  userName,
  password,
}) => {
  try {
    const data = await userCreation({
      name,
      email,
      mobileNo,
      userName,
      password,
    });
    if (!data) throw new Error(`error occured while on creation`);
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};
