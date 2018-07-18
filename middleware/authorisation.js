const User = require('../user/model.js')

const isAdmin = (user) => {
    if (user.role === "admin") {
        return true
    } 
}

const isOwner = (req, res, next) => {
    const {user, params} = req
    const {company} = req.user
    
    if (isAdmin(user) || params.id === company._id) {
        next ()
    } else {
        res.sendStatus(403)
    }
}


const isSupplier = ( ) => {

}

const isPurchaser = (req, res, next) => {
    const {role} = req.user
    if (role === "purchaser") {
        res.sendStatus(403)
    } else {
        next ()        
    }

}

module.exports = {
    isAdmin, 
    isOwner,
    isPurchaser
}