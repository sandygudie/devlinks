const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../config/index");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  keepAliveInitialDelay: 10000, 
  enableKeepAlive: true, 
});

// Verify that the database is connected successfully
connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("The database is successfully connected.");
});

module.exports = connection;
