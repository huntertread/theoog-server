const router = require('express').Router();
const dbcontroller = require('../../db/controllers');

router.route('/getallurls')
  .get(dbcontroller.getAllUrls)

router.route('/:id')
  .get(dbcontroller.getUrl)

router.route('/')
  .post(dbcontroller.postUrl)

module.exports = router;