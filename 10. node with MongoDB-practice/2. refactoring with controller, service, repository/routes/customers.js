const express = require('express');
const customerControllers = require('../controllers/customers');

const router = express.Router();

router.get('/', customerControllers.getAllCustomers);

router.get('/:id', customerControllers.getCustomerById);

// router.post('/', async (req, res) => {
//     const newCustomer = new Customer({
//         name: req.body.name,
//         place: req.body.place
//     });
//     try {
//         const savedData = await newCustomer.save();
//         res.status(201).json(savedData);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// });

// router.patch('/:id', async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     try {
//         const result = await Customer.findByIdAndUpdate(id, data);
//         const updatedData = await Customer.findById(id);
//         res.status(200).json(updatedData);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const result = await Customer.findByIdAndDelete(id);
//         res.status(200).json({message: "Deleted successfully"});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })

module.exports = router;