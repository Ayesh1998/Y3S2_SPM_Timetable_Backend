const express = require('express')
const router = express.Router()

const BuildingController = require('../controllers/buildings-controller')

// noinspection JSCheckFunctionSignatures
router.post('/buildings', BuildingController.addBuilding)

// noinspection JSCheckFunctionSignatures
router.put('/buildings/:id', BuildingController.updateBuilding)

// noinspection JSCheckFunctionSignatures
router.delete('/buildings/:id', BuildingController.deleteBuilding)

// noinspection JSCheckFunctionSignatures
router.get('/buildings/:id', BuildingController.getBuilding)

// noinspection JSCheckFunctionSignatures
router.get('/buildings', BuildingController.getBuildingList)

// noinspection JSCheckFunctionSignatures
router.post('/buildingsByCenter', BuildingController.getBuildingListByCenter)

// noinspection JSCheckFunctionSignatures
router.post('/buildingsByBuildingName', BuildingController.getBuildingListByBuildingName)

// noinspection JSCheckFunctionSignatures
router.post('/searchBuildings', BuildingController.searchBuildings)

module.exports = router
