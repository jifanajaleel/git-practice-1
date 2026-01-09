//! service file is used to write business logic that would be reused in controllers. req, res logic or database interactions should not be added in here

const customersRepository = require('../repositories/customers');

function getAllActiveCustomers() {
    const customers = customersRepository.getAllCustomers();
    //
    return customers;
}

module.exports = { getAllActiveCustomers };