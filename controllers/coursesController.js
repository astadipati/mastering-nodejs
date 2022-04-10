// load errorResponse helper
const ErrorResponse = require('../helper/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Courses');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

exports.getCourses = asyncHandler(async(req, res, next) => {
    // cek bootcampId
    let query;
    if (req.params.bootcampId) {
        query = Course.find({bootcamp: req.params.bootcampId});
    }else{
        query = Course.find();
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});