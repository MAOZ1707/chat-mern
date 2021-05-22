const express = require('express')
const cors = require('cors')
const chalk = require('chalk')

const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		credentials: true,
	},
})

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

let users = {}
io.on('connect', (socket) => {
	const id = socket.handshake.query.id

	console.log(`Hello from the server: socketId: ${socket.id}`)

	socket.on('userJoin', (username) => {
		users[socket.id] = username
		console.log('Users after connection', users)
		io.emit('userList', [...new Set(Object.values(users))])
	})

	socket.on('sendMessage', (newMessage) => {
		console.log(newMessage)
		io.to(newMessage.room).emit('sendMessage', {
			name: newMessage.name,
			text: newMessage.text,
		})
	})

	socket.on('roomEntered', ({ oldRoom, newRoom }) => {
		if (oldRoom) {
			socket.leave(oldRoom.title)
			console.log('OLD-ROOM--', oldRoom.title)
		}
		io.to(newRoom.title).emit('sendMessage', {
			name: users[socket.id],
			text: `${users[socket.id]} just joined the ${newRoom.title} room`,
		})
		console.log('NEW-ROOM', newRoom.title)
		socket.join(newRoom.title)
	})

	socket.on('disconnect', () => {
		delete users[socket.id]
		io.emit('userList', [...new Set(Object.values(users))])
	})
})

// server
let port = 8000
if (process.env.PORT) {
	port = process.env.PORT
}

httpServer.listen(port, () => {
	console.log(chalk.magentaBright(`App running on port ${port}`))
})
