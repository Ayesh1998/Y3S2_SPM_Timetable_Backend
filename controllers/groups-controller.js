const HttpError = require('../models/http-errors')
const Groups = require('../models/groups.model')

const createGroups = async (req, res, next) => {
  const {academicYear,academicSemester,academicYearAndSemester,programme, group,groupId,subGroups,availableSubGroup} = req.body

  const GroupsItem = new Groups({
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroups,
    availableSubGroup
  })

  try {
    await GroupsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    groupsItem: GroupsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

// noinspection JSUnusedLocalSymbols
const getGroups = async (req, res, next) => {
  Groups.find({})
    .then((groups) =>
      res.json({groups: groups, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

// noinspection JSUnusedLocalSymbols
const editGroups = async (req, res, next) => {
  const {groups, id} = req.body
  const query = {'_id': id}
  Groups.findOneAndUpdate(query, groups, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({groups: item, message: 'got results'})
  })
}

// noinspection JSUnusedLocalSymbols
const deleteGroups = async (req, res, next) => {
  const {id} = req.body
  // noinspection JSUnusedLocalSymbols
  Groups.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getGroup = async (req, res, next) => {
    let group
  
    const {
      id
    } = req.params
  
    try {
      group = await Groups.findById(id)
    } catch (error) {
      console.log(error)
      return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
    }
  
    res.status(200).send(group)
  }

exports.createGroups = createGroups
exports.editGroups = editGroups
exports.getGroups = getGroups
exports.getGroup = getGroup
exports.deleteGroups = deleteGroups

