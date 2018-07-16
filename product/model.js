const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "Product" database object
const Product = new Schema({
    companyId: String,
    price: Number,
    productId: String,
    name: String,
    description: String,
    categories: Array,
    tags: Array,
    stockQty: Number,

    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Product', Product)
