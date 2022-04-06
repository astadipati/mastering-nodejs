const ErrorResponse = require("../helper/errorResponse");

const errorHandler = (err, req, res, next) =>{
    // ... artinya mengambil semua object dari err
    let error = {...err}
    error.message=err.message;
    // log for dev
    console.log(err);
    // mongoose error handling
    console.log(err.name);
    if (err.name === 'CastError') {
        const message = `Error not found with id: ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    // monggose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered ${err.keyValue.name}`;
        error = new ErrorResponse(message, 400);
    }
    // mongoose validation error, karena ini ada didalam array object maka harus di ekstrak dulu
    // kita gunakan map, Object.values(err.errors).map(val => val.message);
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    //default error jika statusCode undefined maka otomatis 500
    // tinggal dimainkan dibagian json isinya apa
    res.status(err.statusCode||500).json({
        success: false,
        error: error.message || 'Server Error'
    });
    // dan kita export module->diakses di server.js 
}

module.exports = errorHandler;