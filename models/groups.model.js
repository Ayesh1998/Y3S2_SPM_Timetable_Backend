const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const GroupsSchema = new Schema({
  Year: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  Semester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  YearAndSemester: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Programme: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  Group: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  GroupId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Groups'
})

GroupsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Groups', GroupsSchema)
