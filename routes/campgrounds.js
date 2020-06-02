let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");

// why do we name the middleware file index.js instead of middleware.js or other name
// because when we require the file in middleware directory, it will automatically 
// find an index file so we don't have to require the index file below
// index is a special name for express
// though we can still say require("../middleware/index.js");
let middleware = require("../middleware");

//==============================================
// INDEX show all campgrounds
router.get("/", (req, res) => {	
	//Find all the grounds from db
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			// Here the source of campgrounds is no longer defined in an array
			// as version1, but is defined in line 43 in our db.
			// we add another letiable to check whether the user exists
			res.render("campgrounds/index", {campgrounds: allCampgrounds, 
											 currentUser: req.user});
		}
	})
	
});


//This is a REST convention we follow, we can use the same url, but it's post here.
router.post("/", middleware.isLoggedin, (req, res) => {
	//Get data from from and add to campgrounds array.
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {name: name, price: price, image: image, description: desc, author: author};
	//Create a new campground and save it to DB.
	Campground.create(newCampground, (err, newlyCreated) =>{
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	// campgrounds.push(newCampground);
	
});

router.get("/new", middleware.isLoggedin, (req, res) => { 
	res.render("campgrounds/new");
});

//SHOW--show more info about one campground
router.get("/:id", (req, res) => {
	//find the campground with provided Id
	// by using populate exec we will get the exact comments of our
	// campground, not just the id of comments.
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			console.log(foundCampground)
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});		
});

// EDIT CAMPGROUND Router
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {				
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});				
	});			
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	// find and update the correct campground	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});





module.exports = router;

