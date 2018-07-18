const express = require('express')
const Product = require('./model')
const router = express.Router()
const { isPurchaser } = require('../middleware/authorisation')
const { requireJwt } = require('../middleware/authentication')
// Setting up CRUD routes for Products

// CREATE a Product
router.post('/', requireJwt, isPurchaser, (req, res) => {
    Product.create(req.body).then(
        (product) => res.status(200).json(product)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ all Products
router.get('/', requireJwt, (req, res) => {
    console.log('IM HERE GETTING YOUR GET')
    Product.find().then(
        products => 
        console.log(products).
        res.status(200).json(products)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE a Product
router.put('/:id', requireJwt, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        product => res.status(200).json(product)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY a Product
router.delete('/:id', requireJwt, (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router