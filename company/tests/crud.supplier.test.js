const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let company = null


const crud = (chai, server, should, user) => {




    describe('\nCompany CRUD ops', function () {

// Logs admin user in for authorisation/authentication
        describe('Setting Supplier user token', function() {
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
            });
        })


// Test for creating a new company - CREATE
        describe('POST /companies', function () {
            it('Purchaser Account company creation', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/companies')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        name: 'Bally Hoo',
                        businessType: 'password',
                        address: '3 Bruns Picture house, Brunswick',
                        phoneNumber: '113346178',
                        accountType: 'purchaser',
                        companyOwnerId: userDetails.sub
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
                        res.body.should.have.property('companyOwnerId');
                        res.body.companyOwnerId.should.equal(userDetails.sub)

                        done()
                    })
            })

        })




// Test for .find() all companies - READ (all)
        describe('GET /companies', function () {
            it('should list ALL companies in DB GET', function(done) {
                chai.request(server)
                    .get('/companies')
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('array');
                        res.body[0].should.be.a('object');

                        res.body[0].should.have.property('_id');
                        res.body[0].should.have.property('name');
                        res.body[0].name.should.equal('Bally Hoo');
                        res.body[0].should.have.property('businessType');
                        res.body[0].should.have.property('address');
                        res.body[0].should.have.property('phoneNumber');
                        res.body[0].should.have.property('accountType');
                        res.body[0].should.have.property('companyOwnerId');
                        res.body[0].companyOwnerId.should.equal(userDetails.sub)

                        company = res.body[0]

                        done()
                    })
            });
        })

        
// Test for .findByID() company - READ (specific)
        describe('GET /companies/:id', function () {
            it('should list a SINGLE company in DB GET', function (done) {
                chai.request(server)
                    .get(`/companies/${company._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ _id: company._id })


                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

 
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(company._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('companyOwnerId');
                        
                        done()
                    })
            });
        })

// Test for .findByIdAndUpdate() a targeted company - UPDATE
        describe('PUT /companies/:id', function () {
            it('should update a targeted company provided a unique :id is given ', function(done) {
                chai.request(server)
                    .get(`/companies/${company._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)
                    .send({
                        name: 'Scrooge enterprises'
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(company._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Scrooge enterprises');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('companyOwnerId');

                        done()
                    })
            });

        })

        // Test for .findByIdAndRemove a targeted company - DELETE
        describe('DELETE /companies/:id', function () {
            it('should delete a targeted post provided a unique :id is given', function (done) {
                chai.request(server)
                    .delete(`/companies/${company._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)

                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            });

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/companies/${company._id}`)
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        res.should.have.status(200)
                        should.equal(res.body, null)
                        done()

                    })
            });

        })




    });
}


module.exports = crud
