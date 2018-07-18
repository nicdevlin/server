const User = require('../user/model.js')

const isAdmin = (user) => {
    if (user.role === "admin") {
        return true
    } 
}

const isOwner = (req, res, next) => {
    const {user, params} = req
    const {company} = req.user

    console.log(user)
    
    if (isAdmin(user) || params.id === company._id) {
        return true
    } else {
        return res.status(403)
    }
}


const isSupplier = ( ) => {

}

const isPurchaser = () => {

}

module.exports = {
    isAdmin, 
    isOwner
}