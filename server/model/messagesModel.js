const mongoose = require('mongoose')

const messagesModel = new mongoose.Schema({
	text: {
		type: String,
	},
	name: {
		type: String,
	},
	time: {
		type: String,
	},
	conversationId: {
		type: mongoose.Types.ObjectId,
	},
	favorite: {
		type: Boolean,
	},
})

const Messages = mongoose.model('Messages', messagesModel)

module.exports = Messages
