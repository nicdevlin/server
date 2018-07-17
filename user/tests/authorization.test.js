const setJwt = require('jwt-decode')

const authorization = (chai, server, should) => {
    let adminToken = null
    let adminDetails = null

    let supplierToken = null
    let supplierDetails = null

    let purchaserToken = null
    let purchaserDetails = null


    let testCompany = null

    // USER SETUP

        // ADMIN LOGIN
            chai.request(server)
                .post('/users/login')
                .send({
                    email: 'admin@test.com',
                    password: 'password'
                })
                .end((err, res) => {
                    adminToken = res.body.token
                    adminDetails = setJwt(res.body.token)
                    done()
                })
    
            // SUPPLIER LOGIN
            chai.request(server)
                .post('/users/login')
                .send({
                    email: 'supplier@test.com',
                    password: 'password'
                })
                .end((err, res) => {
                    supplierToken = res.body.token
                    supplierDetails = setJwt(res.body.token)
                    done()
                })
    
            // PURCHASER LOGIN
            chai.request(server)
                .post('/users/login')
                .send({
                    email: 'purchaser@test.com',
                    password: 'password'
                })
                .end((err, res) => {
                    purchaserToken = res.body.token
                    purchaserDetails = setJwt(res.body.token)
                    done()
                })

            // Assign company from supplier LOGIN
            chai.request(server)
                .get(`/company/${supplierDetails.company._id}`)
                .set('Authorization', `Bearer ${supplierToken}`)
                .set('CurrentUser', supplierDetails)
               
                .end((err, res) => {
                    testCompany = res.body
                    done()
                })




    

    describe('\n Authorization and "Role" testing', function() {

       
        describe('Authorisation test for isOwner "ownership" of company', function() {

            it('Admin should be able to update any company they like', function(done) {
                chai.request(server)
                    .put(`/companies/${testCompany._id}`)

                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('CurrentUser', adminDetails)

                    .send({
                        name: 'Admin changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')
                        res.body._id.should.equal(company._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Admin changed name')


                        done()
                    })
            })

            it('Owner should be able to update their own company', function(done) {
                chai.request(server)
                    .put(`/companies/${testCompany._id}`)

                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('CurrentUser', adminDetails)

                    .send({
                        name: 'Owner changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')
                        res.body._id.should.equal(company._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Owner changed name')


                        done()
                    })
            })

            it("A user who isn't owner of company CANNOT update company", function(done) {
                chai.request(server)
                    .put(`/companies/${testCompany._id}`)

                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('CurrentUser', adminDetails)

                    .send({
                        name: 'Owner changed name'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(401)

                        done()
                    })
            })
        })

        describe('CRUD authorization test for products', function() {

            it('Admin should be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('CurrentUser', adminDetails)
                    .send({
                        companyId: adminDetails.company._id,
                        price: 4.50,
                        name: 'Flour',
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(adminDetails.company._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Flour')
                        
                        done()
                    })
            })

            it('Supplier should be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${supplierToken}`)
                    .set('CurrentUser', supplierDetails)
                    .send({
                        companyId: supplierDetails.company._id,
                        price: 4.50,
                        name: 'Oats',
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(supplierDetails.company._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Oats')

                        done()
                    })
            })

            it('Purchaser should NOT be able to create products.', function(done) {
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${purchaserToken}`)
                    .set('CurrentUser', purchaserDetails)
                    .send({
                        companyId: purchaserDetails.company._id,
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
