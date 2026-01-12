const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
});
/*
1. In postman, give GET method and url as http://localhost:5000/api/customers. Click on 'Send'
2. You will see the o/p in Body of Response with status code as 200
*/

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
});

router.post('/', async (req, res) => {
    const newCustomer = new Customer({
        name: req.body.name,
        place: req.body.place
    });
    try {
        const savedData = await newCustomer.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});
/*
1. In postman, give POST method and url as http://localhost:5000/api/customers with below string data in Body of Request:
{
    "name": "Diya",
    "place": "USA"
}
Click on 'Send'
2. You'll see o/p in the Body of Response as:
{
    "name": "Diya",
    "place": "USA",
    "_id": "695ff3a21750aaafcfa4fe1a",
    "__v": 0
}
With status code as 201.
*/

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await Customer.findByIdAndUpdate(id, data);  // this'll just update the data in db & returns older data itself. That's why, this is not given into .json()
        const updatedData = await Customer.findById(id);
        // const updatedData = await Customer.findByIdAndUpdate(id, data, { new: true });  // instead of using above 2 lines, you can use this single line of code
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
/*
1. In postman, give PATCH method and url as http://localhost:5000/api/customers/695ff3a21750aaafcfa4fe1a with below string data in Body of Request:
{
    "place": "UK"
}
Click on 'Send'
2. You'll see o/p in the Body of Response as:
{
    "_id": "695ff3a21750aaafcfa4fe1a",
    "name": "Diya",
    "place": "UK",
    "__v": 0
}
With status code as 200
*/

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Customer.findByIdAndDelete(id);
        res.status(200).json({message: "Deleted successfully", deletedCustomer: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
/*
1. In postman, give DELETE method and url as http://localhost:5000/api/customers/695ff3a21750aaafcfa4fe1a. Click on 'Send'
2. You'll see o/p in the Body of Response as:
{
    "message": "Deleted successfully"
}
With status as 200
*/

module.exports = router;