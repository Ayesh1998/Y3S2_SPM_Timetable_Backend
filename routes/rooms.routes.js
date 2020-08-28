const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/rooms-controller')

// noinspection JSCheckFunctionSignatures
router.post('/rooms', RoomController.addRoom)

// noinspection JSCheckFunctionSignatures
router.put('/rooms/:id', RoomController.updateRoom)

// noinspection JSCheckFunctionSignatures
router.delete('/rooms/:id', RoomController.deleteRoom)

// noinspection JSCheckFunctionSignatures
router.get('/rooms/:id', RoomController.getRoom)

// noinspection JSCheckFunctionSignatures
router.get('/rooms', RoomController.getRoomList)

// noinspection JSCheckFunctionSignatures
router.post('/roomsByBuilding', RoomController.getRoomListByBuilding)

// noinspection JSCheckFunctionSignatures
router.post('/roomsByRoomName', RoomController.getRoomListByRoomName)

// noinspection JSCheckFunctionSignatures
router.post('/roomsByRoomType', RoomController.getRoomListByRoomType)

// noinspection JSCheckFunctionSignatures
router.post('/searchRooms', RoomController.searchRooms)

module.exports = router
