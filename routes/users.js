var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('earTrainGame', ['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

//Function used to redirect unathenticated users to the login screen from other get requests
function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/users/login");
}

// Get Requests
router.get('/login', function(req, res){
	res.render('login');
});

router.get('/register', function(req, res){
	res.render('register');
});

router.get('/menu', isAuthenticated, function(req, res){
	res.render('menu');
});

router.get('/gamemode', isAuthenticated, function(req, res){
	res.render('gamemode');
});

router.get('/scales', isAuthenticated, function(req, res){
	res.render('scales');
});

router.get('/intervals', isAuthenticated, function(req, res){
	res.render('intervals');
});

router.get('/userAccount', isAuthenticated, function(req, res){
	res.render('userAccount');
});

router.get('/highScores', isAuthenticated, function(req, res){
	let intervalScores = new Map();
	let scaleScores = new Map();
	let scaleSortedScores;
	let intervalSortedScores

	db.users.find({}, function(err, users){
		if(err){
			res.send(err);
		} else{
			users.forEach(function(user){
				let intervalScore = user.intervalScore;
				let scaleScore = user.scaleScore;
				let username = user.username;

				if(intervalScore != null){
					intervalScores.set(username, intervalScore);
				}

				if(scaleScore != null){
					scaleScores.set(username, scaleScore);
				}
			});

			var intervalScoresToSort = [...intervalScores];

			intervalSortedScores = intervalScoresToSort.sort(([key1, value1], [key2, value2]) =>
				value2.localeCompare(value1 , undefined, {'numeric': true})
			);

			let scaleScoresToSort = [...scaleScores];

			scaleSortedScores = scaleScoresToSort.sort(([key1, value1], [key2, value2]) =>
				value2.localeCompare(value1)
			);
			res.render('highScores', {
				intervalScores: intervalSortedScores,
				scaleScores: scaleSortedScores,
			});
		}
	});
});

router.get('/tutorials', isAuthenticated, function(req, res){
	res.render('tutorials');
});

router.get('/scaleTutorial', isAuthenticated, function(req, res){
	res.render('scaleTutorial');
});

router.get('/intervalTutorial', isAuthenticated, function(req, res){
	res.render('intervalTutorial');
});

router.get('/logout' , function(req, res){
	req.logout();
	req.flash('success', "You have logged out");
	res.redirect('/users/login');
});

//Post Requests:
router.post('/intervalSave', function(req, res){
	var score = req.body.score;
	let username = req.body.username;

	db.users.find({username: username}, function(err, user){
		if(err){
			res.send(err);
		} else{
			previousScore = user[0].intervalScore
			if(previousScore == null || (score > previousScore)){
				db.users.update({username: username},
					{$set: {intervalScore: score}}, function(){});
			}
			res.location('/');
			res.redirect('/users/menu');
		}
	});
});

router.post('/scaleSave', function(req, res){
	var score = req.body.score;
	let username = req.body.username;

	db.users.find({username: username}, function(err, user){
		if(err){
			res.send(err);
		} else{
			previousScore = user[0].scaleScore
			if(previousScore == null || (score > previousScore)){
				db.users.update({username: username},
					{$set: {scaleScore: score}}, function(){});
			}
			res.location('/');
			res.redirect('/users/menu');
		}
	});
});

router.post("/userAccount", function(req, res){
	let avatar = req.body.avatar;
	let username = req.body.username;

	db.users.find({username: username}, function(err, user){
		if(err){
			res.send(err);
		} else{
			db.users.update({username: username},
				{$set: {avatar: avatar}}, function(){});
			res.location('/');
			res.redirect('/users/userAccount');
		}
	});
});

router.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//check for notEmpty:
	req.checkBody('username', "Username field is empty").notEmpty();
	req.checkBody('password', "Password field is empty").notEmpty();
	req.checkBody('password2', "Password confirmation field is empty").notEmpty();

	//check for same password
	req.checkBody('password', "Passwords are not the same!").equals(req.body.password2);

	//Checking and handling errors:
	var errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors: errors,
			username: username,
			password: password,
			password2: password2,
			test: ""
		});
	} else{
		var newUser = {
			username: username,
			password: password,
			scaleScore: null,
			intervalScore: null,
			avatar: "/css/avatarPics/penguin.png"
		}

		db.users.findOne({username:username}, function(err, user){
			if(err){
				res.send(err);
			}
			else{
				if(!user){
					//Salt & Hash password to store in database
					bcrypt.genSalt(10, function(err, salt){
						bcrypt.hash(newUser.password, salt, function(err,hash){
							newUser.password = hash;
							db.users.insert(newUser, function(err, doc){
								if(err){
									res.send(err);
								} else{
									req.flash('success', 'You have successfully registered your account!');
									res.location('/');
									res.redirect('/users/login');
								}
							});
						});
					});
				}
				else{
					res.render('register', {
						username: username,
						test: 'There is already a user with this name!'
					});
				}
			}
		});
	}
});

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	db.users.findOne({_id: mongojs.ObjectId(id)}, function(err, user){
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done){
			db.users.findOne({username: username}, function(err, user){
				if(err){
					return done(err);
				}
				if(!user){
					return done(null, false, {message: "This user does not exist!"});
				}

				bcrypt.compare(password, user.password, function(err, match){
						if(err){
							return done(err);
						}
						if(match){
							return done(null, user);
						}
						else{
							return done(null, false, {message: "You used the wrong password!"});
						}
				});
			});
	}
));


router.post('/login',
	passport.authenticate('local', {successRedirect: '/users/menu',
									failureRedirect: '/users/login',
									failureFlash: "Your Username or Password is Incorrect"}));

module.exports = router;
