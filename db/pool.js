const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.un,
  password: process.env.pw,
  host: 'localhost',
  database: 'wzrd',
  port: 5432
})

module.exports = pool;