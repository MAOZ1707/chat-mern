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

	socket.on('roomEntered', ({ leaveRoom, newRoom }) => {
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
