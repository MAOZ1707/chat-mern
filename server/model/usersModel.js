const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		required: [true, 'first name is required'],
		maxlength: [30, 'A name must have a less or equal to 30 characters'],
		minlength: [3, 'A name must have a more or equal to 3 characters'],
	},
	lastname: {
		type: String,
		trim: true,
		maxlength: [30, 'A name must have a less or equal to 30 characters'],
		minlength: [3, 'A name must have a more or equal to 3 characters'],
		required: [true, 'last name is required'],
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, 'Please provide your email'],
	},
	password: {
		type: String,
		unique: true,
		required: [true, 'Please provide your password'],
		minlength: [8, 'Password must be more or equal to 8 characters'],
	},
	rooms: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Rooms',
		},
	],
	friends: [{name: String, userId: mongoose.Types.ObjectId}],
})

const Users = mongoose.model('Users', usersSchema)
module.exports = Users
