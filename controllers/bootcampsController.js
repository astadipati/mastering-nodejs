// tambahkan model bootcamp objek
const Bootcamp = require('../models/Bootcamps');

// dalam controller = method
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamp
// @access  Public

exports.getBootcamps = async (req, res, next) =>{ //midleware function
    try {
        const bootcamps = await Bootcamp.find();      
        res.status(200).json({
            success: true, 
            count: bootcamps.length,
            // msg: `data single ${req.params.id}`,
            data: bootcamps
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            detil_error: err
        });
    }
}  
// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamp/:id
// @access  Public

exports.getBootcamp = async (req, res, next) =>{ //midleware function
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);     
        if (!bootcamp) {
            return res.status(400).json({success:false});
        } 
        res.status(200).json({
            success: true, 
            // msg: `data single ${req.params.id}`,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            detil_error: err
        });
    }
}  

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamp
// @access  Private after login

exports.createBootcamp = async (req, res, next) =>{ //midleware function
    try {
        // console.log(req.body); //jika hanya ini maka akan undefined di server js harus dimasukkan body parser yang sekarang sudah include di express
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true, 
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            detil_error: err
        });
    }
}  

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp:id
// @access  Private

exports.updateBootcamp = async (req, res, next) =>{ //midleware function
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({success: true, msg: `Update bootcamps ${req.params.id}`, data: bootcamp});
        if (!bootcamp) {
            return res.status(400).json({success: false, msg:`Gagal Update`});
        }
    } catch (error) {
        res
        .status(400)
        .json({success:false, msg:`Gagal Melakukan Update ${req.params.id}`});
    }
}; 
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  private

exports.deleteBootcamp =async (req, res, next) =>{ //midleware function
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        res.status(200).json({success: true, msg: `Delete bootcamps ${req.params.id}`});
        if (!bootcamp) {
            return res.status(400).json({success: false, msg:`Gagal Hapus Data`});
        }
    } catch (error) {
        res
        .status(400)
        .json({success:false, msg:`Gagal Menghapus Data ${req.params.id}`});
    }
};  