


const crud = (chai, server, should, user) => {

    let token = null



    describe('\nCompany CRUD ops', function () {

        describe('Setting Admin user token', function() {
            it('should sign user in to their account on /users/login POST IF credentials are CORRECT.', function (done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'admin@admin.com',
                        password: 'password'
                    })
                    .end((err, res) => {
                        token = res.body.token
                        done()
                    })
            });
        })

        describe('GET /companies', function () {
            it('should list ALL companies in DB GET', function() {
                chai.request(server)
                    .get('/companies')
                    .set('Authorization', `Bearer ${token}`)

                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)
                        
                    })
            });
        })


        it('should list a SINGLE blob on /blob/<id> GET');

        it('should add a SINGLE blob on /blobs POST');

        it('should update a SINGLE blob on /blob/<id> PUT');

        it('should delete a SINGLE blob on /blob/<id> DELETE');

    });
}


module.exports = crud
