const express = require('express');
// kita load method dari route, ../ karena dari luar folder
const {
    getBootcamps, 
    getBootcamp,    
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampInRadius
} = require('../controllers/bootcampsController');
const router = express.Router();
// get radius
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

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