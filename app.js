const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const HttpError = require('./models/http-errors')
const WorkingDaysAndHours = require('./routes/working-days-hours')
const Groups = require('./routes/groups.routes')
const SubGroups = require('./routes/subGroups.routes')
const Tags = require('./routes/tags.routes')
const YearSems = require('./routes/year-semester.routes')
const Programs = require('./routes/programs.routes')
const GroupNums = require('./routes/groupNums.routes')
const SubGroupNums = require('./routes/subGroupNums.routes')
const LecturersRoutes = require('./routes/lecturers.routes')
const SubjectsRoutes = require('./routes/subjects.routes')
const CentersRoutes = require('./routes/center.routes')
const BuildingsRoutes = require('./routes/buildings.routes')
const RoomsRoutes = require('./routes/rooms.routes')
const RoomsUnavailabilityRoutes = require('./routes/unavailable-rooms.routes')
const StudentsStatisticsRoutes = require('./routes/students-statistics.routes')
const SubjectsStatisticsRoutes = require('./routes/subjects-statistics.routes')
const LecturersStatisticsRoutes = require('./routes/lecturers-statistics.routes')
const AddRoomsRoutes = require('./routes/add-rooms.routes')

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
app.use('/lecturers', LecturersRoutes)
app.use('/subjects', SubjectsRoutes)
app.use('/groups', Groups)
app.use('/subGroups', SubGroups)
app.use('/tags', Tags)
app.use('/yearSems', YearSems)
app.use('/programs', Programs)
app.use('/groupNums', GroupNums)
app.use('/subGroupNums', SubGroupNums)
app.use('/centers', CentersRoutes)
app.use('/buildings', BuildingsRoutes)
app.use('/rooms', RoomsRoutes)
app.use('/unavailableRooms', RoomsUnavailabilityRoutes)
app.use('/studentsStatistics', StudentsStatisticsRoutes)
app.use('/subjectsStatistics', SubjectsStatisticsRoutes)
app.use('/lecturersStatistics', LecturersStatisticsRoutes)
app.use('/addRooms', AddRoomsRoutes)

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
