const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let deliveryDay = null


const crud = (chai, server, should, user) => {




    describe('\ndeliveryDay CRUD ops', function () {

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


// Test for creating a new deliveryDay - CREATE
        describe('POST /delivery-day', function () {
            it('Purchaser Account deliveryDay creation', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/delivery-day')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        orderId: String,
                        deliveryDate: Date,
                        orderCutoffTime: Date,
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
                        res.body.should.have.property('deliveryDayOwnerId');
                        res.body.deliveryDayOwnerId.should.equal(userDetails.sub)

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

                        res.body[0].should.have.property('_id');
                        res.body[0].should.have.property('name');
                        res.body[0].name.should.equal('Bally Hoo');
                        res.body[0].should.have.property('businessType');
                        res.body[0].should.have.property('address');
                        res.body[0].should.have.property('phoneNumber');
                        res.body[0].should.have.property('accountType');
                        res.body[0].should.have.property('deliveryDayOwnerId');
                        res.body[0].deliveryDayOwnerId.should.equal(userDetails.sub)

                        deliveryDay = res.body[0]

                        done()
                    })
            });
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

 
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(deliveryDay._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('deliveryDayOwnerId');
                        
                        done()
                    })
            });
        })

// Test for .findByIdAndUpdate() a targeted deliveryDay - UPDATE
        describe('PUT /delivery-day/:id', function () {
            it('should update a targeted deliveryDay provided a unique :id is given ', function(done) {
                chai.request(server)
                    .get(`/delivery-day/${deliveryDay._id}`)
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
                        res.body._id.should.equal(deliveryDay._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Scrooge enterprises');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('deliveryDayOwnerId');

                        done()
                    })
            });

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
            });

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/delivery-day/${deliveryDay._id}`)
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
