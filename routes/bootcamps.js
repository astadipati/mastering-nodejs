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

// model
Bootcamp = require('../models/Bootcamps');
// advancedResults
const advancedResults = require('../middleware/advancedResult');

// load other resource router ==================================
const courseRouter = require('./courses'); //ambil router coures

const router = express.Router();

// setup protected routes
const {
        protect,
        authorize
        } = require('../middleware/auth');

// re-route into other resource routers ========================
router.use('/:bootcampId/courses', courseRouter);

// get radius
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

// 
router.route('/:id/photo').put(protect, authorize('publisher'), bootcampPhotoUpload);
// dan beginilah cara kita panggil routenya lebih rapi
router
.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)      //get all with populate
.post(protect, authorize('publisher'), createBootcamp)   //buat baru

router.route('/:id')
.get(getBootcamp)       //get single bootcamp
.put(protect, authorize('publisher','admin'), updateBootcamp)    // update bootcamp
.delete(protect, authorize('publisher','admin'),deleteBootcamp) // hapus bootcamp

module.exports = router; 