const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')

const addSession = async (req, res, next) => {
  const {
    lecturers,
    subjectRef,
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

exports.addSession = addSession
exports.getSession = getSession
exports.getSessionList = getSessionList
