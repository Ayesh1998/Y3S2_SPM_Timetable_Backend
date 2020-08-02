const express = require('express')
const router = express.Router()

const LecturersStatisticsController = require('../controllers/lecturers-statistics-controller')

router.post('/lecturersStatistics', LecturersStatisticsController.addLecturer)
router.get('/lecturersStatistics/:id', LecturersStatisticsController.getLecturer)
router.get('/lecturersStatistics', LecturersStatisticsController.getLecturerList)

module.exports = router
