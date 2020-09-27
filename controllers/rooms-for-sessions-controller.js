const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')
const RoomModel = require('../models/rooms.model')
const TagModel = require('../models/tags.model')
const LecturerModel = require('../models/lecturers.model')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')
const SubjectTagModel = require('../models/subject-tag.model')

const addSession = async (req, res, next) => {
  const {
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    isParallel,
    parallelId,
    isConsecutive,
    consecutiveId,
    isSameRoom
  } = req.body

  const newSession = new SessionModel({
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    isParallel,
    parallelId,
    isConsecutive,
    consecutiveId,
    isSameRoom
  })

  try {
    await newSession.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New session added successfully!'
  })
}

const getSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(session)
}

const getSessionList = async (req, res, next) => {
  let sessionList

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(sessionList)
}

const addRoomForSession = async (req, res, next) => {
  let session

  const {
    sessionId,
    room
  } = req.body

  try {
    session = await SessionModel.findOne({
      sessionId: sessionId
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (room === "")
    session.roomRef = null
  else
    session.roomRef = room

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Session updated successfully!'
  })
}

const getRoomList = async (req, res, next) => {
  let roomList

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < roomList.length; i++)
    roomList[i].roomCapacity = roomList[i].roomCapacity.toString()

  res.status(200).send(roomList)
}

const getPossibleRoomsForSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  try {
    session = await SessionModel.findOne({
      sessionId: id
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(session.possibleRooms)
}

const setPossibleRoomsForSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    possibleRooms
  } = req.body

  try {
    session = await SessionModel.findOne({
      sessionId: id
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.possibleRooms = possibleRooms

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Session updated successfully!'
  })
}

const setPossibleRoomsForSessions = async (req, res, next) => {
  let sessionList
  let roomList
  let tagList
  let subjectTagList
  let lecturerList
  let groupList
  let subGroupList
  let possibleRooms

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    tagList = await TagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subjectTagList = await SubjectTagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    lecturerList = await LecturerModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    groupList = await GroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupList = await SubGroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < sessionList.length; i++) {
    let session = sessionList[i]
    possibleRooms = []
    for (let j = 0; j < roomList.length; j++) {
      let room = roomList[j]
      if (session.studentCount <= room.roomCapacity) {
        possibleRooms = [...possibleRooms, {
          roomName: room.roomName
        }]
      }
    }
    session.possibleRooms = possibleRooms
    try {
      await session.save()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  res.status(200).send({
    message: 'Sessions updated successfully!'
  })
}

exports.addSession = addSession
exports.getSession = getSession
exports.getSessionList = getSessionList
exports.addRoomForSession = addRoomForSession
exports.getRoomList = getRoomList
exports.getPossibleRoomsForSession = getPossibleRoomsForSession
exports.setPossibleRoomsForSession = setPossibleRoomsForSession
exports.setPossibleRoomsForSessions = setPossibleRoomsForSessions
