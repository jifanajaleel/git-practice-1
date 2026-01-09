const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {  // name is a field whose datatype is String
        require: true,
        type: String
    },
    place: {
        require: true,
        type: String
    }
});

module.exports = mongoose.model('Customer', customerSchema);  // we're exporting a model class named Customer (Here Customer is considered as Collection name) & it's schema is customerSchema. We can give any name to model class
// here we don't need to sync anything as in RDBMS (as RDBMS has tables to be synced). So we can directly use the model class