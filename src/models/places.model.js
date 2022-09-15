const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const places = db.define('places', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'state'
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING
    },
    continent: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = places