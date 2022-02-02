const sequelize = require('sequelize');

const sequelize = (process.env.DATABASE_URL, {
    dialect: 'postgres',
})
module.exports = sequelize;