const express = require('express');
const customerControllers = require('../controllers/customers');
const Customer = require('../models/customer');
const { createCustomer } = require('../repositories/customers');

const router = express.Router();

router.get('/', customerControllers.getAllCustomers);

router.get('/:id', customerControllers.getCustomerById);

router.post('/', customerControllers.createCustomer);

router.patch('/:id', customerControllers.updateCustomer);

router.delete('/:id', customerControllers.deleteCustomer);

module.exports = router;