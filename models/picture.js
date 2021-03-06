let mongoose = require("mongoose");
//Schema Setup
let pictureSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
		}
	]
});
// Send this model out of the file by useing module.exports
module.exports = mongoose.model("Picture", pictureSchema);