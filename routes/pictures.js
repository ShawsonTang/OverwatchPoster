let express = require("express");
let router = express.Router();
let Picture = require("../models/picture");

// why do we name the middleware file index.js instead of middleware.js or other name
// because when we require the file in middleware directory, it will automatically 
// find an index file so we don't have to require the index file below
// index is a special name for express
// though we can still say require("../middleware/index.js");
let middleware = require("../middleware");

//==============================================
// INDEX show all pictures
router.get("/", (req, res) => {	
	//Find all the grounds from db
	Picture.find({}, (err, allPictures) => {
		if (err) {
			console.log(err);
		} else {
			// Here the source of pictures is no longer defined in an array
			// as version1, but is defined in line 43 in our db.
			// we add another letiable to check whether the user exists
			res.render("pictures/index", {pictures: allPictures, 
											 currentUser: req.user});
		}
	})
	
});


//This is a REST convention we follow, we can use the same url, but it's post here.
router.post("/", middleware.isLoggedin, (req, res) => {
	//Get data from from and add to pictures array.
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newPicture = {name: name, price: price, image: image, description: desc, author: author};
	//Create a new picture and save it to DB.
	Picture.create(newPicture, (err, newlyCreated) =>{
		if (err) {
			console.log(err);
		} else {
			res.redirect("/pictures");
		}
	});
	// pictures.push(newPicture);
	
});

router.get("/new", middleware.isLoggedin, (req, res) => { 
	res.render("pictures/new");
});

//SHOW--show more info about one picture
router.get("/:id", (req, res) => {
	//find the picture with provided Id
	// by using populate exec we will get the exact comments of our
	// picture, not just the id of comments.
	Picture.findById(req.params.id).populate("comments").exec((err, foundPicture) => {
		if (err) {
			console.log(err);
		} else {
			console.log(foundPicture)
			//render show template with that picture
			res.render("pictures/show", {picture: foundPicture});
		}
	});		
});

// EDIT PICTURE Router
router.get("/:id/edit", middleware.checkPictureOwnership, (req, res) => {				
	Picture.findById(req.params.id, (err, foundPicture) => {
		res.render("pictures/edit", {picture: foundPicture});				
	});			
});

// UPDATE PICTURE ROUTE
router.put("/:id", middleware.checkPictureOwnership, (req, res) => {
	// find and update the correct picture	
	Picture.findByIdAndUpdate(req.params.id, req.body.picture, (err, updatedPicture) => {
		if (err) {
			res.redirect("/pictures");
		} else {
			res.redirect("/pictures/" + req.params.id);
		}
	});	
});

// DESTROY PICTURE ROUTE
router.delete("/:id", middleware.checkPictureOwnership, (req, res) => {
	Picture.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect("/pictures");
		} else {
			res.redirect("/pictures");
		}
	});
});





module.exports = router;

