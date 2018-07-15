
const jwtDecode = require('jwt-decode')
const UserDB = require('../model')


const userObject = (token) => {

    const tokenDetails = jwtDecode(token)
    UserDB.findById(jwtDecode.id).then((user) => {
      return {
          email: user.email,
          role: user.role,
          token: token
      }  
    })
}

module.exports = userObject