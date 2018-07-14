// TESTS
const user = require('./user/tests')
const supplierList = require('./supplier-list/tests')
const product = require('./product/tests')
const order = require('./order/tests')
const deliveryDay = require('./delivery-day/tests')
const customerList = require('./customer-list/tests')
const company = require('./company/tests')

// CONFIG AND REQUIRED PACKAGES
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
// const mongoose = require('mongoose')
const chaiHttp = require('chai-http')
const server = require('./app.js')

chai.use(chaiHttp)
// DATABASES
const UserDB = require('./user/model')





describe('User test cases.', function () {

    // UserDB.collection.drop();

    // beforeEach(function (done) {
    //     var newBlob = new Blob({
    //         name: 'Bat',
    //         lastName: 'man'
    //     });
    //     newBlob.save(function (err) {
    //         done();
    //     });
    // });
    // afterEach(function (done) {
    //     UserDB.collection.drop();
    //     done();
    // });

    user.authentication(chai, server, should)
    user.crud(chai, server, should)
})




describe('Supplier-list test cases', function(){
    supplierList.crud(chai, server, should)
})




describe('Product test cases', function () {
    product.crud(chai, server, should)
})



describe('Order test cases', function () {
    order.crud(chai, server, should)
})



describe('Delivery-day test cases', function () {
    deliveryDay.crud(chai, server, should)
})



describe('Customer-list test cases', function () {
    customerList.crud(chai, server, should)
})



describe('Company test cases', function () {
    company.crud(chai, server, should )     
})

