const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const errorLog = require('debug')('app:error')
const passport = require('passport')

const indexRouter = require('./routes/index')
const exampleRouter = require('./routes/example')
const storyRouter = require('./routes/story')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/example', exampleRouter)
app.use('/api/story', storyRouter)
app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)

require('dotenv').config({ path: './config/config.env' })

errorLog.log = console.log.bind(console)

app.use(passport.initialize())
require('./auth')(passport)

module.exports = app
