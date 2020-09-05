const HttpError = require('../models/http-errors')
const SubGroups = require('../models/sub-groups.model')

const createSubGroups = async (req, res, next) => {
  const {academicYear, academicSemester, academicYearAndSemester, programme, group, groupId, subGroup, subGroupId} = req.body

  const SubGroupsItem = new SubGroups({
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroup,
    subGroupId
  })

  try {
    await SubGroupsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    subGroupsItem: SubGroupsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

// noinspection JSUnusedLocalSymbols
const getSubGroups = async (req, res, next) => {
  SubGroups.find({})
    .then((subGroups) =>
      res.json({subGroups: subGroups, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

// noinspection JSUnusedLocalSymbols
const editSubGroups = async (req, res, next) => {
  const {subGroups, id} = req.body
  const query = {'_id': id}
  SubGroups.findOneAndUpdate(query, subGroups, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({subGroups: item, message: 'got results'})
  })
}

// noinspection JSUnusedLocalSymbols
const deleteSubGroups = async (req, res, next) => {
  const {id} = req.body
  // noinspection JSUnusedLocalSymbols
  SubGroups.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getSubGroup = async (req, res, next) => {
  let subGroup

  const {
    id
  } = req.params

  try {
    subGroup = await SubGroups.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroup)
}

exports.createSubGroups = createSubGroups
exports.editSubGroups = editSubGroups
exports.getSubGroups = getSubGroups
exports.getSubGroup = getSubGroup
exports.deleteSubGroups = deleteSubGroups

