const express = require('express')
const router = express.Router()

const sessionsController = require('../controllers/sessions-controller')

router.post('/addSessions', sessionsController.addSessions)
router.get('/getSessions/:id', sessionsController.getSession)
router.get('/getSessionList', sessionsController.getSessionLists)

module.exports = router