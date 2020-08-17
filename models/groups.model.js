const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const GroupsSchema = new Schema({
  academicYear: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  academicSemester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  academicYearAndSemester: {
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
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  groupId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subGroups: [{
    subGroup: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  }],
  availableSubGroup: {
    type: Boolean,
    required: false,
    unique: false,
    trim: true
  },
}, {
  timestamps: true,
  collection: 'Groups'
})

// noinspection JSUnresolvedFunction
GroupsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Groups', GroupsSchema)
