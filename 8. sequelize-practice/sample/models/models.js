//! Creating db table using Sequelize ORM

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");  // importing the connected sequelize instance

// below Course is similar to a class. It's a model class basically
// model is created from sequelize object
const Course = sequelize.define("course", {  // Defines a model named 'course'. Sequelize automatically pluralizes it → 'courses' table
    id: {
        // Required
        type: DataTypes.INTEGER,
        // Optional
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    noOfSkills: DataTypes.INTEGER
});

// Creates the table if it does not exist. It adds createdAt, updatedAt columns additionally
// force: true → drop and recreate table (dangerous in prod)
// Course.sync({force: true}).then((data) => { 
Course.sync().then((data) => {  // never give {force: true} inside sync() in production machine as it can cause data loss. Use it in dev or testing machine only
    console.log("Course synced:", data);  // Course synced: course
}).catch((error) => {
    console.log("Course sync failed:", error);
})
/*
step 2) after running models.js (console will have "Course synced: course" printed), check pgAdmin's practice_sequelize_db database. 
A table named 'courses' might have created. 
Additional createdAt & updatedAt columns will be there.
*/



//! Rent a car -------------------------------------------------------------
// check git-practice-1\sequelize-practice\sample\excel_ss_for_table_creation.png to get to know about all tables and relationships b/w them
const Manufacturer = sequelize.define("manufacturer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING
});

const CarModel = sequelize.define("car_model", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    seating_capacity: DataTypes.INTEGER
});

// Define relationships between Manufacturer & CarModel models
// Manufacturer eg: Toyota. CarModel eg: Innova
Manufacturer.hasMany(CarModel, {foreignKey: "manufacturer_id"});  // one manufactured has many carmodels
CarModel.belongsTo(Manufacturer, {foreignKey: "manufacturer_id"})  // one carmodel belongs to one manufacturer

const Car = sequelize.define("car", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    reg_no: DataTypes.STRING,
    reg_year: DataTypes.INTEGER,
    fuel_type: DataTypes.STRING
});

// Define relationship between CarModel models & Car
CarModel.hasMany(Car, {foreignKey: "car_model_id"});
Car.belongsTo(CarModel, {foreignKey: "car_model_id"});

const Customer = sequelize.define("customer", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    mail: DataTypes.STRING
});

const CustomerCarRental = sequelize.define("customer_car_rental", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    status: DataTypes.STRING
});

// Define relationship between CustomerCarRental with Customer & Car
Customer.hasMany(CustomerCarRental, {foreignKey: "customer_id"});
CustomerCarRental.belongsTo(Customer, {foreignKey: "customer_id"});

Car.hasMany(CustomerCarRental, {foreignKey: "car_id"});
CustomerCarRental.belongsTo(Car, {foreignKey: "car_id"});

// instead of using Course.sync(), use below 'sequelize.sync' to sync all models together
sequelize.sync().then((data) => {
    console.log("Models synced:", data);
}).catch((error) => {
    console.log("Models sync failed:", error);
})
/*
If you run this whole models.js, you will get many tables created in your db
*/

module.exports = {
    Course,
    Manufacturer,
    CarModel,
    Car,
    Customer,
    CustomerCarRental
};

/*
Creating associations between models:
How relationships are defined?

1. ONE-TO-ONE RELATIONSHIP
    User.hasOne(Profile, {foreignKey: 'user_id'})
    Profile.belongsTo(User, {foreignKey: 'user_id'})

2. ONE-TO-MANY RELATIONSHIP
    Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

3. MANY-TO-ONE RELATIONSHIP
    Book.belongsTo(Author, {foreignKey: 'author_id'})
    Author.hasMany(Book, {foreignKey: 'author_id'})

4. MANY-TO-MANY RELATIONSHIP
    Student.belongsToMany(Course, {through: "student-courses", foreignKey: 'student_id'})
    Couse.belongsToMany(Student, {through: "student-courses", foreignKey: 'course_id'})
*/