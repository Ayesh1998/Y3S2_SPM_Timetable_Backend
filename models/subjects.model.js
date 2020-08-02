const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubjectsSchema = new Schema({
  OfferedYear: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  OfferedSemester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  SubjectName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  SubjectCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  NumberOfLectureHours: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  NumberOfTutorialHours: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  NumberOfLabHours: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  NumberOfEvaluationHours: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
}, {
  timestamps: true,
  collection: 'Subjects'
})

SubjectsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Subjects', SubjectsSchema)
