const HttpError = require('../models/http-errors')
const BuildingModel = require('../models/buildings.model')

const addBuilding = async (req, res, next) => {
  let existingBuilding

  const {
    buildingName
  } = req.body

  try {
    existingBuilding = await BuildingModel.findOne({
      buildingName: buildingName
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingBuilding) {
    res.json({
      exists: true,
      message: 'A building with the same name already exists.'
    })
    return next(new HttpError('A building with the same name already exists.', 409))
  }

  const newBuilding = new BuildingModel({
    buildingName
  })

  try {
    await newBuilding.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New building added successfully!'
  })
}

const updateBuilding = async (req, res, next) => {
  let building
  let existingBuilding

  const {
    id
  } = req.params

  const {
    buildingName
  } = req.body

  try {
    building = await BuildingModel.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingBuilding = await BuildingModel.findOne({
      buildingName: buildingName
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingBuilding && buildingName !== building.buildingName) {
    res.json({
      exists: true,
      message: 'A building with the same name already exists.'
    })
    return next(new HttpError('A building with the same name already exists.', 409))
  }

  building.buildingName = buildingName

  try {
    await building.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Building updated successfully!'
  })
}

const deleteBuilding = async (req, res, next) => {
  let building

  const {
    id
  } = req.params

  try {
    building = await BuildingModel.findById(id)
    await building.remove()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Building deleted successfully!'
  })
}

const getBuilding = async (req, res, next) => {
  let building

  const {
    id
  } = req.params

  try {
    building = await BuildingModel.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(building)
}

const getBuildingList = async (req, res, next) => {
  let buildingList

  try {
    buildingList = await BuildingModel.find()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(buildingList)
}

exports.addBuilding = addBuilding
exports.updateBuilding = updateBuilding
exports.deleteBuilding = deleteBuilding
exports.getBuilding = getBuilding
exports.getBuildingList = getBuildingList
