const express = require('express');
// setup protected routes
const {
        protect,
        authorize
      } = require('../middleware/auth');
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
    .post(protect, authorize('publisher','admin'), addCourse);
router.route('/:id')
    .get(getCourse)
    .put(protect, authorize('publisher','admin'), updateCourse)
    .delete(protect, authorize('publisher','admin'), deleteCourse);

module.exports = router;