const errorHandler = (err, req, res, next) =>{
    // log for dev
    console.log(err.stack.red);
    //default error jika statusCode undefined maka otomatis 500
    // tinggal dimainkan dibagian json isinya apa
    res.status(err.statusCode||500).json({
        success: false,
        error: err.message || 'Server Error'
    });
    // dan kita export module->diakses di server.js
}

module.exports = errorHandler;