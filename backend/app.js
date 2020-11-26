const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const indexRouter = require('./routes/index')
const exampleRouter = require('./routes/example')
const story = require('./routes/story')
const user = require('./routes/user')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/example', exampleRouter)
app.use('/api/story', story)
app.use('/api/users', user)

/** Passport setup  */
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
app.use(passport.initialize())

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await Users.findAll({ where: { id: jwt_payload.id } })
      if (user.length) return done(null, user)
      return done(null, false)
    } catch (error) {
      console.log(error)
    }
  })
)

module.exports = app
