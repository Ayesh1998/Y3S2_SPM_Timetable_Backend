const express = require('express')
const router = express.Router()

const SubGroupNumsController = require('../controllers/subGroupNums-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', SubGroupNumsController.createSubGroupNums)

// noinspection JSCheckFunctionSignatures
router.get('/getSubGroupNums', SubGroupNumsController.getSubGroupNums)

// noinspection JSCheckFunctionSignatures
router.get('/getSubGroupNums/:id', SubGroupNumsController.getSubGroupNum)

// noinspection JSCheckFunctionSignatures
router.put('/editSubGroupNums', SubGroupNumsController.editSubGroupNums)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteSubGroupNums', SubGroupNumsController.deleteSubGroupNums)

module.exports = router
