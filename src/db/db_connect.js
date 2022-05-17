const {Sequelize} = require ('sequelize');
require('dotenv/config')

console.log(process.env.DB_PORT, process.env.DB_HOST)
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,
                                process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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

module.exports = sequelize