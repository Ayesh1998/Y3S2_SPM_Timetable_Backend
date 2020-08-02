const HttpErrorsModel = require('../models/http-errors')
const LecturerModel = require('../models/lecturers.model')

const addLecturer = async (req, res, next) => {
  let existingLecturer

  const {
    lecturerName,
    employeeId,
    faculty,
    department,
    center,
    building,
    level,
    rank
  } = req.body

  try {
    existingLecturer = await LecturerModel.findOne({
      employeeId: employeeId
    })
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingLecturer) {
    res.json({
      exists: true,
      message: 'A lecturer with the same employee id already exists.'
    })
    return next(new HttpErrorsModel('A lecturer with the same employee id already exists.', 409))
  }

  const newLecturer = new LecturerModel({
    lecturerName,
    employeeId,
    faculty,
    department,
    center,
    building,
    level,
    rank
  })

  try {
    await newLecturer.save()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New lecturer added successfully!'
  })
}

const getLecturer = async (req, res, next) => {
  let lecturer

  const {
    id
  } = req.params

  try {
    lecturer = await LecturerModel.findById(id)
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturer)
}

const getLecturerList = async (req, res, next) => {
  let lecturerList

  try {
    lecturerList = await LecturerModel.find()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturerList)
}

exports.addLecturer = addLecturer
exports.getLecturer = getLecturer
exports.getLecturerList = getLecturerList
