const mongoose = require('mongoose')

const messagesModel = new mongoose.Schema({
	messages: {
		type: String,
	},
	sender: {
		type: String,
	},
	time: {
		type: Date,
	},
	conversationId: {
		type: mongoose.Types.ObjectId,
		ref: 'Rooms',
	},
})

const Messages = mongoose.model('Messages', messagesModel)

module.exports = Messages
