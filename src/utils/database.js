/*
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Create a connection to database
const db = new Sequelize({ 
  dialect: 'postgres', 
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

module.exports = { db };
*/

const { Sequelize } = require('sequelize');

// Create a connection to database
const db = new Sequelize({
  dialect: 'postgres',
  host: 'dpg-cchfi0la4995s2ok7brg-a.oregon-postgres.render.com',
  username: 'airbnb_fv7u_user',
  password: '3ZuSMz9mFOI0Dv2Pd3UU9QUI7MRRomqD',
  database: 'airbnb_fv7u'
});

module.exports = { db };