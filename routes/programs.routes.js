const express = require('express')
const router = express.Router()

const ProgramsController = require('../controllers/programs-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', ProgramsController.createPrograms)

// noinspection JSCheckFunctionSignatures
router.get('/getPrograms', ProgramsController.getPrograms)

// noinspection JSCheckFunctionSignatures
router.get('/getPrograms/:id', ProgramsController.getProgram)

// noinspection JSCheckFunctionSignatures
router.put('/editPrograms', ProgramsController.editPrograms)

// noinspection JSCheckFunctionSignatures
router.delete('/deletePrograms', ProgramsController.deletePrograms)
 
module.exports = router
