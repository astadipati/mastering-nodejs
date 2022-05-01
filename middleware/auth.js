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

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.user.id);

    res
        .status(200)
        .json({
            success: true,
            data: user
        });
});
