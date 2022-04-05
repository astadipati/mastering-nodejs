// helper ini untuk handling response server code 400, 500 dkk
class ErrorResponse extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;