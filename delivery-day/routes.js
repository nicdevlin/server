const express = require('express')
const DeliveryDay = require('./model')
const router = express.Router()

// Setting up CRUD routes for Delivery Day

// CREATE a Delivery Day
router.post('/', (req, res) => {
    DeliveryDay.create(req.body).then(
        (deliveryDay) => res.status(200).json(deliveryDay)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ Delivery Days
router.get('/', (req, res) => {
    const {_id} = req.user.company

    DeliveryDay.find().then(
        deliveryDays => {
            const filteredDeliveryDays = deliveryDays.filter(deliveryDay => _id == deliveryDay.companyId )

            res.status(200).json(filteredDeliveryDays)
        }
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE a Delivery Day
router.put('/:id', (req, res) => {
    DeliveryDay.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        company => res.status(200).json(company)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY a Delivery Day
router.delete('/:id', (req, res) => {
    DeliveryDay.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router