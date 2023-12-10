const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../config/index");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;
