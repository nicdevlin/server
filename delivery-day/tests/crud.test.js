const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let deliveryDay = null


const crud = (chai, server, should, user) => {

    describe('\n DeliveryDay CRUD ops', function () {

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


// Test for creating a new deliveryDay - CREATE
        describe('POST /delivery-day', function () {
            it('Purchaser Account deliveryDay creation', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/delivery-day')
                    .set('Authorization', `Bearer ${token}`)
                    .set('CurrentUser', userDetails)  
                    .send({
                        orders: [
                            {
                                _id: 'fakeOrderId1', 
                                companyId: 'fakeCompanyId1'
                            }
                        ],
                        deliveryDate: Date.now,
                        orderCutoffTime: Date.now,
                        companyId: userDetails.company._id,
                        deliveriesCompleted: false
                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')
                        res.body.should.have.property('_id')

                        res.body.should.have.property('orders')
                        res.body.orders.should.be.a('array')
                        res.body.orders[0].should.be.a('object')
                        res.body.orders[0].should.have.lengthOf(1)
                  
                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(userDetails.company._id)

                        done()
                    })
            })
        })


// Test for .find() all delivery-day - READ (all)
        describe('GET /delivery-day', function () {
            it('should list ALL delivery-day in DB GET', function(done) {
                chai.request(server)
                    .get('/delivery-day')
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('array');
                        res.body[0].should.be.a('object');


                  
                        res.body[0].should.have.property('_id')

                        res.body[0].should.have.property('orders')
                        res.body[0].orders.should.be.a('array')
                        res.body[0].orders[0].should.be.a('object')

                        res.body[0].should.have.property('companyId')
                        res.body[0].companyId.should.equal(userDetails.company._id)

                        deliveryDay = res.body[0]

                        done()
                    })
            })
        })

        
// Test for .findByID() deliveryDay - READ (specific)
        describe('GET /delivery-day/:id', function () {
            it('should list a SINGLE deliveryDay in DB GET', function (done) {
                chai.request(server)
                    .get(`/delivery-day/${deliveryDay._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ _id: deliveryDay._id })


                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object')
                        res.body.should.have.property('_id')

                        res.body.should.have.property('orders')
                        res.body.orders.should.be.a('array')
                        res.body.orders[0].should.be.a('object')
                        

                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(userDetails.company._id)
                        
                        done()
                    })
            })
        })

// Test for .findByIdAndUpdate() a targeted deliveryDay - UPDATE
        describe('PUT /delivery-day/:id', function () {
            it('should update a targeted deliveryDay provided a unique :id is given ', function(done) {
                chai.request(server)
                    .get(`/delivery-day/${deliveryDay._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)
                    .send({
                        orders: [
                            {
                                _id: 'fakeOrderId1',
                                companyId: 'fakeCompanyId1'
                            },
                            {
                                _id: 'fakeOrderId2',
                                companyId: 'fakeCompanyId2'
                            }
                        ]
                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)


                        res.body.should.be.a('object')
                        res.body.should.have.property('_id')

                        res.body.should.have.property('orders')
                        res.body.orders.should.be.a('array')
                        res.body.orders[0].should.be.a('object')
                        res.body.orders[0].should.have.lengthOf(2)


                        res.body.should.have.property('companyId')
                        res.body.companyId.should.equal(userDetails.company._id)

                        done()
                    })
            })
        })

        // Test for .findByIdAndRemove a targeted deliveryDay - DELETE
        describe('DELETE /delivery-day/:id', function () {
            it('should delete a targeted post provided a unique :id is given', function (done) {
                chai.request(server)
                    .delete(`/delivery-day/${deliveryDay._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)

                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            })

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/delivery-day/${deliveryDay._id}`)
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        res.should.have.status(200)
                        should.equal(res.body, null)
                        done()

                    })
            })
        })
    })
}


module.exports = crud
