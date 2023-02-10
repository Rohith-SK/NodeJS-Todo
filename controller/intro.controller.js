const { responseError } = require("../util/tools.util");

exports.introController = (req, res) => {
  try {
    const userName = req.body.userName;
    res.status(200).json({
      message: `Hi ${userName},we got your request`,
    });
  } catch (error) {
    console.log(error);
    responseError(res, error);
  }
};
