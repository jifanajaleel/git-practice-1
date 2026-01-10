//! Handling relationship using mongoose

const express = require('express');
const {Brand, Category, Product} = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().populate(['category', 'brand']);  // if you use 'category' alone inside populate() function, in Postman GET method, you can see 'category' key expanded as an object with _id, name. If populate is not given, you'll see only 'category': '<id>'
    res.status(200).json(products);  // inside populate function, make sure you add field names (taken from models/product.js file). Not model names
})

router.post('/', async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        offerPrice: req.body.offerPrice,
        category: req.body.category,
        brand: req.body.brand
    })
    const data = await newProduct.save();
    res.status(201).json(data);
})
/*
1. In postman, POST http://localhost:5000/api/products with Body of Request as:
{
    "title": "Casio Edifice 101",
    "price": 5000,
    "offerPrice": 4500,
    "category": "69610b9c5627adc62bc6c33c",
    "brand": "69610a9799ee3191bd770760"
}
Click on 'Send'
2. O/p Body of Response will be:
{
    "title": "Casio Edifice 101",
    "category": "69610b9c5627adc62bc6c33c",
    "brand": "69610a9799ee3191bd770760",
    "price": 5000,
    "offerPrice": 4500,
    "_id": "69610f9015e17c90040ea6d0",
    "__v": 0
}
With status code 201
3. In MongoDB Compass, the 'brands' collection is created once models/product.js is executed & the data (documents) can be seen in Compass once you run the above route
*/

router.post('/brands', async (req, res) => {
    const newBrand = new Brand({
        name: req.body.name
    })
    const data = await newBrand.save();
    res.status(201).json(data);
})
/*
1. In postman, POST http://localhost:5000/api/products/brands with Body of Request as:
{
    "name": "Casio"
}
Click on 'Send'
2. O/p Body of Response will be:
{
    "name": "Casio",
    "_id": "69610a9799ee3191bd770760",
    "__v": 0
}
With status code 201
3. In MongoDB Compass, the 'brands' collection is created once models/product.js is executed & the data (documents) can be seen in Compass once you run the above route
*/

router.post('/categories', async (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    })
    const data = await newCategory.save();
    res.status(201).json(data);
})
/*
1. In postman, POST http://localhost:5000/api/products/categories with Body of Request as:
{
    "name": "Electronics"
}
Click on 'Send'
2. O/p Body of Response will be:
{
    "name": "Electronics",
    "_id": "69610b58a48dad48711c6e9c",
    "__v": 0
}
With status code 201
3. In MongoDB Compass, the 'categories' collection is created once models/product.js is executed & the data (documents) can be seen in Compass once you run the above route
*/

module.exports = router;