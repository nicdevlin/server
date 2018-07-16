const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "Order" database object
const Order = new Schema({
    companyDetails: Schema.Types.Mixed,
    companyName: String,
    companyId: String,

    supplierDetails: Schema.Types.Mixed,
    supplierName: String,
    supplierId: String,

    deliveryAddress: String,
    products: Array,
    orderNo: Number,
    datePlaced: Date,

    orderReceived: Boolean,
    orderDispatched: Boolean,
    orderPaid: Boolean,

    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },

    status: String
})

module.exports = mongoose.model('Order', Order)
