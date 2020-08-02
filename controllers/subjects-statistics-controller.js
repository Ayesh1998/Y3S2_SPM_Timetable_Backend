const HttpErrorsModel = require('../models/http-errors')
const SubjectModel = require('../models/subjects.model')

const addSubject = async (req, res, next) => {
  let existingSubject

  const {
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours
  } = req.body

  try {
    existingSubject = await SubjectModel.findOne({
      subjectCode: subjectCode
    })
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingSubject) {
    res.json({
      exists: true,
      message: 'A subject with the same subject code already exists.'
    })
    return next(new HttpErrorsModel('A subject with the same subject code already exists.', 409))
  }

  const newSubject = new SubjectModel({
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours
  })

  try {
    await newSubject.save()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New subject added successfully!'
  })
}

const getSubject = async (req, res, next) => {
  let subject

  const {
    id
  } = req.params

  try {
    subject = await SubjectModel.findById(id)
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subject)
}

const getSubjectList = async (req, res, next) => {
  let subjectList

  try {
    subjectList = await SubjectModel.find()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subjectList)
}

exports.addSubject = addSubject
exports.getSubject = getSubject
exports.getSubjectList = getSubjectList
