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

async function createCustomer(customerData) {
    const newCustomer = new Customer(customerData);
    const savedData = await newCustomer.save();
    return savedData;
}

async function updateCustomer(id, data) {
    const result = await Customer.findByIdAndUpdate(id, data);
    const updatedData = await Customer.findById(id);
    return updatedData;
}

async function deleteCustomer(id) {
    const result = await Customer.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}