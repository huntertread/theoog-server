const pool = require('../pool.js');

const dbcontrollers = {
  getUrl: (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM urls WHERE shorturl = $1;', [id], (err, results) => {
      if (err) {
        res.status(404).send(err)
      }
      res.status(200).send(results.rows)
    })
  },
  getAllUrls: (req, res) => {
    pool.query('SELECT * FROM urls;', [], (err, results) => {
      if (err) {
        res.status(404).send(err)
      }
      res.status(200).send(results.rows)
    })
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
  }
}

module.exports = dbcontrollers;