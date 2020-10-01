const express = require('express')
const router = express.Router()

const ParallelSessionController = require('../controllers/parallel-sessions-controller')

router.post('/addParallelSession/:id', ParallelSessionController.addParallelSession)

module.exports = router
