const authentication = require('./authentication.test')
const authorization = require('./authorization.test')
const crud = require('./crud-ops.test')
const testUserSetup = require('./test-user-setup.test')


module.exports = {
    authentication,
    crud,
    testUserSetup,
    authorization
}
