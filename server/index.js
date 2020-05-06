const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router.js');

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://huntertread.github.io/wzrd-client", 
    // "68.170.64.179", 
    "185.199.108.153", 
    "185.199.109.153", 
    "185.199.110.153", 
    "185.199.111.153"
  ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', router);
const port = 443;
app.listen(port, () => {
    console.log('app is listening on port:', port);
});