const HttpErrorsModel = require('../models/http-errors')
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingRoom) {
    res.json({
      exists: true,
      message: 'A room with the same name already exists.'
    })
    return next(new HttpErrorsModel('A room with the same name already exists.', 409))
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingRoom = await RoomModel.findOne({
      roomName: roomName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingRoom && roomName !== room.roomName) {
    res.json({
      exists: true,
      message: 'A room with the same name already exists.'
    })
    return next(new HttpErrorsModel('A room with the same name already exists.', 409))
  }

  room.roomName = roomName
  room.buildingName = buildingName
  room.roomType = roomType
  room.roomCapacity = roomCapacity

  try {
    await room.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(room)
}

const getRoomList = async (req, res, next) => {
  let roomList

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

const getRoomListByBuilding = async (req, res, next) => {
  let roomList

  const {
    buildingName
  } = req.body

  try {
    roomList = await RoomModel.find({
      buildingName: buildingName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

const getRoomListByRoomName = async (req, res, next) => {
  let roomList

  const {
    roomName
  } = req.body

  try {
    roomList = await RoomModel.find({
      roomName: {
        $regex: '.*' + roomName + '.*',
        $options: 'i'
      }
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

const getRoomListByRoomType = async (req, res, next) => {
  let roomList

  const {
    roomType
  } = req.body

  try {
    roomList = await RoomModel.find({
      roomType: roomType
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

const searchRooms = async (req, res, next) => {
  let roomList

  const {
    roomName,
    buildingName,
    roomType
  } = req.body

  if (roomName !== "" && buildingName !== "" && roomType !== "") {
    try {
      roomList = await RoomModel.find({
        roomName: {
          $regex: '.*' + roomName + '.*',
          $options: 'i'
        },
        buildingName: buildingName,
        roomType: roomType
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (roomName !== "" && buildingName !== "") {
    try {
      roomList = await RoomModel.find({
        roomName: {
          $regex: '.*' + roomName + '.*',
          $options: 'i'
        },
        buildingName: buildingName
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (roomName !== "" && roomType !== "") {
    try {
      roomList = await RoomModel.find({
        roomName: {
          $regex: '.*' + roomName + '.*',
          $options: 'i'
        },
        roomType: roomType
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (buildingName !== "" && roomType !== "") {
    try {
      roomList = await RoomModel.find({
        buildingName: buildingName,
        roomType: roomType
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (roomName !== "") {
    try {
      roomList = await RoomModel.find({
        roomName: {
          $regex: '.*' + roomName + '.*',
          $options: 'i'
        }
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (buildingName !== "") {
    try {
      roomList = await RoomModel.find({
        buildingName: buildingName
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (roomType !== "") {
    try {
      roomList = await RoomModel.find({
        roomType: roomType
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else {
    try {
      roomList = await RoomModel.find()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  res.status(200).send(roomList)
}

exports.addRoom = addRoom
exports.updateRoom = updateRoom
exports.deleteRoom = deleteRoom
exports.getRoom = getRoom
exports.getRoomList = getRoomList
exports.getRoomListByBuilding = getRoomListByBuilding
exports.getRoomListByRoomName = getRoomListByRoomName
exports.getRoomListByRoomType = getRoomListByRoomType
exports.searchRooms = searchRooms
