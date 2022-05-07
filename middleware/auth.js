const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../helper/errorResponse');
const User = require('../models/User');
const { routes } = require('../server');

// protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // make sure token exist
    if (!token) {
        return next(new ErrorResponse('Not Authorize this route'),401);
    }

    try {
        // verify token from payload id, iat, exp
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);
        // get currently login user
        req.user = await User.findById(decoded.id);

        next();
    } catch (error) {
         return next(new ErrorResponse('Not Authorize this route'),401);
    }
});

// Grant access to spesific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`),403);
        }
        next();
    }
}
