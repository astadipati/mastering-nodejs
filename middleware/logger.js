// @desc    logs request to console

const logger = (req, res, next)=>{
    // req.hello = 'Hello world';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// kita perlu export supaya bisa digunakan
module.exports = logger;