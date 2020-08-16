const express = require('express')
const router = express.Router()

const WorkingDaysHoursController = require('../controllers/working-days-hours-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', WorkingDaysHoursController.createWorkingDaysAndHours)

// noinspection JSCheckFunctionSignatures
router.get('/getWorkingDaysAndHours', WorkingDaysHoursController.getWorkingDaysAndHours)

// noinspection JSCheckFunctionSignatures
router.put('/editWorkingDaysAndHours', WorkingDaysHoursController.editWorkingDaysAndHours)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteWorkingDaysAndHours', WorkingDaysHoursController.deleteWorkingDaysAndHours)

module.exports = router
