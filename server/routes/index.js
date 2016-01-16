'use strict';

var controller = require('../controllers');
var helpers = require('../helpers');

module.exports = function(app, express, passport) {
/* =============== LOGIN & AUTHENTICATION ================ */
	// THIS ROUTE WILL REDIRECT THE USER TO GOOGLE'S LOGIN PAGE
	app.get('/login', passport.authenticate('google', 
		{ scope: ['https://www.googleapis.com/auth/userinfo.profile']}),
		function (req, res){});

	// AFTER SUBMITTING THEIR CREDENTIALS, GOOGLE WILL REDIRECT THE USER TO '/login-verify'. IF THE LOGIN
	// WAS SUCCESSFUL, THE USER WILL THEN BE REDIRECTED TO THE URL SPECIFIED BY 'successRedirect'. IF NOT, THEY
	// WILL BE REDIRECTED TO THE URL SPECIFIED BY 'failureRedirect'.
	app.get('/login-verify', passport.authenticate('google', 
		{
			//successRedirect: ('/home/'),
			failureRedirect: '/login'
		}), function (req, res) {
		res.redirect('http://localhost:8100/#/home/' + req.user.id);
	});

	// THIS IS JUNK I CONJURED UP FOR THE SAKE OF FIXING THE ERROR
	app.get('/api/loginfo', function (req, res) {
		console.log(req.session.passport.user);
		res.redirect('/home');
	})

/* ================ USER ROUTES ================= */
	app.post('/api/users', function (req, res) {
		controller.user.addOne(req.body.arr, res);
	});

	app.get('/api/users/:userId', function (req, res) {
		controller.user.getOne(req.params.userId, res);
	});

/* =============== FRIEND ROUTES ========================= */
	app.post('/api/users/:userId/friends', function (req, res) {
		 controller.friend.addOne(req.params.userId, req.body, res);
	});

	app.get('/api/users/:userId/friends', function (req, res) {
		controller.friend.getAllForUser(req.params.userId, res);
	});

	app.get('/api/friends/:friendId', function (req, res) {
		controller.friend.getOne(req.params.friendId, res);
	});

	app.put('/api/friends/:friendId', function (req, res) {
		controller.friend.updateOne(req.params.friendId, req.body, res);
	});

	app.delete('/api/friends/:friendId', function (req, res) {
		controller.friend.deleteOne(req.params.friendId, req.body, res);
	});	

	app.get('/api/friends/:friendId/posts', function(req, res) {
		controller.friend.getPosts(req.params.friendId, res);
	});

	app.get('/api/friends/:friendId/gifts', function(req, res) {
		controller.friend.getGifts(req.params.friendId, res);
	});

	/* =============== EVENT ROUTES ========================= */
	app.post('/api/friends/:friendId/events', function (req, res) {
		 controller.event.addOne(req.params.friendId, req.body, res);
	});

	app.get('/api/friends/:friendId/events', function (req, res) {
		controller.event.getAllForFriend(req.params.friendId, res);
	});

	app.get('/api/events/:eventId', function (req, res) {
		controller.event.getOne(req.params.eventId, res);
	});

	app.put('/api/events/:eventId', function (req, res) {
		controller.event.updateOne(req.params.eventId, req.body, res);
	});

	app.delete('/api/events/:eventId', function (req, res) {
		controller.event.deleteOne(req.params.eventId, req.body, res);
	});	
	
	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login');
	};
};
