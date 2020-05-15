const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();
// const {un, pw} = require('./hiddenpool.js');
// const connectionString = `postgresql://${un}:${pw}@ec2-54-151-33-195.us-west-1.compute.amazonaws.com:5432/wzrd`

const pool = new Pool({
  // user: un,
  user: process.env.un,
  // password: pw,
  password: process.env.pw,
  host: 'localhost',
  database: 'wzrd',
  port: 5432
  // connectionString: connectionString
})

module.exports = pool;