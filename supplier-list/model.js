const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "supplierList" database object
const SupplierList = new Schema({
    companyId: String
})

module.exports = mongoose.model('SupplierList' , SupplierList)
