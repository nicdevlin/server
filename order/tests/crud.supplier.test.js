const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let order = null


const crud = (chai, server, should, user) => {




    describe('\norder CRUD ops', function () {

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


// Test for creating a new order - CREATE
        describe('POST /orders', function () {
            it('Purchaser Account order creation', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/orders')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        name: 'Bally Hoo',
                        businessType: 'password',
                        address: '3 Bruns Picture house, Brunswick',
                        phoneNumber: '113346178',
                        accountType: 'purchaser',
                        orderOwnerId: userDetails.sub
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
                        res.body.should.have.property('orderOwnerId');
                        res.body.orderOwnerId.should.equal(userDetails.sub)

                        done()
                    })
            })

        })




// Test for .find() all orders - READ (all)
        describe('GET /orders', function () {
            it('should list ALL orders in DB GET', function(done) {
                chai.request(server)
                    .get('/orders')
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
                        res.body[0].should.have.property('orderOwnerId');
                        res.body[0].orderOwnerId.should.equal(userDetails.sub)

                        order = res.body[0]

                        done()
                    })
            });
        })

        
// Test for .findByID() order - READ (specific)
        describe('GET /orders/:id', function () {
            it('should list a SINGLE order in DB GET', function (done) {
                chai.request(server)
                    .get(`/orders/${order._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ _id: order._id })


                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

 
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(order._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('orderOwnerId');
                        
                        done()
                    })
            });
        })

// Test for .findByIdAndUpdate() a targeted order - UPDATE
        describe('PUT /orders/:id', function () {
            it('should update a targeted order provided a unique :id is given ', function(done) {
                chai.request(server)
                    .get(`/orders/${order._id}`)
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
                        res.body._id.should.equal(order._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Scrooge enterprises');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('orderOwnerId');

                        done()
                    })
            });

        })

        // Test for .findByIdAndRemove a targeted order - DELETE
        describe('DELETE /orders/:id', function () {
            it('should delete a targeted post provided a unique :id is given', function (done) {
                chai.request(server)
                    .delete(`/orders/${order._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)

                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            });

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/orders/${order._id}`)
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
