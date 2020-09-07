const express = require('express')
const router = express.Router()

const SessionController = require('../controllers/sessions-controller')

// noinspection JSCheckFunctionSignatures
router.post('/sessions', SessionController.addSession)

// noinspection JSCheckFunctionSignatures
router.get('/sessions/:id', SessionController.getSession)

// noinspection JSCheckFunctionSignatures
router.get('/sessions', SessionController.getSessionList)

module.exports = router
