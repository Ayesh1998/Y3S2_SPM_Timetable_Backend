const express = require('express')
const router = express.Router()

const SessionController = require('../controllers/sessions-controller')

router.post('/sessions', SessionController.addSession)
router.get('/sessions/:id', SessionController.getSession)
router.get('/sessions', SessionController.getSessionList)

module.exports = router
