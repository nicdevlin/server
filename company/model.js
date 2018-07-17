const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creates the schema for the "Company" database object
const Company = new Schema({
   name: String,
   abn: String,
   businessType: String,
   address: String,
   phoneNumber: String,
   accountType: String,
   supplierListID: String,
   customerListID: String,
   companyOwnerId: String,
   deliveryDays: Schema.Types.Mixed
})

module.exports = mongoose.model('Company', Company)
