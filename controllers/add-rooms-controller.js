const HttpErrorsModel = require('../models/http-errors')
const RoomModel = require('../models/rooms.model')
const BuildingModel = require('../models/buildings.model')
const TagModel = require('../models/tags.model')
const SubjectModel = require('../models/subjects.model')
const LecturerModel = require('../models/lecturers.model')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')

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

const getBuildingList = async (req, res, next) => {
  let buildingList

  try {
    buildingList = await BuildingModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(buildingList)
}

const getTagList = async (req, res, next) => {
  let tagList

  try {
    tagList = await TagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(tagList)
}

const getSubjectList = async (req, res, next) => {
  let subjectList

  try {
    subjectList = await SubjectModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subjectList)
}

const getLecturerList = async (req, res, next) => {
  let lecturerList

  try {
    lecturerList = await LecturerModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturerList)
}

const getGroupList = async (req, res, next) => {
  let groupList

  try {
    groupList = await GroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(groupList)
}

const getSubGroupList = async (req, res, next) => {
  let subGroupList

  try {
    subGroupList = await SubGroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroupList)
}

exports.getRoomList = getRoomList
exports.getBuildingList = getBuildingList
exports.getTagList = getTagList
exports.getSubjectList = getSubjectList
exports.getLecturerList = getLecturerList
exports.getGroupList = getGroupList
exports.getSubGroupList = getSubGroupList
