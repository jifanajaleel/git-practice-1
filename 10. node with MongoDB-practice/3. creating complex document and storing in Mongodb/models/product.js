//! Handling relationship using mongoose

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    }
});

// creating model class for product
const Category = mongoose.model('Category', categorySchema);

const brandSchema = new mongoose.Schema({
    name: String
});

const Brand = mongoose.model('Brand', brandSchema);

const productSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,  // datatype of category is objectId. objectId will be a String
        ref: 'Category'  // here relationship is specified
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,  // create Category & Brand data (documents) first. Then take any one document's _id. Then create a data (document) for Product collection with it
        ref: 'Brand' 
    },
    price: Number,
    offerPrice: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Category,
    Brand,
    Product
};