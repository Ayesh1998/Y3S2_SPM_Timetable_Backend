const express = require('express')
const router = express.Router()

const SubjectsStatisticsController = require('../controllers/subjects-statistics-controller')

router.post('/subjectsStatistics', SubjectsStatisticsController.addSubject)
router.get('/subjectsStatistics/:id', SubjectsStatisticsController.getSubject)
router.get('/subjectsStatistics', SubjectsStatisticsController.getSubjectList)

module.exports = router
