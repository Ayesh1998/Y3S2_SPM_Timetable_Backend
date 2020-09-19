const express = require('express')
const router = express.Router()

const RoomsForSessionsController = require('../controllers/rooms-for-sessions-controller')

router.post('/roomsForSessions', RoomsForSessionsController.addSession)
router.get('/roomsForSessions/:id', RoomsForSessionsController.getSession)
router.get('/roomsForSessions', RoomsForSessionsController.getSessionList)
router.post('/addRoomForSession', RoomsForSessionsController.addRoomForSession)

module.exports = router
