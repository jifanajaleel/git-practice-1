//! Embedding

const mongoose = require('mongoose');

// datatypes - String, Number, Bigint, Boolean, Date, Array, ObjectId etc
// each schema will have separate _id
const addressSchema = new mongoose.Schema({
    addressLine: {
        require: true,
        type: String
    },
    city: {
        require: true,
        type: String
    },
    pinCode: {
        require: true,
        type: Number
    }
})

const customerSchema = new mongoose.Schema({
    name: {  // name is a field whose datatype is String
        require: true,
        type: String
    },
    place: {
        require: true,
        type: String
    },
    address: addressSchema,
    hobbies: {
        type: [String]
    }
});

module.exports = mongoose.model('Customer', customerSchema);  // we're exporting a model class named Customer (Here Customer is considered as Collection name) & it's schema is customerSchema. We can give any name to model class
// here we don't need to sync anything as in RDBMS (as RDBMS has tables to be synced). So we can directly use the model class

/*
Embedding:
------------------------
*)Address is embedded directly inside the Customer document
*)Address data is stored as a sub-document within the customer
*)No separate collection for addresses
*)Used when the sub-document belongs to only one parent (one-to-one or one-to-few relationships)
*/