const express = require('express')
const router = express.Router()

const BuildingController = require('../controllers/buildings-controller')

router.post('/buildings', BuildingController.addBuilding)
router.put('/buildings/:id', BuildingController.updateBuilding)
router.delete('/buildings/:id', BuildingController.deleteBuilding)
router.get('/buildings/:id', BuildingController.getBuilding)
router.get('/buildings', BuildingController.getBuildingList)
router.get('/buildingsByCenter', BuildingController.getBuildingListByCenter)
router.get('/buildingsByBuildingName', BuildingController.getBuildingListByBuildingName)
router.get('/searchBuildings', BuildingController.searchBuildings)

module.exports = router
