var mongoose = require("mongoose");
var Picture = require("./models/picture");
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
	// remove all the pictures.
	Picture.deleteMany({}, (err) => {
		// if (err) {
		// 	console.log(err);
		// } else {
		// 	console.log("removed picture");
		// 	// add a few pictures
		// 	data.forEach((seed) => {
		// 		Picture.create(seed, (err, picture) => {
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log("added a picture");
		// 				// create a comment
		// 				Comment.create({
		// 					text: "Great place, but no Internet",
		// 					author: "Homer"
		// 				}, (err, comment) => {
		// 					if (err) {
		// 						console.log(err);
		// 					} else {
		// 						picture.comments.push(comment);
		// 						picture.save();
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

