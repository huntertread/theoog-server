const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../pool');
const md5 = require('md5');

passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {

  console.log('local strategy', username, password)
 
  loginAttempt();
  async function loginAttempt() {	
	const client = await pool.connect()
	try{
	//   await client.query('BEGIN')
	  client.query('SELECT * from users WHERE username = $1', [username], function(err, result) {
		console.log(result)	
		if(err) {
		  return done(err)
		}	
		if(result.rows[0] == null){
        //   req.flash('danger', "Oops. Incorrect login details.");
          console.log('user does not exist')
		  return done(null, false);
		}
		else{
          let pass = md5(password)
          if (pass === result.rows[0].password) {
			console.log('success')
			console.log(result.rows[0])
            return done(null, [{username: result.rows[0].username}]);
          } else if (pass !== result.rows[0].password) {
            return done(null, false);
          } else {
            console.log('Error while checking password');
			return done();
          }
		//   bcrypt.compare(password, result.rows[0].password, function(err, check) {
		// 	if (err){
		// 	  console.log('Error while checking password');
		// 	  return done();
		// 	}
		// 	else if (check){
		// 	  return done(null, [{username: result.rows[0].username}]);
		// 	}
		// 	else{
        //     //   req.flash('danger', "Oops. Incorrect login details.");
        //     console.log('wrong log in details')
		// 	  return done(null, false);
		// 	}
		//   });
        }
	  })
	}
	catch(e){throw (e);}
  };	
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});