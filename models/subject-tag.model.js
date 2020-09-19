const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubjectTagsSchema = new Schema({
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
  collection: 'SubjectTags'
})

SubjectTagsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SubjectTags', SubjectTagsSchema)
