const Messages = require('../model/messagesModel')
const {generateMessage} = require('../utils/generateMessage')

module.exports = {
	joinToRoom: function (socket) {
		socket.on('join', (room) => {
			console.log(room.title)
			let roomName = room.title.trim()
			socket.join(roomName)

			socket.emit('message', generateMessage('hey user!'))
			socket.broadcast.to(room.title).emit('message', generateMessage(`hello`))
		})
	},

	sendMessage: function (socket, io) {
		console.log(socket.id)
		socket.on('sendMessage', async (data) => {
			let roomName = data.room.trim()
			try {
				console.log(data)
				console.log(roomName)

				res.json({
					message: data,
				})
			} catch (error) {}

			io.to(roomName).emit('message', data.text)
		})
	},
}
