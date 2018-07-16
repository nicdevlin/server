// Required packages for operation of app
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./_config')



// Assign the top-level function "express()" to app variable to create an express application so that we can use it to setup the back-end server
const app = express()

// Ensures the application uses a middleware function (body-parser) to parse any json data that is sent through a (req.body) request body
app.use(bodyParser.json())

// Middleware for enabling cross-origin resource sharing (allows resrources to be requested from a domain that is different to the one the back-end server is hosted on) between the front-end and back-end of this app
app.use(cors())


// Connects the app to a cloud based database (mLab) while in development mode or a local database if tests are being run
mongoose.connect(config.mongoURI[app.settings.env], (err) => {
    if (err) {
        console.log(`Error connecting to database ${config.mongoURI[app.settings.env]}`, err);
    } else {
        console.log(`Connected to database ${config.mongoURI[app.settings.env]}!`);
    }
});


// Routes List
const company = require('./company/routes')
const customerList = require('./customer-list/routes')
const deliveryDay = require('./delivery-day/routes')
const order = require('./order/routes')
const product = require('./product/routes')
const supplierList = require('./supplier-list/routes')
const user = require('./user/routes')

// Assigning routes to Express
app.use('/users', user)


// "app.listen" finds a socket for our newly created server to serve from
app.listen(3001, () => console.log('\n\nApp listening on Port 3001.'))

module.exports = app
