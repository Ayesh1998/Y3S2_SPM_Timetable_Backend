const HttpErrorsModel = require('../models/http-errors')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')

const addGroup = async (req, res, next) => {
  let existingGroup

  const {
    year,
    semester,
    yearAndSemester,
    programme,
    group,
    groupId
  } = req.body

  try {
    existingGroup = await GroupModel.findOne({
      groupId: groupId
    })
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingGroup) {
    res.json({
      exists: true,
      message: 'A group with the same id already exists.'
    })
    return next(new HttpErrorsModel('A group with the same id already exists.', 409))
  }

  const newGroup = new GroupModel({
    year,
    semester,
    yearAndSemester,
    programme,
    group,
    groupId
  })

  try {
    await newGroup.save()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New group added successfully!'
  })
}

const getGroup = async (req, res, next) => {
  let group

  const {
    id
  } = req.params

  try {
    group = await GroupModel.findById(id)
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(group)
}

const getGroupList = async (req, res, next) => {
  let groupList

  try {
    groupList = await GroupModel.find()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(groupList)
}

const addSubGroup = async (req, res, next) => {
  let existingSubGroup

  const {
    year,
    semester,
    yearAndSemester,
    programme,
    group,
    groupId,
    subGroup,
    subGroupId
  } = req.body

  try {
    existingSubGroup = await SubGroupModel.findOne({
      subGroupId: subGroupId
    })
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingSubGroup) {
    res.json({
      exists: true,
      message: 'A sub group with the same id already exists.'
    })
    return next(new HttpErrorsModel('A sub group with the same id already exists.', 409))
  }

  const newSubGroup = new SubGroupModel({
    year,
    semester,
    yearAndSemester,
    programme,
    group,
    groupId,
    subGroup,
    subGroupId
  })

  try {
    await newSubGroup.save()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New sub group added successfully!'
  })
}

const getSubGroup = async (req, res, next) => {
  let subGroup

  const {
    id
  } = req.params

  try {
    subGroup = await SubGroupModel.findById(id)
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroup)
}

const getSubGroupList = async (req, res, next) => {
  let subGroupList

  try {
    subGroupList = await SubGroupModel.find()
  } catch (error) {
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroupList)
}

exports.addGroup = addGroup
exports.getGroup = getGroup
exports.getGroupList = getGroupList
exports.addSubGroup = addSubGroup
exports.getSubGroup = getSubGroup
exports.getSubGroupList = getSubGroupList
