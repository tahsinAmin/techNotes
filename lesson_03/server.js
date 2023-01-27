// This line helps to use .env throughout package.
require('dotenv').config()
// https://www.youtube.com/watch?v=Iw_LHrip-iw
const express = require("express")
//  Have a github repo for this whole project with lesson_02, lesson_03, etc.
const app = express()
const path = require('path')

const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3500

connectDB()

app.use(logger)

app.use(cors(corsOptions))

// [Built-in middleware] Able to use and parse json data.
app.use(express.json())

app.use(cookieParser())

// [Built-in middleware] Says where to grab static files.
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root.js'))

app.all('*', (req, res) => {
   res.status(404)
   if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'))
   } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
   } else {
      res.type('txt').send('404 Not Found')

   }
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
   console.log('connected to mongodb')
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
   console.log(err)
   logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
