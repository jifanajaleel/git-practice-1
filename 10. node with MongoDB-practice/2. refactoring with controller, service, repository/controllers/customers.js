//! All req, res related operations are done in controllers. Never put those code in repository or service file

const customersRepository = require('../repositories/customers');
const customersService = require('../services/customers');

// for simpler logic, we can make use of route, controller, repository database order itself. But if we have business logic to be reused in a controller, then it's better to create a services file & use the complicated logic there instead of directly going to repository
// usually services are used for large applications/projects
async function getAllCustomers(req, res) {
    // const customers = await customersRepository.getAllCustomers();
    const customers = await customersService.getAllActiveCustomers();
    res.status(200).json(customers);
}

async function getCustomerById(req, res) {
    const id = req.params.id;
    const customer = await customersRepository.getCustomerById(id);
    res.status(200).json(customer);
}

module.exports = {
    getAllCustomers,
    getCustomerById
};