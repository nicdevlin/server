const user = require('./user/tests')

process.env.NODE_ENV = 'test'

const chai = require('chai')
// const mongoose = require('mongoose')
const chaiHttp = require('chai-http')
const server = require('./app.js')

chai.use(chaiHttp)

describe('All User Test Cases', function () {

    // Blob.collection.drop();

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
    //     Blob.collection.drop();
    //     done();
    // });

    user.admin(chai, server)
    // user.vendor(chai, server)
    // user.supplier(chai, server)

})