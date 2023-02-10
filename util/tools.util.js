const bcrypt = require("bcrypt");
exports.responseError = (res, error) => {
  return res.status(error?.status || 500).json({
    message: error?.message || error?.stack || error,
  });
};
exports.responseSuccess = (res, msg) => {
  const response =
    typeof msg == "object"
      ? msg
      : {
          message: msg || "Success",
        };
  return res.status(msg?.status || 200).json(response);
};

exports.isEmptyObj = (obj) => {
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
};
exports.validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
exports.encryptPassword = (pwd) => bcrypt.hashSync(pwd, 10);

exports.decryptPassword = (pwd, encryptPwd) =>
  bcrypt.compareSync(pwd, encryptPwd);

exports.dateFormat = (dat = new Date()) => {
  //for formatting the date to dd mm yyyy
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dat);
  console.log({ date });
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm = monthNames[date.getMonth()];
  const yy = date.getFullYear();
  return `${dd} ${mm} ${yy}`;
};
