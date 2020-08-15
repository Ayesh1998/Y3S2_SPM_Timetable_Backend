const express = require('express')
const router = express.Router()

const StudentsStatisticsController = require('../controllers/students-statistics-controller')

// noinspection JSCheckFunctionSignatures
router.post('/studentsStatisticsGroups', StudentsStatisticsController.addGroup)

// noinspection JSCheckFunctionSignatures
router.get('/studentsStatisticsGroups/:id', StudentsStatisticsController.getGroup)

// noinspection JSCheckFunctionSignatures
router.get('/studentsStatisticsGroups', StudentsStatisticsController.getGroupList)

// noinspection JSCheckFunctionSignatures
router.post('/studentsStatisticsSubGroups', StudentsStatisticsController.addSubGroup)

// noinspection JSCheckFunctionSignatures
router.get('/studentsStatisticsSubGroups/:id', StudentsStatisticsController.getSubGroup)

// noinspection JSCheckFunctionSignatures
router.get('/studentsStatisticsSubGroups', StudentsStatisticsController.getSubGroupList)

// noinspection JSCheckFunctionSignatures
router.get('/groupsCountByAcademicYear', StudentsStatisticsController.getGroupsCountByAcademicYear)

// noinspection JSCheckFunctionSignatures
router.get('/groupsCountByAcademicYearAndSemester', StudentsStatisticsController.getGroupsCountByAcademicYearAndSemester)

// noinspection JSCheckFunctionSignatures
router.get('/groupsCountByAcademicYearSemesterAndProgramme', StudentsStatisticsController.getGroupsCountByAcademicYearSemesterAndProgramme)

module.exports = router
