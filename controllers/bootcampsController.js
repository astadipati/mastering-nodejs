const path = require('path');
// tambahkan model bootcamp objek
const Bootcamp = require('../models/Bootcamps');
// load errorResponse helper
const ErrorResponse = require('../helper/errorResponse');
const asyncHandler = require('../middleware/async');
// geocoder helper
const geocoder = require ('../helper/geocoder');
// const { path } = require('express/lib/application');


// dalam controller = method
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamp
// @access  Public

exports.getBootcamps = asyncHandler (async (req, res, next) =>{ //midleware function
        let query;
        // copy req.query
        let reqQuery = {...req.query};
        // field to exclude
        const removeFields = ['select','sort','page','limit'];
        // loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);
        // create query string
        let queryStr = JSON.stringify(reqQuery);
        // create operators (gte,lte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        // finding resource
        query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');
        // select fields
        if (req.query.select) {
            //doc mongo filtering pada url koma array menjadi spasi
            // const fields = req.query.select.split(',');
            // console.log(fields);
            // setelah join 
            const fields = req.query.select.split(',').join(' ');
            // console.log(fields);
            query = query.select(fields);
        }
        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            // default query berdasarkan createdAt DESC
            query = query.sort('-createdAt');
        }
        // pagination
        const page = parseInt(req.query.page, 10) || 1; //parseInt js function 
        const limit = parseInt(req,query.limit, 10) || 2;
        const startIndex = (page -1) * limit;
        const endIndex = page * limit;
        const total = await Bootcamp.countDocuments();

        query = query.skip(startIndex).limit(limit);
        // executing query
        const bootcamps = await query;    
        // pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }            
        }  
        if (startIndex > 0) { 
            pagination.prev = {
                page: page -1,
                limit
            }
        }

        res.status(200).json({
            success: true, 
            count: bootcamps.length,
            pagination,
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
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        res.status(200).json({success: true, msg: `Delete bootcamps ${req.params.id}`});
        
        if (!bootcamp) {
            return res.status(400).json({success: false, msg:`Gagal Hapus Data`});
        }
        bootcamp.remove();
        res.status(200).json({success: true, data: {}});
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

// @desc    Upload phpto for bootcamp
// @route   PUT /api/v1/bootcamp/:id/photo
// @access  private

exports.bootcampPhotoUpload =asyncHandler (async (req, res, next) =>{ //midleware function
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        if (!bootcamp) {
            return next(
                new ErrorResponse('id is not found', 404)
            );
        }        
        if (!req.files) {
            return next(
                new ErrorResponse('Please uplaod a file',400)
            );
        }

        // Make sure the image is a photo
        const file = req.files.file;
        // Validate photo
        if (!file.mimetype.startsWith('image')) {
             return next(
                new ErrorResponse('Please select an image',400)
            );
        }
        // console.log(file);
        // Check File Size
        const maks = process.env.MAX_FILE_UPLOAD;
        if (file.size > maks) {
            return next(
                new ErrorResponse(`File must be under ${maks}`,400)
            );
        }
        // Give a name
        file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
        // get filename
        console.log(file.name);

        // pindah file
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return next(
                    new ErrorResponse(`Ups something wrong`, 500)
                );
            }
            await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
            res.status(200).json({success: true, data: file.name});
        }); //titik koma bagian ini jangan lupa sebagai akhir dari proses
}); 