const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "Order" database object
const Order = new Schema({
    companyDetails: Schema.Types.Mixed,
    companyId: String,

    supplierDetails: Schema.Types.Mixed,
    supplierId: String,

    deliveryAddress: String,
    products: Array,
    orderNo: Number,
    uniqueIdentifier: String,
    datePlaced: Date,

    orderReceived: Boolean,
    orderDispatched: Boolean,
    orderPaid: Boolean,

    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },

    status: String
})

module.exports = mongoose.model('Order', Order)
