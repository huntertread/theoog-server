const router = require('express').Router();
const dbcontroller = require('../../db/controllers');

router.route('/getallurls/:id')
  .get(dbcontroller.getAllUrls)

router.route('/:id')
  .get(dbcontroller.getUrl)

router.route('/')
  .post(dbcontroller.postUrl)

router.route('/register')
  .post(dbcontroller.postNewUser)

router.route('/getExistingUser/:un')
  .get(dbcontroller.getExistingUser)

module.exports = router;