const { User } = require('./models')
const fs = require('fs')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const opts = {
  algorithm: ["RS256"],
}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = 'secret'
const privateKey = fs.readFileSync(`${process.env.KEY_DIR}/private.key`)
const publicKey = fs.readFileSync(`${process.env.KEY_DIR}/public.pem`)
opts.secretOrKey = publicKey
process.env.PRIVATE_KEY = privateKey

module.exports = passport => {
  /** Passport setup  */
  try {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await User.findAll({
            where: { username: jwt_payload.username },
          })
          if (user.length) return done(null, user)
          return done(null, false)
        } catch (error) {
          console.log(error)
        }
      })
    )
  } catch (error) {
    errorLog(
      'Unable Setup passport. Make sure you have generated key by yarn run genkey or npm run genkey.'
    )
    process.exit()
  }
}
