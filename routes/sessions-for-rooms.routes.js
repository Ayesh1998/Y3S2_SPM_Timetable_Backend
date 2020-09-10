const express = require('express')
const router = express.Router()

const SessionsForRoomsController = require('../controllers/sessions-for-rooms-controller')

router.post('/sessionsForRooms', SessionsForRoomsController.addSession)
router.get('/sessionsForRooms/:id', SessionsForRoomsController.getSession)
router.get('/sessionsForRooms', SessionsForRoomsController.getSessionList)

module.exports = router
