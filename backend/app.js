const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

const User = require('./models/User')
const db = require('../backend/config/db.config')

const productsRoutes = require('./routes/product.routes')
const booksRoutes = require('./routes/book.routes')
const sectionRoutes = require('./routes/section.routes')
const userRoutes = require('./routes/user.routes')
const groupRoutes = require('./routes/group.routes')
const accountantRoutes = require('./routes/accountant.routes')
const librarianRoutes = require('./routes/librarian.routes')
const teacherRoutes = require('./routes/teacher.routes')
const studentRoutes = require('./routes/student.routes')
const parentRoutes = require('./routes/parent.routes')
const courseRoutes = require('./routes/course.routes')
const reserBookRoutes = require('./routes/reservationBook.routes')
const reserProductRoutes = require('./routes/reservationProduct.routes')
const resetPassword = require('./routes/resetPassword.routes')
const subjectRoutes = require('./routes/subject.routes')
const programRoutes = require('./routes/program.routes')
const timeTableRoutes = require('./routes/timeTable.routes')
const eventRoutes = require('./routes/event.routes')
const noteRoutes = require('./routes/note.routes')
const profileRoutes = require('./routes/profile.routes')
const cvRoutes = require('./routes/cv.routes')
const evaluationRoutes = require('./routes/evaluation.routes')
const attandanceRoutes = require('./routes/attandance.routes')
const settingRoutes = require('./routes/setting.routes')

const app = express()

mongoose
  .connect(db.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  })

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/images', express.static(path.join('backend/images')))
app.use(cookieParser())

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD',
  )
  next()
})

function initial() {
  User.estimatedDocumentCount(async (error, count) => {
    if (!error && count === 0) {
      let user = new User({
        fullName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin',
      })

      const saltRounds = 10
      let salt = await bcrypt.genSalt(saltRounds)
      user.password = await bcrypt.hash(user.password, salt)
      user.save((err) => {
        if (err) {
          console.log('error', err)
        }
        console.log(
          'added admin succcessfuly with email: admin@gmail.com and password: admin',
        )
      })
    }
  })
}
initial()

app.use('/api/product', productsRoutes)
app.use('/api/book', booksRoutes)
app.use('/api/section', sectionRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/accountant', accountantRoutes)
app.use('/api/librarian', librarianRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/parent', parentRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/reserBook', reserBookRoutes)
app.use('/api/reserProduct', reserProductRoutes)
app.use('/api/resetPassword', resetPassword)
app.use('/api/subject', subjectRoutes)
app.use('/api/program', programRoutes)
app.use('/api/timeTable', timeTableRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/note', noteRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/evaluation', evaluationRoutes)
app.use('/api/attandance', attandanceRoutes)
app.use('/api/setting', settingRoutes)
module.exports = app
