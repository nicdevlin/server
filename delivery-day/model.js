const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "DeliveryDay" database object
const DeliveryDay = new Schema({
    orders: Array,
    deliveryDate: Date,
    orderCutoffTime: Date,
    companyId: String,
    deliveriesCompleted: Boolean
})

module.exports = mongoose.model('DeliveryDay', DeliveryDay)
