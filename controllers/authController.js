const ErrorResponse= require('../helper/errorResponse');
const asyncHandler=require('../middleware/async');
const User = require('../models/User');

// @desc    Register User
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async(req, res, next) => {
    const {name, email, password, role} = req.body;

    // create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // create token
    // const token = user.getSignedJwtToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // });
    sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body;

    // validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    
    // check for user from db using Schema big U
    const user = await User.findOne({email}).select('+password');
    
    if (!user) {
        return next(new ErrorResponse('Invalid user', 401));
    }
    
    // check if password matches matchPassword
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // create token
    // const token = user.getSignedJwtToken();
    // const token = user.getSignedJwtToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // });

    sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
    // create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    // console.log(options);

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
    // console.log('Signed Cookies: ', req.si);

};