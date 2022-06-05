const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "bruno2002",
    database: "employeetracker_db"
});

connection.connect((err) => {
    if(err) throw err;
    connectionEstablished();
});

module.exports = connection;