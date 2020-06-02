var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e507440752e78d3944dc6_340.png",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e507440752e78d3944dc6_340.png",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e507440752e78d3944dc6_340.png",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
];

function seedDB() {
	// remove all the campgrounds.
	Campground.deleteMany({}, (err) => {
		// if (err) {
		// 	console.log(err);
		// } else {
		// 	console.log("removed campground");
		// 	// add a few campgrounds
		// 	data.forEach((seed) => {
		// 		Campground.create(seed, (err, campground) => {
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log("added a campground");
		// 				// create a comment
		// 				Comment.create({
		// 					text: "Great place, but no Internet",
		// 					author: "Homer"
		// 				}, (err, comment) => {
		// 					if (err) {
		// 						console.log(err);
		// 					} else {
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("create new comment");
		// 					}
							
		// 				});									
		// 			}
		// 		})
		// 	});
		// }
	});
	
}

module.exports = seedDB;

