const pool = require('../pool.js');
const md5 = require('md5');

const dbcontrollers = {
  getUrl: (req, res) => {
    const id = req.params.id.toString()
    pool.query(
      'SELECT * FROM urls WHERE id = $1;',
      [id],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        } else {
          if (results.rows === undefined) {
            res.status(404).send('link does not exist')
          }
          res.status(200).send(results.rows)
        }
      }
    )
  },
  getAllUserUrls: (req, res) => {
    const id = req.params.id
    pool.query(
      'SELECT * FROM urls WHERE owner = $1;',
      [id],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        res.status(200).send(results.rows)
      }
    )
  },
  postUrl: (req, res) => {
    const {owner, originalurl, shorturl, urlnickname} = req.body;
    pool.query(
      'INSERT INTO urls (owner, originalurl, shorturl, urlnickname) VALUES ($1, $2, $3, $4) RETURNING *;',
      [owner, originalurl, shorturl, urlnickname],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        res.status(200).send(results.rows)
      }
    )
  },
  getExistingUser: (req, res) => {
    const username = req.params.un.toString();
    pool.query(
      'SELECT id, username FROM users WHERE username = $1;',
      [username],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        if (results.rows.length === 0) {
          res.status(404).send('user does not exist')
        } else {
          res.status(200).send(results.rows)
        }
      }
    )
  },
  postNewUser: (req, res) => {
    const {username, password, email} = req.body;
    let passHash = md5(password)
    pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username;',
      [username, passHash, email],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        res.status(200).send(results.rows)
      }
    )
  },
  submitLoginForm: (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 // cookie expires after 30 days
      res.status(200).send(req.user)
    } else {
      req.session.cookie.expires = false // cookie expires at end of session
      res.status(200).send(req.user)
    }
  },
  // logout: (req, res) => {
  //   console.log('logout route')
  //   // console.log(req.isAuthenticated());
  //   req.session.passport.user !== undefined
  //   req.logout()
  //   // console.log(req.isAuthenticated());
  //   res.status(200).send('loggedout')
  // }
}

module.exports = dbcontrollers;