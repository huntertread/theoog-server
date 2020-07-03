const router = require('express').Router();
const dbcontroller = require('../../db/controllers');
const passport = require('passport')

// router.route('/getallurls/:id')
//   .get(dbcontroller.getAllUserUrls)
router.route('/user/:un/url/:id')
  .get(dbcontroller.getAllUserUrls)

// router.route('/:id')
//   .get(dbcontroller.getUrl)
router.route('/url/:id')
  .get(dbcontroller.getUrl)

// router.route('/getExistingUser/:un')
//   .get(dbcontroller.getExistingUser)
router.route('/user/:un')
  .get(dbcontroller.getExistingUser)

// router.route('/')
//   .post(dbcontroller.postUrl)
router.route('/url')
  .post(dbcontroller.postUrl)

// router.route('/register')
//   .post(dbcontroller.postNewUser)
router.route('/user')
  .post(dbcontroller.postNewUser)

router.route('/login')
  .post(passport.authenticate('local'), dbcontroller.submitLoginForm)

// router.route('/logout')
//   .get(dbcontroller.logout)

module.exports = router;