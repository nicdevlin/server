// TESTS
const user = require('./user/tests')
const product = require('./product/tests')
const order = require('./order/tests')
const deliveryDay = require('./delivery-day/tests')
const company = require('./company/tests')
// const customerList = require('./customer-list/tests')
// const supplierList = require('./supplier-list/tests')

// CONFIG AND REQUIRED PACKAGES
process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('./app.js')

chai.use(chaiHttp)
// DATABASES
const UserDB = require('./user/model')
const productDB = require('./product/model')
const orderDB = require('./order/model')
const deliveryDayDB = require('./deliver-day/model')
const companyDB = require('./company/model')





describe('User test cases.', function () {

    UserDB.collection.drop();

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
    user.testUserSetup(chai, server, should)
    // user.crud(chai, server, should)
})



describe('Product test cases', function () {
    productDB.collection.drop()
    product.crudSupplier(chai, server, should)
})





describe('Order test cases', function () {
    orderDB.collection.drop()
    order.crudSupplier(chai, server, should)
})



describe('Delivery-day test cases', function () {
    deliveryDayDB.collection.drop()
    deliveryDay.crudSupplier(chai, server, should)
})






describe('Company test cases', function () {
    companyDB.collection.drop()
    company.crudSupplier(chai, server, should )     
})

// describe('Customer-list test cases', function () {
    //     // customerList.crudSupplier(chai, server, should)
    // })

// describe('Supplier-list test cases', function(){
//     // supplierList.crudSupplier(chai, server, should)
// })
