const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
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
    required: false,
    unique: true,
    trim: true
  },
  lecturers: [{
    lecturerRef: {
      type: Schema.Types.ObjectId,
      ref: 'Lecturers',
      required: true,
      unique: false,
      trim: true
    }
  }],
  subjectRef: {
    type: Schema.Types.ObjectId,
    ref: 'Subjects',
    required: true,
    unique: false,
    trim: true
  },
  tagRef: {
    type: Schema.Types.ObjectId,
    ref: 'Tags',
    required: true,
    unique: false,
    trim: true
  },
  groupRef: {
    type: Schema.Types.ObjectId,
    ref: 'Groups',
    required: false,
    default: null,
    unique: false,
    trim: true
  },
  subGroupRef: {
    type: Schema.Types.ObjectId,
    ref: 'SubGroups',
    required: false,
    default: null,
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
    required: false,
    default: false,
    unique: false,
    trim: true
  },
  parallelId: {
    type: Number,
    required: false,
    default: null,
    unique: false,
    trim: true
  },
  isConsecutive: {
    type: Boolean,
    required: false,
    default: false,
    unique: false,
    trim: true
  },
  consecutiveId: {
    type: Number,
    required: false,
    default: null,
    unique: false,
    trim: true
  },
  isSameRoom: {
    type: Boolean,
    required: false,
    default: false,
    unique: false,
    trim: true
  },
  roomRef: {
    type: Schema.Types.ObjectId,
    ref: 'Rooms',
    required: false,
    default: null,
    unique: false,
    trim: true
  },
  possibleRooms: [{
    roomRef: {
      type: Schema.Types.ObjectId,
      ref: 'Rooms',
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

autoIncrement.initialize(mongoose.connection)

SessionsSchema.plugin(autoIncrement.plugin, {
  model: 'Sessions',
  field: 'sessionId',
  startAt: 1000,
  incrementBy: 1
})

module.exports = mongoose.model('Sessions', SessionsSchema)
