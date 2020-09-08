const express = require('express')
const router = express.Router()

const SubGroupsController = require('../controllers/subGroups-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', SubGroupsController.createSubGroups)

// noinspection JSCheckFunctionSignatures
router.get('/getSubGroups', SubGroupsController.getSubGroups)

// noinspection JSCheckFunctionSignatures
router.get('/getSubGroups/:id', SubGroupsController.getSubGroup)

// noinspection JSCheckFunctionSignatures
router.put('/editSubGroups', SubGroupsController.editSubGroups)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteSubGroups', SubGroupsController.deleteSubGroups)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteSubGroups1', SubGroupsController.deleteSubGroups1)

module.exports = router
