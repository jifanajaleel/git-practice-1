//! Handling relationship using mongoose
//! Referencing

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

/*
Referencing:
------------
*)Category and Brand are stored as separate collections
*)Product only stores the ObjectId reference to Category and Brand
*)Used when data is shared across multiple documents (one-to-many or many-to-many relationships)


Why referencing in product.js:
------------------------------
*)A single Category can have many Products
*)A single Brand can have many Products
*)If embedding was used, the same category/brand data would be duplicated in every product document, wasting storage and making updates difficult
*)Referencing avoids data duplication and maintains data consistency
*/