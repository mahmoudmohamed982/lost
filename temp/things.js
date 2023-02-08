const mongoose = require("mongoose");

const thingsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "name"],
	},
	type: {
		type: String,
		required: [true, "type"],
	},
	status: {
		type: String,
		required: [true, "status"],
		enum: {
			values: ["missing", "found"],
			message: 'missing&found'
		}
	},
	model: {
		type: String,
		required: [true, "model"],
	},
	color: {
		type: String,
		required: [true, "color"],
	},
	description: String,
	photo: String,
	location: {
		type: String,
		required: [true, "location"],
	},
	phone: {
		type: String,
		required: [true, "phone"],
	},

	date: {
		type: Date,
		required: [true, "date"],
	},
	whatsApp: String,
	userID: String,
	Accept: {
		type: Boolean,
		default: false,
	},
	castDate: Date,
});
const Things = mongoose.model("things", thingsSchema);

module.exports = Things;
