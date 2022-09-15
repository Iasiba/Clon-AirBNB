const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const reservations = db.define('reservations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    arrival: {
        allowNull: false,
        type: DataTypes.DATE
    },
    departure: {
        allowNull: false,
        type: DataTypes.DATE
    },
    acomodationId:{
        allowNull: false,
        type: DataTypes.UUID
    },
    adults: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    kids: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    babies: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    pets: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    score: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    is_finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_canceled: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports = reservations