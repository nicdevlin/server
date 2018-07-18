const User = require('../user/model.js')

const hasPermission = (req, res, next) => {
    console.log(req.user)
    // if (req.CurrentUser.role === "admin") {
    //     next()
    // } else if (req.CurrentUser.company === "") {

    // } else { 
    //     res.status(403)
    // }
}

module.exports = {
    hasPermission
}