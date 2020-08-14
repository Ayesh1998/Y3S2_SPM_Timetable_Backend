const express = require('express')
const router = express.Router()

const LecturersStatisticsController = require('../controllers/lecturers-statistics-controller')

// noinspection JSCheckFunctionSignatures
router.post('/lecturersStatistics', LecturersStatisticsController.addLecturer)

// noinspection JSCheckFunctionSignatures
router.get('/lecturersStatistics/:id', LecturersStatisticsController.getLecturer)

// noinspection JSCheckFunctionSignatures
router.get('/lecturersStatistics', LecturersStatisticsController.getLecturerList)

// noinspection JSCheckFunctionSignatures
router.get('/lecturerCountByFaculty', LecturersStatisticsController.getLecturerCountByFaculty)

// noinspection JSCheckFunctionSignatures
router.get('/lecturerCountByLevel', LecturersStatisticsController.getLecturerCountByLevel)

// noinspection JSCheckFunctionSignatures
router.get('/lecturerCountByCenter', LecturersStatisticsController.getLecturerCountByCenter)

module.exports = router
