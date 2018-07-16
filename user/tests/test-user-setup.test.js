const jwtDecode = require('jwt-decode')


const testUserSetup = (chai, server, should) => {
    describe('\n Creating test accounts', function() {

        // Sets up a test "Admin" account, including a business

        it('Admin Account created', function (done) {
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
    
                    done()
                })
            })
    
    
        // Sets up a test "Purchaser" account, including a business
    
        it('Purchaser Account creation', function (done) {
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
    
                    done()
                })
        })
    
    
        
    
        // Sets up a test "Supplier" account, including a company
    
        it('Supplier Account creation', function (done) {
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
    
                    done()
                })
        })
    })



    
}




module.exports = testUserSetup
