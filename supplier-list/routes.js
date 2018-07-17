const express = require('express')
const SupplierList = require('./model')
const router = express.Router()

// Setting up CRUD routes for Supplier List

// CREATE a Supplier List
router.post('/', (req, res) => {
    SupplierList.create(req.body).then(
        (supplierList) => res.status(200).json(supplierList)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ all Supplier Lists
router.get('/', (req, res) => {
    SupplierList.find().then(
        supplierLists => res.status(200).json(supplierLists)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE a Supplier List
router.put('/:id', (req, res) => {
    SupplierList.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        supplierList => res.status(200).json(supplierList)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY a Supplier List
router.delete('/:id', (req, res) => {
    SupplierList.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router