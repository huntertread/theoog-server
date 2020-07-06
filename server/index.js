const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router.js');
const passport = require('passport');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({
  origin: [
    process.env.CLIENTIP,
    process.env.LOCALIP,
    process.env.HTTP,
    process.env.HTTPS,
    process.env.HTTPW,
    process.env.HTTPSW
  ]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// passport
app.use(require('express-session')({
  secret: process.env.PSECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('../db/controllers/passport-local-strategy')
// passport end

app.use(morgan('dev'));
app.use('/', router);
const port = process.env.SERVERPORT;
app.listen(port, () => {
    console.log('app is listening on port:', port);
});

module.exports = app;