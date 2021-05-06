const mongoose = require('mongoose')

const roomsModel = new mongoose.Schema({
	created: {
		type: String,
	},
	users: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
	title: {
		type: String,
		require,
	},
	admin: mongoose.Types.ObjectId,
})

const Rooms = mongoose.model('Rooms', roomsModel)
module.exports = Rooms
