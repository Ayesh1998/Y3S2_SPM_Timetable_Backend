const HttpErrorsModel = require('../models/http-errors')
const SubjectModel = require('../models/subjects.model')

const addSubject = async (req, res, next) => {
  let existingSubject

  const {
    OfferedYear,
    OfferedSemester,
    SubjectName,
    SubjectCode,
    NumberOfLectureHours,
    NumberOfTutorialHours,
    NumberOfLabHours,
    NumberOfEvaluationHours
  } = req.body

  try {
    existingSubject = await SubjectModel.findOne({
      SubjectCode: SubjectCode
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
    OfferedYear,
    OfferedSemester,
    SubjectName,
    SubjectCode,
    NumberOfLectureHours,
    NumberOfTutorialHours,
    NumberOfLabHours,
    NumberOfEvaluationHours
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
