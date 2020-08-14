const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const LecturersSchema = new Schema({
  lecturerName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  employeeId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  faculty: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  department: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  center: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  building: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  rank: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Lecturers'
})

// noinspection JSUnresolvedFunction
LecturersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Lecturers', LecturersSchema)
