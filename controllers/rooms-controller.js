const HttpError = require('../models/http-errors')
const RoomModel = require('../models/rooms.model')

const addRoom = async (req, res, next) => {
  let existingRoom

  const {
    roomName,
    buildingName,
    roomType,
    roomCapacity
  } = req.body

  try {
    existingRoom = await RoomModel.findOne({
      roomName: roomName
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingRoom) {
    res.json({
      exists: true,
      message: 'A room with the same name already exists.'
    })
    return next(new HttpError('A room with the same name already exists.', 409))
  }

  const newRoom = new RoomModel({
    roomName,
    buildingName,
    roomType,
    roomCapacity
  })

  try {
    await newRoom.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New room added successfully!'
  })
}

const updateRoom = async (req, res, next) => {
  let room
  let existingRoom

  const {
    id
  } = req.params

  const {
    roomName,
    buildingName,
    roomType,
    roomCapacity
  } = req.body

  try {
    room = await RoomModel.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingRoom = await RoomModel.findOne({
      roomName: roomName
    })
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingRoom && roomName !== room.roomName) {
    res.json({
      exists: true,
      message: 'A room with the same name already exists.'
    })
    return next(new HttpError('A room with the same name already exists.', 409))
  }

  room.roomName = roomName
  room.buildingName = buildingName
  room.roomType = roomType
  room.roomCapacity = roomCapacity

  try {
    await room.save()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Room updated successfully!'
  })
}

const deleteRoom = async (req, res, next) => {
  let room

  const {
    id
  } = req.params

  try {
    room = await RoomModel.findById(id)
    await room.remove()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Room deleted successfully!'
  })
}

const getRoom = async (req, res, next) => {
  let room

  const {
    id
  } = req.params

  try {
    room = await RoomModel.findById(id)
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(room)
}

const getRoomList = async (req, res, next) => {
  let roomList

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

exports.addRoom = addRoom
exports.updateRoom = updateRoom
exports.deleteRoom = deleteRoom
exports.getRoom = getRoom
exports.getRoomList = getRoomList
