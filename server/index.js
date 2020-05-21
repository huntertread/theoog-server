const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router.js');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
  origin: [
    process.env.clientip,
    process.env.localip,
    process.env.http,
    process.env.https,
    process.env.httpw,
    process.env.httpsw
  ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', router);
const port = process.env.serverport;
app.listen(port, () => {
    console.log('app is listening on port:', port);
});