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
const deliveryDayDB = require('./delivery-day/model')
const companyDB = require('./company/model')





describe('\n User test cases.', function () {
    user.authentication(chai, server, should)
    user.testUserSetup(chai, server, should)
    // user.authorization(chai, server, should)
    // user.crud(chai, server, should)
})

describe('\n Product test cases', function () {
    product.crud(chai, server, should)
})

describe('\n Order test cases', function () {
    order.crud(chai, server, should)
})

describe('\n Delivery-day test cases', function () {
    deliveryDay.crud(chai, server, should)
})

describe('\n Company test cases', function () {
    company.crud(chai, server, should )     
})

// UserDB.collection.drop();

// productDB.collection.drop()

// orderDB.collection.drop()

// deliveryDayDB.collection.drop()

// companyDB.collection.drop()


// describe('\n Customer-list test cases', function () {
    //     // customerList.crud(chai, server, should)
    // })

// describe('\n Supplier-list test cases', function(){
//     // supplierList.crud(chai, server, should)
// })
