// dalam controller = method
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamp
// @access  Public

exports.getBootcamps = (req, res, next) =>{ //midleware function
    res
        .status(200)
        .json({success: true, msg:'Show All Bootcamps'});
}  
// @desc    Get single bootcamps
// @route   GET /api/v1/bootcamp/:id
// @access  Public

exports.getBootcamp = (req, res, next) =>{ //midleware function
    res.status(200).json({success: true, msg: `get single bootcamps ${req.params.id}`});
}  

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamp
// @access  Private after login

exports.createBootcamp = (req, res, next) =>{ //midleware function
    res.status(200).json({success: true, msg: 'Create new bootcamps'});
}  

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp:id
// @access  Private

exports.updateBootcamp = (req, res, next) =>{ //midleware function
    res.status(200).json({success: true, msg: `Update bootcamps ${req.params.id}`});
}  
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  private

exports.deleteBootcamp = (req, res, next) =>{ //midleware function
    res.status(200).json({success: true, msg: `Delete bootcamps ${req.params.id}`});
}  