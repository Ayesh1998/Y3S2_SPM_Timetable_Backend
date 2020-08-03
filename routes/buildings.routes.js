const express = require('express')
const router = express.Router()

const BuildingController = require('../controllers/buildings-controller')

router.post('/buildings', BuildingController.addBuilding)
router.put('/buildings/:id', BuildingController.updateBuilding)
router.delete('/buildings/:id', BuildingController.deleteBuilding)
router.get('/buildings/:id', BuildingController.getBuilding)
router.get('/buildings', BuildingController.getBuildingList)

module.exports = router
