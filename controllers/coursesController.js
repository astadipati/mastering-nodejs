// load errorResponse helper
const ErrorResponse = require('../helper/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Courses');
const Bootcamp = require('../models/Bootcamps');

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
        // jadi di courses ada bootcamp yang menampilkan courses
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public

exports.getCourse = asyncHandler(async(req, res, next) => {
   const course = await Course.findById(req.params.id).populate({
       path: 'bootcamp',
       select: 'name description'
   });

   if (!course) {
       return next(new ErrorResponse(`No Course with the id of ${req.params.id}`));
   }

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc    add course for spesific bootcamps
// @route   POST /api/v1/bootcamps/:bootcampID/courses
// @access  Private

exports.addCourse = asyncHandler(async(req, res, next) => {
   req.body.bootcamp = req.params.bootcampId;

   const bootcamp = await Bootcamp.findById(req.params.bootcampId);

   if (!bootcamp) {
       return next(
           new ErrorResponse(`No Bootcamp with the id of ${req.params.bootcampID}`),
           404
        );
   }
console.log(req.body);
   const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    });
});