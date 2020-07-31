const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/rooms-controller')

router.post('/rooms', RoomController.addRoom)
router.put('/rooms/:id', RoomController.updateRoom)
router.delete('/rooms/:id', RoomController.deleteRoom)
router.get('/rooms/:id', RoomController.getRoom)
router.get('/rooms', RoomController.getRoomList)

module.exports = router;
