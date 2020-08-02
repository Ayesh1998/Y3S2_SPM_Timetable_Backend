const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const LecturersSchema = new Schema({
  LecturerName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  EmployeeId: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  Faculty: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Department: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Center: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Building: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Level: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  Rank: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
}, {
  timestamps: true,
  collection: 'Lecturers'
})

LecturersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Lecturers', LecturersSchema)
