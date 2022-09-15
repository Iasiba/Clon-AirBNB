const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const acomodation_images = db.define('acomodations_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    Name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    acomodationId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        }
    }
})

module.exports = acomodation_images