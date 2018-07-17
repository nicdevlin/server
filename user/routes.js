const express = require('express')
const router = express.Router()
const User = require('./model')
const passport = require('passport')
const { requireJwt, register, signJwtForUser, login } = require('../middleware/auth')

router.post('/register', register, signJwtForUser, (req, res) => {
    res.send('Registered.')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('User signed out successfully.')
})

router.post('/login', login, signJwtForUser, (req, res) => {
    res.status(200).send('Logged in.')
})  

module.exports = router