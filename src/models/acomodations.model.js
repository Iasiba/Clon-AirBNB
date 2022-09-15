const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const acomodations = db.define('acomodations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    guests: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    rooms: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    beds: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    bathrooms: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    score: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    placeId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    commision: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    is_active:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = acomodations