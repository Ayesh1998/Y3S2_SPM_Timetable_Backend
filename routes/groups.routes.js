const express = require('express')
const router = express.Router()

const GroupsController = require('../controllers/groups-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', GroupsController.createGroups)

// noinspection JSCheckFunctionSignatures
router.get('/getGroups', GroupsController.getGroups)

// noinspection JSCheckFunctionSignatures
router.get('/getGroups/:id', GroupsController.getGroup)

// noinspection JSCheckFunctionSignatures
router.put('/editGroups', GroupsController.editGroups)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteGroups', GroupsController.deleteGroups)

// noinspection JSCheckFunctionSignatures
router.put('/deleteSubGroupUpdate', GroupsController.deleteSubGroupUpdate)

module.exports = router
