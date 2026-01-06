const sequelize = require("../config/orm");
const { Sequelize, DataTypes } = require("sequelize");

const Course = sequelize.define("course", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    noOfSkills: DataTypes.INTEGER
});

module.exports = Course;
