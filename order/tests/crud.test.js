const jwtDecode = require('jwt-decode')

let token = null
let userDetails = null
let order = null


const crud = (chai, server, should, user) => {




    describe('\n Order CRUD ops', function () {

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
                // this.timeout(15000)
                chai.request(server)
                    .post('/orders')
                    .set('Authorization', `Bearer ${token}`)
                    .set('CurrentUser', userDetails)  
                    .send({
                       companyDetails: {
                           name: userDetails.company.name,
                           abn: userDetails.company.abn
                        },
                        companyId: userDetails.company._id,
                        supplierDetails: {
                            name: 'supplierfakeName',
                            abn: 'supplierfakeAbn'
                        },
                        supplierId: 'supplierfakeId',
                        deliveryAddress: '4 Ham Way',
                        products: [
                            {
                                name: 'product1',
                                price: 'price1',
                                orderQty: 'qty1',
                                id: 'id1'
                            },
                            {
                                name: 'product2',
                                price: 'price2',
                                orderQty: 'qty2',
                                id: 'id2'
                            }
                        ],
                        orderNo: 02,
                        uniqueIdentifier: 'KAS',
                        datePlaced: Date.now,

                        orderReceived: false,
                        orderDispatched: false,
                        orderPaid: true,
                        status: 'Pending delivery'

                    })
                    .end((err, res) => {

                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        
                        res.body.should.have.property('companyDetails');
                        res.body.companyDetails.should.be.a('object');
                        res.body.companyDetails.name.should.equal(userDetails.company.name);
                        res.body.companyDetails.abn.should.equal(userDetails.company.abn);
                        
                        res.body.should.have.property('companyId')
                        res.body.companyId.abn.should.equal(userDetails.company._id);

                        res.body.should.have.property('supplierDetails');
                        res.body.supplierDetails.should.be.a('object');
                        res.body.supplierDetails.name.should.equal('supplierfakeName');
                        res.body.supplierDetails.abn.should.equal('supplierfakeAbn');
                      
                        res.body.should.have.property('products')
                        res.body.products.should.be.a('array')
                        res.body.products.should.have.lengthOf(2)

                        res.body.should.have.property('orderReceived')
                        res.body.orderReceived.should.equal(false)

                        done()
                    })
            })

        })




// Test for .find() all orders - READ (all)
        describe('GET /orders', function () {
            it('should list ALL their OWN orders in DB GET', function(done) {
                chai.request(server)
                    .get('/orders')
                    .set('Authorization', `Bearer ${token}`)
                    .set('CurrentUser', userDetails)  

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('array');

                        
                        res.body[0].should.be.a('object');
                        res.body[0].should.have.property('_id');

                        res.body[0].should.have.property('companyDetails');
                        res.body[0].companyDetails.should.be.a('object');
                        res.body[0].companyDetails.name.should.equal(userDetails.company.name);
                        res.body[0].companyDetails.abn.should.equal(userDetails.company.abn);

                        res.body[0].should.have.property('companyId')
                        res.body[0].companyId.abn.should.equal(userDetails.company._id);

                        res.body[0].should.have.property('supplierDetails');
                        res.body[0].supplierDetails.should.be.a('object');
                        res.body[0].supplierDetails.name.should.equal('supplierfakeName');
                        res.body[0].supplierDetails.abn.should.equal('supplierfakeAbn');

                        res.body[0].should.have.property('products')
                        res.body[0].products.should.be.a('array')
                        res.body[0].products.should.have.lengthOf(2)

                        res.body[0].should.have.property('orderReceived')
                        res.body[0].orderReceived.should.equal(false)


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
                    .set('CurrentUser', userDetails)
                    .send({ _id: order._id })


                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

 
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');

                        res.body.should.have.property('companyDetails');
                        res.body.companyDetails.should.be.a('object');
                        res.body.companyDetails.name.should.equal(userDetails.company.name);
                        res.body.companyDetails.abn.should.equal(userDetails.company.abn);

                        res.body.should.have.property('companyId')
                        res.body.companyId.abn.should.equal(userDetails.company._id);

                        res.body.should.have.property('supplierDetails');
                        res.body.supplierDetails.should.be.a('object');
                        res.body.supplierDetails.name.should.equal('supplierfakeName');
                        res.body.supplierDetails.abn.should.equal('supplierfakeAbn');

                        res.body.should.have.property('products')
                        res.body.products.should.be.a('array')
                        res.body.products.should.have.lengthOf(2)

                        res.body.should.have.property('orderReceived')
                        res.body.orderReceived.should.equal(false)
                    
                        
                        done()
                    })
            });
        })

// Test for .findByIdAndUpdate() a targeted order - UPDATE
        describe('PUT /orders/:id', function () {
            it('should update a targeted order provided a unique :id is given ', function(done) {
                chai.request(server)
                    .put(`/orders/${order._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('CurrentUser', userDetails)  
                    .send({
                        products:
                        [{
                            name: 'product1',
                            price: 'price1',
                            orderQty: 'qty1',
                            id: 'id1'
                        },
                        {
                            name: 'product2',
                            price: 'price2',
                            orderQty: 'qty2',
                            id: 'id2'
                        },
                        {
                            name: 'product3',
                            price: 'price3',
                            orderQty: 'qty3',
                            id: 'id3'
                        }]

                    })

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.equal(order._id)

                        res.body.should.have.property('products')
                        res.body.products[2].should.be.a('object')
                        res.body.products[2].name.should.equal('product3')
                        res.body.products.should.have.lengthOf(3)
                      

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
                    .set('CurrentUser', userDetails)  

                    .end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            });

            it('This checks if the order has been deleted or not', function (done) {
                chai.request(server)
                    .get(`/orders/${order._id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .set('CurrentUser', userDetails)  


                    .end((err, res) => {
                        res.should.have.status(404)
                        done()

                    })
            });

        })




    });
}


module.exports = crud
