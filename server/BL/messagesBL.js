const Messages = require('../model/messagesModel')
const {generateMessage} = require('../utils/generateMessage')

module.exports = {
	//  user has joined
	userJoin: function (socket) {
		socket.emit('message', generateMessage('hey user!'))
		socket.broadcast.emit('message', generateMessage('new user has joined'))
	},

	joinToRoom: function (socket, io) {
		socket.to('join', (data) => {
			console.log(data)
			// socket.join(data.room)
		})
	},

	sendMessage: function (socket, io) {
		socket.on('sendMessage', async (data) => {
			try {
				console.log(data)

				res.json({
					message: data,
				})
			} catch (error) {}

			io.emit('message', generateMessage(data))
		})
	},
}
