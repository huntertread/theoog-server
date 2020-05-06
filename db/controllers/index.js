const pool = require('../pool.js');

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
  getAllUrls: (req, res) => {
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
      'SELECT * FROM users WHERE username = $1;',
      [username],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        console.log(results)
        res.status(200).send(results.rows)
      }
    )
  },
  postNewUser: (req, res) => {
    const {username, password, email} = req.body;
    pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *;',
      [username, password, email],
      (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        res.status(200).send(results.rows)
      }
    )
  }
}

module.exports = dbcontrollers;