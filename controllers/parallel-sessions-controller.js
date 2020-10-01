const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')

const addParallelSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    duration,
    day,
    startTime,
    endTime,
    isParallel,
    parallelId
  } = req.body

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.duration = duration
  session.day = day
  session.startTime = startTime
  session.endTime = endTime
  session.isParallel = isParallel
  session.parallelId = parallelId
  session.roomRef = null

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Parallel sessions added successfully!'
  })
}

exports.addParallelSession = addParallelSession
