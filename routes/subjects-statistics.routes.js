const express = require('express')
const router = express.Router()

const SubjectsStatisticsController = require('../controllers/subjects-statistics-controller')

// noinspection JSCheckFunctionSignatures
router.post('/subjectsStatistics', SubjectsStatisticsController.addSubject)

// noinspection JSCheckFunctionSignatures
router.get('/subjectsStatistics/:id', SubjectsStatisticsController.getSubject)

// noinspection JSCheckFunctionSignatures
router.get('/subjectsStatistics', SubjectsStatisticsController.getSubjectList)

// noinspection JSCheckFunctionSignatures
router.get('/totalSubjectsCount', SubjectsStatisticsController.getTotalSubjectsCount)

// noinspection JSCheckFunctionSignatures
router.get('/subjectsCountByOfferedYear', SubjectsStatisticsController.getSubjectsCountByOfferedYear)

// noinspection JSCheckFunctionSignatures
router.get('/subjectsCountByOfferedYearAndSemester', SubjectsStatisticsController.getSubjectsCountByOfferedYearAndSemester)

module.exports = router
