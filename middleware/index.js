var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware goes here
var middlewareObj = {};

// check campground ownership middleware
middlewareObj.checkCampgroundOwnership = function (req, res, next) {	
	// check if the user logged in 
	if (req.isAuthenticated()) {				
		Campground.findById(req.params.id, (err, foundCampground) => {
			if (err) {
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// check if the user own the campground
				// foundCampground.author.id is an object
				// while req.use.id is a string, so we cannot just use ===
				if (foundCampground.author.id.equals(req.user.id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}				
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		// take the user to the previous page
		res.redirect("back");
	}		
}

// check if the comment belongs to the user
middlewareObj.checkCommentOwnership = function (req, res, next) {	
	// check if the user logged in 
	if (req.isAuthenticated()) {				
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err) {
				res.redirect("back");
			} else {
				// check if the user own the comment
				// foundCampground.author.id is an object
				// while req.use.id is a string, so we cannot just use ===
				if (foundComment.author.id.equals(req.user.id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}				
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		// take the user to the previous page
		res.redirect("back");
	}		
}

// Check whether the user logged in
middlewareObj.isLoggedin = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	// add a key val pair to flash 
	// key error and value is please login first
	// notice it's just a key, it does not related to Bootstrap
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;