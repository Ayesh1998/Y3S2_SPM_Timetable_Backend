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
router.get('/roomsByBuilding', RoomController.getRoomListByBuilding)

// noinspection JSCheckFunctionSignatures
router.get('/roomsByRoomName', RoomController.getRoomListByRoomName)

// noinspection JSCheckFunctionSignatures
router.get('/roomsByRoomType', RoomController.getRoomListByRoomType)

// noinspection JSCheckFunctionSignatures
router.get('/searchRooms', RoomController.searchRooms)

module.exports = router
