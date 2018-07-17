const express = require('express')
const Product = require('./model')
const router = express.Router()

// Setting up CRUD routes for Products

// CREATE a Product
router.post('/', (req, res) => {
    Product.create(req.body).then(
        (product) => {
            console.log(product)
            res.status(200).json(product)
        }
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ all Products
router.get('/', (req, res) => {
    Product.find().then(
        products => res.status(200).json(products)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE a Product
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        product => res.status(200).json(product)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY a Product
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router