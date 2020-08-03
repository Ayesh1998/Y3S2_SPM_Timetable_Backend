const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const GroupsSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  semester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  yearAndSemester: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  programme: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  group: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  groupId: {
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
