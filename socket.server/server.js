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

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

let users = {}
io.on('connection', (socket) => {
	let id = socket.id
	socket.onAny((eventName, ...args) => {
		console.table([id, eventName, ...args])
	})

	socket.on('userJoin', (username) => {
		users[socket.id] = username
		socket.join(username)
		io.emit('userList', [...new Set(Object.values(users))])
	})

	socket.on('newMessage', (newMessage) => {
		io.to(newMessage.room).emit('newMessage', {
			name: newMessage.name,
			text: newMessage.text,
		})
	})

	socket.on('roomEntered', ({leaveRoom, newRoom}) => {
		io.to(leaveRoom).emit('newMessage', {
			name: 'NEWS',
			text: `${users[socket.id]} has left`,
		})
		io.to(newRoom).emit('newMessage', {
			name: 'NEWS',
			text: `${users[socket.id]} has join `,
		})
		socket.join(newRoom)
	})

	//  user left the chat
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
