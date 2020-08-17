const express = require('express')
const router = express.Router()

const YearSemsController = require('../controllers/yearSems-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', YearSemsController.createYearSems)

// noinspection JSCheckFunctionSignatures
router.get('/getYearSems', YearSemsController.getYearSems)

// noinspection JSCheckFunctionSignatures
router.get('/getYearSems/:id', YearSemsController.getYearSem)

// noinspection JSCheckFunctionSignatures
router.put('/editYearSems', YearSemsController.editYearSems)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteYearSems', YearSemsController.deleteYearSems)
 
module.exports = router
