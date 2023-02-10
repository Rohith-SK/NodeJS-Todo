exports.STATICDATA = {
    role: ["user", "system", "admin"],
    status: ["notyet", "start", "complete"],
    fieldType: ['email', 'mobileNo']
};

exports.statusResponse = {
    BAD_RQST: {
        status: 400,
        message: `Bad Request`,
    },
    DATA_EXIST: {
        status: 422,
        message: ` Unprocessable Entity`,
    },
    USER_NOT_EXIST: {
        status: 404,
        message: `User not found`
    },

    CREATION_FAILED: {
        status: 302,
        message: `Creation Failed`,
    },
    SUCCESS_MSG: {
        status: 200,
        message: `Success`,
    },
    INVALID_ENTITY: {
        status: 422,
        message: `Invalid Entity`,
    },
    TOKEN_RQD: {
        status: 401,
        message: `Invalid Token`,
    },
    NOT_AUTHORIZED: {
        status: 401,
        message: `Not Authorized`,
    },

    NODATA: {
        status: 404,
        message: `No Data Found`,
    },
};