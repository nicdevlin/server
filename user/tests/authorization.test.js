const setJwt = require('jwt-decode')

const authorization = (chai, server, should) => {
    let adminToken = null
    let adminDetails = null

    let supplierToken = null
    let supplierDetails = null

    let purchaserToken = null
    let purchaserDetails = null

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



    

    describe('\n Authorization and "Role" testing', function() {
        

        describe('Creating products', function() {
            it('Admin should be able to create products.', function(done) {
                chai.request(server)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        name: 'Bally Hoo',
                        businessType: 'password',
                        address: '3 Bruns Picture house, Brunswick',
                        phoneNumber: '113346178',
                        accountType: 'purchaser',
                        productOwnerId: userDetails.sub
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('productOwnerId');
                        res.body.productOwnerId.should.equal(userDetails.sub)

                        done()
                    })
            })

            it('Supplier should be able to create products.', function(done) {
                chai.request(server)
                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('Role', `Bearer ${adminDetails.role}`)
                    .send({
                        name: 'Bally Hoo',
                        businessType: 'password',
                        address: '3 Bruns Picture house, Brunswick',
                        phoneNumber: '113346178',
                        accountType: 'purchaser',
                        productOwnerId: userDetails.sub
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('productOwnerId');
                        res.body.productOwnerId.should.equal(userDetails.sub)

                        done()
                    })
            })

            it('Purchaser should NOT be able to create products.', function(done) {
                chai.request(server)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('Role', `Bearer ${adminDetails.role}`)
                    .send({
                        name: 'Bally Hoo',
                        businessType: 'password',
                        address: '3 Bruns Picture house, Brunswick',
                        phoneNumber: '113346178',
                        accountType: 'purchaser',
                        productOwnerId: userDetails.sub
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('productOwnerId');
                        res.body.productOwnerId.should.equal(userDetails.sub)

                        done()
                    })
            })
        })


    })

}



module.exports = authorization
