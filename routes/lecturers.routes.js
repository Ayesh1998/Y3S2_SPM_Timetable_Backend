const express = require('express')
const router = express.Router()

const LecturersController = require('../controllers/lecturers-controller')

// noinspection JSCheckFunctionSignatures
router.post('/lecturers', LecturersController.addLecturers)

// noinspection JSCheckFunctionSignatures
router.put('/lecturers', LecturersController.updateLecturer)

// noinspection JSCheckFunctionSignatures
router.delete('/lecturers/:id', LecturersController.deleteLecturer)

// noinspection JSCheckFunctionSignatures
router.get('/lecturers/:id', LecturersController.getLecturer)

// noinspection JSCheckFunctionSignatures
router.get('/lecturers', LecturersController.getLecturersList)



module.exports = router