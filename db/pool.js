const Pool = require('pg').Pool
const {un, pw} = require('./hiddenpool.js');
const connectionString = `postgresql://${un}:${pw}@ec2-54-151-33-195.us-west-1.compute.amazonaws.com:5432/wzrd`

const pool = new Pool({
  // user: un,
  // password: pw,
  // host: '/var/run/postgresql',
  // database: 'wzrd',
  // port: 5432
  connectionString: connectionString
})

module.exports = pool;