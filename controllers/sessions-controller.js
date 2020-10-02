const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')
const WorkingDaysAndHours = require('../models/woking-days-hours-model')

const addSessions = async (req, res, next) => {
  const {
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    label
  } = req.body

  const getNoOfWorkingTime = (startTime, endTime) => {
    var startTime = startTime;
    var endTime = endTime;

    var todayDate = moment(new Date()).format('MM-DD-YYYY');

    var startDate = new Date(`${todayDate} ${startTime}`);
    var endDate = new Date(`${todayDate} ${endTime}`);
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    hh = ('0' + hh).slice(-2);

    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    mm = ('0' + mm).slice(-2);

    timeDiff -= mm * 1000 * 60;
    var ss = Math.floor(timeDiff / 1000);
    ss = ('0' + ss).slice(-2);

    return ({ hours: hh, minutes: mm });
  };

  const generateNoOfTimeSlots = (timeSlotTime, startTime, endTime) => {
    const time = getNoOfWorkingTime(startTime, endTime);
    const tempHoursInMinutes = time.hours * 60;
    const slots = (parseInt(tempHoursInMinutes) + parseInt(time.minutes)) / timeSlotTime;
    return slots;
  };

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomDayNo = randomInteger(0,4);
  let randomHourNo = randomInteger(0,8);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hourss = ['08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'];


  const newSession = new SessionModel({
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    day:days[randomDayNo],
    startTime: hourss[randomHourNo],
    endTime: hourss[(randomHourNo + 2)],
    subGroupRef,
    studentCount,
    duration,
    label
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

const getSessionLists = async (req, res, next) => {
  let sessionList

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(sessionList)
}



const addNotAvailable = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.unavailability =  unavailability


  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'session not available added successfully!'
  })
}

exports.addSessions = addSessions
exports.getSession = getSession
exports.getSessionLists = getSessionLists
exports.addNotAvailable = addNotAvailable
