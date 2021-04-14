const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const NoteSchema = mongoose.Schema({
	userid: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

const UserSchema = mongoose.Schema({
	id: {
		type: String,
		default: uuidv4()
	},
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}


})
const note_model = mongoose.model("notes", NoteSchema)
const user_model = mongoose.model("user", UserSchema)

module.exports = { note_model, user_model }
