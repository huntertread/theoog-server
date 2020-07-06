const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.UN,
  password: process.env.PW,
  host: process.env.DBHOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

module.exports = pool;