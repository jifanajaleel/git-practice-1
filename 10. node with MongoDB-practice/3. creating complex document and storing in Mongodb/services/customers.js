//! Business logic layer
//! service file is used to write business logic that would be reused in controllers. req, res logic or database interactions should not be added in here

const customersRepository = require('../repositories/customers');

function getAllActiveCustomers() {
    const customers = customersRepository.getAllCustomers();
    //
    return customers;
}

async function getCustomerById(id) {
    return customersRepository.getCustomerById(id);
}

async function createCustomer(customerData) {
    // place for validations / rules later
    return customersRepository.createCustomer(customerData);
}

async function updateCustomer(id, data) {
    return customersRepository.updateCustomer(id, data);
}

async function deleteCustomer(id) {
    return customersRepository.deleteCustomer(id);
}

module.exports = {
    getAllActiveCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};