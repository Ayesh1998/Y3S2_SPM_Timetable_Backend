const express = require('express')
const router = express.Router()

const GroupNumsController = require('../controllers/groupNums-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', GroupNumsController.createGroupNums)

// noinspection JSCheckFunctionSignatures
router.get('/getGroupNums', GroupNumsController.getGroupNums)

// noinspection JSCheckFunctionSignatures
router.get('/getGroupNums/:id', GroupNumsController.getGroupNum)

// noinspection JSCheckFunctionSignatures
router.put('/editGroupNums', GroupNumsController.editGroupNums)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteGroupNums', GroupNumsController.deleteGroupNums)

module.exports = router
