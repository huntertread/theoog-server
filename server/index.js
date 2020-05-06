const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router.js');

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "68.170.64.179"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/', router);
const port = 3333;
app.listen(port, () => {
    console.log('app is listening on port:', port);
});