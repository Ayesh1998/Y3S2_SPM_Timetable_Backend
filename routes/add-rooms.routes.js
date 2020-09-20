const express = require('express')
const router = express.Router()

const AddRoomsController = require('../controllers/add-rooms-controller')

router.get('/rooms', AddRoomsController.getRoomList)
router.get('/buildings', AddRoomsController.getBuildingList)
router.get('/tags', AddRoomsController.getTagList)
router.get('/subjects', AddRoomsController.getSubjectList)
router.get('/lecturers', AddRoomsController.getLecturerList)
router.get('/groups', AddRoomsController.getGroupList)
router.get('/subGroups', AddRoomsController.getSubGroupList)

module.exports = router
