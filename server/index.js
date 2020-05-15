const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router.js');

const app = express();
app.use(helmet());
app.use(cors({
  origin: [
    "http://theoog.net",
    "https://theoog.net",
    "http://localhost:3000",
    "https://huntertread.github.io/wzrd-client",
    "68.170.64.179",
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
    "54.151.33.195"
  ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', router);
// const port = 3333;
const port = process.env.serverport;
app.listen(port, () => {
    console.log('app is listening on port:', port);
});