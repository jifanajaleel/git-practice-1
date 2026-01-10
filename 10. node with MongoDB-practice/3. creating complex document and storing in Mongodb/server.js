//! Connecting nodejs application to mongodb
//! Handling relationship using mongoose

const express = require('express');
const mongoose = require('mongoose');

const customerRoutes = require('./routes/customers');
const productsRoutes = require('./routes/products');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_CONN_STRING = process.env.DATABASE_URL;

const app = express();

mongoose.connect(DB_CONN_STRING);  // asynchronous operation
const database = mongoose.connection;
database.on('error', (error) => {
    console.log('DB Error:', error);
});
database.once('connected', () => {
    console.log('Database connected successfully');
});

app.use(express.json());
app.use('/api/customers', customerRoutes);
app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
    console.log("Server is waiting for requests. Port:", PORT);
})