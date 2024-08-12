const mysql = require('mysql2');

// Parse the connection URL
const url = new URL("mysql://root:tTHHZTTfPBZGDflLdboaHmYFZXoPAORP@mysql.railway.internal:3306/railway");

const connection = mysql.createConnection({
    host: "monorail.proxy.rlwy.net",
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // remove leading '/'
    port: url.port,
    connectTimeout: 10000 // Increase timeout to 10 seconds
});

connection.connect((err) => {
    if (!err) {
        console.log("Connection established");
    } else {
        console.error("Error occurred:", err);
    }
});

module.exports = connection;
