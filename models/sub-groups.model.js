const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubGroupsSchema = new Schema({
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
    unique: false,
    trim: true
  },
  subGroup: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  subGroupId: {
    type: String,
    required: true,
    unique: true,
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
  collection: 'SubGroups'
})

SubGroupsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SubGroups', SubGroupsSchema)
