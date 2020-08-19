const express = require('express')
const router = express.Router()

const SubjectsController = require('../controllers/subjects-controller')

// noinspection JSCheckFunctionSignatures
router.post('/subjects', SubjectsController.addSubjects)

// noinspection JSCheckFunctionSignatures
router.put('/subjects/:id', SubjectsController.updateSubject)

// noinspection JSCheckFunctionSignatures
router.delete('/subjects/:id', SubjectsController.deleteSubjects)

// noinspection JSCheckFunctionSignatures
router.get('/subjects/:id', SubjectsController.getSubject)

// noinspection JSCheckFunctionSignatures
router.get('/subjects', SubjectsController.getSubjectsList)



module.exports = router