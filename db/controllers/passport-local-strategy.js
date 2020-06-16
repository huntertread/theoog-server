const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../pool');
const md5 = require('md5');

passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {

  console.log('local strategy', username, password) // remove when done

  async function loginAttempt() {
	const client = await pool.connect()
	try {
	  client.query('SELECT * from users WHERE username = $1', [username], function(err, result) {
		if(err) {
		  return done(err)
		}
		if(result.rows[0] == null){
          console.log('user does not exist')
		  return done(null, false);
		}
		else{
          let pass = md5(password)
          if (pass === result.rows[0].password) {
            return done(null, [{username: result.rows[0].username}]); // should this set simply to 'user'?
          } else if (pass !== result.rows[0].password) {
            return done(null, false);
          } else {
            console.log('Error while checking password');
			return done();
          }
        }
	  })
	}
	catch(e){throw (e);}
  };
  loginAttempt();
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});