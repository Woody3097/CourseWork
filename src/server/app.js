const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'schedule_of_exam',
  password: 'BravoPass123',
}).promise();

module.exports = conn
