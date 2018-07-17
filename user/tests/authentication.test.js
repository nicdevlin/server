const jwtDecode = require('jwt-decode')


const authentication = (chai, server, should) => {

    
    

    describe('\nAccount creation and authorization', function () {

        describe('- POST /users/register', function() {
            it('REGISTRATION UNSUCCESSFUL - should reject account creation and show error message on /users/register POST IF email DOES already exist.');


            it('REGISTRATION SUCCESSFUL - should create a new user account and log them in on /users/register POST IF email DOESNT already exist.', function(done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/users/register')
                    .send({
                        email: 'test@email.com',
                        password: 'password',
                        role: 'purchaser'
                    })
                    .end((err, res) => {
                        
                        
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('token')
                        const tokenDetails = jwtDecode(res.body.token)
                        
                        tokenDetails.should.have.property('email')
                        tokenDetails.email.should.equal('test@email.com')

                        tokenDetails.should.have.property('role')
                        // tokenDetails.role.should.equal('owner-admin')

                        done()
                    })
            });
        })

        describe('- GET /users/logout', function () {
            it('should sign the user out and destroy their JWT session /users/logout GET.', function (done) {
                chai.request(server)
                    .get('/users/logout')
                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)
                        res.text.should.equal('User signed out successfully.')
                        done()
                    })
            });
        })
        
        describe('- POST /users/login', function () {
            it('should show error message and send 401 status on /users/login POST IF credentials are WRONG.', function(done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'test@email.com',
                        password: 'wrongpassword'
                    })
                    .end((err, res) => {
                        res.text.should.equal('Unauthorized')
                        res.body.should.not.have.property('token')
                        res.should.have.status(401)

                        done()
                    })
            });

            it('should sign user in to their account on /users/login POST IF credentials are CORRECT.', function(done) {
                this.timeout(15000)
                chai.request(server)
                    .post('/users/login')
                    .send({
                        email: 'test@email.com',
                        password: 'password'
                    })
                    .end((err, res) => {
                        should.equal(err, null)
                        res.should.have.status(200)

                        res.body.should.have.property('token')
                        const tokenDetails = jwtDecode(res.body.token)

                        tokenDetails.should.have.property('email')
                        tokenDetails.email.should.equal('test@email.com')

                        tokenDetails.should.have.property('role')
                        done()
                    })
            });
        })
        

        
    });
}


module.exports = authentication