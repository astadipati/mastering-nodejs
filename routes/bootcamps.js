const express = require('express');
// kita load method dari route, ../ karena dari luar folder
const {
    getBootcamps, 
    getBootcamp,    
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcampsController');

// load other resource router ==================================
const courseRouter = require('./courses'); //ambil router coures

const router = express.Router();

// re-route into other resource routers ========================
router.use('/:bootcampId/courses', courseRouter);

// get radius
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

// 
router.route('/:id/photo').put(bootcampPhotoUpload);
// dan beginilah cara kita panggil routenya lebih rapi
router
.route('/')
.get(getBootcamps)      //get all
.post(createBootcamp)   //buat baru

router.route('/:id')
.get(getBootcamp)       //get single bootcamp
.put(updateBootcamp)    // update bootcamp
.delete(deleteBootcamp) // hapus bootcamp

module.exports = router; 