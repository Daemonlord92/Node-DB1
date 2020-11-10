const express = require('express');
const Account = require('./accountsDB');
const router = express.Router();

//GET ROUTES

router.get('/', (req, res) => {
    Account.get()
        .then(account => res.status(200).json({mes: 'Grabbing Accounts', account}))
        .catch(err => res.status(500).json({mes: 'Server Error', err}))
});

router.get('/:id', validateAccountId, (req, res) => {
    res.status(200).json(req.account)
})

//POST ROUTES

router.post('/', (req, res) => {
    Account.insert(req.body)
        .then(account => res.status(201).json({mes: 'Account Created', account}))
        .catch(err => res.status(500).json({mes:'Server Error', err}))
})

//UPDATE ROUTES

router.put('/:id', validateAccountId, validateAccount, (req, res) => {
    const {id} = req.params;
    const updateAccount = req.body;

    Account.update(id, updateAccount)
        .then(account => res.status(200).json({mes:'Account Updated', account}))
        .catch(err => res.status(500).json({mes:'Server Error', err}))
})

//DELETE ROUTES

router.delete('/:id', validateAccountId, (req, res) => {
    const {id} = req.params;
    Account.remove(id)
        .then(account => res.status(200).json({mes: 'Account Delete', account}))
        .catch(err => res.status(500).json({mes:'Server Error', err}))
})

//MIDDLEWARE FUNCTIONS

function validateAccountId(req,res,next) {
    const {id} = req.params;
    Account.getById(id)
        .then(account => {
            req.account = account;
            account ? next() : res.status(404).json({mes: 'No Accounts with that id'})
        })
        .catch(err => res.status(500).json({mes: 'Validation Error', err}))
}

function validateAccount(req, res, next) {
    const body = req.body;

    Object.keys(body).length === null
        ? res.status(400).json({mes: 'no data'})
        : !body
        ? res.status(400).json({mes: 'Missing name'})
        : next()
}

module.exports = router;