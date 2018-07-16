const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "DeliveryDay" database object
const DeliveryDay = new Schema({
    orderId: String,
    deliveryDate: Date,
    orderCutoffTime: Date,
    deliveriesCompleted: Boolean
})

module.exports = mongoose.model('DeliveryDay', DeliveryDay)
