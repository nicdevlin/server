const setJwt = require('jwt-decode')



const testUserSetup = (chai, server, should) => {

    let adminToken = null
    let adminDetails = null
    
    let supplierToken = null
    let supplierDetails = null
    
    let purchaserToken = null
    let purchaserDetails = null

    describe('\n Creating test accounts', function() {

        // Sets up a test "Admin" account, including a business

        it('Admin Account created', function (done) {
            this.timeout(15000)
            chai.request(server)
                .post('/users/register')
                .send({
                    email: 'admin@test.com',
                    password: 'password',
                    role: 'admin'
                })
                .end((err, res) => {
    
                    should.equal(err, null)
                    res.should.have.status(200)

                    adminToken = res.body.token
                    adminDetails = setJwt(res.body.token)
    
                    done()
                })

                this.timeout(15000)
                chai.request(server)
                    .post('/companies')
                    .set('Authorization', `Bearer ${adminToken}`)
                    .set('CurrentUser', adminDetails)  
                    .send({
                        name: 'Admin-Test-Company',
                        businessType: 'Admin',
                        address: 'Blah',
                        phoneNumber: '113346178',
                        accountType: 'supplier',
                        companyOwnerId: adminDetails.sub,
                        deliveryDays: { monday: {} }
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)
                        done()
                    })

            })
    
    
        // Sets up a test "Purchaser" account, including a business
    
        it('Purchaser Account creation', function (done) {
            this.timeout(15000)
            chai.request(server)
                .post('/users/register')
                .send({
                    email: 'purchaser@test.com',
                    password: 'password',
                    role: 'purchaser'
                })
                .end((err, res) => {
    
                    should.equal(err, null)
                    res.should.have.status(200)

                    purchaserToken = res.body.token
                    purchaserDetails = setJwt(res.body.token)
    
                    done()
                })

            this.timeout(15000)
            chai.request(server)
                .post('/companies')
                .set('Authorization', `Bearer ${purchaserToken}`)
                .set('CurrentUser', purchaserDetails)  
                .send({
                    name: 'Purchaser-Test-Company',
                    businessType: 'Purchaser',
                    address: 'Blah',
                    phoneNumber: '113346178',
                    accountType: 'supplier',
                    companyOwnerId: purchaserDetails.sub,
                    deliveryDays: { monday: {} }
                })
                .end((err, res) => {

                    should.equal(err, null)
                    res.should.have.status(200)
                    done()
                })
        })
    
    
        
    
        // Sets up a test "Supplier" account, including a company
    
        it('Supplier Account creation', function (done) {
            this.timeout(15000)
            chai.request(server)
                .post('/users/register')
                .send({
                    email: 'supplier@test.com',
                    password: 'password',
                    role: 'supplier'
                })
                .end((err, res) => {
    
                    should.equal(err, null)
                    res.should.have.status(200)

                    supplierToken = res.body.token
                    supplierDetails = setJwt(res.body.token)
    
                    done()
                })

            this.timeout(15000)
            chai.request(server)
                .post('/companies')
                .set('Authorization', `Bearer ${supplierToken}`)
                .set('CurrentUser', supplierDetails)  
                .send({
                    name: 'Supplier-Test-Company',
                    businessType: 'Supplier',
                    address: 'Blah',
                    phoneNumber: '113346178',
                    accountType: 'supplier',
                    companyOwnerId: supplierDetails.sub,
                    deliveryDays: { monday: {} }
                })
                .end((err, res) => {

                    should.equal(err, null)
                    res.should.have.status(200)
                    done()
                })
        })
    })



    
}




module.exports = testUserSetup
