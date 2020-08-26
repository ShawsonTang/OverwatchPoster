var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root Route
router.get("/", (req, res) => {
	res.render("landing");
});
//====================================================
// AUTH ROUTES

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){            
			req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
		    req.flash("success", "Welcome to OW PIC" + user.username);
		    res.redirect("/pictures"); 
        });
    });
});

// show login form
router.get("/login", (req, res) => {	
	res.render("login");
});

// handle login logic
// app.post("/login", middleware, callback)
// the middleware is from [passport.use(new localStrategy(User.authenticate()));]
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/pictures",
	 	failureRedirect: "/login"
	}), 
	// the callback here does not do anything, just as a reminder that there's a 
	// middleware
	(req, res) => {	
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged Out");
	res.redirect("/pictures");
});

module.exports = router;
