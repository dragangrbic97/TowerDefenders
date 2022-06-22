const { Sequelize } = require('sequelize')
require('dotenv/config')

console.log("PORT:" + process.env.DB_PORT,"HOST:" + process.env.DB_HOST);
const sequelize = new Sequelize(
    'test_db',
    'root',
    'root', {
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        logging: false
    })

sequelize
    .authenticate()
    .then(() => {
        console.log('INFO - Database connected.')
    })
    .catch(err => {
        console.log('ERROR - Unable to connect to the database:', err)
    })


module.exports = { sequelize, Sequelize };