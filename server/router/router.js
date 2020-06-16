const router = require('express').Router();
const dbcontroller = require('../../db/controllers');
const passport = require('passport')

router.route('/getallurls/:id')
  .get(dbcontroller.getAllUrls)

router.route('/:id')
  .get(dbcontroller.getUrl)

router.route('/getExistingUser/:un')
  .get(dbcontroller.getExistingUser)

router.route('/')
  .post(dbcontroller.postUrl)

router.route('/register')
  .post(dbcontroller.postNewUser)

router.route('/login')
  .post(passport.authenticate('local'), dbcontroller.submitLoginForm)

// router.route('/logout')
//   .get(dbcontroller.logout)

module.exports = router;