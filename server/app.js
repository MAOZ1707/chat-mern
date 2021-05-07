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

io.on('connection', (socket) => {
	// sendMessage(socket, io)
	// joinToRoom(socket)
	socket.on('join', (room) => {
		console.log(room.title)
		let roomName = room.title.trim()
		socket.join(roomName)

		socket.emit('message', generateMessage('hey user!'))
		socket.broadcast.to(room.title).emit('message', generateMessage(`hello`))
	})

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

	//  user left the chat
	socket.on('disconnect', () => {
		io.emit('message', generateMessage('user left'))
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
