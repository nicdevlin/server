const express = require('express')
const CustomerList = require('./model')
const router = express.Router()

// Setting up CRUD routes for customerList

// CREATE a Customer List
router.post('/', (req, res) => {
    CustomerList.create(req.body).then(
        customerList => res.status(200).json(customerList)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ Customer Lists
router.get('/', (req, res) => {
    CustomerList.find().then(
        customerList => res.status(200).json(customerList)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE a Customer List
router.put('/:id', (req, res) => {
    CustomerList.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        customerList => res.status(200).json(customerList)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY a Customer List
router.delete('/:id', (req, res) => {
    CustomerList.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router