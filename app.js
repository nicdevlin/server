// Required packages for operation of app
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./_config')
const bodyParser = require('body-parser')

// Assign the top-level function "express()" to app variable to create an express application so that we can use it to setup the back-end server
const app = express()

// Ensures the application uses a middleware function (body-parser) to parse any json data that is sent through a (req.body) request body
app.use(bodyParser.json())

// Middleware for enabling cross-origin resource sharing (allows resrources to be requested from a domain that is different to the one the back-end server is hosted on) between the front-end and back-end of this app
app.use(cors())


// Connects the app to a cloud based database (mLab) while in development mode or a local database if tests are being run
mongoose.connect(config.mongoURI[app.settings.env], (err) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log(`Connected to database ${config.mongoURI[app.settings.env]}!`);
    }
});


// ROUTES GO HERE!


// "app.listen" finds a socket for our newly created server to serve from
app.listen(3001, () => console.log('\n\napp listening on port 3001'))

module.exports = app
