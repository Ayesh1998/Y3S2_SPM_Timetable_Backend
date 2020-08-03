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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(group)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroup)
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

const getGroupsCountByAcademicYear = async (req, res, next) => {
  let groupsCountByAcademicYear
  let subGroupsCountByAcademicYear

  try {
    groupsCountByAcademicYear = await GroupModel.aggregate([{
      $group: {
        '_id': '$year',
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYear = await SubGroupModel.aggregate([{
      $group: {
        '_id': '$year',
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < groupsCountByAcademicYear.length; i++) {
    groupsCountByAcademicYear[i] = {
      ...groupsCountByAcademicYear[i],
      subGroupsCount: subGroupsCountByAcademicYear[i].count
    }
  }

  res.status(200).send(groupsCountByAcademicYear)
}

const getGroupsCountByAcademicYearAndSemester = async (req, res, next) => {
  let groupsCountByAcademicYearAndSemester
  let subGroupsCountByAcademicYearAndSemester

  try {
    groupsCountByAcademicYearAndSemester = await GroupModel.aggregate([{
      $group: {
        '_id': {
          'year': '$year',
          'semester': '$semester'
        },
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYearAndSemester = await SubGroupModel.aggregate([{
      $group: {
        '_id': {
          'year': '$year',
          'semester': '$semester'
        },
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  let yearAndSemester

  for (let i = 0; i < groupsCountByAcademicYearAndSemester.length; i++) {
    const academicYear = groupsCountByAcademicYearAndSemester[i]._id.year
    const academicSemester = groupsCountByAcademicYearAndSemester[i]._id.semester
    yearAndSemester = `Y${academicYear}.S${academicSemester}`
    groupsCountByAcademicYearAndSemester[i] = {
      ...groupsCountByAcademicYearAndSemester[i],
      yearAndSemester: yearAndSemester,
      subGroupsCount: subGroupsCountByAcademicYearAndSemester[i].count
    }
  }

  res.status(200).send(groupsCountByAcademicYearAndSemester)
}

const getGroupsCountByAcademicYearSemesterAndProgramme = async (req, res, next) => {
  let groupsCountByAcademicYearSemesterAndProgramme
  let subGroupsCountByAcademicYearSemesterAndProgramme

  try {
    groupsCountByAcademicYearSemesterAndProgramme = await GroupModel.aggregate([{
      $group: {
        '_id': {
          'year': '$year',
          'semester': '$semester',
          'programme': '$programme'
        },
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYearSemesterAndProgramme = await SubGroupModel.aggregate([{
      $group: {
        '_id': {
          'year': '$year',
          'semester': '$semester',
          'programme': '$programme'
        },
        'count': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  let yearSemesterAndProgramme

  for (let i = 0; i < groupsCountByAcademicYearSemesterAndProgramme.length; i++) {
    const academicYear = groupsCountByAcademicYearSemesterAndProgramme[i]._id.year
    const academicSemester = groupsCountByAcademicYearSemesterAndProgramme[i]._id.semester
    const programme = groupsCountByAcademicYearSemesterAndProgramme[i]._id.programme
    yearSemesterAndProgramme = `Y${academicYear}.S${academicSemester}.${programme}`
    groupsCountByAcademicYearSemesterAndProgramme[i] = {
      ...groupsCountByAcademicYearSemesterAndProgramme[i],
      yearSemesterAndProgramme: yearSemesterAndProgramme,
      subGroupsCount: subGroupsCountByAcademicYearSemesterAndProgramme[i].count
    }
  }

  res.status(200).send(groupsCountByAcademicYearSemesterAndProgramme)
}

exports.addGroup = addGroup
exports.getGroup = getGroup
exports.getGroupList = getGroupList
exports.addSubGroup = addSubGroup
exports.getSubGroup = getSubGroup
exports.getSubGroupList = getSubGroupList
exports.getGroupsCountByAcademicYear = getGroupsCountByAcademicYear
exports.getGroupsCountByAcademicYearAndSemester = getGroupsCountByAcademicYearAndSemester
exports.getGroupsCountByAcademicYearSemesterAndProgramme = getGroupsCountByAcademicYearSemesterAndProgramme
