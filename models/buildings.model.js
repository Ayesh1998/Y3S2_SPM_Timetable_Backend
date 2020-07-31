const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const BuildingsSchema = new Schema({
  buildingName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Buildings'
})

BuildingsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Buildings', BuildingsSchema)
