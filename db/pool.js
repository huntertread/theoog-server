const Pool = require('pg').Pool
const {un, pw} = require('./hiddenpool.js');

const pool = new Pool({
  user: un,
  password: pw,
  host: '/var/run/postgresql',
  database: 'wzrd',
  port: 5432
})

module.exports = pool;