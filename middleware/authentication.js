const passport = require('passport')
const PassportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const User = require('../user/model.js')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '6h'

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// Tell Passport to process JWT

passport.use(new PassportJwt.Strategy({
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:jwtSecret,
    algorithms: [jwtAlgorithm]
}, (payload, done) => {
    User.findById(payload.sub).then((user) => {
        if (user) {
            user.token = payload
            done(null, user)
        } else {
            done(null, false)
        }
    }).catch((error) => {
            done(error, false)
       })

}))

const register = (req, res, next) => {
User.register(new User({ email: req.body.email, role: req.body.role }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    req.user = user
    next()
  })
}

// Create a JWT (user just logged in or registered)
const signJwtForUser = (req, res) => {
    
    //Use JWT to create a signed token
    const token = JWT.sign(
        //Payload
        {
            email: req.user.email,
            role: req.user.role,
            company: req.user.company,
            sub: req.user._id
        },
            //Secret
            jwtSecret,
            //Header
            {
                algorithm: jwtAlgorithm,
                expiresIn: jwtExpiresIn
            }
    )

    res.json({token: token})
}

module.exports = {
    initializePassport: passport.initialize(),
    requireJwt: passport.authenticate('jwt', { session: false }),
    login: passport.authenticate('local', { session:false }),
    register,
    signJwtForUser
}