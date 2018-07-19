const express = require('express')
const Order = require('./model')
const router = express.Router()
const { isPurchaser, isOwner, belongsToCompany, belongsToPurchaserOrSupplier } = require('../middleware/authorisation')
const { requireJwt } = require('../middleware/authentication')
// Setting up CRUD routes for Orders

// CREATE an Order
router.post('/', requireJwt, (req, res) => {
    Order.create(req.body).then(
        (order) => res.status(200).json(order)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ all Orders
router.get('/', requireJwt, (req, res) => {
    Order.find().then(
        orders => res.status(200).json(orders)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE an Order
router.put('/:id', requireJwt, belongsToPurchaserOrSupplier, (req, res) => {
    Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        order => res.status(200).json(order)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY an Order
router.delete('/:id', requireJwt, belongsToPurchaserOrSupplier, (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router