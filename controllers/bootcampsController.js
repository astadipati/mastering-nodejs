// tambahkan model bootcamp objek
const Bootcamp = require('../models/Bootcamps');
// load errorResponse helper
const ErrorResponse = require('../helper/errorResponse');
const asyncHandler = require('../middleware/async');
// geocoder helper
const geocoder = require ('../helper/geocoder');


// dalam controller = method
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamp
// @access  Public

exports.getBootcamps = asyncHandler (async (req, res, next) =>{ //midleware function
        let query;
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = Bootcamp.find(JSON.parse(queryStr));
        const bootcamps = await query;      

        res.status(200).json({
            success: true, 
            count: bootcamps.length,
            data: bootcamps
        });
} );
// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamp/:id
// @access  Public

exports.getBootcamp = asyncHandler(async (req, res, next) =>{ //midleware function
        const bootcamp = await Bootcamp.findById(req.params.id);     
        res.status(200).json({
            success: true, 
            data: bootcamp
        });
});  

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamp
// @access  Private after login

exports.createBootcamp = asyncHandler (async (req, res, next) =>{ //midleware function
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true, 
            data: bootcamp
        });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp:id
// @access  Private

exports.updateBootcamp = asyncHandler (async (req, res, next) =>{ //midleware function
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({success: true, msg: `Update bootcamps ${req.params.id}`, data: bootcamp});
        if (!bootcamp) {
            return res.status(400).json({success: false, msg:`Gagal Update`});
        }
}); 
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  private

exports.deleteBootcamp =asyncHandler (async (req, res, next) =>{ //midleware function
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, msg: `Delete bootcamps ${req.params.id}`});
        if (!bootcamp) {
            return res.status(400).json({success: false, msg:`Gagal Hapus Data`});
        }
});  

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance 
// @access  private

exports.getBootcampInRadius =asyncHandler (async (req, res, next) =>{ //midleware function
        const {zipcode, distance} = req.params;

        // Get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // calc radius using radians
        // divide dist by radius of earth
        // earth radius = 3,963 mi / 6,379 km
        const radius = distance / 3963;

        const bootcamps = await Bootcamp.find({
            location: {$geoWithin: {$centerSphere: [ [lng, lat], radius]}}
        });

        res.status(200).json({
            success: true,
            count:bootcamps.length,
            data: bootcamps
        });
});  