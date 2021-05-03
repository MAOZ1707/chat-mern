const mongoose = require('mongoose')

const roomsModel = new mongoose.Schema({
	created: Date,
	users: [{type: mongoose.Types.ObjectId, ref: 'Users'}],
	title: String,
	admin: mongoose.Types.ObjectId,
})

const Rooms = mongoose.model('Rooms', roomsModel)
module.exports = Rooms
