const {Sequelize} = require ('sequelize');
require('dotenv/config')

console.log(process.env.DB_PORT, process.env.DB_HOST)
const sequelize = new Sequelize('test_db',process.env.DB_USERNAME || 'root',
                                process.env.DB_PASSWORD || 'root',{
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
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
});

sequelize
    .authenticate()
    .then(() => {
        console.log('INFO - Database connected.')
    })
    .catch(err => {
        console.log('ERROR - Unable to connect to the database:', err)
    });