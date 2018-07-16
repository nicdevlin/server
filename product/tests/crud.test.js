const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let product = null


const crud = (chai, server, should, user) => {




    describe('\nproduct CRUD ops', function () {

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


// Test for creating a new product - CREATE
        describe('POST /products', function () {
            it('Purchaser Account product creation', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/products')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        name: 'Flour',
                        description: 'Its a bag of flour',
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




// Test for .find() all products - READ (all)
        describe('GET /products', function () {
            it('should list ALL products in DB GET', function(done) {
                chai.request(server)
                    .get('/products')
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
                        res.body[0].should.have.property('productOwnerId');
                        res.body[0].productOwnerId.should.equal(userDetails.sub)

                        product = res.body[0]

                        done()
                    })
            });
        })

        
// Test for .findByID() product - READ (specific)
        describe('GET /products/:id', function () {
            it('should list a SINGLE product in DB GET', function (done) {
                chai.request(server)
                    .get(`/products/${product._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ _id: product._id })


                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

 
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(product._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Bally Hoo');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('productOwnerId');
                        
                        done()
                    })
            });
        })

// Test for .findByIdAndUpdate() a targeted product - UPDATE
        describe('PUT /products/:id', function () {
            it('should update a targeted product provided a unique :id is given ', function(done) {
                chai.request(server)
                    .get(`/products/${product._id}`)
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
                        res.body._id.should.equal(product._id)
                        res.body.should.have.property('name');
                        res.body.name.should.equal('Scrooge enterprises');
                        res.body.should.have.property('businessType');
                        res.body.should.have.property('address');
                        res.body.should.have.property('phoneNumber');
                        res.body.should.have.property('accountType');
                        res.body.should.have.property('productOwnerId');

                        done()
                    })
            });

        })

        // Test for .findByIdAndRemove a targeted product - DELETE
        describe('DELETE /products/:id', function () {
            it('should delete a targeted post provided a unique :id is given', function (done) {
                chai.request(server)
                    .delete(`/products/${product._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('user', userDetails)

                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            });

            it('This checks if the post has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/products/${product._id}`)
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
