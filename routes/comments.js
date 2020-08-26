var express = require("express");
// we pass an object here since we define the get new route in app.js
// this object will match the id with what we defined before
// or the get new route will not be able to find the id because it is null
var router = express.Router({mergeParams: true});
var Picture = require("../models/picture");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ==========================================
// Comment Routes
// When the user click the comment btn, it will check if the user is logged in first
// and it will follow how the middleware isLoggedin works

// Comment New
router.get("/new", middleware.isLoggedin, (req, res) => {
	//find picture by id
	Picture.findById(req.params.id, (err, foundPicture) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {picture: foundPicture});
		}
	});	
});

// Comment Create
router.post("/", middleware.isLoggedin, (req, res) => {
	Picture.findById(req.params.id, (err, foundPicture) => {
		if (err) {
			console.log(err);
			redirect("/pictures");
		} else {
			// Since we use name="comment[text]" and name="comment[author]"
			// we pre-made the object so we can just use req.body.comment instead
			// of something like var text = req.body.text...
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save the comment
					comment.save();
					
					foundPicture.comments.push(comment);
					foundPicture.save();	
					req.flash("success", "Successfully added a comment");
					res.redirect("/pictures/" + foundPicture._id);
				}
			});
		}
	});
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			res.redirect("back");
		} else {
			// req.params.id is the picture id we get from
			// app.use("/pictures/:id/comments", commentRoutes) in app.js
			res.render("comments/edit", {pictureId: req.params.id, comment: foundComment});
		}
	});	
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err) {
			res.redirect("back");
		} else {
		   res.redirect("/pictures/" + req.params.id);
		}
	});
});

// DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully deleted");
			res.redirect("/pictures/" + req.params.id);
		}
	});
});

module.exports = router;