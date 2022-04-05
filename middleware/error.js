const errorHandler = (err, req, res, next) =>{
    // log for dev
    console.log(err.stack.red);

    res.status(500).json({
        success: false,
        error: err.message
    });
    // dan kita export module->diakses di server.js
}

module.exports = errorHandler;