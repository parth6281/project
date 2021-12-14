const exceptions = {
    "errors": [
        {
            "statusCode": 500,
            "error": "GeneralError",
            "message": "Something went wrong at our end, we will correct it soon."
        },
        {
            "statusCode": 422,
            "error": "MissingParameter",
            "message": "Required parameters are missing for this request."
        },
        {
            "statusCode": 404,
            "error": "NotFound",
            "message": "Requested resource not found."
        },
        {
            "statusCode": 400,
            "error": "BadRequest",
            "message": "Bad request by user."
        },
        {
            "statusCode": 400,
            "error": "AuthenticationFailed",
            "message": "User Authentication Failed."
        },
        {
            "statusCode": 401,
            "error": "TokenError",
            "message": "No Token or Invalid Token! Unauthorized!"
        }
    ]
}


class Exceptions {
    constructor(error = 'GeneralError', message) {
        const exception = exceptions['errors'].find(err => err.error === error);
        if (message) {
            exception.message = message;
        }
        return exception;
    }
}
module.exports = Exceptions;
