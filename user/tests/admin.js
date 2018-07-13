

const admin = (chai, server) => {


    const should = chai.should()


    describe('Admin Account and routes', function () {

        it('/admin should deny a user access if they dont have the role of "admin"', function(done) {
            // chai.request(server)
            //     .get('/admin')
            //     .end(function(err, res) {

            //     })
        });


        it('should list a SINGLE blob on /blob/<id> GET');
        it('should add a SINGLE blob on /blobs POST');
        it('should update a SINGLE blob on /blob/<id> PUT');
        it('should delete a SINGLE blob on /blob/<id> DELETE');
    });
}


module.exports = admin