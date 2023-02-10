const jwt = require("jsonwebtoken");
const fs = require("fs");
const { responseError } = require("../util/tools.util");
const { statusResponse } = require("../util/static.util");
const OPTIONS = {
  algorithms: {
    algorithm: "RS256",
  },
  verifyAlgorithm: {
    algorithm: ["RS256"],
  },
  refreshExpires: {
    expiresIn: "3d",
  },
  authExpires: {
    expiresIn: "1hr",
  },
};

const config = {
  AUTH_PRIVATEKEY: fs.readFileSync(
    __dirname + "/../config/privatekey.key",
    "utf-8"
  ),
  AUTH_PUBLICKEY: fs.readFileSync(
    __dirname + "/../config/publickey.key",
    "utf-8"
  ),
  SIGNOPTIONS_AUTH: {
    issuer: "developer.mine.com",
    audience: "mine.com",
    subject: `info@mine.com`,
    algorithm: "RS256",
    expiresIn: "1hr",
  },
};

const tokenGenerator = (payload) =>
  jwt.sign(payload, config.AUTH_PRIVATEKEY, config.SIGNOPTIONS_AUTH);

const tokenVerifier = (token) =>
  jwt.verify(token, config.AUTH_PUBLICKEY, config.SIGNOPTIONS_AUTH);

const tokenAuthorization = (req, res, next) => {
  try {
    const {
      headers: { authorization = "" },
    } = req;

    const token = authorization.slice(7, authorization.length);
    if (!token)
      throw { ...statusResponse.TOKEN_RQD, message: `Token Missing...` };

    jwt.verify(
      token,
      config.AUTH_PUBLICKEY,
      config.SIGNOPTIONS_AUTH,
      (err, user) => {
        if (err?.expiredAt)
          return responseError(res, {
            status: 401,
            message: `Token Expired`,
          });
        if (err)
          return responseError(res, {
            status: 401,
            message: new Error(err).message,
          });
        if (!user)
          return responseError(res, {
            status: 403,
            message: `User Not Found`,
          });
        req.user = user;
        next();
      }
    );
  } catch (error) {
    responseError(res, error);
  }
};

module.exports = {
  tokenGenerator,
  tokenAuthorization,
};
