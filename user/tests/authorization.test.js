const setJwt = require('jwt-decode')

let adminToken = null
let adminDetails = null

let supplierToken = null
let supplierDetails = null

let purchaserToken = null
let purchaserDetails = null


let testCompany = null

const authorization = (chai, server, should) => {
    
  

    // USER SETUP

    
    
    
    

    
    
    describe('\n Authorization and "Role" testing', function() {
        describe('Setting user accounts',function () {
            it('Admin Login - Authorisation', function(done) {
                // ADMIN LOGIN
                this.timeout(15000)
                    chai.request(server)
                        .post('/users/login')
                        .send({
                            email: 'admin@test.com',
                            password: 'password'
                        })
                        .end((err, res) => {
                            res.should.have.status(200)
                            adminToken = res.body.token
                            adminDetails = setJwt(res.body.token)
                            console.log(adminDetails)
                            done()
                        })
            })
        })
        describe('Setting user accounts',function () {

            it('Supplier Login - Authorisation', function (done) {
                // SUPPLIER LOGIN
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'supplier@test.com',
                        password: 'password'
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        supplierToken = res.body.token
                        supplierDetails = setJwt(res.body.token)
                        done()
                    })
        
            })
        })
        describe('Setting user accounts',function () {

        
            it('Purchaser Login - Authorisation', function (done) {
                // PURCHASER LOGIN
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'purchaser@test.com',
                        password: 'password'
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        purchaserToken = res.body.token
                        purchaserDetails = setJwt(res.body.token)
                        done()
                    })
        
            })
        })
        describe('Setting user accounts',function () {

            it('Company setup - Authorisation', function (done) {
                // Assign company from supplier LOGIN
                chai.request(server)
                    // console.log(supplierDetails)
                    .get(`/company/${supplierDetails.company._id}`)
                    .set('Authorization', `Bearer ${supplierToken}`)
                    .set('user', supplierDetails)
                   
                    .end((err, res) => {
                        res.should.have.status(200)
                        testCompany = res.body
                        done()
                    })
        
            })

        })
        
       
        describe('Authorisation test for isOwner "ownership" of company', function() {

            it('Admin should be able to update any company they like', function(done) {
                chai.request(server)
                    .put(`/company/${testCompany._id}`)
                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('user', adminDetails)

                    .send({
                        name: 'Admin changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')
                        res.body._id.should.equal(testCompany._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Admin changed name')


                        done()
                    })
            })

            it('Owner should be able to update their own company', function(done) {
                chai.request(server)
                    .put(`/company/${testCompany._id}`)

                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('user', adminDetails)
                    .send({
                        name: 'Owner changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')
                        res.body._id.should.equal(testCompany._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Owner changed name')


                        done()
                    })
            })

            it("A user who isn't owner of company CANNOT update company", function(done) {
                chai.request(server)
                    .put(`/company/${testCompany._id}`)

                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('user', adminDetails)

                    .send({
                        name: 'Owner changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(403)

                        done()
                    })
            })
        })

        describe('CRUD authorization test for products', function() {

            it('Admin should be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('user', adminDetails)
                    .send({
                        companyId: adminDetails.testCompany._id,
                        price: 4.50,
                        name: 'Flour',
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(adminDetails.testCompany._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Flour')
                        
                        done()
                    })
            })

            it('Supplier should be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${supplierToken}`)
                    .set('user', supplierDetails)
                    .send({
                        companyId: supplierDetails.testCompany._id,
                        price: 4.50,
                        name: 'Oats',
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(supplierDetails.testCompany._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Oats')

                        done()
                    })
            })

            it('Purchaser should NOT be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${purchaserToken}`)
                    .set('user', purchaserDetails)
                    .send({
                        companyId: purchaserDetails.testCompany._id,
                        price: 4.50,
                        name: 'Oats',
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(401)

                        res.body.should.equal(undefined)

                        done()
                    })
            })
        })
    })
}



module.exports = authorization
