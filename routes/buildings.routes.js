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
router.get('/buildingsByCenter', BuildingController.getBuildingListByCenter)

// noinspection JSCheckFunctionSignatures
router.get('/buildingsByBuildingName', BuildingController.getBuildingListByBuildingName)

// noinspection JSCheckFunctionSignatures
router.get('/searchBuildings', BuildingController.searchBuildings)

module.exports = router
