// Load environment variables from .env file
require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (!err) {
        console.log("Connection established");
    } else {
        console.log("Error occurred", err);
    }
});

module.exports = connection;
