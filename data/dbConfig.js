const db = require('knex');
const configOptions = require("../knexfile");
const environment = process.env.NODE_ENV || 'development';

module.exports = db(configOptions[environment])