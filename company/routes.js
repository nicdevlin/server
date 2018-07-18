const express = require('express')
const Company = require('./model')
const router = express.Router()
const { isOwner } = require('../middleware/authorisation')
const { requireJwt } = require('../middleware/authentication')


// Setting up CRUD routes for company

// CREATE company
router.post('/', requireJwt, (req, res) => {
    Company.create(req.body).then(
        (company) => {
            res.status(200).json(company)
        }
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ companies
router.get('/', requireJwt, (req, res) => {
    Company.find().then(
        companies => res.status(200).json(companies)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// READ SINGLE company
router.get('/:id', requireJwt, (req, res) => {
    Company.findById(req.params.id).then(
        companies => res.status(200).json(companies)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// UPDATE company
router.put('/:id', requireJwt, isOwner ,(req, res) => {
    Company.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
        company => res.status(200).json(company)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// DESTROY company
router.delete('/:id', requireJwt, (req, res) => {
    Company.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

module.exports = router