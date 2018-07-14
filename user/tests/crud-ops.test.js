
const crud = (chai, server, should) => {




    describe('\n User CRUD ops', function () {

        
        describe('- POST /users/staff ', function () {
            it('should CREATE a new staff account for a company on POST IF user is admin or owns company. Staff should have a default role of "staff" ');
        })

        describe('- GET /users/profile ', function () {
            it('should list user profile page IF user is signed in and owns the account.');
        })

        describe('- GET /users/staff ', function () {
            it('should list all members of a company IF user is admin or owns company.');
        })

        describe('- PUT /users/:id ', function () {
            it('should UPDATE the users account on IF user is signed in and owns the account.');
        })

        describe('- DELETE /users/:id ', function () {
            it('should delete users account on IF user owns the account or is ADMIN.');
        })

    });
}


module.exports = crud
