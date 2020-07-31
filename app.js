const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const HttpError = require('./models/http-errors')
const WorkingDaysAndHours = require('./routes/working-days-hours')
const BuildingRoutes = require('./routes/buildings.routes')
const RoomRoutes = require('./routes/rooms.routes')

require('dotenv').config()

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
app.use(cors())

app.use('/workingDaysHours', WorkingDaysAndHours)
app.use('/buildings', BuildingRoutes)
app.use('/rooms', RoomRoutes)

app.use(() => {
  throw new HttpError('Could not find this route.', 404)
})

const uri = process.env.ATLAS_URI
const port = process.env.PORT || 5000
const dbName = process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: dbName
}

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(port)
    console.log(`Server is running on port: ${port}`)
  })
  .catch((error) => {
    console.log(error)
  })
