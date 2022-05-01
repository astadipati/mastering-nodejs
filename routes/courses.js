const express = require('express');
// setup protected routes
const {protect} = require('../middleware/auth');
const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/coursesController');

const router = express.Router( {mergeParams:true});

router.route('/')
    .get(getCourses)
    .post(protect, addCourse);
router.route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

module.exports = router;