const express = require('express')
const router = express.Router()
const User = require('./model')
const passport = require('passport')
const { requireJwt, register, signJwtForUser, login } = require('../middleware/authentication')
const { accountOwner } = require('../middleware/authorisation')

// User Registration Route
router.post('/register', register, signJwtForUser)

// Logout Route
router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('User signed out successfully.')
})

// Login route
router.post('/login', login, signJwtForUser)  

// User account update route
router.put('/:id', requireJwt, (req, res) => {
    console.log('MADE IT THROUGH AUTHORISATION', req.body)
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(
        user => res.status(200).json(user)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router