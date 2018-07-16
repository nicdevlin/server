const express = require('express')
const router = express.Router()

router.post('/register', (req, res, next) => {
    res.send('Registered.')
})

router.get('/logout', (req, res, next) => {
    res.send('Logged out.')
})

router.post('/login', (req, res, next) => {
    res.send('Logged in.')
});

module.exports = router