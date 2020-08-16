const express = require('express')
const router = express.Router()

const CenterController = require('../controllers/centers-controller')

// noinspection JSCheckFunctionSignatures
router.post('/centers', CenterController.addCenter)

// noinspection JSCheckFunctionSignatures
router.put('/centers/:id', CenterController.updateCenter)

// noinspection JSCheckFunctionSignatures
router.delete('/centers/:id', CenterController.deleteCenter)

// noinspection JSCheckFunctionSignatures
router.get('/centers/:id', CenterController.getCenter)

// noinspection JSCheckFunctionSignatures
router.get('/centers', CenterController.getCenterList)

module.exports = router
