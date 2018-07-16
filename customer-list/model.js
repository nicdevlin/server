const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "CustomerList" database object
const CustomerList = new Schema({
    companyId: String,
    suspendedCompanies: Array
})

module.exports = mongoose.model('CustomerList', CustomerList)
