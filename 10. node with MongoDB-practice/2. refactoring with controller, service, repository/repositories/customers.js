//! All database related code is written in here only

const Customer = require('../models/customer');

async function getAllCustomers() {
    const customers = await Customer.find();
    return customers;
}

async function getCustomerById(id) {
    const customer = await Customer.findById(id);
    return customer;
}

async function createCustomer(customer) {

}

async function updateCustomer(id, data) {

}

async function deleteCustomer(id) {

}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}