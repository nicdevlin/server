const setJwt = require('jwt-decode')



const testUserSetup = (chai, server, should) => {

    let adminToken = null
    let adminDetails = null
    let adminCo = null
    
    let supplierToken = null
    let supplierDetails = null
    let supplierCo = null
    
    
    let purchaserToken = null
    let purchaserDetails = null
    let purchaserCo = null

    
    

    describe('\n Creating test accounts', function() {

        
        it('Admin Account created', function (done) {
// Sets up a test "Admin" account
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

// Creates a company for the "admin" test user
            this.timeout(15000)
            chai.request(server)
                .post('/companies')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('CurrentUser', adminDetails)  
                .send({
                    name: 'Admin-Test-Company',
                    abn: 'fakeAbn',
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
                    adminCo = res.body
                    done()
                })
// This places the company object in the "admin" user.company element for easy reference
            this.timeout(15000)
            chai.request(server)
                .put(`/users/${adminDetails.sub}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .set('CurrentUser', adminDetails)  
                .send({
                    company: adminCo
                })
                .end((err, res) => {

                    should.equal(err, null)
                    res.should.have.status(200)
                    res.body.company.should.be.a('object')


                    done()
                })

            })
    
    
            
            it('Purchaser Account creation', function (done) {
// Sets up a test "Purchaser" account
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
// Creates a company for the "purchaser" test user

            this.timeout(15000)
            chai.request(server)
                .post('/companies')
                .set('Authorization', `Bearer ${purchaserToken}`)
                .set('CurrentUser', purchaserDetails)  
                .send({
                    name: 'Purchaser-Test-Company',
                    abn: 'fakeAbn',
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

                    purchaserCo = res.body
                    done()
                })

// This places the company object in the "purchaser" user.company element for easy reference
            this.timeout(15000)
            chai.request(server)
                .put(`/users/${purchaserDetails.sub}`)
                .set('Authorization', `Bearer ${purchaserToken}`)
                .set('CurrentUser', purchaserDetails) 
                .send({
                    company: purchaserCo
                })
                .end((err, res) => {

                    should.equal(err, null)
                    res.should.have.status(200)

                    res.body.company.should.be.a('object')

                    done()
                })
        })
    
    
        
    
        
        it('Supplier Account creation', function (done) {
// Sets up a test "Supplier" account
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
// Creates a company for the "supplier" test user

            this.timeout(15000)
            chai.request(server)
                .post('/companies')
                .set('Authorization', `Bearer ${supplierToken}`)
                .set('CurrentUser', supplierDetails)  

                .send({
                    name: 'Supplier-Test-Company',
                    abn: 'fakeAbn',
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
                    supplierCo = res.body
                    done()
                })

// This places the company object in the user.company element for easy reference
            this.timeout(15000)
            chai.request(server)
                .put(`/users/${supplierDetails.sub}`)
                .set('Authorization', `Bearer ${supplierToken}`)
                .set('CurrentUser', supplierDetails)  

                .send({
                    company: supplierCo
                })
                .end((err, res) => {

                    should.equal(err, null)
                    res.should.have.status(200)
                    res.body.company.should.be.a('object')

                    done()
                })
        })
    })



    
}




module.exports = testUserSetup
