const express = require('express')
const router = express.Router()

const RoomUnavailabilityController = require('../controllers/unavailable-rooms-controller')

// noinspection JSCheckFunctionSignatures
router.post('/unavailableRooms/:id', RoomUnavailabilityController.addUnavailableTimes)

// noinspection JSCheckFunctionSignatures
router.delete('/unavailableRooms/:id', RoomUnavailabilityController.removeUnavailableTimes)

module.exports = router
