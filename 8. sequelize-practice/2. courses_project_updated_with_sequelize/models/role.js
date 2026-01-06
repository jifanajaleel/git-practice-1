const { DataTypes } = require("sequelize");
const sequelize = require("../config/orm");

const Role = sequelize.define("role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING
});

module.exports = Role;
