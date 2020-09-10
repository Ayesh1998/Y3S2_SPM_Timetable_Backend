const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const SessionsSchema = new Schema({
  sessionId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  lecturers: [{
    lecturer: {
      type: String,
      required: true,
      unique: false,
      trim: true
    }
  }],
  subject: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  tag: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  groupId: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  subGroupId: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  studentCount: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  day: {
    type: String,
    enum: days,
    required: false,
    unique: false,
    trim: true
  },
  startTime: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  endTime: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  isParallel: {
    type: Boolean,
    default: false,
    required: false,
    unique: false,
    trim: true
  },
  parallelId: {
    type: Number,
    required: false,
    unique: false,
    trim: true
  },
  isConsecutive: {
    type: Boolean,
    default: false,
    required: false,
    unique: false,
    trim: true
  },
  consecutiveId: {
    type: Number,
    required: false,
    unique: false,
    trim: true
  },
  isSameRoom: {
    type: Boolean,
    default: false,
    required: false,
    unique: false,
    trim: true
  },
  room: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  possibleRooms: [{
    roomName: {
      type: String,
      required: false,
      unique: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Sessions'
})

SessionsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Sessions', SessionsSchema)
