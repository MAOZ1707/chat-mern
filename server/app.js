const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const cors = require('cors')
const chalk = require('chalk')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const {generateMessage} = require('./utils/generateMessage')
const {sendMessage, joinToRoom} = require('./BL/messagesBL')

const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {cors: {origin: '*'}})

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(morgan('dev'))

// connect to database
require('./config/database')

// Routes
const usersRouter = require('./router/userRouter')
const roomsRouter = require('./router/roomsRouter')

app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

let users = {}
io.on('connection', (socket) => {
	console.log(`hello from the server! Socket id: ${users[socket.id]}`)
	// users.push(socket.id)
	// io.emit('userList', users)
	// console.log(`users after connections ${users}`)

	socket.on('userJoin', (username) => {
		users[socket.id] = username
		io.emit('userList', [...new Set(Object.values(users))])
	})

	socket.on('newMessage', (newMessage) => {
		io.to(newMessage.room).emit('newMessage', {
			name: newMessage.name,
			text: newMessage.text,
		})
	})

	socket.on('roomEntered', ({leaveRoom, newRoom}) => {
		console.log(leaveRoom)

		socket.leave(leaveRoom)

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

// Error handling middleware
app.use((err, req, res, next) => {
	console.log(chalk.redBright(err.stack))

	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	})
})

// server
let port = 5000
if (process.env.PORT) {
	port = process.env.PORT
}

httpServer.listen(port, () => {
	console.log(chalk.magentaBright(`App running on port ${port}`))
})
