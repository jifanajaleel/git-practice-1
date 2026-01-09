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

async function createCustomer(req, res) {
    try {
        const customerData = req.body;
        const savedCustomer = await customersService.createCustomer(customerData);
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function updateCustomer(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        updatedCustomerData = await customersService.updateCustomer(id, data);
        res.status(200).json(updatedCustomerData);
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
}

async function deleteCustomer(req, res) {
    try {
        const id = req.params.id;
        const deletedCustomerData = await customersService.deleteCustomer(id);
        res.status(200).json({message: "Deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};