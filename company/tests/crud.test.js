const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let company = null


const crud = (chai, server, should, user) => {




    describe('\n Company CRUD ops', function () {

// Logs admin user in for authorisation/authentication
        describe('Setting Supplier user token and details', function() {
            it('', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'supplier@test.com',
                        password: 'password'
                    })
                    .end((err, res) => {
                        token = res.body.token
                        userDetails = jwtDecode(token)
                        done()
                    })
            })
        })


// Test for creating a new company - CREATE
        describe('POST /company', function () {
            it('Purchaser Account company creation', function (done) {
                // this.timeout(15000)
                chai.request(server)
                    .post('/company')
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)  
                    
                    .send({
                        name: 'Test-Company',
                        businessType: 'Bakery',
                        address: 'Mullumbimby',
                        phoneNumber: '113346178',
                        accountType: 'supplier',
                        companyOwnerId: userDetails.sub,
                        deliveryDays: {monday:{cutoffTime: '22'}}
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Test-Company')
                        
                        res.body.should.have.property('businessType')
                        res.body.should.have.property('address')
                        res.body.should.have.property('phoneNumber')
                        res.body.should.have.property('accountType')
                        res.body.should.have.property('companyOwnerId')
                        res.body.companyOwnerId.should.equal(userDetails.sub)

                        res.body.should.have.property('deliveryDays')
                        res.body.deliveryDays.should.be.a('object')
                        res.body.deliveryDays.should.have.property('monday')

                        done()
                    })
            })

        })




// Test for .find() all company - READ (all)
        describe('GET /company', function () {
            it('should list ALL company in DB GET', function(done) {
                chai.request(server)
                    .get('/company')
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)
                        

                        res.body.should.be.a('array')
                        res.body[3].should.be.a('object')

                        res.body[3].should.have.property('_id')

                        res.body[3].should.have.property('name')
                        res.body[3].name.should.equal('Test-Company');

                        res.body[3].should.have.property('businessType')
                        res.body[3].should.have.property('address')
                        res.body[3].should.have.property('phoneNumber')
                        res.body[3].should.have.property('accountType')
                        res.body[3].should.have.property('companyOwnerId')
                        res.body[3].companyOwnerId.should.equal(userDetails.sub)

                        res.body[3].should.have.property('deliveryDays')
                        res.body[3].deliveryDays.should.be.a('object')
                        res.body[3].deliveryDays.should.have.property('monday')

                        company = res.body[3]

                        done()
                    })
            })
        })

        
// Test for .findByID() company - READ (specific)
        // describe('GET /company/:id', function () {
        //     it('should list a SINGLE company in DB GET', function (done) {
        //         chai.request(server)
        //             .get(`/company/${company._id}`)

        //             .set('Authorization', `Bearer ${token}`)
        //             .set('CurrentUser', userDetails)  
                    
        //             .send({ _id: company._id })


        //             .end((err, res) => {
        //                 should.equal(err, null)
        //                 res.should.have.status(200)

 
        //                 res.body.should.have.property('_id')

        //                 res.body.should.have.property('name')
        //                 res.body.name.should.equal('Test-Company')

        //                 res.body.should.have.property('businessType')
        //                 res.body.should.have.property('address')
        //                 res.body.should.have.property('phoneNumber')
        //                 res.body.should.have.property('accountType')
        //                 res.body.should.have.property('companyOwnerId')
        //                 res.body.companyOwnerId.should.equal(userDetails.sub)

        //                 res.body.should.have.property('deliveryDays')
        //                 res.body.deliveryDays.should.be.a('object')
        //                 res.body.deliveryDays.have.property('monday')
                        
        //                 done()
        //             })
        //     })
        // })

// Test for .findByIdAndUpdate() a targeted company - UPDATE
        describe('PUT /company/:id', function () {
            it('should update a targeted company provided a unique :id is given and user is owner', function(done) {
                chai.request(server)
                    .put(`/company/${company._id}`)

                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)  

                    .send({
                        companyOwnerId: company.companyOwnerId,
                        name: 'Scrooge enterprises'
                    })

                    .end((err, res) => {
                        // console.log(`ID provided to route: ${company.companyOwnerId}`)
                        // console.log("Company details:", res.body)
                        // console.log("User details:", userDetails)
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')

                        res.body.should.have.property('_id')
                        res.body._id.should.equal(company._id)

                        res.body.should.have.property('name')
                        res.body.name.should.equal('Scrooge enterprises')
                        

                        done()
                    })
            })

        })

        // Test for .findByIdAndRemove a targeted company - DELETE
        describe('DELETE /company/:id', function () {
            it('should delete a targeted post provided a unique :id is given', function (done) {
                chai.request(server)
                    .delete(`/company/${company._id}`)
                    
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)  
                    .send({companyOwnerId: company.companyOwnerId})
                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            })

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/company/${company._id}`)
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        res.should.have.status(200)

                        done()

                    })
            })

        })




    })
}


module.exports = crud
